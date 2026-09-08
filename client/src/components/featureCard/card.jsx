import React from 'react';
import "./card.css";
import { FaChartLine, FaLightbulb, FaBrain, FaFileAlt, FaBug, FaCode } from "react-icons/fa";

const iconMap = {
  "Project Health Score": <FaChartLine />,
  "Learning Mode": <FaLightbulb />,
  "AI Code Explainer": <FaBrain />,
  "README Generator": <FaFileAlt />,
  "Bug Finder": <FaBug />,
};

function Card({ title, description, id }) {
  const IconComponent = iconMap[title] || <FaCode />;

  return (
    <div className="featureCard">
      <div className="card-icon-wrapper">
        {IconComponent}
      </div>
      <h2>{title}</h2>
      <p>{description}</p>
      <div className="card-footer">
        <span>Learn more &rarr;</span>
      </div>
    </div>
  );
}

export default Card;