import React from "react";
import { useSelector } from "react-redux";
import { Bar, Pie, Line } from "react-chartjs-2";
import "chart.js/auto";
import "./ExpenseChart.css";

const ExpenseChart = () => {
  const income = useSelector((state) => state.expenses.income);
  const expenses = useSelector((state) => state.expenses.expenses);

  // Data processing for the charts
  const expenseLabels = expenses.map((exp) => exp.category || "Misc");
  const expenseAmounts = expenses.map((exp) => exp.amount);

  const chartData = {
    labels: expenseLabels,
    datasets: [
      {
        label: "Expenses",
        data: expenseAmounts,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#8B78E6", "#5CD85C"],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div >
      <div>
        <h2 className="chart-title">Expense Analysis</h2>

        {/* Summary Section */}
        <div className="chart-summary">
          <h3>Financial Summary</h3>
          <p><strong>Income:</strong> ₹{income}</p>
          <p><strong>Total Expenses:</strong> ₹{expenseAmounts.reduce((a, b) => a + b, 0)}</p>
          <p><strong>Balance:</strong> ₹{income - expenseAmounts.reduce((a, b) => a + b, 0)}</p>
        </div>

        {/* Chart Grid */}
        <div className="chart-grid">
          {/* Bar Chart */}
          <div >
            <h3>Expense Breakdown</h3>
            <Bar data={chartData} />
          </div>

          {/* Pie Chart */}
          <div className="chart-box">
            <h3>Category Distribution</h3>
            <Pie data={chartData} />
          </div>

           
          <div className="chart-box">
            <h3>Spending Trend</h3>
            <Line data={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseChart;
