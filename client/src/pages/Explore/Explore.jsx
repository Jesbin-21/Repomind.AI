import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaArrowLeft, FaShieldAlt, FaCode, FaLayerGroup,
  FaBookOpen, FaTerminal, FaChartBar,
  FaFolderOpen, FaFolder, FaChevronRight, FaChevronDown
} from "react-icons/fa";
import "./Explore.css";

// ---------- LANGUAGE COLORS ----------
const LANG_COLORS = {
  JavaScript: "#F7DF1E", TypeScript: "#3178C6", Python: "#3572A5",
  CSS: "#563D7C", HTML: "#E34C26", Java: "#B07219", "C++": "#F34B7D",
  C: "#555555", Go: "#00ADD8", Rust: "#DEA584", Ruby: "#701516",
  PHP: "#4F5D95", Swift: "#F05138", Kotlin: "#A97BFF", Shell: "#89E051",
  Default: "#6366F1",
};
function getLangColor(name) { return LANG_COLORS[name] || LANG_COLORS.Default; }

// ---------- FILE EXTENSION → ICON/COLOR ----------
const EXT_COLORS = {
  js:   { color: "#F7DF1E", icon: "JS" }, ts: { color: "#3178C6", icon: "TS" },
  jsx:  { color: "#61DAFB", icon: "⚛" }, tsx: { color: "#3178C6", icon: "⚛" },
  py:   { color: "#3572A5", icon: "PY" }, rb:  { color: "#CC342D", icon: "RB" },
  go:   { color: "#00ADD8", icon: "GO" }, rs:  { color: "#DEA584", icon: "RS" },
  java: { color: "#B07219", icon: "☕" }, kt:  { color: "#A97BFF", icon: "KT" },
  php:  { color: "#4F5D95", icon: "PHP" }, cs: { color: "#178600", icon: "C#" },
  cpp:  { color: "#F34B7D", icon: "C++" }, c:  { color: "#555555", icon: "C" },
  html: { color: "#E34C26", icon: "◇" }, css:  { color: "#264de4", icon: "≋" },
  scss: { color: "#CC6699", icon: "≋" }, json: { color: "#FCB900", icon: "{}" },
  md:   { color: "#083FA1", icon: "MD" }, txt: { color: "#888888", icon: "≡" },
  yml:  { color: "#CB171E", icon: "⚙" }, yaml: { color: "#CB171E", icon: "⚙" },
  env:  { color: "#ECC94B", icon: "🔑" }, sh:  { color: "#89E051", icon: "$" },
  sql:  { color: "#336791", icon: "DB" }, toml: { color: "#9C4221", icon: "⚙" },
  xml:  { color: "#E44D26", icon: "<>" }, svg: { color: "#FFB13B", icon: "◈" },
};

function getFileIcon(name) {
  const ext = name.split(".").pop()?.toLowerCase() || "";
  return EXT_COLORS[ext] || { color: "#94A3B8", icon: "·" };
}

// Count files in a tree node
function countFiles(node) {
  if (node === "file") return 1;
  return Object.values(node).reduce((sum, v) => sum + countFiles(v), 0);
}

// ---------- SINGLE TREE NODE (COLLAPSIBLE) ----------
function TreeNode({ name, value, depth = 0, defaultOpen = false }) {
  const isFile = value === "file";
  const [open, setOpen] = useState(defaultOpen || depth === 0);
  const childCount = isFile ? 0 : countFiles(value);
  const fileInfo = isFile ? getFileIcon(name) : null;

  return (
    <div className="tree-item-wrapper">
      <div
        className={`tree-item ${isFile ? "tree-file" : "tree-folder"} ${!isFile && open ? "tree-folder-open" : ""}`}
        style={{ paddingLeft: depth * 18 + 8 }}
        onClick={!isFile ? () => setOpen(o => !o) : undefined}
        title={isFile ? name : `${childCount} files`}
      >
        {/* Connector lines */}
        {depth > 0 && <span className="tree-connector" />}

        {/* Chevron for folders */}
        {!isFile && (
          <span className={`tree-chevron ${open ? "open" : ""}`}>
            <FaChevronRight size={9} />
          </span>
        )}

        {/* Icon */}
        {isFile ? (
          <span
            className="tree-file-badge"
            style={{ background: fileInfo.color + "22", color: fileInfo.color, borderColor: fileInfo.color + "55" }}
          >
            {fileInfo.icon}
          </span>
        ) : (
          <span className="tree-folder-icon">
            {open ? <FaFolderOpen size={13} /> : <FaFolder size={13} />}
          </span>
        )}

        {/* Name */}
        <span className="tree-name">{name}</span>

        {/* Count badge for folders */}
        {!isFile && (
          <span className="tree-count">{childCount}</span>
        )}
      </div>

      {/* Children */}
      {!isFile && open && (
        <div className="tree-children">
          {Object.entries(value)
            .sort(([, av], [, bv]) => {
              // Folders first
              const aIsDir = av !== "file";
              const bIsDir = bv !== "file";
              if (aIsDir && !bIsDir) return -1;
              if (!aIsDir && bIsDir) return 1;
              return 0;
            })
            .map(([k, v]) => (
              <TreeNode key={k} name={k} value={v} depth={depth + 1} />
            ))}
        </div>
      )}
    </div>
  );
}

