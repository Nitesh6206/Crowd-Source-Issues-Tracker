import { createSlice } from "@reduxjs/toolkit";

const userString = sessionStorage.getItem("user");
const storedUser = userString ? JSON.parse(userString) : null;

const initialState = {
  user: storedUser,
  isAuthenticated: !!storedUser,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
      sessionStorage.setItem("user", JSON.stringify(action.payload)); 
    },
    logout(state) {
      state.user = null;
      console.log(state.user,"user logged out");
      state.isAuthenticated = false;
      sessionStorage.removeItem("user");
    },
    register(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
     sessionStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
});

export const { login, logout, register } = authSlice.actions;
export default authSlice.reducer;
