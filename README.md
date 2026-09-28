# 🧠 RepoMind.AI — AI Code Repository Analyzer

RepoMind.AI is a full-stack web application that uses **Google Gemini AI** to analyze software projects and provide intelligent insights about their codebase.

Developers can upload an entire project and receive an AI-generated analysis covering the **project structure, architecture, technologies, potential issues, and other code insights**.

---

## ✨ Features

* 📂 Upload complete code repositories
* 🖱️ Drag-and-drop project upload
* 🤖 AI-powered code analysis using Google Gemini
* 🌳 Automatic project file-tree generation
* 🔍 Analyze source code and project structure
* 🛠️ Identify potential code issues
* 📚 Generate project and architecture insights
* 💻 Technology stack detection
* 🔐 JWT-based user authentication
* 👤 User registration and login
* 📜 Analysis history
* 🔄 Revisit previous analyses
* 🎨 Modern responsive user interface
* ✨ Smooth scrolling with Lenis
* 🎬 Motion-based UI animations

---

## 🛠️ Tech Stack

### Frontend

* React 19
* Vite
* JavaScript
* React Router
* CSS

### Backend

* Node.js
* Express.js
* REST API
* Multer

### Database

* MongoDB
* Mongoose

### AI

* Google Gemini AI
* `@google/generative-ai`

### Authentication

* JSON Web Token (JWT)
* bcrypt

### UI & Animation

* Motion
* Lenis

---

## 📁 Project Structure

```text
RepoMind.AI/
│
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home/
│   │   │   ├── Signup/
│   │   │   ├── Features/
│   │   │   ├── Explainer/
│   │   │   ├── Explore/
│   │   │   ├── Dashboard/
│   │   │   └── History/
│   │   │
│   │   ├── components/
│   │   │   └── Header/
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │
│   ├── middleware/
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── AnalysisHistory.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── uploadRoutes.js
│   │   └── historyRoutes.js
│   │
│   ├── utils/
│   │   ├── geminiAnalyzer.js
│   │   └── fileTreeBuilder.js
│   │
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## 🔄 How It Works

```text
Developer
    │
    ▼
Upload Project
    │
    ▼
React Frontend
    │
    ▼
Express Backend
    │
    ├── Filter files
    ├── Ignore irrelevant files
    └── Build project structure
    │
    ▼
Google Gemini AI
    │
    ▼
Code Analysis
    │
    ├── Project Overview
    ├── Architecture
    ├── Tech Stack
    ├── Code Insights
    └── Potential Issues
    │
    ▼
MongoDB
    │
    ▼
Analysis History
```

---

## 🤖 AI Code Analysis

RepoMind.AI processes the uploaded project and sends relevant source-code information to **Google Gemini AI**.

The analyzer can provide insights such as:

* Project overview
* Architecture explanation
* Technology identification
* Code structure analysis
* Potential issues
* Improvement suggestions
* Important files and their purpose

The application filters out unnecessary files and assets before sending project information for analysis.

---

## 🔐 Authentication

RepoMind.AI uses **JWT authentication** for user accounts.

Users can:

* Create an account
* Log in
* Access protected features
* View their analysis history

Authentication requests use JWT tokens to authorize protected API requests.

---

## 📂 Repository Upload

Users can upload project files through the web interface.

The application supports:

* Drag-and-drop uploads
* Multiple project files
* Large project uploads
* File filtering
* Project structure generation

Unnecessary files such as binaries and irrelevant assets can be excluded from the analysis process.

---

## 📜 Analysis History

Each user's previous analyses can be stored in MongoDB.

Users can:

* View previous analyses
* Revisit generated insights
* Keep track of analyzed projects

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Jesbin-21/RepoMind.AI.git
cd RepoMind.AI
```

### 2. Install Server Dependencies

```bash
cd server
npm install
```

### 3. Start the Backend

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

### 4. Install Client Dependencies

Open another terminal:

```bash
cd client
npm install
```

### 5. Start the Frontend

```bash
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

---

## 📡 API Endpoints

### 🔐 Authentication

| Method | Endpoint  | Description           |
| ------ | --------- | --------------------- |
| `POST` | `/signup` | Register a new user   |
| `POST` | `/login`  | Login and receive JWT |

### 📂 Repository Analysis

| Method | Endpoint  | Description                          |
| ------ | --------- | ------------------------------------ |
| `POST` | `/upload` | Upload project files for AI analysis |

### 📜 Analysis History

| Method | Endpoint         | Description                |
| ------ | ---------------- | -------------------------- |
| `GET`  | History endpoint | Retrieve previous analyses |

---

## 🌐 Deployment

The application can be deployed using:

* Vercel for the frontend
* Render for the backend
* MongoDB Atlas for the database

### Live Backend

The backend is deployed on Render.

---

## 🔮 Future Improvements

* 📊 Code quality scoring
* 🔎 Advanced code search
* 🧩 Dependency analysis
* 🐛 Automated bug detection
* 🔐 Security vulnerability detection
* 📈 Project complexity analysis
* 💬 AI-powered code questions
* 📥 Export analysis reports
* 🔗 GitHub repository integration

---

## 👨‍💻 Author

**Jesbin Jaison**

BCA Graduate | MERN Full-Stack Developer

### Technologies

```text
React.js • Node.js • Express.js • MongoDB
JavaScript • Gemini AI • JWT • REST APIs
Motion • Lenis • Git • GitHub
```

---

## 📄 License

This project is licensed under the **ISC License**.