// ---------- FULL FILE TREE PANEL ----------
function FileTreePanel({ fileTree }) {
  const [search, setSearch] = useState("");
  const totalFiles = countFiles(fileTree);

  const filterTree = (node, query) => {
    if (!query) return node;
    if (node === "file") return node;
    const filtered = {};
    for (const [k, v] of Object.entries(node)) {
      if (k.toLowerCase().includes(query.toLowerCase())) {
        filtered[k] = v;
      } else if (v !== "file") {
        const sub = filterTree(v, query);
        if (Object.keys(sub).length > 0) filtered[k] = sub;
      }
    }
    return filtered;
  };

  const displayTree = filterTree(fileTree, search);

  return (
    <div className="file-tree-panel">
      {/* Search bar */}
      <div className="tree-search-bar">
        <span className="tree-search-icon">🔍</span>
        <input
          type="text"
          className="tree-search-input"
          placeholder="Search files..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {search && (
          <button className="tree-search-clear" onClick={() => setSearch("")}>✕</button>
        )}
      </div>

      {/* Stats row */}
      <div className="tree-stats-row">
        <span className="tree-stat"><FaFolder size={10} /> {Object.keys(fileTree).length} root folders</span>
        <span className="tree-stat-divider">·</span>
        <span className="tree-stat">📄 {totalFiles} files total</span>
      </div>

      {/* Tree */}
      <div className="file-tree-scroll">
        {Object.keys(displayTree).length === 0 ? (
          <div className="tree-empty">No files match your search</div>
        ) : (
          Object.entries(displayTree).map(([name, value]) => (
            <TreeNode key={name} name={name} value={value} depth={0} defaultOpen />
          ))
        )}
      </div>
    </div>
  );
}

// ---------- SCORE RING ----------
function ScoreRing({ score }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const cls = score >= 75 ? "high" : score >= 50 ? "medium" : "low";
  return (
    <div className="score-ring-wrapper">
      <svg viewBox="0 0 120 120" width="140" height="140">
        <circle className="score-ring-bg" cx="60" cy="60" r={radius} />
        <circle className={`score-ring-fill ${cls}`} cx="60" cy="60" r={radius}
          strokeDasharray={circumference} strokeDashoffset={offset} />
      </svg>
      <div className="score-center">
        <div className="score-number">{score}</div>
        <div className="score-label">/ 100</div>
      </div>
    </div>
  );
}

// ---------- LOADING SCREEN ----------
function LoadingScreen() {
  const steps = ["Reading project files…", "Detecting languages & structure…",
    "Analyzing code quality…", "Generating documentation…", "Finalizing results…"];
  const [activeStep, setActiveStep] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setActiveStep(p => p < steps.length - 1 ? p + 1 : p), 2500);
    return () => clearInterval(iv);
  }, []);
  return (
    <div className="explore-loading">
      <div className="loading-spinner-ring" />
      <div className="loading-title">Analyzing your project with Gemini AI</div>
      <div className="loading-steps">
        {steps.map((s, i) => (
          <div key={i} className={`loading-step ${i === activeStep ? "active" : ""}`}>
            <div className="dot" />{s}
          </div>
        ))}
      </div>
      <p className="loading-sub">This may take 10–30 seconds for larger projects.</p>
    </div>
  );
}

