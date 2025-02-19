import { createSlice } from "@reduxjs/toolkit";

// Load user-specific expenses from localStorage
const loadExpenses = (username) => {
  if (!username) return { income: 0, expenses: [], totalExpenses: 0 };
  let allUsersData = JSON.parse(localStorage.getItem("allUsersData")) || {};
  return allUsersData[username] || { income: 0, expenses: [], totalExpenses: 0 };
};

// Save expenses for a specific user
const saveExpenses = (username, state) => {
  if (username) {
    let allUsersData = JSON.parse(localStorage.getItem("allUsersData")) || {};
    allUsersData[username] = {
      income: state.income,
      expenses: state.expenses,
      totalExpenses: state.totalExpenses,
    };
    localStorage.setItem("allUsersData", JSON.stringify(allUsersData));
  }
};

// Initial state (empty when Redux starts)
const initialState = { income: 0, expenses: [], totalExpenses: 0 };

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    // Initialize user data when logging in
    initializeExpenses: (state, action) => {
      const username = action.payload;
      if (username) {
        localStorage.setItem("currentUser", username); // Store logged-in user
        return { ...loadExpenses(username) };
      }
    },

    // Set income and save it
    setIncome: (state, action) => {
      const { username, income } = action.payload;
      state.income = income;
      saveExpenses(username, state);
    },

    // Add an expense and save it
    addExpense: (state, action) => {
      const { username, expense } = action.payload;
      if (!username) return;
      const newExpense = { ...expense, amount: Number(expense.amount) };
      state.expenses = [...state.expenses, newExpense]; // Maintain immutability
      state.totalExpenses += newExpense.amount;
      saveExpenses(username, state);
    },

    // Delete an expense and update storage
    deleteExpense: (state, action) => {
      const { username, id } = action.payload;
      if (!username) return;
      const expenseToRemove = state.expenses.find(exp => exp.id === id);
      if (expenseToRemove) {
        state.totalExpenses -= expenseToRemove.amount;
        state.expenses = state.expenses.filter(exp => exp.id !== id);
        saveExpenses(username, state);
      }
    },

    // Clear all user data from local storage but keep other users' data
    clearAll: (state, action) => {
      const username = action.payload;
      if (!username) return;
      state.income = 0;
      state.expenses = [];
      state.totalExpenses = 0;
      let allUsersData = JSON.parse(localStorage.getItem("allUsersData")) || {};
      delete allUsersData[username]; // Remove only this user's data
      localStorage.setItem("allUsersData", JSON.stringify(allUsersData));
    },

    // Logout: Reset Redux state, but keep local storage data
    logoutUser: (state) => {
      localStorage.removeItem("currentUser"); // Remove session user
      return { income: 0, expenses: [], totalExpenses: 0 }; // Reset Redux state
    },
  },
});

export const { initializeExpenses, setIncome, addExpense, deleteExpense, clearAll, logoutUser } = expenseSlice.actions;
export default expenseSlice.reducer;
