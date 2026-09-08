import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Analyzes a list of project files using Gemini AI.
 * Supports ALL programming languages and frameworks: Python (Django, Flask, FastAPI),
 * Next.js, React, Vue, Angular, Node/Express, Java, Go, Rust, C++, Ruby, PHP, etc.
 */

export async function analyzeWithGemini(projectFiles) {

  // ─── Validate API key early ───────────────────────────────────
  const rawKey = process.env.GEMINI_API_KEY;
  const apiKey = rawKey ? rawKey.trim() : "";

  if (!apiKey || apiKey === "your_gemini_api_key_here") {
    console.error("❌ GEMINI_API_KEY is not set in server/.env");
    return {
      projectName: "API Key Missing",
      
    };
  }

const MAX_CHARS = 100000;

// How many characters we have added so far
let totalChars = 0;

// Files that we will send to Gemini
const filesForGemini = [];

for (const file of projectFiles) {

  // Skip empty files
  if (!file.content) {
    continue;
  }

  // Skip files larger than 35,000 characters
  if (file.content.length > 35000) {
    continue;
  }

  // Combine the file path and its code
  const fileText =
    "\n\n--- FILE: " + file.path + " ---\n" +
    file.content;

  // Stop if adding this file would go over 100,000 characters
  if (totalChars + fileText.length > MAX_CHARS) {
    break;
  }

  // Add this file to our list
  filesForGemini.push(fileText);

  // Update the character count
  totalChars = totalChars + fileText.length;
}

// Combine all files into one big piece of text
const fileContext = filesForGemini.join("");

  const prompt = `You are an expert multi-language software architect.
Analyze the repository files below. This repository could be ANY tech stack (e.g. Django, Python, Next.js, React, Node.js, Flask, FastAPI, Java Spring Boot, Go, Rust, C++, Ruby on Rails, PHP Laravel, Vue, Angular, Svelte, HTML/CSS/JS, etc.).

${fileContext}

Based on the ACTUAL files provided above, identify the project type and return a valid JSON object matching EXACTLY this structure:
{
  "projectName": "Name of the project",
  "codeScore": 85,
  "scoreBreakdown": {
    "readability": 88,
    "structure": 82,
    "documentation": 70,
    "complexity": 90
  },
  "languages": [
    { "name": "Python", "percentage": 75 },
    { "name": "HTML", "percentage": 25 }
  ],
  "summary": "A 2-3 sentence overview explaining what this project is, its main purpose, and its primary architecture.",
  "howToRun": [
    "Step 1: Install requirements (e.g. 'pip install -r requirements.txt' or 'npm install')",
    "Step 2: Database setup or environment config if applicable (e.g. 'python manage.py migrate' or 'npm run setup')",
    "Step 3: Run server (e.g. 'python manage.py runserver' or 'npm run dev')",
    "Step 4: Access in browser (e.g. 'Open http://127.0.0.1:8000')"
  ],
  "documentation": "Detailed markdown documentation covering: 1. Overview 2. Architecture & Tech Stack 3. Key Endpoints/Components 4. Folder Structure.",
  "techStack": ["Django", "Python", "SQLite"],
  "totalFiles": ${projectFiles.length},
  "fileTree": ${JSON.stringify(buildSimpleTree(projectFiles))}
}

STRICT REQUIREMENTS FOR ACCURACY:
1. "techStack": Detect the EXACT tech stack from files (e.g., if Django: ["Python", "Django", "SQLite"]; if Next.js: ["Next.js", "React", "TypeScript", "Tailwind CSS"]; if Flask: ["Python", "Flask"]; if Rust: ["Rust", "Cargo"]).
2. "howToRun": Provide EXACT, framework-specific setup and run steps tailored to THIS codebase (e.g. for Django use 'python manage.py runserver'; for Next.js use 'npm run dev' / 'npx next dev'; for Flask use 'python app.py'; for Rust use 'cargo run').
3. "languages": Calculate realistic percentage split of all programming/markup languages detected in the file tree.
4. "codeScore": Score from 0 to 100 based on code structure, organization, and modularity.
5. Respond ONLY with valid JSON. Do not include markdown \`\`\`json wrappers or any extra text outside the JSON object.`;

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    // Strip any accidental markdown code fences
    const cleaned = text
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    const parsed = JSON.parse(cleaned);
    return parsed;

  } catch (err) {
    console.error("Gemini analysis error:", err.message);

    // Detect specific error types
    let userMessage = err.message;
    if (err.message?.includes("API_KEY_INVALID") || err.message?.includes("API key")) {
      userMessage = "Invalid Gemini API key. Get a valid key at https://aistudio.google.com";
    } else if (err.message?.includes("RESOURCE_EXHAUSTED") || err.message?.includes("quota")) {
      userMessage = "Gemini API quota exceeded. Wait a minute and try again.";
    } else if (err.message?.includes("JSON")) {
      userMessage = "Gemini returned unexpected output format. Please try again.";
    }

    // Return a graceful fallback if API fails
    return {
      projectName: "Analysis Failed",
      codeScore: 0,
      scoreBreakdown: { readability: 0, structure: 0, documentation: 0, complexity: 0 },
      languages: [],
      summary: "Analysis failed: " + userMessage,
      howToRun: ["Fix the error above and try again."],
      documentation: "Analysis unavailable due to an error.",
      techStack: [],
      totalFiles: projectFiles.length,
      fileTree: buildSimpleTree(projectFiles),
      error: userMessage
    };
  }
}

/**
 * Builds a simple nested tree from flat file paths
 */
function buildSimpleTree(projectFiles) {
  const tree = {};
  for (const f of projectFiles) {
    const parts = f.path.split("/");
    let node = tree;
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (i === parts.length - 1) {
        node[part] = "file";
      } else {
        if (!node[part] || node[part] === "file") {
          node[part] = {};
        }
        node = node[part];
      }
    }
  }
  return tree;
}
