import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const baseUrl = "http://localhost:5600/api";

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseUrl}/admin/log`, loginData);
      localStorage.setItem("token", res.data);
      window.location.href = "/";
      console.log("Logged In user", res.data);
    } catch (error) {
      alert("Incorrect Username or password");
      window.location.reload();
    }
  };

  return (
    <div className="flex justify-center  shadow-lg h-screen items-center bg-gray-100 ">
      <div className="bg-white shadow-md rounded-md p-8  ">
        <h2 className="text-2xl font-bold text-center">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2 flex flex-col items-start justify-start p-5">
            <label className=" text-gray-700 text-sm  mb-2 capitalize">
              email address
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="email"
              onChange={handleChange}
              value={loginData.email}
            />
            <label className="text-gray-700 text-sm  mb-2 capitalize">
              password
            </label>
            <input
              type="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="password"
              onChange={handleChange}
              value={loginData.password}
            />
          </div>
          <div className="flex  space-x-8 mb-2">
            <Link to="/forgot-password">
              <p className="cursor-pointer text-lg text-gray-600">
                Forgot password
              </p>
            </Link>
          </div>
          <div className="flex items-center flex-col ">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
              Sing In
            </button>
           
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
