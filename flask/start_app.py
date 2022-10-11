from flask import Flask, render_template, request
from threading import Thread
import cv2, torch, json, time, datetime
import torch.nn as nn
import timm

import database
import task

class Network(nn.Module):
    def __init__(self):
        super(Network, self).__init__()
        self.model = timm.create_model('resnet50', pretrained=False, num_classes=5, in_chans=3)

    def forward(self, x):
        x = self.model(x)
        return x

device = "cuda" if torch.cuda.is_available() else "cpu"

cry_detect_model = Network()
cry_detect_model = torch.load("/home/twogudack/Bubba/flask/app/static/cry_classifi_model.pt", map_location=device)


# yolov5 얼굴 인식 custom 모델
model = torch.hub.load('ultralytics/yolov5', 'custom', path='/home/twogudack/Bubba/flask/app/static/best.pt')
crypath = "/home/twogudack/Bubba/flask/app/static/test.wav"

app = Flask(__name__)
data = {}

@app.route('/')
def home():
    return render_template('home.html')

# db 연동 test
@app.route('/db')
def select():
    db_class = database.Database()

    sql = "SELECT email, platform \
                FROM Bubba.user"
    row = db_class.executeAll(sql)

    print(row)

    return render_template('db.html', resultData=row[0])

@app.route('/rtsp', methods=['POST'])
def rtsp():
    params = request.get_json()
    user = params['user']
    rtsp = params['rtsp']
    data[user] = rtsp
    print(data)

    daemon = Thread(target=task.background_task, args=(user, rtsp, model), daemon=True, name="Face")
    daemon.start()
    return data

@app.route('/mfcc', methods=['GET'])
def mfcc():

    result = task.baby_cry_detect(crypath,cry_detect_model,device)
    print(result)

    return str(result[0])



if __name__ == '__main__':
    app.run(host='0.0.0.0',debug= True) # 127.0.0.1