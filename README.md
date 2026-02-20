# 📋 API de Gerenciamento de Tarefas

> Desafio técnico desenvolvido para a **Baxtter Corporation** — Módulo 01  
> Entregue por: **Gabriel Pereira**  
> Data de entrega: **23 de Fevereiro de 2026**

---

## ✅ Sobre o Projeto

API REST para gerenciamento de tarefas construída com **NestJS** e **TypeScript**, seguindo os princípios de arquitetura modular, separação de responsabilidades e boas práticas recomendadas pelo framework.

O armazenamento é feito **em memória** (array), sem necessidade de banco de dados externo.

---

## 🚀 Tecnologias Utilizadas

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [class-validator](https://github.com/typestack/class-validator)
- [class-transformer](https://github.com/typestack/class-transformer)

---

## 📁 Estrutura do Projeto

```
src/
├── tasks/
│   ├── dto/
│   │   ├── create-task.dto.ts
│   │   └── update-task.dto.ts
│   ├── entities/
│   │   └── task.entity.ts
│   ├── use-cases/
│   │   ├── create-task.use-case.ts
│   │   ├── delete-task.use-case.ts
│   │   ├── update-task.use-case.ts
│   │   ├── find-task-by-id.use-case.ts
│   │   └── find-all-tasks.use-case.ts
│   ├── tasks.controller.ts
│   ├── task.repository.ts
│   └── tasks.module.ts
├── app.module.ts
└── main.ts
```

---

## ⚙️ Como Executar

### Pré-requisitos

- Node.js >= 18
- npm >= 9

### Instalação

```bash
# Clone o repositório
git clone https://github.com/gabriel3p/todo-api.git
cd tasks-api

# Instale as dependências
npm install
```

### Executar em modo de desenvolvimento

```bash
npm run start:dev
```

A API estará disponível em: `http://localhost:55555`

### Executar em modo de produção

```bash
npm run build
npm run start:prod
```

---

## 📌 Endpoints da API

### Criar Tarefa
```
POST /tasks
```
**Body:**
```json
{
  "title": "Minha tarefa",
  "description": "Descrição da tarefa",
  "completed": false
}
```

---

### Listar Todas as Tarefas
```
GET /tasks
```

---

### Buscar Tarefa por ID
```
GET /tasks/:id
```
> Retorna `404` se a tarefa não existir.

---

### Atualizar Tarefa
```
PATCH /tasks/:id
```
**Body (qualquer campo é opcional):**
```json
{
  "title": "Título atualizado",
  "description": "Descrição atualizada",
  "completed": true
}
```
> Retorna `404` se a tarefa não existir.

---

### Deletar Tarefa
```
DELETE /tasks/:id
```
> Retorna `204 No Content` em caso de sucesso.  
> Retorna `404` se a tarefa não existir.

---

## ✔️ Validações

| Campo         | Tipo      | Obrigatório | Regras                        |
|---------------|-----------|-------------|-------------------------------|
| `title`       | `string`  | Sim         | Mínimo de 3 caracteres        |
| `description` | `string`  | Sim         | —                             |
| `completed`   | `boolean` | Não         | Default: `false`              |


---

## 📄 Licença

Projeto desenvolvido exclusivamente para fins de avaliação técnica — Baxtter Corporation, 2026.