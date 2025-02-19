import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { useSelector } from "react-redux";
import HeroSection from "../../components/HeroSection/HeroSection";

const Home = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const income = useSelector((state) => state.expenses.income);
  const expenses = useSelector((state) => state.expenses.totalExpenses);
  const balance = income - expenses;

  return (
    <main className="home">
      <section className="content">
        <HeroSection />
        <div className="actions">
          {currentUser ? (
            <>
              <Link to="/expenseform">
                <button className="btn">Records</button>
              </Link>
              <Link to="/analysis">
                <button className="btn">Analysis</button>
              </Link>
            </>
          ) : (
            <>
              <button className="btn" onClick={() => alert("Please login to add expenses!")}>
                Records
              </button>
              <button className="btn" onClick={() => alert("Please login to view analysis!")}>
                Analysis
              </button>
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default Home;