// ---------- MAIN EXPLORE PAGE ----------
export default function Explore() {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState(location.state?.analysis || null);
  const [loading, setLoading] = useState(!data);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (location.state?.analysis) {
      setData(location.state.analysis);
      setLoading(false);
    } else if (!data) {
      setError("No analysis data found. Please upload a project first.");
      setLoading(false);
    }
  }, []);

  if (loading) return <LoadingScreen />;

  if (error) {
    return (
      <div className="explore-error">
        <div className="error-icon">⚠️</div>
        <h2>Something went wrong</h2>
        <p>{error}</p>
        <button className="back-btn" onClick={() => navigate("/explainer")}>
          <FaArrowLeft /> Try Again
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="explore-error">
        <div className="error-icon">📂</div>
        <h2>No Project Uploaded</h2>
        <p>Please upload a project folder to see the analysis here.</p>
        <button className="back-btn" onClick={() => navigate("/explainer")}>
          <FaArrowLeft /> Go to Explainer
        </button>
      </div>
    );
  }

  const {
    projectName = "Your Project", codeScore = 0, scoreBreakdown = {},
    languages = [], summary = "", howToRun = [],
    documentation = "", techStack = [], totalFiles = 0,
    fileTree = {}, error: analysisError = null,
  } = data;

  return (
    <div className="explore-page">

      {/* TOP BAR */}
      <div className="explore-topbar">
        <button className="back-btn" onClick={() => navigate("/explainer")}>
          <FaArrowLeft /> Back
        </button>
        <h2 className="explore-project-name">
          <span>{projectName}</span> — Analysis Report
        </h2>
      </div>

      {/* ERROR BANNER */}
      {analysisError && (
        <div className="explore-error-banner">
          <span className="error-banner-icon">⚠️</span>
          <div>
            <strong>Gemini Analysis Failed</strong>
            <p>{analysisError}</p>
          </div>
          <a href="https://aistudio.google.com" target="_blank" rel="noreferrer" className="error-banner-link">
            Get API Key →
          </a>
        </div>
      )}

      {/* MAIN GRID */}
      <div className="explore-grid">

        {/* ── SCORE CARD ── */}
        <div className="explore-card score-card">
          <div className="card-label"><FaShieldAlt /> Code Quality Score</div>
          <ScoreRing score={codeScore} />
          <div className="score-breakdown">
            {Object.entries(scoreBreakdown).map(([key, val]) => (
              <div key={key} className="breakdown-item">
                <span className="b-label">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                <div className="b-bar-bg"><div className="b-bar-fill" style={{ width: `${val}%` }} /></div>
                <span className="b-val">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── LANGUAGES CARD ── */}
        <div className="explore-card lang-card">
          <div className="card-label"><FaCode /> Languages Used</div>
          <div className="lang-list">
            {languages.map((lang) => (
              <div key={lang.name} className="lang-item">
                <div className="lang-meta">
                  <div className="lang-name-row">
                    <span className="lang-dot" style={{ background: getLangColor(lang.name) }} />
                    <span>{lang.name}</span>
                  </div>
                  <span className="lang-pct">{lang.percentage}%</span>
                </div>
                <div className="lang-bar-bg">
                  <div className="lang-bar-fill" style={{ width: `${lang.percentage}%`, background: getLangColor(lang.name) }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── TECH STACK CARD ── */}
        <div className="explore-card tech-card">
          <div className="card-label"><FaLayerGroup /> Tech Stack</div>
          <div className="tech-chips">
            {techStack.map(t => <span key={t} className="tech-chip">{t}</span>)}
            {techStack.length === 0 && <span style={{ color: "var(--text-muted)", fontSize: 13 }}>No specific stack detected</span>}
          </div>
          <div className="file-count-note"><strong>{totalFiles}</strong> files analyzed</div>
        </div>

        {/* ── SUMMARY CARD ── */}
        <div className="explore-card summary-card">
          <div className="card-label"><FaBookOpen /> What This Project Is About</div>
          <p className="summary-text">{summary}</p>
        </div>

        {/* ── HOW TO RUN CARD ── */}
        <div className="explore-card howto-card">
          <div className="card-label"><FaTerminal /> How To Run</div>
          <div className="steps-list">
            {howToRun.map((step, i) => (
              <div key={i} className="step-item">
                <div className="step-num">{i + 1}</div>
                <div className="step-text">
                  {step.split(/(`[^`]+`)/).map((part, j) =>
                    part.startsWith("`") && part.endsWith("`")
                      ? <code key={j}>{part.slice(1, -1)}</code>
                      : part
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── DOCUMENTATION CARD ── */}
        <div className="explore-card docs-card">
          <div className="card-label"><FaChartBar /> Auto-Generated Documentation</div>
          <pre className="docs-content">{documentation}</pre>
        </div>

        {/* ── FILE TREE CARD (right of docs) ── */}
        <div className="explore-card tree-card">
          <div className="card-label"><FaFolder /> Project File Structure</div>
          <FileTreePanel fileTree={fileTree} />
        </div>

      </div>
    </div>
  );
}
