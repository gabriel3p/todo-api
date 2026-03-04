# 📋 API de Gerenciamento de Tarefas

> Desafio técnico desenvolvido para a **Baxtter Corporation** — Módulo 02  
> Entregue por: **Gabriel Pereira**  
> Data de entrega: **5 de Março de 2026**

---

## ✅ Sobre o Projeto

API REST para gerenciamento de tarefas construída com **NestJS** e **TypeScript**, seguindo os princípios de arquitetura modular, separação de responsabilidades e boas práticas recomendadas pelo framework.

A persistência é feita em banco de dados **PostgreSQL** através do **Prisma ORM**, com três entidades principais: `User`, `TaskType` e `Task`.

---

## 🚀 Tecnologias Utilizadas

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma ORM](https://www.prisma.io/)
- [class-validator](https://github.com/typestack/class-validator)
- [class-transformer](https://github.com/typestack/class-transformer)

---

## 📁 Estrutura do Projeto

```
src/
├── prisma/
│   └── prisma.service.ts
├── users/
│   ├── dto/
│   │   └── create-user.dto.ts
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── users.module.ts
├── task-types/
│   ├── dto/
│   │   └── create-task-type.dto.ts
│   ├── task-types.controller.ts
│   ├── task-types.service.ts
│   └── task-types.module.ts
├── tasks/
│   ├── dto/
│   │   ├── create-task.dto.ts
│   │   └── update-task.dto.ts
│   ├── tasks.controller.ts
│   ├── tasks.service.ts
│   └── tasks.module.ts
├── app.module.ts
└── main.ts
prisma/
├── schema.prisma
└── migrations/
```

---

## ⚙️ Como Executar

### Pré-requisitos

- Node.js >= 18
- npm >= 9
- PostgreSQL em execução

### Instalação

```bash
# Clone o repositório
git clone https://github.com/gabriel3p/todo-api.git
cd tasks-api

# Instale as dependências
npm install
```

### Variáveis de Ambiente

Copie o arquivo de exemplo e preencha com suas credenciais:

```bash
cp .env.example .env
```

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/tasks_db"
```

### Migrations

```bash
# Rodar as migrations e gerar o Prisma Client
npx prisma migrate dev

# Ou em produção
npx prisma migrate deploy
```

### Executar em modo de desenvolvimento

```bash
npm run start:dev
```

A API estará disponível em: `http://localhost:3000`

### Executar em modo de produção

```bash
npm run build
npm run start:prod
```

---

## 📌 Endpoints da API

### Usuários

#### Criar Usuário
```
POST /users
```
**Body:**
```json
{
  "name": "Gabriel Pereira",
  "email": "gabriel@email.com"
}
```

#### Listar Usuários
```
GET /users
```

---

### Tipos de Tarefa

#### Criar Tipo de Tarefa
```
POST /task-types
```
**Body:**
```json
{
  "name": "Bug",
  "description": "Correção de erros no sistema"
}
```

#### Listar Tipos de Tarefa
```
GET /task-types
```

---

### Tarefas

#### Criar Tarefa
```
POST /tasks
```
**Body:**
```json
{
  "title": "Corrigir erro no login",
  "description": "Usuários não conseguem autenticar via SSO",
  "userId": 1,
  "taskTypeId": 2
}
```

#### Listar Todas as Tarefas
```
GET /tasks
```
> Retorna os dados do `User` e do `TaskType` relacionados a cada tarefa.

#### Buscar Tarefa por ID
```
GET /tasks/:id
```
> Retorna `404` se a tarefa não existir. Inclui os relacionamentos.

#### Atualizar Tarefa
```
PATCH /tasks/:id
```
**Body (qualquer campo é opcional):**
```json
{
  "title": "Título atualizado",
  "description": "Descrição atualizada",
  "completed": true,
  "userId": 2,
  "taskTypeId": 3
}
```
> Se `userId` ou `taskTypeId` forem alterados, a existência de ambos é validada.  
> Retorna `404` se a tarefa não existir.

#### Deletar Tarefa
```
DELETE /tasks/:id
```
> Retorna `204 No Content` em caso de sucesso.  
> Retorna `404` se a tarefa não existir.

---

## ✔️ Validações

### User

| Campo   | Tipo     | Obrigatório | Regras  |
|---------|----------|-------------|---------|
| `name`  | `string` | Sim         | —       |
| `email` | `string` | Sim         | Único   |

### TaskType

| Campo         | Tipo     | Obrigatório | Regras  |
|---------------|----------|-------------|---------|
| `name`        | `string` | Sim         | Único   |
| `description` | `string` | Não         | —       |

### Task

| Campo         | Tipo      | Obrigatório | Regras                 |
|---------------|-----------|-------------|------------------------|
| `title`       | `string`  | Sim         | Mínimo de 3 caracteres |
| `description` | `string`  | Não         | —                      |
| `completed`   | `boolean` | Não         | Default: `false`       |
| `userId`      | `number`  | Sim         | Inteiro positivo e existente |
| `taskTypeId`  | `number`  | Sim         | Inteiro positivo e existente |

---

## 📄 Licença

Projeto desenvolvido exclusivamente para fins de avaliação técnica — Baxtter Corporation, 2026.