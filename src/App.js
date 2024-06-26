import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import UserList from "./pages/userList/UserList";
import ITStaff from "./pages/ITStaff/ITStaff";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import AssignIssue from "./pages/issue/AssignIssue";
import { setCurrentColor, setCurrentMode } from "./redux/contextSlice";
import AccountSetting from "./pages/profile/AccountSetting";
import GenerateReport from './pages/report/Report'
import ViewAssignedIssue from './pages/viewIssue/View'
import Feedback from './pages/feedback/Feedback'
import FAQ from './pages/faq/FAQ'

function App() {
  // const admin = JSON.parse(
  //   JSON.parse(localStorage.getItem("persist:root")).user
  // ).currentUser.accessToken;
  const admin = true;

  const currentMode = useSelector((state) => state.context.currentMode);

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);
  console.log(currentMode);
  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <Router>
        <div className="  dark:bg-main-dark-bg ">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/*"
              element={
                admin ? (
                  <>
                    <Topbar />
                    <div className="container">
                      <Sidebar />
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/employees" element={<UserList />} />
                        <Route path="/ITStaffMembers" element={<ITStaff />} />
                        <Route path="/user/:userId" element={<User />} />
                        <Route path="/newUser" element={<NewUser />} />
                        <Route path="/Issues" element={<ProductList />} />
                        <Route
                          path="/product/:productId"
                          element={<Product />}
                        />
                        <Route path="/newproduct" element={<NewProduct />} />
                        <Route path="/account" element={<AccountSetting />} />
                        <Route path="/assignIssue" element={<AssignIssue />} />
                        <Route path="/report" element={<GenerateReport />} />
                        <Route path="/ViewAssignedIssue" element={<ViewAssignedIssue />} />
                        <Route path="/feedback" element={<Feedback />} />
                        <Route path="/faq" element={<FAQ />} />
                       
                      </Routes>
                    </div>
                  </>
                ) : null
              }
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
