import React from "react";
import "../styles/FeatureCard.css";

const FeatureCard = ({ title, desc, icon }) => (
  <div className="feature-card modern-card">
    <div className="feature-card__icon">
      <img src={require(`../assets/${icon}`)} alt={title} />
    </div>
    <h3 className="feature-card__title">{title}</h3>
    <p className="feature-card__desc">{desc}</p>
  </div>
);

export default FeatureCard; 