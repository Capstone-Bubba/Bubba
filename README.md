[2022 캡스톤 졸업작품 BUBBA]
=================
## 장애인을 위한 아기 보육 시스템

### 제작에 사용된 기술
> Front-End : HTML, CSS, JavaScript, React, TypeScript

> Back-End : Node.js, MySQL

> APP : Android Studio

> AI : ???

## 제작 계획


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

#### 제작 기간 : `2022.03.02 ~

#### 2022.08.17 변경사항
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

#### 2022.05.29 진행 사항
- RTSP 통신 완료 (React-Node)
- TestMessage

#### 2022.10.17 웹, AI, 알림 연동 완료
- pt 파일이 자꾸 안올라가서 그냥 Git main에 올려놓겠습니다.