import "./Features.css";
import { motion, useScroll, useTransform } from "motion/react";
import featureData from "../../assets/data.js";
import Card from "../../components/featureCard/card";
import { FaFileAlt, FaTerminal, FaFileCode, FaShieldAlt, FaBookOpen } from "react-icons/fa";

function Features() {

  const { scrollYProgress } = useScroll();

  const scale = useTransform(scrollYProgress, [0, 0.2], [2, 1]);
  const x = useTransform(scrollYProgress, [0, 0.4], [200, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);



  return (
    <section className="features-section">
      <motion.div style={{scale,}} className="ticker">
        <div className="ticker-track">
          <span><FaFileAlt className="ticker-icon" /> Automated Documentation</span>
          <span><FaFileCode className="ticker-icon" /> README Generator</span>
          <span><FaTerminal className="ticker-icon" /> Code Explainer</span>
          <span><FaShieldAlt className="ticker-icon" /> Quality Score</span>
          <span><FaBookOpen className="ticker-icon" /> API Mapping</span>

          {/* Duplicate for seamless loop */}
          <span><FaFileAlt className="ticker-icon" /> Automated Documentation</span>
          <span><FaFileCode className="ticker-icon" /> README Generator</span>
          <span><FaTerminal className="ticker-icon" /> Code Explainer</span>
          <span><FaShieldAlt className="ticker-icon" /> Quality Score</span>
          <span><FaBookOpen className="ticker-icon" /> API Mapping</span>
        </div>
      </motion.div>

      <div className="features-container">
        <motion.div style={{ x }} className="features-header">
          <span className="section-badge">Capabilities</span>
          <h2>Supercharge Your <span>Development Workflow</span></h2>
          <p>Everything you need to digest, document, and master any repository instantly.</p>
        </motion.div>

        <div className="feature-cards-grid">
          {featureData.map((item) => (
            <Card 
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;