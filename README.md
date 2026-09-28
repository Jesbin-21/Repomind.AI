# 🧠 RepoMind.AI

> **AI-powered code repository analyzer** — Upload any project and get instant, intelligent insights powered by Google Gemini.

---

## 📌 Overview

RepoMind.AI lets developers upload an entire codebase and receive a comprehensive AI-generated analysis. It reads your source files, filters out binaries and irrelevant assets, and sends the meaningful code to Google Gemini for deep analysis — surfacing architecture overviews, potential issues, tech stack summaries, and more.

---

## 🚀 Features

- 📂 **Drag & Drop Repository Upload** — Upload all your project files at once
- 🤖 **Gemini AI Analysis** — Powered by `@google/generative-ai` for rich code understanding
- 🔐 **User Authentication** — JWT-based signup & login system
- 📜 **Analysis History** — Save and revisit past analyses
- 🎨 **Smooth UI** — Built with React 19, Lenis smooth scroll, and Motion animations
- 🌐 **Full-Stack** — React (Vite) frontend + Express.js backend + MongoDB

---

## 🗂️ Project Structure

```
RepoMind.AI/
├── client/               # React frontend (Vite)
│   ├── src/
│   │   ├── pages/        # Home, Signup, Features, Explainer, Explore, Dashboard, History
│   │   ├── components/   # Shared UI components (Header, etc.)
│   │   └── App.jsx       # Root app with routing
│   └── package.json
│
└── server/               # Express.js backend
    ├── config/           # Database connection
    ├── controllers/      # Route logic
    ├── middleware/       # Auth & other middleware
    ├── models/           # Mongoose models (User, AnalysisHistory)
    ├── routes/           # API routes (auth, upload, history)
    ├── utils/            # Gemini analyzer, file tree builder
    └── server.js         # Entry point
```

---

## 🛠️ Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React 19, Vite, React Router v7     |
| Animation | Motion, Lenis smooth scroll         |
| Backend   | Express.js v5, Node.js              |
| Database  | MongoDB (Mongoose)                  |
| AI        | Google Gemini (`@google/generative-ai`) |
| Auth      | JWT (`jsonwebtoken`), bcrypt        |
| Upload    | Multer (memory storage, 50MB limit) |

---

## ⚙️ Getting Started

### Prerequisites

- Node.js `v18+`
- MongoDB instance (local or Atlas)
- Google Gemini API key

---

### 1. Clone the Repository

```bash
git clone https://github.com/Jesbin-21/RepoMind.AI.git
cd RepoMind.AI
```

---

### 2. Setup the Server

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_google_gemini_api_key
```

Start the dev server:

```bash
npm run dev
```

---

### 3. Setup the Client

```bash
cd client
npm install
```

Create a `.env` file in the `client/` directory:

```env
VITE_API_URL=http://localhost:5000
```

Start the dev server:

```bash
npm run dev
```

The app will be available at **`http://localhost:5173`**.

---

## 🔌 API Endpoints

### Auth

| Method | Endpoint   | Description              |
|--------|------------|--------------------------|
| POST   | `/signup`  | Register a new user      |
| POST   | `/login`   | Login and receive a JWT  |

### Upload & Analysis

| Method | Endpoint   | Description                                  |
|--------|------------|----------------------------------------------|
| POST   | `/upload`  | Upload project files for Gemini AI analysis  |

---

## 🌍 Deployment

- **Frontend**: Deployed on [Vercel](https://vercel.com) or any static host
- **Backend**: Deployed on [Render](https://render.com) at `https://repomind-ai-f75x.onrender.com`

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 👨‍💻 Author

Made with ❤️ by **Jesbin**
