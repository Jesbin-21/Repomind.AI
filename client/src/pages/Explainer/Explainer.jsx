import React, { useEffect, useRef, useState } from "react";
import "./Explainer.css";
import { FaFolderOpen, FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Explainer() {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCount, setSelectedCount] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.setAttribute("webkitdirectory", "");
    }
  }, []);

  const ignoredFolders = [
    "node_modules", ".git", "dist", "build", ".next", ".nuxt",
    "__pycache__", "venv", ".venv", "env", ".env", ".pytest_cache",
    "target", "bin", "obj", ".idea", ".vscode"
  ];

  const processFiles = async (fileList) => {
    const files = Array.from(fileList);

    const formData = new FormData();

    files.forEach((file) => {
      const path = file.webkitRelativePath;
      const shouldIgnore = ignoredFolders.some((folder) =>
        path.includes(`${folder}/`)
      );
      if (shouldIgnore) return;
      formData.append("files", file);
      formData.append("paths", path);
    });

    const count = [...formData.getAll("files")].length;
    setSelectedCount(count);

    if (count === 0) {
      setError("No valid source files found. Make sure you selected a project folder.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      let res;
      try {
        res = await axios.post("http://localhost:5000/upload", formData, {
          timeout: 120000
        });
      } catch (firstErr) {
        // Fallback to 127.0.0.1 if localhost resolution fails
        if (firstErr.message?.includes("Network Error") || firstErr.code === "ERR_NETWORK") {
          console.warn("localhost connection failed, trying 127.0.0.1...");
          res = await axios.post("http://127.0.0.1:5000/upload", formData, {
            timeout: 120000
          });
        } else {
          throw firstErr;
        }
      }

      navigate("/explore", { state: { analysis: res.data.analysis } });
    } catch (err) {
      console.error("Upload error details:", err);
      let msg = "Upload failed. Make sure the server is running on port 5000.";
      if (err.code === "ECONNABORTED") {
        msg = "Request timed out while analyzing with AI. Try uploading a smaller folder.";
      } else if (err.response?.data?.error) {
        msg = err.response.data.error;
      } else if (err.message?.includes("Network Error") || err.code === "ERR_NETWORK") {
        msg = "Cannot connect to backend server. Make sure the server is running on port 5000.";
      }
      setError(msg);
      setLoading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleFolderUpload = (e) => {
    processFiles(e.target.files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  if (loading) {
    return (
      <div className="explainer-page">
        <div className="explainer-loading">
          <div className="explainer-spinner" />
          <h2>Analyzing your project…</h2>
          <p>REPOMIND AI is reading <strong>{selectedCount} files</strong>. This takes 10–30 seconds.</p>
          <div className="loading-progress">
            <div className="loading-bar" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="explainer-page">
      <div className="explainer-header">
        <div className="explainer-header-content">
          <span className="badge">✨ Gemini AI Code Inspector</span>
          <h1>
            Interactive Codebase <span>Analyzer</span>
          </h1>
          <p>
            Upload your project folder and get instant AI-powered insights —
            code quality score, language breakdown, how to run it, and auto-generated documentation.
          </p>
        </div>
      </div>

      {/* UPLOAD ZONE */}
      <div
        className={`upload-zone ${isDragging ? "dragging" : ""}`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        id="upload-zone"
      >
        <input
          type="file"
          className="fileInput"
          multiple
          onChange={handleFolderUpload}
          ref={inputRef}
          style={{ display: "none" }}
        />

        <div className="upload-icon">
          {isDragging ? <FaCloudUploadAlt /> : <FaFolderOpen />}
        </div>

        <h3 className="upload-title">
          {isDragging ? "Drop your project folder here" : "Select your project folder"}
        </h3>

        <p className="upload-sub">
          Click to browse or drag & drop your project folder
        </p>

        <div className="upload-btn-row">
          <span className="upload-chip">🐍 Python & Django</span>
          <span className="upload-chip">⚡ Next.js & React</span>
          <span className="upload-chip">🚀 Java, Go, Rust & PHP</span>
          <span className="upload-chip">🛡️ venv & node_modules auto-ignored</span>
        </div>
      </div>

      {/* ERROR */}
      {error && (
        <div className="upload-error">
          <strong>⚠ Error:</strong> {error}
        </div>
      )}

      {/* WHAT YOU GET */}
      <div className="explainer-features">
        <div className="ex-feature-item">
          <span className="ex-icon">🎯</span>
          <div>
            <strong>Code Quality Score</strong>
            <p>AI rates your code 0–100 across readability, structure, and complexity.</p>
          </div>
        </div>
        <div className="ex-feature-item">
          <span className="ex-icon">🔤</span>
          <div>
            <strong>Language Detection</strong>
            <p>Automatically detects all programming languages used with percentages.</p>
          </div>
        </div>
        <div className="ex-feature-item">
          <span className="ex-icon">📖</span>
          <div>
            <strong>Auto Documentation</strong>
            <p>Gemini generates a beginner-friendly mini-doc for your project.</p>
          </div>
        </div>
        <div className="ex-feature-item">
          <span className="ex-icon">🚀</span>
          <div>
            <strong>How To Run</strong>
            <p>Step-by-step instructions on how to run the project from scratch.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Explainer;