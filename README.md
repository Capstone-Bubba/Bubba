[2022 캡스톤 졸업작품 BUBBA]
=================
## 제목 : 장애인을 위한 영유아 보육 시스템

### 제작에 사용된 기술
> Front-End : HTML, CSS, JavaScript, React, TypeScript

> Back-End : Node.js, MySQL, Flask

> APP : Android Studio

> AI : ResNet50(MFCC), Yolov5

## 제작 계획(노션)
- [Bubba 메인](https://remarkable-aster-023.notion.site/BUBBA-69dc98909c4c49e0b5e59e8d441ab718)
- [Bubba 서류 작성진행, 완료](https://remarkable-aster-023.notion.site/19bb0fae87d44260bbe09c7135cc9536?v=e36a73c88dc34159b02693be6b0daf6d)
- [Bubba 간트차트](https://remarkable-aster-023.notion.site/abd0abc78a9b4c3a9b16d2660ff188ba)
- [Bubba 회의록](https://remarkable-aster-023.notion.site/6525eedefef640c68f42b3cd74c8f28b)

### 개발자

<p>
    <ul>
        <li>Front-End</li>
        <ul>
            <li>백찬영</li>
        </ul>
    </ul>
    <ul>
        <li>Back-End</li>
        <ul>
            <li>이지원</li>
            <li>오동협</li>
        </ul>
    </ul>
    <ul>
        <li>App</li>
        <ul>
            <li>고준혁</li>
        </ul>
    </ul>
    <ul>
        <li>AI</li>
        <ul>
            <li>박정현</li>
            <li>고준혁</li>
        </ul>
    </ul>
</p>


## Contribution rate (ing)

|      학번 / 이름       | Front-End | Back-End | APP | AI
|:---------------------:|:---:|:---:|:-----:|:-------------------:|
| <b>20161467 고준혁</b> |  -  |  -  |   O   |          O          |
| <b>20161503 오동협</b> |  -  |  O  |   -   |          -          |
| <b>20161514 이지원</b> |  -  |  O  |   -   |          -          |
| <b>20161492 박정현</b> |  -  |  -  |   -   |          O          |
| <b>20171177 백찬영</b> |  O  |  -  |   -   |          -          |
<br>

## 변경사항 

#### 2022.05.29
- RTSP 통신 완료 (React-Node)
- TestMessage

#### 2022.08.17
- 프로시저
DELIMITER $$
CREATE PROCEDURE autoDel()
BEGIN
DELETE FROM facelog WHERE OccurTime < DATE_ADD(NOW(), INTERVAL -1 Day);
END $$
DELIMITER ;

- 이벤트
CREATE EVENT autoDelEvent
ON SCHEDULE    
 EVERY 1 MINUTE
 STARTS NOW()  
 DO    
 CALL autoDel();

#### 2022.10.17 웹, AI, 알림 연동 완료 (FCM-Node)
- pt 파일이 자꾸 안올라가서 그냥 Git main에 올려놓겠습니다.

#### 2022.10.26 ~ 10.27 캡스톤 디자인 종료
- [Bubba 시연 영상](https://www.youtube.com/watch?v=Q10lJ1bpXZ8&t=26s)
- [Bubba 수상 내용](https://aisw.hoseo.ac.kr/board/notice/view?idx=324)

#### 마지막 변경 사항 (2022.10.25)
* 실시간 음성 전송 -> 클릭 시 음성 분석
* rtsp 외부/내부 -> 내부에서만
* flask에서 ai 분석 영상 -> 주석처리
* 체온 측정 모듈 정확도 현저히 낮아 사용 x (랜덤 값 출력)

## 구성 요소
- Raspberry Pi 
- HQ Camera
- usb Mic

#### 제작 기간 : `2022.03.02 ~ 2022.10.24`
