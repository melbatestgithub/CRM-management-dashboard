import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineCancel } from "react-icons/md";
import { setIsClicked } from "../../redux/contextSlice";
import {logout} from '../../redux/userSlice'
import { Link } from "react-router-dom";
const Profile = () => {
  const dispatch = useDispatch();

  const user=JSON.parse(localStorage.getItem("user"))
  console.log(user)

  const handleCancelClick = () => {
    dispatch(setIsClicked({ userProfile: false }));
  };
  const handleLogout = () => {
  dispatch(logout())
  };
  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">
          Admin Profile
        </p>
       
        <button onClick={handleCancelClick} className="rounded-full">
          <MdOutlineCancel />
        </button>
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img className="rounded-full h-24 w-24" src={"https://i.pinimg.com/564x/d2/98/4e/d2984ec4b65a8568eab3dc2b640fc58e.jpg"} alt="user-profile" />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200">
            {" "}
            {user.firstName} {user.lastName}
          </p>
          <p className="text-gray-500 text-sm dark:text-gray-400">
            {" "}
            Administrator{" "}
          </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
            {" "}
           {user.email}
          </p>
        </div>
      </div>
      <div>
       
          <div
            className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]"
          >
            <Link to="account">
             
              <div>
              <p className="font-semibold text-gray-200 dark:text-gray-200 ">my profile</p>
              <p className="text-gray-500 text-sm dark:text-gray-400">
                Account Setting
              </p>
            </div>
             
            </Link>
            
            </div>
        <div className="w-26 m-2">
          <Link to="/login">
          <button className="w-full bg-red-800 p-2 rounded-md text-white " onClick={handleLogout}>Logout</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
