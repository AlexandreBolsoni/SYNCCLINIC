-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 13/03/2025 às 03:03
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `sync_clinic`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `admin` varchar(50) NOT NULL,
  `senha` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `admin`
--

INSERT INTO `admin` (`id`, `admin`, `senha`) VALUES
(1, 'jorge', 'jorge123');

-- --------------------------------------------------------

--
-- Estrutura para tabela `consultas`
--

CREATE TABLE `consultas` (
  `id` int(11) NOT NULL,
  `id_paciente_FK` int(11) NOT NULL,
  `motivo_consulta` varchar(100) NOT NULL,
  `data_consulta` date NOT NULL,
  `hora_consulta` time NOT NULL,
  `duracao_consulta` time NOT NULL,
  `medico_responsavel` varchar(50) NOT NULL,
  `especialidade_medico` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `consultas`
--

INSERT INTO `consultas` (`id`, `id_paciente_FK`, `motivo_consulta`, `data_consulta`, `hora_consulta`, `duracao_consulta`, `medico_responsavel`, `especialidade_medico`) VALUES
(5, 10, 'sente muitas dores de cabeça repetidamente durante o dia, de acordo com a dora vai e volta', '2025-06-18', '09:00:00', '01:00:00', 'Igor', 'Medico de Cerebro'),
(6, 11, 'muito vomito.... É ressaca', '2025-09-11', '10:15:00', '00:30:00', 'joaozinho', 'geral'),
(7, 12, 'dores na coluna', '2025-03-12', '09:45:00', '00:30:00', 'Pedrinho', 'colunista'),
(8, 10, 'Rotina anual', '2025-03-20', '10:00:00', '00:30:00', 'Dr. João Silva', 'Clínico Geral'),
(9, 10, 'Dor de cabeça frequente', '2025-03-22', '14:30:00', '00:30:00', 'Dra. Maria Souza', 'Neurologia'),
(10, 11, 'Exame de sangue', '2025-03-25', '08:00:00', '00:30:00', 'Dr. Carlos Mendes', 'Hematologia'),
(11, 11, 'Consulta de retorno', '2025-03-27', '09:15:00', '00:30:00', 'Dra. Ana Oliveira', 'Cardiologia'),
(12, 12, 'Check-up geral', '2025-03-30', '11:00:00', '00:30:00', 'Dr. Ricardo Lima', 'Clínico Geral'),
(13, 12, 'Acompanhamento pós-cirúrgico', '2025-04-02', '16:00:00', '00:30:00', 'Dra. Fernanda Rocha', 'Ortopedia'),
(14, 10, 'Exame de rotina', '2025-04-01', '08:00:00', '00:30:00', 'Dr. João Silva', 'Clínico Geral'),
(15, 10, 'Dor de cabeça intensa', '2025-04-05', '10:30:00', '00:30:00', 'Dra. Maria Souza', 'Neurologia'),
(16, 10, 'Acompanhamento ortopédico', '2025-04-10', '14:00:00', '00:30:00', 'Dr. Carlos Mendes', 'Ortopedia'),
(17, 10, 'Consulta oftalmológica', '2025-04-15', '16:00:00', '00:30:00', 'Dra. Ana Oliveira', 'Oftalmologia'),
(18, 10, 'Análise laboratorial', '2025-04-20', '09:00:00', '00:30:00', 'Dr. Rafael Lima', 'Patologia Clínica'),
(19, 11, 'Consulta dermatológica', '2025-04-03', '11:00:00', '00:30:00', 'Dra. Fernanda Rocha', 'Dermatologia'),
(20, 11, 'Fisioterapia pós-fratura', '2025-04-07', '13:30:00', '00:30:00', 'Dr. Felipe Torres', 'Fisioterapia'),
(21, 11, 'Tratamento de ansiedade', '2025-04-12', '15:45:00', '00:30:00', 'Dra. Carolina Alves', 'Psiquiatria'),
(22, 11, 'Cardiologista - Check-up', '2025-04-18', '08:15:00', '00:30:00', 'Dr. Gustavo Nunes', 'Cardiologia'),
(23, 11, 'Nutricionista esportivo', '2025-04-25', '17:30:00', '00:30:00', 'Dr. Bruno Siqueira', 'Nutrição'),
(24, 12, 'Avaliação odontológica', '2025-04-02', '09:30:00', '00:30:00', 'Dra. Vanessa Lima', 'Odontologia'),
(25, 12, 'Problema respiratório', '2025-04-06', '14:00:00', '00:30:00', 'Dr. Henrique Borges', 'Pneumologia'),
(26, 12, 'Acompanhamento pós-cirurgia', '2025-04-11', '16:45:00', '00:30:00', 'Dra. Marina Duarte', 'Cirurgia Geral'),
(27, 12, 'Consulta ginecológica', '2025-04-17', '10:00:00', '00:30:00', 'Dra. Juliana Castro', 'Ginecologia'),
(28, 12, 'Tratamento de alergia', '2025-04-22', '08:45:00', '00:30:00', 'Dr. Eduardo Mendes', 'Alergologia');

-- --------------------------------------------------------

--
-- Estrutura para tabela `pacientes`
--

CREATE TABLE `pacientes` (
  `id` int(11) NOT NULL,
  `foto` varchar(150) DEFAULT NULL,
  `nome` varchar(45) NOT NULL,
  `sobrenome` varchar(45) NOT NULL,
  `CPF` char(14) NOT NULL,
  `telefone` char(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `pacientes`
--

INSERT INTO `pacientes` (`id`, `foto`, `nome`, `sobrenome`, `CPF`, `telefone`) VALUES
(10, '1741830855605-pedro-avatar.jpg', 'Pedro', 'Loriatto', '111.222.333-44', '(11) 22233-3444'),
(11, '1741830922255-foto-perfil-alexandre.jpg', 'Alexandre', ' Hackbardt Bolsoni', '145.190.967-58', '(27) 99734-7503'),
(12, '1741830971160-foto-perfil-heitor.jpg', 'heitor', 'mathias', '111.111.111-11', '(22) 22222-2222');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `login` (`admin`);

--
-- Índices de tabela `consultas`
--
ALTER TABLE `consultas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_paciente_FK_idx` (`id_paciente_FK`);

--
-- Índices de tabela `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `CPF` (`CPF`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `consultas`
--
ALTER TABLE `consultas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de tabela `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `consultas`
--
ALTER TABLE `consultas`
  ADD CONSTRAINT `id_paciente_FK` FOREIGN KEY (`id_paciente_FK`) REFERENCES `pacientes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
