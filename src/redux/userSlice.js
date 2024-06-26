import { createSlice } from "@reduxjs/toolkit";

// Safely parse JSON from localStorage
const getUserFromLocalStorage = () => {
  try {
    const user = localStorage.getItem("user");
    console.log("localStorage.getItem('user'):", user);
    if (user) {
      return JSON.parse(user);
    }
  } catch (error) {
    console.error("Error parsing user data from localStorage:", error);
    localStorage.removeItem("user"); // Clear corrupted data
  }
  return null;
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: getUserFromLocalStorage(),
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      try {
        localStorage.setItem("user", JSON.stringify(action.payload));
      } catch (error) {
        console.error("Error saving user data to localStorage:", error);
      }
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("user");
      // Redirect to login page if necessary
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;
export default userSlice.reducer;
