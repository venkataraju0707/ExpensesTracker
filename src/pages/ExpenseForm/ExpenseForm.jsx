import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExpense, setIncome } from "../../redux/expenseSlice";
import { useNavigate } from "react-router-dom";
import "./ExpenseForm.css";
import ExpensesTable from "../../components/ExpensesTable/ExpensesTable.jsx";

const ExpenseForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const income = useSelector((state) => state.expenses.income);
  const totalExpenses = useSelector((state) => state.expenses.totalExpenses);

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [date, setDate] = useState("");
  const [userIncome, setUserIncome] = useState(income);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isSubmitting) {
      setAmount("");
      setCategory("");
      setCustomCategory("");
      setDate("");
    }
  }, [isSubmitting]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    if (e.target.value !== "Others") setCustomCategory("");
  };

  const handleIncomeChange = (e) => {
    const newIncome = parseFloat(e.target.value) || 0;
    setUserIncome(newIncome);
    if (currentUser) {
      dispatch(setIncome({ username: currentUser.username, income: newIncome }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert("Please log in to add an expense.");
      return;
    }

    if (!amount || !category || (category === "Others" && !customCategory.trim()) || !date) {
      alert("All fields are required!");
      return;
    }

    const finalCategory = category === "Others" ? customCategory.trim() : category;
    const newExpense = {
      id: Date.now(),
      amount: parseFloat(amount),
      category: finalCategory,
      date,
    };

    setIsSubmitting(true);
    dispatch(addExpense({ username: currentUser.username, expense: newExpense }));
    setIsSubmitting(false);
  };

  return (
    <div className="expense-container">
       

       <div className="expense-form-container">
        <h2 className="title">Expense Tracker</h2>
        <form className="expense-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="form-field">
              <label>Income</label>
              <input type="number" value={userIncome} onChange={handleIncomeChange} min="0" />
            </div>

            <div className="form-field">
              <label>Amount</label>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required min="0" />
            </div>

            <div className="form-field">
              <label>Category</label>
              <select value={category} onChange={handleCategoryChange} required>
                <option value="">Select a category</option>
                <option value="Rent">Rent</option>
                <option value="Car">Car</option>
                <option value="Bike">Bike</option>
                <option value="Groceries">Groceries</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Others">Others</option>
              </select>
            </div>

            {category === "Others" && (
              <div className="form-field">
                <label>Custom Category</label>
                <input type="text" value={customCategory} onChange={(e) => setCustomCategory(e.target.value)} required />
              </div>
            )}

            <div className="form-field">
              <label>Date</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? <span className="loader"></span> : "Add Expense"}
          </button>
        </form>
      </div>

       <div >
        <ExpensesTable />
      </div>
    </div>
  );
};

export default ExpenseForm;
