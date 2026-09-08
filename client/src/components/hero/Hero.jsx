import "./Hero.css";
import { motion, useScroll, useTransform } from "motion/react";
import Button from "../button/Button";
import { FaFolder, FaFileAlt, FaUpload, FaRocket, FaCodeBranch, FaCheckCircle, FaSearch, FaLayerGroup } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Hero() {
  const { scrollYProgress } = useScroll();

  const x = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const x1 = useTransform(scrollYProgress, [0, 0.3], [0, -100]);




  const navigate = useNavigate();
  const token = localStorage.getItem("token")


    const handleExplore = () => {
    const token = localStorage.getItem("token");

    if (token) {
        navigate("/explainer");
    } else {
        navigate("/signup");
    }
};


  return (
    <section className="hero">
      <div className="hero-left">
        <motion.span style={{x}} className="badge">
          Repository Intelligence
        </motion.span>

        <motion.h1 style={{x}}>
          Understand Any <span>Codebase</span> In Minutes
        </motion.h1>

        <motion.p style={{x}}>
          Upload a project archive and get instant, structured insights into folder architecture, 
          API endpoints, database design, dependencies, and automated documentation.
        </motion.p>

        <div className="hero-buttons">
          <Button 
            text="Upload Project" 
            icon={<FaUpload />} 
            variant="primary" 

            onClick={handleExplore} 
          />
          <Button 
            text="Explore Features" 
            icon={<FaRocket />} 
            variant="secondary" 
            onClick={() => navigate("/features")} 
          />
        </div>

        <div className="hero-stats">
          <div className="stat-card">
            <h3>100+</h3>
            <span>Projects Analyzed</span>
          </div>

          <div className="stat-card">
            <h3>Instant</h3>
            <span>Structure Mapping</span>
          </div>

          <div className="stat-card">
            <h3>24/7</h3>
            <span>Available Online</span>
          </div>
        </div>
      </div>

      <div className="hero-right">
        <div className="preview-card">
          <div className="preview-header">
            <div className="repo-info">
              <FaLayerGroup className="repo-icon" />
              <div>
                <h4>express-rest-api.zip</h4>
                <span>Node.js / Express Architecture</span>
              </div>
            </div>
            <span className="status-badge">
              <FaCheckCircle /> Ready
            </span>
          </div>

          <div className="preview-content">
            <div className="file-list">
              <div className="file-item active">
                <FaFolder className="folder" /> <span>src/controllers</span>
              </div>
              <div className="file-item indent">
                <FaFileAlt className="file" /> <span>auth.controller.js</span>
              </div>
              <div className="file-item indent">
                <FaFileAlt className="file" /> <span>user.controller.js</span>
              </div>
              <div className="file-item">
                <FaFolder className="folder" /> <span>src/models</span>
              </div>
              <div className="file-item">
                <FaCodeBranch className="branch" /> <span>routes/api.js</span>
              </div>
            </div>

            <div className="summary-pane">
              <h5>Repository Overview</h5>
              <p>RESTful API with JWT authentication middleware, Mongoose ORM models, and modular controllers.</p>
              
              <div className="metric-row">
                <div className="metric">
                  <span className="label">Maintainability</span>
                  <span className="value">96/100</span>
                </div>
                <div className="metric">
                  <span className="label">Dependencies</span>
                  <span className="value">14 packages</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;