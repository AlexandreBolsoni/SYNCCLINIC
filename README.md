# SYNCCLINIC - Sistema de Agendamento Digital para Clínicas

SYNCCLINIC é um sistema digital de agendamento desenvolvido para modernizar a rotina de clínicas que ainda utilizam agendas físicas.
 Criado como parte do trabalho da disciplina **Back-end II**
no curso **Tecnologia em Sistemas para Internet (TSI)** no **Instituto Federal do Espírito Santo - IFES, Campus Santa Teresa**
 pelos alunos **Alexandre Hackbardt Bolsoni**, **Pedro Henrique Loriato**, e **Heitor Matias Côgo**
o projeto visa oferecer uma solução eficiente e acessível para gerenciar consultas e otimizar o atendimento.

## Índice

- [Descrição do Projeto]
- [Tecnologias Utilizadas]
- [Como Rodar o Projeto]
- [Estrutura do Projeto]
- [Contribuição]


## Descrição do Projeto

O **SYNCCLINIC** é uma solução digital para clínicas que substitui a tradicional agenda física.
 O sistema permite o gerenciamento de agendamentos, com funcionalidades para marcar,
 editar e visualizar consultas de forma prática. A proposta é otimizar o processo e reduzir erros,
 proporcionando uma melhor experiência tanto para clínicas quanto para pacientes.

## Tecnologias Utilizadas

- **Back-end:** Node.js, Express
- **Banco de Dados:** MySQL
- **Frontend:** React.js, Material-UI
- **Outras tecnologias:** JWT, Git

## Como Rodar o Projeto

### Requisitos

- Node.js (versão X.X.X)
- MySQL

### Passos

1. Clone o repositório:
   ```bash
   git clone https://github.com/AlexandreBolsoni/SYNCCLINIC.git
   ```

2. Navegue até a pasta do projeto:
   ```bash
   cd SYNCCLINIC
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Configure o banco de dados MySQL com as credenciais necessárias.

5. Inicie o servidor:
   ```bash
   npm start
   ```

6. Acesse o sistema no navegador:
   ```
   http://localhost:3000
   ```

## Estrutura do Projeto

O projeto é estruturado da seguinte forma:

```
/src
  /controllers  # Controladores para gerenciar a lógica do sistema
  /models       # Modelos de dados, como Agendamento, Paciente, etc.
  /routes       # Rotas para a API
  /views        # Páginas de interface de usuário
```

## Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork deste repositório.
2. Crie uma branch (`git checkout -b minha-nova-feature`).
3. Faça as modificações desejadas.
4. Envie um pull request.

