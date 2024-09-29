# Flock $hop

## 💡Inspiration

The inspiration for our project comes from recognizing how difficult it can be to make informed investment choices, especially for those from underrepresented communities. With so many options and differing financial philosophies, navigating the investment landscape can feel overwhelming. We wanted to create a platform that empowers users to understand these complexities and find a path that aligns with their values. By offering diverse perspectives on finance—sustainability, capitalism, and feminism—we aim to make financial literacy more accessible and engaging, ultimately helping people feel more confident in their investment decisions.


## 💻 What it does

 Inspired by the belief that financial opportunities should be accessible and inclusive for all, we’ve created a platform where advisors—each representing capitalism, female empowerment, and sustainability—engage in a real-time debate about the pros and cons of stocks. As you navigate through this interactive experience, you can match or reject stocks based on your own preferences, ultimately building a tailored profile that reflects your investment style. With a personalized dashboard tracking the performance of your matched stocks, you’re not just investing—you’re aligning your financial future with your values. Our vision is to empower users from all walks of life to take control of their financial journey, making inclusivity and sustainability cornerstones of modern investing.


##⚙️ How we built it

For the front end, we used React with Tailwind CSS for a responsive and customizable UI. To create the 3D bird models, we used Spline making the app more engaging. We use PropelAuth for user authentication. We also incorporated streamlit to create a stock dashboard that displays real-time data. 
We used an Elegoo circuit for taking in user data via a toggle and buttons (toggle to select bird, buttons to accept/decline the stock). For the backend, we used Python with ElevenLabs for the text-to-speech multithreaded with openAI API calls. The server that connects the front end to the backend was created via Flask.


##❗️ Challenges we ran into

One of the key challenges we encountered was managing merge conflicts due to complex file organization, especially as we integrated various features across multiple branches. Working with 3D modelling using Spline and handling animation presented difficulties in achieving smooth transitions between advisor states. On the hardware side, incorporating a joystick added complexity in terms of input handling and compatibility with the software. We also struggled with implementing the real-time 'debate' feature between advisors due to delays from API calls - we were able to solve this by implementing multithreading to handle concurrent interactions. 

