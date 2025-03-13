CREATE DATABASE  IF NOT EXISTS `sync_clinic` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `sync_clinic`;
-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: 127.0.0.1    Database: sync_clinic
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `admin` varchar(50) NOT NULL,
  `senha` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `login` (`admin`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'jorge','jorge123');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consultas`
--

DROP TABLE IF EXISTS `consultas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `consultas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_paciente_FK` int(11) NOT NULL,
  `motivo_consulta` varchar(100) NOT NULL,
  `data_consulta` date NOT NULL,
  `hora_consulta` time NOT NULL,
  `duracao_consulta` time NOT NULL,
  `medico_responsavel` varchar(50) NOT NULL,
  `especialidade_medico` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_paciente_FK_idx` (`id_paciente_FK`),
  CONSTRAINT `id_paciente_FK` FOREIGN KEY (`id_paciente_FK`) REFERENCES `pacientes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consultas`
--

LOCK TABLES `consultas` WRITE;
/*!40000 ALTER TABLE `consultas` DISABLE KEYS */;
INSERT INTO `consultas` VALUES (5,10,'sente muitas dores de cabeça repetidamente durante o dia, de acordo com a dora vai e volta','2025-06-18','09:00:00','01:00:00','Igor','Medico de Cerebro'),(6,11,'muito vomito.... É ressaca','2025-09-11','10:15:00','00:30:00','joaozinho','geral'),(7,12,'dores na coluna','2025-03-12','09:45:00','00:30:00','Pedrinho','colunista'),(8,10,'Rotina anual','2025-03-20','10:00:00','00:30:00','Dr. João Silva','Clínico Geral'),(9,10,'Dor de cabeça frequente','2025-03-22','14:30:00','00:30:00','Dra. Maria Souza','Neurologia'),(10,11,'Exame de sangue','2025-03-25','08:00:00','00:30:00','Dr. Carlos Mendes','Hematologia'),(11,11,'Consulta de retorno','2025-03-27','09:15:00','00:30:00','Dra. Ana Oliveira','Cardiologia'),(12,12,'Check-up geral','2025-03-30','11:00:00','00:30:00','Dr. Ricardo Lima','Clínico Geral'),(13,12,'Acompanhamento pós-cirúrgico','2025-04-02','16:00:00','00:30:00','Dra. Fernanda Rocha','Ortopedia'),(14,10,'Exame de rotina','2025-04-01','08:00:00','00:30:00','Dr. João Silva','Clínico Geral'),(15,10,'Dor de cabeça intensa','2025-04-05','10:30:00','00:30:00','Dra. Maria Souza','Neurologia'),(16,10,'Acompanhamento ortopédico','2025-04-10','14:00:00','00:30:00','Dr. Carlos Mendes','Ortopedia'),(17,10,'Consulta oftalmológica','2025-04-15','16:00:00','00:30:00','Dra. Ana Oliveira','Oftalmologia'),(18,10,'Análise laboratorial','2025-04-20','09:00:00','00:30:00','Dr. Rafael Lima','Patologia Clínica'),(19,11,'Consulta dermatológica','2025-04-03','11:00:00','00:30:00','Dra. Fernanda Rocha','Dermatologia'),(20,11,'Fisioterapia pós-fratura','2025-04-07','13:30:00','00:30:00','Dr. Felipe Torres','Fisioterapia'),(21,11,'Tratamento de ansiedade','2025-04-12','15:45:00','00:30:00','Dra. Carolina Alves','Psiquiatria'),(22,11,'Cardiologista - Check-up','2025-04-18','08:15:00','00:30:00','Dr. Gustavo Nunes','Cardiologia'),(23,11,'Nutricionista esportivo','2025-04-25','17:30:00','00:30:00','Dr. Bruno Siqueira','Nutrição'),(24,12,'Avaliação odontológica','2025-04-02','09:30:00','00:30:00','Dra. Vanessa Lima','Odontologia'),(25,12,'Problema respiratório','2025-04-06','14:00:00','00:30:00','Dr. Henrique Borges','Pneumologia'),(26,12,'Acompanhamento pós-cirurgia','2025-04-11','16:45:00','00:30:00','Dra. Marina Duarte','Cirurgia Geral'),(27,12,'Consulta ginecológica','2025-04-17','10:00:00','00:30:00','Dra. Juliana Castro','Ginecologia'),(28,12,'Tratamento de alergia','2025-04-22','08:45:00','00:30:00','Dr. Eduardo Mendes','Alergologia');
/*!40000 ALTER TABLE `consultas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pacientes`
--

DROP TABLE IF EXISTS `pacientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pacientes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `foto` varchar(150) DEFAULT NULL,
  `nome` varchar(45) NOT NULL,
  `sobrenome` varchar(45) NOT NULL,
  `CPF` char(14) NOT NULL,
  `telefone` char(15) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `CPF` (`CPF`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pacientes`
--

LOCK TABLES `pacientes` WRITE;
/*!40000 ALTER TABLE `pacientes` DISABLE KEYS */;
INSERT INTO `pacientes` VALUES (10,'1741830855605-pedro-avatar.jpg','Pedro Henrique','Loriato','111.222.333-44','(11) 22233-3444'),(11,'1741830922255-foto-perfil-alexandre.jpg','Alexandre','Hackbardt Bolsoni','145.190.967-58','(27) 99734-7503'),(12,'1741830971160-foto-perfil-heitor.jpg','Heitor','Matias Côgo','111.111.111-11','(22) 22222-2222');
/*!40000 ALTER TABLE `pacientes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-12 23:26:22
