import React from "react";
import "./HeroSection.css";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="hero">
      <h2>Track Your Expenses Effortlessly!</h2>
      <p>Manage your finances smartly with easy tracking & insights.</p>
      <button>  <Link to="/login" style={{textDecoration:"none"}}>Get Started</Link> </button>
    </div>
  );
};

export default HeroSection;
