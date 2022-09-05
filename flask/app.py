from flask import Flask, jsonify
from flask_socketio import SocketIO, send, emit
import cv2
import torch
import json
import datetime
import time

app = Flask(__name__)
socketio = SocketIO(app)

model = torch.hub.load('ultralytics/yolov5', 'custom', path='./flask/best.pt')

@socketio.on('connect')
def connect():
    print('connect')

@socketio.on('login')
def login(data):
    domain = data['rtsp']
    user = data['user']
    
    cam = cv2.VideoCapture(domain)
    count = {'back':0, 'side':0, 'front':0, 'none':0, 'user':user}
    count_len = len(user)
    print(count_len)
    start = time.time()
    while True:
        time.sleep(1)
        _, img = cam.read()
        result = model(img)
        name = result.pandas().xyxy[0]['name']
        
        if name.empty:
            count['none'] += 1
            print('empty')
        else:
            now = datetime.datetime.now()
            face = name.to_json()
            dic = json.loads(face)
            if(dic['0'] == 'back'):
                count['back'] += 1
                print(dic['0'])
            elif(dic['0'] ==' front'):
                count['front'] += 1
                print(dic['0'])
            elif(dic['0'] == 'side'):
                count['side'] += 1
                print(dic['0'] == 'side')
            dic['user'] = user
            dic['time'] = now.strftime('%Y-%m-%d %H:%m:%S')
            
            emit('rtsp', json.dumps(dic))
        end = time.time()
        if( end - start > 30 * count_len ):
            count_len += 1
            emit('accuracy', json.dumps(count))
            count['back'], count['side'], count['front'], count['none'] = 0, 0, 0, 0
        print('count_len', count_len)
if __name__ == '__main__':
    socketio.run(app, debug=True)