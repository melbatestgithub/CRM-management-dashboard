import React, { useEffect, useState } from "react";
import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import PeopleIcon from "@material-ui/icons/People";
import BugReportIcon from "@material-ui/icons/BugReport";
import axios from "axios";

export default function FeaturedInfo() {
  const [data, setData] = useState({
    employees: 0,
    itStaffMembers: 0,
    closedIssues: 0,
    issues: 0,
    openedIssues: 0,
    employeesPercentChange: 0,
    itStaffMembersPercentChange: 0,
    closedIssuesPercentChange: 0,
    issuesPercentChange: 4,
    openedIssuesPercentChange: 0,
  });
  const baseUrl = "http://localhost:5600/api";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${baseUrl}/dashboard/dashboard-data`);
        setData({
          employees: res.data.employees,
          itStaffMembers: res.data.itStaffMembers,
          closedIssues: res.data.closedIssues,
          issues: res.data.issues,
          openedIssues: res.data.openedIssues,
          employeesPercentChange: calculatePercentChange(res.data.employees, res.data.lastMonthEmployees),
          itStaffMembersPercentChange: calculatePercentChange(res.data.itStaffMembers, res.data.lastMonthItStaffMembers),
          closedIssuesPercentChange: calculatePercentChange(res.data.closedIssues, res.data.lastMonthClosedIssues),
          issuesPercentChange: calculatePercentChange(res.data.issues, res.data.lastMonthIssues),
          openedIssuesPercentChange: calculatePercentChange(res.data.openedIssues, res.data.lastMonthOpenedIssues),
        });
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const calculatePercentChange = (currentValue, lastMonthValue) => {
    if (lastMonthValue === 0) {
      return currentValue === 0 ? 0 : 100;
    }
    return ((currentValue - lastMonthValue) / lastMonthValue) * 100;
  };
  

  return (
    <div className="featured">
      <div className="featuredItem flex justify-between items-center dark:bg-secondary-dark-bg dark:text-text-color">
        <div>
       
        <div className="title-icon">
          <PeopleIcon />
          <span className="featuredTitle">Employees</span>
        </div>
       
          <div>

          <span className="featuredMoney">{data.employees}</span>
          </div>
          </div>
          <span className="featuredPercentChange mr-6 bg-blue-500 p-3 text-white border-none rounded-xl">
            {data.issuesPercentChange > 0 ? (
              <ArrowUpward className="featuredIcon positive " />
            ) : (
              <ArrowDownward className="featuredIcon negative" />
            )}
           2%
          </span>
        
      </div>
      <div className="featuredItem  flex justify-between items-center dark:bg-secondary-dark-bg dark:text-text-color">
        <div>

      
        <div className="title-icon">
          <PeopleIcon />
          <span className="featuredTitle">IT Staff Members</span>
        </div>
       
          <div>

          <span className="featuredMoney">{data.itStaffMembers}</span>
          </div>
          </div>
          <span className="featuredPercentChange mr-6 bg-blue-500 p-3 text-white border-none rounded-xl">
            {data.issuesPercentChange > 0 ? (
              <ArrowUpward className="featuredIcon positive " />
            ) : (
              <ArrowDownward className="featuredIcon negative" />
            )}
            12%
          </span>
      
      </div>
      <div className="featuredItem  flex justify-between items-center dark:bg-secondary-dark-bg dark:text-text-color">
        <div>
        <div className="title-icon">
          <CancelPresentationIcon />
          <span className="featuredTitle">Closed Issues</span>
        </div>

        
          <div>
          <span className="featuredMoney">{data.closedIssues}</span>
          </div>
          
          </div>
          <span className="featuredPercentChange mr-6 bg-blue-500 p-3 text-white border-none rounded-xl">
            {data.issuesPercentChange > 0 ? (
              <ArrowUpward className="featuredIcon positive " />
            ) : (
              <ArrowDownward className="featuredIcon negative" />
            )}
           8%
          </span>
     
      </div>


      <div className="featuredItem flex justify-between items-center dark:bg-secondary-dark-bg dark:text-text-color">

        <div>
        <div className="title-icon">
          <BugReportIcon />
          <span className="featuredTitle">Issues</span>
        </div>
          <div>
          <span className="featuredMoney">{data.issues}</span>
          </div>
          </div>
          <span className="featuredPercentChange mr-6 bg-blue-500 p-3 text-white border-none rounded-xl">
            {data.issuesPercentChange > 0 ? (
              <ArrowUpward className="featuredIcon positive " />
            ) : (
              <ArrowDownward className="featuredIcon negative" />
            )}
          6%
          </span>
      </div>


      <div className="featuredItem dark:bg-secondary-dark-bg dark:text-text-color flex justify-between items-center">
        <div>
        <div className="title-icon">
          <OpenInNewIcon />
          <span className="featuredTitle">Opened Issues</span>
        </div>

        <div>
          <span className="featuredMoney">{data.openedIssues}</span>
        </div>

        </div>
        <span className="featuredPercentChange mr-6 bg-blue-500 p-3 text-white border-none rounded-xl">
            {data.issuesPercentChange > 0 ? (
              <ArrowUpward className="featuredIcon positive " />
            ) : (
              <ArrowDownward className="featuredIcon negative" />
            )}
           11%
          </span>
        
      </div>

    </div>
  );
}
