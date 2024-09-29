import serial
import flask
from flask_cors import CORS
import time
import threading
from flask import Flask, jsonify
from flask_cors import CORS

app = flask.Flask(__name__)
CORS(app)  # Enable CORS for the entire app
app.debug = True

ser = serial.Serial(port='/dev/cu.usbmodem101', baudrate=9600)
state = []

@app.route('/api/stocks', methods=['GET'])
def get_stocks():
    # Replace this with the actual data 
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
    while True:
        value = ser.readline()
        # Handle potential UnicodeDecodeError
        valueInString = str(value, 'UTF-8', errors='replace')  # Replace invalid characters
        state = valueInString.split('#')
        state[1] = state[1].strip()
        print(state)

thread = threading.Thread(target=read_serial, daemon=True)
thread.start()
if __name__ == '__main__':
    app.run()
