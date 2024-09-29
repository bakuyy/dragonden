import serial
import flask
from flask_cors import CORS
import time
import threading
import requests
from flask import Flask, jsonify, request

app = flask.Flask(__name__)
CORS(app)  # Enable CORS for the entire app
app.debug = True

ser = serial.Serial(port='/dev/cu.usbmodem101', baudrate=9600)
state = []
dragon_count = 3
select_index = 0
last_bird_id=None

@app.route('/api/stocks', methods=['GET'])
def get_stocks():
    stocks = [
        {"symbol": "AAPL", "name": "Apple Inc."},
        {"symbol": "GOOGL", "name": "Alphabet Inc."},
        {"symbol": "MSFT", "name": "Microsoft Corporation"},
    ]
    return jsonify(stocks)

@app.route('/getAction', methods=['GET'])
def getAction():
    global state
    res = flask.jsonify(state)
    return res

def read_serial():
    global state
    global select_index
    while True:
        value = ser.readline()
        valueInString = str(value, 'UTF-8', errors='replace').strip()  
        if valueInString:
            state = valueInString.split('#')
            if len(state) > 1:
                direction = state[1].strip()
                handle_serial_toggle(direction)

def handle_serial_toggle(direction):
    global select_index, last_bird_id
    if direction == "Right":
        select_index = (select_index + 1) % dragon_count
    elif direction == "Left":
        select_index = (select_index - 1 + dragon_count) % dragon_count

    if select_index != last_bird_id:
        last_bird_id = select_index
        call_select_bird(select_index)

@app.route('/get_selected_index', methods=['GET'])
def get_selected_index():
    return jsonify({"index": select_index})


def call_select_bird(bird_id):
    url = "http://localhost:5000/api/select_bird"  
    data = {"bird_id": bird_id}
    try:
        response = requests.post(url, json=data)
        if response.status_code == 200:
            print(f"Bird {bird_id} selected successfully.")
        else:
            print(f"Failed to select bird {bird_id}: {response.json()}")
    except requests.exceptions.RequestException as e:
        print(f"Error while selecting bird: {e}")

thread = threading.Thread(target=read_serial, daemon=True)
thread.start()

if __name__ == '__main__':
    app.run(port=5001)
