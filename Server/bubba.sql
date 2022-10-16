-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        8.0.29 - MySQL Community Server - GPL
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  12.0.0.6468
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- bubba 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `bubba` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `bubba`;

-- 테이블 bubba.accuracy 구조 내보내기
CREATE TABLE IF NOT EXISTS `accuracy` (
  `ac_num` int NOT NULL AUTO_INCREMENT,
  `user_num` int NOT NULL,
  `side` int NOT NULL DEFAULT '0',
  `back` int NOT NULL DEFAULT '0',
  `front` int NOT NULL DEFAULT '0',
  `none` int NOT NULL DEFAULT '0',
  `accur_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ac_num`),
  KEY `FK_user_num_ac` (`user_num`),
  CONSTRAINT `FK_user_num_ac` FOREIGN KEY (`user_num`) REFERENCES `user` (`user_num`)
) ENGINE=InnoDB AUTO_INCREMENT=319 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 프로시저 bubba.autoDel 구조 내보내기
DELIMITER //
CREATE PROCEDURE `autoDel`()
BEGIN
DELETE FROM facelog WHERE OccurTime < DATE_ADD(NOW(), INTERVAL -1 Day);
END//
DELIMITER ;

-- 이벤트 bubba.autoDelEvent 구조 내보내기
DELIMITER //
CREATE EVENT `autoDelEvent` ON SCHEDULE EVERY 1 MINUTE STARTS '2022-08-17 15:52:13' ON COMPLETION NOT PRESERVE ENABLE DO CALL autoDel()//
DELIMITER ;

-- 테이블 bubba.baby 구조 내보내기
CREATE TABLE IF NOT EXISTS `baby` (
  `baby_num` int NOT NULL AUTO_INCREMENT,
  `user_num` int NOT NULL,
  `baby_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `birth` date NOT NULL,
  `gender` tinyint(1) DEFAULT '0' COMMENT '0 = 남 , 1 = 여',
  `baby_picture` varchar(100) DEFAULT NULL COMMENT '사진 경로',
  PRIMARY KEY (`baby_num`),
  KEY `FK_user_num` (`user_num`),
  CONSTRAINT `FK_user_num` FOREIGN KEY (`user_num`) REFERENCES `user` (`user_num`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 bubba.calendar 구조 내보내기
CREATE TABLE IF NOT EXISTS `calendar` (
  `calendar_num` int NOT NULL AUTO_INCREMENT,
  `baby_num` int NOT NULL DEFAULT '0',
  `calendar_date` date NOT NULL,
  `calendar_title` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `calendar_content` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `calendar_picture` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`calendar_num`) USING BTREE,
  KEY `FK_baby_num2` (`baby_num`),
  CONSTRAINT `FK_baby_num2` FOREIGN KEY (`baby_num`) REFERENCES `baby` (`baby_num`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 bubba.facelog 구조 내보내기
CREATE TABLE IF NOT EXISTS `facelog` (
  `fl_num` int NOT NULL AUTO_INCREMENT,
  `user_num` int DEFAULT '0',
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `OccurTime` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`fl_num`) USING BTREE,
  KEY `FK__user` (`user_num`),
  CONSTRAINT `FK__user` FOREIGN KEY (`user_num`) REFERENCES `user` (`user_num`)
) ENGINE=InnoDB AUTO_INCREMENT=16388 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 bubba.gallery 구조 내보내기
CREATE TABLE IF NOT EXISTS `gallery` (
  `gal_num` int NOT NULL AUTO_INCREMENT,
  `baby_num` int NOT NULL,
  `gal_picture` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `gal_date` date DEFAULT NULL,
  `gal_title` varchar(50) DEFAULT NULL,
  `gal_content` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`gal_num`),
  KEY `FK_baby_num1` (`baby_num`),
  CONSTRAINT `FK_baby_num1` FOREIGN KEY (`baby_num`) REFERENCES `baby` (`baby_num`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 bubba.mfccinfo 구조 내보내기
CREATE TABLE IF NOT EXISTS `mfccinfo` (
  `mfcc_num` int NOT NULL AUTO_INCREMENT,
  `user_num` int NOT NULL,
  `mfcc_result` varchar(255) NOT NULL,
  `accur_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`mfcc_num`),
  KEY `FK user_num` (`user_num`),
  CONSTRAINT `FK user_num` FOREIGN KEY (`user_num`) REFERENCES `user` (`user_num`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 bubba.notice 구조 내보내기
CREATE TABLE IF NOT EXISTS `notice` (
  `notice_num` int NOT NULL AUTO_INCREMENT,
  `notice_title` varchar(50) NOT NULL DEFAULT '',
  `notice_content` text NOT NULL,
  `createAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `writer` varchar(50) NOT NULL DEFAULT '',
  `views` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`notice_num`)
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8mb3;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 bubba.push 구조 내보내기
CREATE TABLE IF NOT EXISTS `push` (
  `push_num` int NOT NULL AUTO_INCREMENT,
  `user_num` int NOT NULL DEFAULT '0',
  `push_title` varchar(50) DEFAULT NULL,
  `push_content` varchar(200) DEFAULT NULL,
  `createAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`push_num`),
  KEY `FK_user_num1` (`user_num`),
  CONSTRAINT `FK_user_num1` FOREIGN KEY (`user_num`) REFERENCES `user` (`user_num`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 bubba.sessions 구조 내보내기
CREATE TABLE IF NOT EXISTS `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 bubba.user 구조 내보내기
CREATE TABLE IF NOT EXISTS `user` (
  `user_num` int NOT NULL AUTO_INCREMENT,
  `platform` varchar(10) NOT NULL DEFAULT '0',
  `createAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `authority` tinyint(1) NOT NULL DEFAULT '0',
  `email` varchar(50) NOT NULL,
  `deviceToken` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `rtsp` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`user_num`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
