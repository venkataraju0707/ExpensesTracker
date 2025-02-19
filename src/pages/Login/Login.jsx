import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup, login } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      dispatch(signup(formData));
      dispatch(login({ username: formData.username, password: formData.password }));
    } else {
      dispatch(login({ username: formData.username, password: formData.password }));
    }
    setFormData({ username: "", email: "", password: "" });
  };

  return (
    <div className="login-container">
      <h2>{isSignUp ? "Sign Up" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        {isSignUp && (
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        )}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">{isSignUp ? "Sign Up" : "Login"}</button>
      </form>
      <p onClick={() => setIsSignUp(!isSignUp)} className="toggle-text">
        {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
      </p>
    </div>
  );
};

export default Login;
