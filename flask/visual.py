from msilib.schema import Error
import cv2
import torch

model = torch.hub.load('ultralytics/yolov5', 'custom', path='./app/static/best.pt')
import time
# cv2 camera 캡쳐 할 도메인
rtsp = "rtsp://admin:vlsi2141@192.168.0.7:554/Streaming/Channels/101"


# FaceLog로 사용할 count dictinoary
count = {'back':0, 'side':0, 'front':0, 'none':0}
cam = cv2.VideoCapture(rtsp)
while cam.isOpened():
    status, img = cam.read()
    if not status: continue
    result = model(img)
    name = result.pandas().xyxy[0]['name']
    xmin = result.pandas().xyxy[0]['xmin']
    ymin = result.pandas().xyxy[0]['ymin']
    xmax = result.pandas().xyxy[0]['xmax']
    ymax = result.pandas().xyxy[0]['ymax']
    try:
        xmin = int(xmin)
        ymin = int(ymin)
        xmax = int(xmax)
        ymax = int(ymax)
        cv2.rectangle(img,(xmin,ymin),(xmax,ymax),(255,255,0),3)
        cv2.putText(img,str(name[0]),(xmin,ymin),cv2.FONT_HERSHEY_SIMPLEX,2,(255,255,0),2,cv2.LINE_AA)
    except:
        pass
    cv2.imshow("test", img)
    cv2.waitKey(1)
    
