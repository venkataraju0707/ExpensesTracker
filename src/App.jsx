import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExpenseForm from './pages/ExpenseForm/ExpenseForm.jsx';
import Login from "./pages/Login/Login.jsx";
import Home from "./pages/Home/Home.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import ExpenseChart from "./components/ExpenseChart/ExpenseChart.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/expenseform" element={<ExpenseForm />} />
        <Route path="/analysis" element={<ExpenseChart />} />   
      </Routes>
    </Router>
  );
}

export default App;
