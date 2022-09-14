from flask import Flask, jsonify, request, current_app
from threading import Thread
from flask_cors import CORS, cross_origin
import requests
import cv2
import torch
import json
import datetime
import time


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# yolov5 얼굴 인식 커스텀 모델
model = torch.hub.load('ultralytics/yolov5', 'custom', path='./flask/best.pt')

# data = { user : rtsp } 형식의 딕셔너리
data = {}

def background_task(user, rtsp):

    # cv2 camera 캡쳐 할 도메인
    cam = cv2.VideoCapture(rtsp)

    # FaceLog로 사용할 count dictinoary
    count = {'back':0, 'side':0, 'front':0, 'none':0, 'user':user}

    count_len = 0

    # 분석 시작 시간 
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

            # emit('rtsp', json.dumps(dic))
            # send Face Log to Node.js
            r = requests.post('http://localhost:8000/auth/test_face', json=json.dumps(dic))
            # print('response from server :', r.text)
            print('FaceLog for 1s', json.dumps(dic))

        # start - end = 30 으로 해서 30s 마다 메시지 전송
        end = time.time()

        if( end - start > 30 * count_len ):
            count_len += 1
            r = requests.post('http://localhost:8000/auth/test_acc', json=json.dumps(count))
            print('Accuracy for 30s', json.dumps(count))
            # emit('accuracy', json.dumps(count))
            count['back'], count['side'], count['front'], count['none'] = 0, 0, 0, 0
        print('count_len', count_len)

# RTSP UPDATE 
@app.route('/rtsp', methods=['POST'])
def rtsp():
    # print(request.is_json)    json 체크
    params = request.get_json()
    user = params['user']
    rtsp = params['rtsp']
    data[user] = rtsp
    print(data)
    daemon = Thread(target=background_task, args=(user, rtsp), daemon=True, name="Face")
    daemon.start()
    return data

@app.route('/t2', methods=['POST'])
def t2():
    params = request.get_json()
    r = requests.post('http://localhost:8000/auth/test_face', json=params)
    print(r.text)
    return r.text

@app.route('/t3', methods=['GET'])
def t3():
    r = requests.post('http://localhost:8000/auth/test_acc', json={'user':2, 'rtsp':'go?'})
    print(r.text)
    return r.text
    
if __name__ == '__main__':
    app.run(debug=True, threaded=True)














# app = Flask(__name__)
# socketio = Sockets(app)
# model = torch.hub.load('ultralytics/yolov5', 'custom', path='./flask/best.pt')

# @socketio.on('connect')
# def connect():
#     print('connect')

# @socketio.on('login')
# def login(data):
#     domain = data['rtsp']
#     user = data['user']
    
#     cam = cv2.VideoCapture(domain)
#     count = {'back':0, 'side':0, 'front':0, 'none':0, 'user':user}
#     count_len = len(user)
#     print(count_len)
#     start = time.time()
#     while True:
#         time.sleep(1)
#         _, img = cam.read()
#         result = model(img)
#         name = result.pandas().xyxy[0]['name']
        
#         if name.empty:
#             count['none'] += 1
#             print('empty')
#         else:
#             now = datetime.datetime.now()
#             face = name.to_json()
#             dic = json.loads(face)
#             if(dic['0'] == 'back'):
#                 count['back'] += 1
#                 print(dic['0'])
#             elif(dic['0'] ==' front'):
#                 count['front'] += 1
#                 print(dic['0'])
#             elif(dic['0'] == 'side'):
#                 count['side'] += 1
#                 print(dic['0'] == 'side')
#             dic['user'] = user
#             dic['time'] = now.strftime('%Y-%m-%d %H:%m:%S')
            
#             emit('rtsp', json.dumps(dic))
#         end = time.time()
#         if( end - start > 30 * count_len ):
#             count_len += 1
#             emit('accuracy', json.dumps(count))
#             count['back'], count['side'], count['front'], count['none'] = 0, 0, 0, 0
#         print('count_len', count_len)
# if __name__ == '__main__':
#     socketio.run(app, debug=True)
=======
@socketio.on('message')
def message(data):
    print('test', data)

if __name__ == '__main__':
    socketio.run(app)
