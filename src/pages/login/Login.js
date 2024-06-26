import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginStart, loginFailure, loginSuccess } from "../../redux/userSlice";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const baseUrl = "https://it-issue-tracking-api.onrender.com/api";

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });

    let error = "";
    if (name === "email") {
      if (!value) {
        error = "Email is required.";
      } else if (!validateEmail(value)) {
        error = "Email is not valid.";
      }
    }
    if (name === "password") {
      if (!value) {
        error = "Password is required.";
      } else if (value.length < 6) {
        error = "Password must be at least 6 characters.";
      }
    }
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (errors.email || errors.password) {
      alert("Please fix the errors before submitting.");
      return;
    }
    dispatch(loginStart());
    try {
      const res = await axios.post(`${baseUrl}/admin/log`, loginData);
      const user = res.data.others;
      if (!user || !user.email) {
        alert("User not found");
        return;
      }
      dispatch(loginSuccess(user));
      window.location.href = "/";
    } catch (error) {
      dispatch(loginFailure());
      alert("Incorrect Username or password");
      window.location.reload();
    }
  };

  return (
    <div className="flex justify-center shadow-lg h-screen items-center bg-gray-100">
      <div className="bg-white shadow-md rounded-md p-8">
        <h2 className="text-2xl font-bold text-center">Admin Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2 flex flex-col items-start justify-start p-5">
            <label className="text-gray-700 text-sm mb-2 capitalize">email address</label>
            <input
              type="text"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.email ? "border-red-500" : ""
              }`}
              name="email"
              onChange={handleChange}
              value={loginData.email}
              required
            />
            {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
            <label className="text-gray-700 text-sm mb-2 capitalize">password</label>
            <input
              type="password"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.password ? "border-red-500" : ""
              }`}
              name="password"
              onChange={handleChange}
              value={loginData.password}
              required
            />
            {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
          </div>
          <div className="flex space-x-8 mb-2">
            <Link to="/forgot-password">
              <p className="cursor-pointer text-lg text-gray-600">Forgot password</p>
            </Link>
          </div>
          <div className="flex items-center flex-col">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
