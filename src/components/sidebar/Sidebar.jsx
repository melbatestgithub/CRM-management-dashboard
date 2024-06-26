import "./sidebar.css";
import { useState } from "react";
import {
  BarChart,
  DynamicFeed,
  ChatBubbleOutline,
} from "@material-ui/icons";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import VisibilityIcon from "@material-ui/icons/Visibility";
import HomeIcon from "@material-ui/icons/Home";
import BugReportRoundedIcon from "@material-ui/icons/BugReportRounded";
import PeopleIcon from "@material-ui/icons/People";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import ReportIcon from "@material-ui/icons/Report";
import { MdAdminPanelSettings } from "react-icons/md";
import AssignmentIcon from "@material-ui/icons/Assignment";

import { Link } from "react-router-dom";

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("");

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div className="sidebar dark:bg-secondary-dark-bg">
      <div className="sidebarWrapper dark:text-text-color">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link" onClick={() => handleItemClick("home")}>
              <li className={`sidebarListItem ${activeItem === "home" ? "active" : ""}`}>
                <HomeIcon className="sidebarIcon" />
                Home
              </li>
            </Link>
            <Link to="/report" className="link" onClick={() => handleItemClick("report")}>
              <li className={`sidebarListItem ${activeItem === "report" ? "active" : ""}`}>
                <ReportIcon className="sidebarIcon" />
                Analaytics and  Report
              </li>
            </Link>
            <Link to="/account" className="link" onClick={() => handleItemClick("account")}>
              <li className={`sidebarListItem ${activeItem === "account" ? "active" : ""}`}>
                <MdAdminPanelSettings className="sidebarIcon" />
               Manage Profile
              </li>
            </Link> 
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/employees" className="link" onClick={() => handleItemClick("employees")}>
              <li className={`sidebarListItem ${activeItem === "employees" ? "active" : ""}`}>
                <PeopleIcon className="sidebarIcon" />
                Employees
              </li>
            </Link>
            <Link to="/Issues" className="link" onClick={() => handleItemClick("issues")}>
              <li className={`sidebarListItem ${activeItem === "issues" ? "active" : ""}`}>
                <BugReportRoundedIcon className="sidebarIcon" />
                Issues
              </li>
            </Link>
            <Link to="/ITStaffMembers" className="link" onClick={() => handleItemClick("itStaff")}>
              <li className={`sidebarListItem ${activeItem === "itStaff" ? "active" : ""}`}>
                <GroupAddIcon className="sidebarIcon" />
                It Staff Members
              </li>
            </Link>
            <Link to="/assignIssue" className="link" onClick={() => handleItemClick("assignIssue")}>
              <li className={`sidebarListItem ${activeItem === "assignIssue" ? "active" : ""}`}>
                <AssignmentIcon className="sidebarIcon" />
                Distribute Issue
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <Link to="/ViewAssignedIssue" className="link" onClick={() => handleItemClick("viewAssignedIssue")}>
              <li className={`sidebarListItem ${activeItem === "viewAssignedIssue" ? "active" : ""}`}>
                <VisibilityIcon className="sidebarIcon" />
                View Assigned Issue
              </li>
            </Link>
            <Link to="/feedback" className="link" onClick={() => handleItemClick("feedback")}>
              <li className={`sidebarListItem ${activeItem === "feedback" ? "active" : ""}`}>
                <DynamicFeed className="sidebarIcon" />
                Customers Feedback
              </li>
            </Link>
            <Link to="/faq" className="link" onClick={() => handleItemClick("chatPage")}>
              <li className={`sidebarListItem ${activeItem === "chatPage" ? "active" : ""}`}>
                <ChatBubbleOutline className="sidebarIcon" />
                Add FAQ
              </li>
            </Link>
            <li className={`sidebarListItem ${activeItem === "logout" ? "active" : ""}`} onClick={() => handleItemClick("logout")}>
              <ExitToAppIcon className="sidebarIcon" />
              Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
