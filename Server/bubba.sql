-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        10.5.11-MariaDB - mariadb.org binary distribution
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- bubba 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `bubba` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `bubba`;

-- 테이블 bubba.notice 구조 내보내기
CREATE TABLE IF NOT EXISTS `notice` (
  `notice_num` int(11) NOT NULL AUTO_INCREMENT,
  `notice_title` varchar(50) NOT NULL DEFAULT '',
  `notice_content` text NOT NULL,
  `createAt` datetime NOT NULL DEFAULT current_timestamp(),
  `writer` varchar(50) NOT NULL DEFAULT '',
  `views` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`notice_num`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- 테이블 데이터 bubba.notice:~2 rows (대략적) 내보내기
/*!40000 ALTER TABLE `notice` DISABLE KEYS */;
INSERT INTO `notice` (`notice_num`, `notice_title`, `notice_content`, `createAt`, `writer`, `views`) VALUES
	(1, 'test', 'test cntent', '0000-00-00 00:00:00', 'dong', 0),
	(2, 'test', 'test cntent', '0000-00-00 00:00:00', 'don', 0),
	(3, 'test', 'test cntent', '2022-03-30 14:03:50', 'don', 0);
/*!40000 ALTER TABLE `notice` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
