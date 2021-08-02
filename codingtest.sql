-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.7.34-log - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for codingtest
CREATE DATABASE IF NOT EXISTS `codingtest` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `codingtest`;

-- Dumping structure for procedure codingtest.sp_createuser
DELIMITER //
CREATE PROCEDURE `sp_createuser`(
	IN `level_id` INT,
	IN `name` VARCHAR(50),
	IN `email` VARCHAR(50),
	IN `mobile` VARCHAR(50),
	IN `created_on` DATETIME,
	IN `created_by` VARCHAR(50),
	IN `modified_on` DATETIME,
	IN `modified_by` VARCHAR(50),
	IN `password` LONGTEXT
)
BEGIN
INSERT INTO users (level_id,NAME,email,mobile,created_on,created_by,modified_on,modified_by,password) VALUES (level_id,NAME,email,mobile,created_on,created_by,modified_on,modified_by,password);
END//
DELIMITER ;

-- Dumping structure for procedure codingtest.sp_get_particular_user_details
DELIMITER //
CREATE PROCEDURE `sp_get_particular_user_details`(
	IN `email` VARCHAR(50)
)
BEGIN
SELECT * FROM users u WHERE u.email=email;
END//
DELIMITER ;

-- Dumping structure for procedure codingtest.sp_search_email
DELIMITER //
CREATE PROCEDURE `sp_search_email`(
	IN `email` VARCHAR(50)
)
BEGIN
SELECT * FROM users U WHERE U.email=email; 
END//
DELIMITER ;

-- Dumping structure for table codingtest.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `level_id` int(11) DEFAULT NULL,
  `name` varchar(50) NOT NULL DEFAULT '',
  `email` varchar(50) NOT NULL DEFAULT '',
  `mobile` varchar(50) NOT NULL DEFAULT '0',
  `created_on` datetime DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  `modified_by` varchar(50) DEFAULT NULL,
  `password` longtext NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
