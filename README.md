# create-webfs
![Visitors](https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fgithub.com%2FIndranjanaChatterjee%2Fcreate-webfs&countColor=%23dce775)
![Contributors](https://img.shields.io/github/contributors/IndranjanaChatterjee/create-webfs?style=for-the-badge)
[![npm version](https://img.shields.io/npm/v/create-webfs.svg)](https://npmjs.com/package/create-webfs) [![Downloads](https://img.shields.io/npm/dm/create-webfs.svg)](https://npmjs.com/package/create-webfs)

create-webfs is an NPX-powered CLI tool that scaffolds a battle-tested fullstack template. It generates a React+Vite frontend (TypeScript, SWC, TailwindCSS) and a Node.js + Express backend (TypeScript or JavaScript), complete with environment modes (local, test, prod), clean architecture (routes/, models/, controllers/), and ORM support for MongoDB, MySQL, and PostgreSQL.

---

## 🛠️ Features

- **Frontend**: React + Vite with TypeScript & SWC, styled with TailwindCSS
- **Backend**: Node.js + Express, pick TypeScript or JavaScript
- **Env Modes**: `local`, `test`, `prod` via dotenv and `.env.{mode}` files
- **Clean Architecture**: Pre‑created `routes/`, `models/`, `controllers/`
- **ORM Setup**: Ready‑to‑go support for MongoDB (Mongoose), MySQL & PostgreSQL (Sequelize)
- **Zero Config**: No global installs — just `npx create-webfs` and go!

---

## 🚀 Installation

Install via npx (always uses the latest version):

```bash
npx create-webfs@latest <project-name>
```

Or scaffold in the current directory:

```bash
npx create-webfs@latest .
```

Follow the prompt to select your preferred backend flavor (TypeScript or JavaScript). 🎉

---

## 📝 Usage

1. **Navigate** into your project:
   ```bash
   cd <project-name>
   ```

2. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev       # Starts Vite dev server on http://localhost:5173
   ```

3. **Backend**:
   ```bash
   cd backend
   npm install
   Configure your database connection string in the .env files (e.g., .env.local)'
   Update the provider in `prisma/schema.prisma` (e.g., "postgresql", "mysql", "mongodb")
   npx prisma db push    #(for initial sync/prototyping) or `npx prisma migrate dev` (recommended for development)
   npm run start:local   # Loads env.local, runs on PORT defined there
   npm run start:test    # Loads env.test
   npm run start:prod    # Loads env.prod
   ```

---

## 📂 Project Structure

```
<project-name>/
├── frontend/          # React + Vite + TailwindCSS
│   ├── index.html     # HTML entrypoint
│   ├── vite.config.ts
│   └── src/           # Your React code
│       ├── main.tsx
│       └── App.tsx
│
└── backend/           # Node.js + Express
    ├── env.local      # Local environment variables
    ├── env.test       # Test environment variables
    ├── env.prod       # Production environment variables
    ├── index.ts/js    # Express server entrypoint
    ├── package.json
    ├── routes/        # Define your routes here
    ├── models/        # Data models & schemas
    ├── controllers/   # Route handlers & business logic
    └── common/        # ORM setup for MongoDB, MySQL, PostgreSQL
```

---

## ❤️ Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/awesome`)
3. Commit your changes (`git commit -m "feat: add awesome feature"`)
4. Push to the branch (`git push origin feature/awesome`)
5. Open a Pull Request

We welcome all contributions — big or small! 🙌

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by the community. Happy coding! 🌟

