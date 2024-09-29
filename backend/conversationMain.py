import requests
import pygame
import io
import threading
import time
from openai import OpenAI  
from dotenv import load_dotenv
import os
from openai import OpenAI

pygame.mixer.init()
load_dotenv()

elevenlabs_api_key = "sk_5e5eb138fd80c45fba129805dd087095f9f5ca77baac59f2"
api_key = os.getenv("OPENAI_API_KEY")

client = OpenAI(api_key=api_key)

voice_ids = {
    "sustainability": "TxGEqnHWrfWFTfGW9XjX",
    "capitalist": "bIHbv24MWmeRgasZH58o",
    "female_empowerment": "Xb7hH8MSUJpSbSDYk0k2"
}

current_bird = None 
stop_flag = threading.Event()  

def notify_server_bird_speaking(bird_id):
    url = "http://127.0.0.1:5000/api/notify_bird"  # Update with your server's actual URL
    data = {
        "bird_id": bird_id,
    }

    try:
        response = requests.post(url, json=data)
        if response.status_code == 200:
            print(f"Server notified: {bird_id} started speaking.")
        else:
            print(f"Failed to notify server: {response.status_code}")
    except requests.exceptions.RequestException as e:
        print(f"Error notifying server: {e}")


def generate_bird_response(stock_ticker, viewpoint, previous_response=None):
    if viewpoint == "sustainability":
        character_prompt = (
            f"You are an environmentally conscious bird. Have a nerdy personality. Give a brief and strong argument about the stock {stock_ticker}. "
            "Feel free to interject if another bird disagrees. Please keep your response short and to the point. For example: although this companys revenue has doubled, so have the co2 emissions over the past 2 years. it is aslo a large producer of ocean plastic pollution."
        )
    elif viewpoint == "capitalist":
        character_prompt = (
            f"You are a capitalist bird. Have a cranky personality and demeanor. JJump straight to facts. Feel free to say words such as lads and ah. Argue why the stock {stock_ticker} is great for profit. "
            "Don't hesitate to disagree with the other birds. Please keep your response very short and to the point."
        )
    elif viewpoint == "female_empowerment":
        character_prompt = (
            f"You are a bird that advocates for female empowerment. Have a fun personality. Jumpt straight to facts. Argue why the stock {stock_ticker} supports or undermines gender equity. "
            "Respond quickly to any objections.  Please keep your response very short and to the point. Don't contradict previous statements about gender diversity. stick to one side."
        )

    if previous_response:
        character_prompt += f" The previous bird said: '{previous_response}'. Jump straight to facts. Respond immediately and challenge their point."

    messages = [
        {
            "role": "system",
            "content": "You are a bird discussing stocks from a specific viewpoint."
        },
        {
            "role": "user",
            "content": character_prompt
        }
    ]

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=messages,
        max_tokens=100,  
        temperature=0.7,
    )

    return response.choices[0].message.content.strip()

def text_to_speech_and_play(text, bird_name):
    global current_bird, stop_flag
    voice_id = voice_ids[bird_name]
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}"

    headers = {
        "xi-api-key": elevenlabs_api_key,
        "Content-Type": "application/json"
    }

    data = {
        "text": text,
        "voice_settings": {
            "stability": 0.2,  
            "similarity_boost": 0.9, 
            "speed": 2 
        }
    }

    response = requests.post(url, json=data, headers=headers)
    if response.status_code == 200:
        audio_data = io.BytesIO(response.content)
        pygame.mixer.music.load(audio_data)

        if bird_name == "sustainability":
            bird_id = 0
        elif bird_name == "capitalist":
            bird_id = 1
        elif bird_name == "female_empowerment":
            bird_id = 2
        else:
            bird_id = -1

        notify_server_bird_speaking(bird_id)
        pygame.mixer.music.play()

        while pygame.mixer.music.get_busy():
            if stop_flag.is_set():
                pygame.mixer.music.stop()
                break
            pygame.time.Clock().tick(10)
    else:
        print(f"Error: {response.status_code}, {response.text}")

def bird_speak(bird_name, stock_ticker, previous_response_holder):
    global current_bird, stop_flag
    previous_response = previous_response_holder.get('response')
    current_bird = bird_name
    response_text = generate_bird_response(stock_ticker, bird_name, previous_response)
    print(f"{bird_name.replace('_', ' ').title()} says: {response_text}")
    text_to_speech_and_play(response_text, bird_name)
    previous_response_holder['response'] = response_text

def interact_with_birds(stock_ticker):
    global stop_flag
    previous_response_holder = {}
    current_speech_thread = None

    while True:
        print("\nChoose a bird to speak or press 4 to quit:")
        print("1. Sustainability Bird")
        print("2. Capitalist Bird")
        print("3. Female Empowerment Bird")
        print("4. Quit")

        choice = input("Enter your choice: ")

        if choice == '1':
            bird_name = "sustainability"
        elif choice == '2':
            bird_name = "capitalist"
        elif choice == '3':
            bird_name = "female_empowerment"
        elif choice == '4':
            print("Exiting interaction.")
        
            if current_speech_thread is not None and current_speech_thread.is_alive():
                stop_flag.set()
                current_speech_thread.join()
            break
        else:
            print("Invalid choice. Please try again.")
            continue

        if current_speech_thread is not None and current_speech_thread.is_alive():
            stop_flag.set()
            current_speech_thread.join()
            stop_flag.clear()

        current_speech_thread = threading.Thread(target=bird_speak, args=(bird_name, stock_ticker, previous_response_holder))
        current_speech_thread.start()


def interact_with_bird_by_id(bird_id, stock_ticker):
    bird_mapping = {
        0: "sustainability",
        1: "capitalist",
        2: "female_empowerment"
    }

    if bird_id not in bird_mapping:
        raise ValueError("Invalid bird ID")
    

    bird_name =  bird_mapping[bird_id]
    previous_response_holder = {}

    bird_speak(bird_name, stock_ticker, previous_response_holder)
