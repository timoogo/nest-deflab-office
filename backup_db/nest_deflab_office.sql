  -- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
  --
  -- Host: localhost    Database: nest_deflab_office
  -- ------------------------------------------------------
  -- Server version	8.0.33

  /*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
  /*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
  /*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
  /*!50503 SET NAMES utf8mb4 */;
  /*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
  /*!40103 SET TIME_ZONE='+00:00' */;
  /*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
  /*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
  /*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
  /*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

  --
  -- Table structure for table `events`
  --

  DROP TABLE IF EXISTS `events`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
  /*!50503 SET character_set_client = utf8mb4 */;
  CREATE TABLE `events` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL DEFAULT 'Event name',
    `description` varchar(255) NOT NULL DEFAULT 'Event description',
    `image` varchar(255) NOT NULL DEFAULT 'Event image',
    `location` varchar(255) NOT NULL DEFAULT 'Event location',
    `type` varchar(255) NOT NULL DEFAULT 'Event type',
    `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `duration` int NOT NULL DEFAULT '0',
    `status` varchar(255) NOT NULL DEFAULT 'Event status',
    `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `organizerId` int DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `FK_1024d476207981d1c72232cf3ca` (`organizerId`),
    CONSTRAINT `FK_1024d476207981d1c72232cf3ca` FOREIGN KEY (`organizerId`) REFERENCES `organizations` (`id`)
  ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
  /*!40101 SET character_set_client = @saved_cs_client */;

  --
  -- Dumping data for table `events`
  --

  LOCK TABLES `events` WRITE;
  /*!40000 ALTER TABLE `events` DISABLE KEYS */;
  INSERT INTO `events` VALUES (1,'Nom de l\'event','Description de l\'événement','URL de l\'image de l\'événement','Lieu de l\'événement','Event type','2023-07-01 00:00:00',120,'En cours','2023-07-28 11:22:21','2023-07-28 11:22:21',NULL);
  /*!40000 ALTER TABLE `events` ENABLE KEYS */;
  UNLOCK TABLES;

  --
  -- Table structure for table `events_participants_users`
  --

  DROP TABLE IF EXISTS `events_participants_users`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
  /*!50503 SET character_set_client = utf8mb4 */;
  CREATE TABLE `events_participants_users` (
    `eventsId` int NOT NULL,
    `usersId` int NOT NULL,
    PRIMARY KEY (`eventsId`,`usersId`),
    KEY `IDX_91d8a5fc8ba42dfd02524e8d22` (`eventsId`),
    KEY `IDX_462a9b27e00f6d4d2c4b8bdba6` (`usersId`),
    CONSTRAINT `FK_462a9b27e00f6d4d2c4b8bdba6e` FOREIGN KEY (`usersId`) REFERENCES `users` (`id`),
    CONSTRAINT `FK_91d8a5fc8ba42dfd02524e8d221` FOREIGN KEY (`eventsId`) REFERENCES `events` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
  /*!40101 SET character_set_client = @saved_cs_client */;

  --
  -- Dumping data for table `events_participants_users`
  --

  LOCK TABLES `events_participants_users` WRITE;
  /*!40000 ALTER TABLE `events_participants_users` DISABLE KEYS */;
  INSERT INTO `events_participants_users` VALUES (1,1);
  /*!40000 ALTER TABLE `events_participants_users` ENABLE KEYS */;
  UNLOCK TABLES;

  --
  -- Table structure for table `events_tags_tag`
  --

  DROP TABLE IF EXISTS `events_tags_tag`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
  /*!50503 SET character_set_client = utf8mb4 */;
  CREATE TABLE `events_tags_tag` (
    `eventsId` int NOT NULL,
    `tagId` int NOT NULL,
    PRIMARY KEY (`eventsId`,`tagId`),
    KEY `IDX_accaf7cc0d1aa1e3593b7dedb5` (`eventsId`),
    KEY `IDX_2e77e7179f37ae5cf562467d23` (`tagId`),
    CONSTRAINT `FK_2e77e7179f37ae5cf562467d23a` FOREIGN KEY (`tagId`) REFERENCES `tag` (`id`),
    CONSTRAINT `FK_accaf7cc0d1aa1e3593b7dedb55` FOREIGN KEY (`eventsId`) REFERENCES `events` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
  /*!40101 SET character_set_client = @saved_cs_client */;

  --
  -- Dumping data for table `events_tags_tag`
  --

  LOCK TABLES `events_tags_tag` WRITE;
  /*!40000 ALTER TABLE `events_tags_tag` DISABLE KEYS */;
  /*!40000 ALTER TABLE `events_tags_tag` ENABLE KEYS */;
  UNLOCK TABLES;

  --
  -- Table structure for table `organizations`
  --

  DROP TABLE IF EXISTS `organizations`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
  /*!50503 SET character_set_client = utf8mb4 */;
  CREATE TABLE `organizations` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    `phone` varchar(255) NOT NULL,
    `description` varchar(255) NOT NULL,
    `image` varchar(255) NOT NULL,
    `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `userRepresentativeId` int DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `IDX_9b7ca6d30b94fef571cff87688` (`name`),
    UNIQUE KEY `IDX_4ad920935f4d4eb73fc58b40f7` (`email`),
    UNIQUE KEY `IDX_9ca925d77299102a8bc433676f` (`phone`),
    KEY `FK_61620c26d86aa8563ac2b1214f3` (`userRepresentativeId`),
    CONSTRAINT `FK_61620c26d86aa8563ac2b1214f3` FOREIGN KEY (`userRepresentativeId`) REFERENCES `users` (`id`)
  ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
  /*!40101 SET character_set_client = @saved_cs_client */;

  --
  -- Dumping data for table `organizations`
  --

  LOCK TABLES `organizations` WRITE;
  /*!40000 ALTER TABLE `organizations` DISABLE KEYS */;
  INSERT INTO `organizations` VALUES (1,'Nom de l\'organisation','organisation@example.com','0601020304','Description de l\'organisation','URL de l\'image de l\'organisation','2023-07-29 17:50:01','2023-07-29 17:50:01',1);
  /*!40000 ALTER TABLE `organizations` ENABLE KEYS */;
  UNLOCK TABLES;

  --
  -- Table structure for table `tag`
  --

  DROP TABLE IF EXISTS `tag`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
  /*!50503 SET character_set_client = utf8mb4 */;
  CREATE TABLE `tag` (
    `id` int NOT NULL AUTO_INCREMENT,
    `tagType` varchar(255) NOT NULL DEFAULT 'unset',
    `tagCategory` varchar(255) NOT NULL DEFAULT 'unset',
    `tagColor` varchar(255) DEFAULT NULL,
    `tagName` varchar(255) NOT NULL DEFAULT 'unset',
    PRIMARY KEY (`id`)
  ) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
  /*!40101 SET character_set_client = @saved_cs_client */;

  --
  -- Dumping data for table `tag`
  --

  LOCK TABLES `tag` WRITE;
  /*!40000 ALTER TABLE `tag` DISABLE KEYS */;
  INSERT INTO `tag` VALUES (18,'offline','GENERAL','#DD234B','Tag 1'),(19,'offline','GENERAL','#235067','Maraude');
  /*!40000 ALTER TABLE `tag` ENABLE KEYS */;
  UNLOCK TABLES;

  --
  -- Table structure for table `users`
  --

  DROP TABLE IF EXISTS `users`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
  /*!50503 SET character_set_client = utf8mb4 */;
  CREATE TABLE `users` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL DEFAULT 'user',
    `email` varchar(255) NOT NULL DEFAULT 'user@user.fr',
    `phone` varchar(255) NOT NULL DEFAULT '0606060606',
    `password` varchar(255) NOT NULL DEFAULT 'user',
    `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `isAdmin` tinyint NOT NULL DEFAULT '0',
    PRIMARY KEY (`id`),
    UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`),
    UNIQUE KEY `IDX_a000cca60bcf04454e72769949` (`phone`)
  ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
  /*!40101 SET character_set_client = @saved_cs_client */;

  --
  -- Dumping data for table `users`
  --

  LOCK TABLES `users` WRITE;
  /*!40000 ALTER TABLE `users` DISABLE KEYS */;
  INSERT INTO `users` VALUES (1,'Timothée Gaultier','timogo@gmail.com','+33658842360','admin','2023-07-25 23:25:39',1);
  /*!40000 ALTER TABLE `users` ENABLE KEYS */;
  UNLOCK TABLES;
  /*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

  /*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
  /*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
  /*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
  /*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
  /*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
  /*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
  /*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

  -- Dump completed on 2023-08-05 19:26:10
