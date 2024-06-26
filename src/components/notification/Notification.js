
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { MdOutlineCancel } from "react-icons/md";
import axios from "axios";
import { setIsClicked } from "../../redux/contextSlice";

const Notification = () => {
  const dispatch = useDispatch();
  const [newUsers, setNewUsers] = useState([]);

  useEffect(() => {
    const fetchNewlyRegisteredUsers = async () => {
      try {
        const response = await axios.get('https://it-issue-tracking-api.onrender.com/api/users/newly-registered');
        setNewUsers(response.data);
      } catch (error) {
        console.error('Error fetching newly registered users:', error);
      }
    };

    fetchNewlyRegisteredUsers();
  }, []);

  const handleCancelClick = () => {
    dispatch(setIsClicked({ notification: false }));
  };

  return (
    <div className="nav-item absolute right-5 md:right-52 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <p className="font-semibold text-lg dark:text-gray-200">New Users</p>
          <button
            type="button"
            className="text-white text-xs rounded p-1 px-2 bg-orange"
          >
            {newUsers.length} New
          </button>
        </div>
        <button onClick={handleCancelClick}>
          <MdOutlineCancel />
        </button>
      </div>
      <div className="mt-5">
        {newUsers.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm">No newly joined users</p>
        ) : (
          newUsers.map((user) => (
            <div
              key={user._id}
              className="flex items-center gap-5 border-b-1 border-color p-3 leading-8 cursor-pointer"
            >
              <div className="relative">
                <img
                  className="rounded-full h-10 w-10"
                  src={user.profileImage || "https://i.pinimg.com/564x/d2/98/4e/d2984ec4b65a8568eab3dc2b640fc58e.jpg"} // Adjust based on your user data structure
                  alt={`${user.firstName}'s profile`}
                />
              </div>
              <div>
                <p className="font-semibold dark:text-gray-200">
                  {user.firstName}
                </p>
                {user.joinedAt && (
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Joined on {new Date(user.joinedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
        <div className="mt-5">
          <button className="text-blue-500 dark:text-blue-300">See all</button>
        </div>
      </div>
    </div>
  );
};

export default Notification;