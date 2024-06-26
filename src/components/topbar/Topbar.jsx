
import React, { useEffect, useState } from "react";
import "./topbar.css";
import { NotificationsNone, Settings } from "@material-ui/icons";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import moe from "../../assets/MOE.png";
import { useDispatch, useSelector } from "react-redux";
import { setThemeSettings } from "../../redux/contextSlice";
import { MdKeyboardArrowDown } from "react-icons/md";
import Tooltip from "@material-ui/core/Tooltip";
import test from "../../assets/test.jpg";
import ThemeSettings from "../theme/ThemeSettings";
import { handleClick } from "../../redux/contextSlice";
import Profile from "../profile/Profile";
import Chat from "../chat/Chat";
import Notification from "../notification/Notification";
import axios from "axios";

export default function Topbar() {
  const { themeSettings, isClicked } = useSelector((state) => state.context);
  const dispatch = useDispatch();
  const [notificationCount, setNotificationCount] = useState(0);

  const handleSettingsClick = () => {
    dispatch(setThemeSettings(true));
  };

  useEffect(() => {
    const fetchNotificationCount = async () => {
      try {
        const response = await axios.get('http://localhost:5600/api/users/newly-registered');
        setNotificationCount(response.data.length);
      } catch (error) {
        console.error('Error fetching notification count:', error);
      }
    };

    fetchNotificationCount();
  }, []);

  const handleNotificationClick = () => {
    dispatch(handleClick("notification"));
    setNotificationCount(0);
  };

  return (
    <div className="topbar h-24 mt-0 dark:bg-secondary-dark-bg dark:text-text-color">
      <div className="topbarWrapper">
        <div className="topLeft">
          <img src={moe} alt="we" />
          <span className="logo dark:text-white">
            Ministry Of Education
          </span>
        </div>
        <div className="topRight">
          <div
            className="topbarIconContainer dark:text-text-color"
            onClick={handleNotificationClick}
          >
            <NotificationsNone />
            <span className="topIconBadge">{notificationCount}</span>
          </div>
          
          <div className="topbarIconContainer">
            <Tooltip title="Settings">
              <button type="button" onClick={handleSettingsClick}>
                <Settings className="dark:text-text-color" />
              </button>
            </Tooltip>
          </div>
          <Tooltip content="Profile" position="BottomCenter">
            <div
              className="flex items-center gap-2 cursor-pointer p-1 rounded-lg"
              onClick={() => dispatch(handleClick("userProfile"))}
            >
              <img
                className="rounded-full w-8 h-8"
                src={"https://i.pinimg.com/564x/d2/98/4e/d2984ec4b65a8568eab3dc2b640fc58e.jpg"}
                alt="user-profile"
              />
              <p>
                <span className="text-gray-400 font-bold ml-1 text-14">
                  Melba
                </span>
              </p>
              <MdKeyboardArrowDown className="text-gray-400 text-14" />
            </div>
          </Tooltip>
        </div>
      </div>
      {themeSettings && <ThemeSettings />}
      {isClicked?.userProfile && <Profile />}
      {isClicked?.notification && <Notification />}
      {isClicked?.chat && <Chat />}
    </div>
  );
}