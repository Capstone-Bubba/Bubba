from flask import Flask, jsonify
from flask_socketio import SocketIO, send, emit
import cv2
import torch
import json
import datetime

app = Flask(__name__)
socketio = SocketIO(app)

@socketio.on('connect')
def connect():
    print('connect')

@socketio.on('login')
def login(data):
    model = torch.hub.load('ultralytics/yolov5', 'custom', path='./best.pt')
    domain = data['rtsp']
    user = data['data']['user_num']
    cam = cv2.VideoCapture(domain)

    while True:
        _, img = cam.read()
        result = model(img)
        name = result.pandas().xyxy[0]['name']
        if name.empty:
            print('empty dataframe')
        else:
            now = datetime.datetime.now()
            face = name.to_json()
            dic = json.loads(face)
            dic['user'] = user
            dic['time'] = now.strftime('%Y-%m-%d %H:%m:%S')

            emit('rtsp', json.dumps(dic))

if __name__ == '__main__':
    socketio.run(app, debug=True)