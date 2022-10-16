from flask import Flask, render_template, request
from threading import Thread
import cv2, torch, json, time, datetime
import torch.nn as nn
import timm
import pyaudio, wave
import base64
import numpy
import scipy.io.wavfile
import requests


import database
import task

class Network(nn.Module):
    def __init__(self):
        super(Network, self).__init__()
        self.model = timm.create_model('resnet50', pretrained=False, num_classes=5, in_chans=3)

    def forward(self, x):
        x = self.model(x)
        return x

CHUNK = 1024
device = "cuda" if torch.cuda.is_available() else "cpu"

cry_detect_model = Network()
cry_detect_model = torch.load("./app/static/cry_classifi_model.pt", map_location=device)


# yolov5 얼굴 인식 custom 모델
model = torch.hub.load('ultralytics/yolov5', 'custom', path='./app/static/best.pt')
# crypath = "./app/static/test.wav"

app = Flask(__name__)
data = {}

@app.route('/')
def home():
    return "test"

# db 연동 test
# @app.route('/db')
# def select():
#     db_class = database.Database()

#     sql = "SELECT email, platform \
#                 FROM Bubba.user"
#     row = db_class.executeAll(sql)

#     print(row)

#     return render_template('db.html', resultData=row[0])

@app.route('/rtsp', methods=['POST'])
def rtsp():
    params = request.get_json()
    user = params['user']
    rtsp = params['rtsp']
    data[user] = rtsp
    print(data)


    daemon = Thread(target=task.detect_face, args=(user, rtsp, model))
    daemon.start()

    return data

@app.route('/mfcc', methods=['POST'])
def mfcc():
    # user check
    params = request.args
    user = params['user']

    # .wav file save
    response = request.data
    now = datetime.datetime.now()
    format = now.strftime("%Y-%m-%d-%H-%M-%S")
    file_path = './app/static/audio/' + user + '/' + format + '.wav'
    with open(file_path, mode='bx') as f:
        f.write(response)

    result = task.baby_cry_detect(file_path, cry_detect_model, device, user)
    print(result)

    return "ok"

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, threaded=True) # 127.0.0.1