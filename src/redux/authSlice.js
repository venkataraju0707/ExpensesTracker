import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    users: [], 
    currentUser: null,  
  },
  reducers: {
    signup: (state, action) => {
      state.users.push(action.payload); 
    },
    login: (state, action) => {
      const { username, password } = action.payload;
      const existingUser = state.users.find(
        (user) => user.username === username && user.password === password
      );
      if (existingUser) {
        state.currentUser = existingUser; 
      } else {
        alert("Invalid username or password!");
      }
    },
    logout: (state) => {
      state.currentUser = null;
    },
  },
});

export const { signup, login, logout } = authSlice.actions;
export default authSlice.reducer;
