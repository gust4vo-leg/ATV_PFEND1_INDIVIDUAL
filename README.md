# ATV_PFEND1_INDIVIDUAL

# CronSport — Portal de Notícias Esportivas

O **CronSport** é um portal de notícias esportivas desenvolvido como projeto acadêmico do SENAI. O sistema permite visualizar notícias de diferentes modalidades esportivas e conta com uma área administrativa para gerenciar as publicações.

## 🚀 Funcionalidades

- Visualização de notícias esportivas.
- Organização de notícias por categoria.
- Cadastro de notícias.
- Edição de notícias existentes.
- Exclusão de notícias.
- Integração entre frontend, backend e banco de dados.

## 🛠️ Tecnologias utilizadas

**Frontend**

- Next.js
- React
- CSS

**Backend**

- Node.js
- Express
- API REST
- CORS

**Banco de dados**

- MySQL

**Ferramentas**

- Visual Studio Code
- Docker
- MySQL Workbench
- Git e GitHub

## 📁 Estrutura do projeto

```text
cronsport/
├── frontend/
│   ├── public/
│   ├── src/
│   │    ├── app/
│   │   └── components/
│   ├── .gitignore
│   ├── jsconfig.json
│   ├── next.config.mjs
│   ├── package-lock.json
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── migrations/
│   ├── routes/
│   ├── uploads/
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── app.js
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
│
└── README.md
```

_Observação: a estrutura acima é ilustrativa e pode variar conforme a organização real dos arquivos._

## ⚙️ Pré-requisitos

Para executar o projeto, é necessário ter instalado:

- [Node.js](https://nodejs.org/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (caso utilize o banco em container)
- [Visual Studio Code](https://code.visualstudio.com/)

Também é necessário configurar o banco de dados MySQL utilizado pela aplicação.

## ▶️ Como executar o projeto

### 1. Clonar o repositório

```bash
git clone URL_DO_REPOSITORIO
cd cronsport
```

Substitua `URL_DO_REPOSITORIO` pelo endereço do repositório Git.

### 2. Configurar o banco de dados

Crie ou utilize o banco de dados `cronsports` no MySQL e verifique se a tabela `noticias` está criada com os campos necessários.

A tabela utilizada pelo projeto contém:

| Campo             | Descrição                |
| ----------------- | ------------------------ |
| `idNoticias`      | Identificador da notícia |
| `titulo`          | Título da notícia        |
| `categoria`       | Categoria esportiva      |
| `descricao`       | Resumo da notícia        |
| `conteudo`        | Conteúdo completo        |
| `data_publicacao` | Data de publicação       |
| `imagem`          | URL da imagem            |

### 3. Iniciar o backend

Abra um terminal na pasta do backend:

```bash
cd backend
npm install
```

Configure as variáveis de ambiente utilizadas pela conexão com o banco de dados, conforme os nomes esperados pelo código.

Exemplo ilustrativo:

```env
PORT=3005
DB_HOST=localhost
DB_PORT=3307
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=cronsports
```

Ajuste as credenciais e a porta de acordo com seu ambiente. Não compartilhe suas senhas nem envie o arquivo `.env` ao repositório.

Inicie o servidor:

```bash
npm start
```

O backend utiliza a porta `3005` no ambiente de desenvolvimento do projeto.

### 4. Iniciar o frontend

Abra outro terminal:

```bash
cd frontend
npm install
npm run dev
```

Acesse no navegador:

http://localhost:3000

## 🔌 API

O frontend utiliza a API desenvolvida em Node.js e Express para buscar e gerenciar as notícias.

**Rota de listagem:**

```http
GET http://localhost:3005/api/noticias
```

As demais rotas disponíveis podem ser consultadas nos arquivos de rotas do backend.

## 🖼️ Imagens

As imagens das notícias são armazenadas no banco de dados como URLs. Para que sejam exibidas corretamente, cada endereço deve ser válido e acessível.

## 🧪 Testes

Foram verificados os principais fluxos da aplicação:

- Carregamento das notícias na página pública.
- Exibição das imagens e informações.
- Cadastro de notícias.
- Edição de publicações.
- Exclusão de notícias.
- Comunicação entre frontend, backend e banco de dados.

## 🎯 Objetivo do projeto

Desenvolver uma aplicação web de notícias esportivas, utilizando tecnologias modernas para integrar uma interface de usuário, uma API e um banco de dados relacional.

## 👨‍💻 Informações acadêmicas

**Projeto:** CronSport — Portal de Notícias Esportivas  
**Instituição:** SENAI  
**Finalidade:** Projeto acadêmico de desenvolvimento web.

## 👥 Autores

Projeto desenvolvido por:

**Gustavo Emanuel Simão Barboza**
**Ano**: 2026
---

Desenvolvido para o projeto CronSport.
