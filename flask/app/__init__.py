from flask import Flask, render_template, request
from app import mod_dbconn
from threading import Thread
import cv2, torch, json, time, datetime

app = Flask(__name__)

# yolov5 얼굴 인식 custom 모델
model = torch.hub.load('ultralytics/yolov5', 'custom', path='./app/static/best.pt')

data = {}

def background_task(user, rtsp):

    db_class = mod_dbconn.Database()

    # cv2 camera 캡쳐 할 도메인
    cam = cv2.VideoCapture(rtsp)

    # FaceLog로 사용할 count dictinoary
    count = {'back':0, 'side':0, 'front':0, 'none':0, 'user':user}

    count_len = 1

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

            sql1 = "INSERT INTO bubba.facelog(user_num, location, OccurTime) \
                VALUES(%s, %s, %s)"
            db_class.execute(sql1, [dic['user'], dic['0'], dic['time']])
            db_class.commit()

            print('FaceLog for 1s', json.dumps(dic))

        # start - end = 30 으로 해서 30s 마다 메시지 전송
        end = time.time()

        if( end - start > 30 * count_len ):
            now = datetime.datetime.now()
            count_len += 1
            sql2 = "INSERT INTO bubba.accuracy(user_num, side, back, front, none, accur_time) \
                VALUES(%s, %s, %s, %s, %s, %s)"
            db_class.execute(sql2, [count['user'], count['side'], count['back'], count['front'], count['none'], now.strftime('%Y-%m-%d %H:%m:%S')])
            db_class.commit()
            print('Accuracy for 30s', json.dumps(count))
            count['back'], count['side'], count['front'], count['none'] = 0, 0, 0, 0
        print('count_len', count_len)

@app.route('/')
def home():
    return render_template('home.html')

# db 연동 test
@app.route('/db')
def select():
    db_class = mod_dbconn.Database()

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

    daemon = Thread(target=background_task, args=(user, rtsp), daemon=True, name="Face")
    daemon.start()
    return data



if __name__ == '__main__':
    app.run(debug=True, threaded=True)

from app import app