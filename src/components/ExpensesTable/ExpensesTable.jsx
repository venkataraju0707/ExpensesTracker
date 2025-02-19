import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import "./ExpensesTable.css"; 
import { deleteExpense } from "../../redux/expenseSlice";

const ExpenseTable = () => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.expenses); 

  const [localExpenses, setLocalExpenses] = useState(expenses);

  useEffect(() => {
    setLocalExpenses(expenses);
  }, [expenses]);

  const RemoveItem = (expenseId) => {
    dispatch(deleteExpense(expenseId));
  };

  return (
    <div >
      <TableContainer component={Paper} className="table-container">
        <Table className="expense-table">
          <TableHead>
            <TableRow className="table-header">
              <TableCell>Date</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Amount (₹)</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {localExpenses.length > 0 ? (
              localExpenses.map((expense) => (
                <TableRow key={expense.id} className="table-row">
                  <TableCell>{expense.date}</TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell className="amount">₹{expense.amount}</TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => RemoveItem(expense.id)}
                      size="small"
                    >
                      X
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="no-expenses">
                  No expenses recorded
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ExpenseTable;
