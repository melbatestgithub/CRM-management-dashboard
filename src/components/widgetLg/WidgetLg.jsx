import React, { useEffect, useState } from "react";
import "./widgetLg.css";
import axios from "axios";
import { formatDistanceToNow } from 'date-fns';

export default function WidgetLg() {
  const [issues, setIssues] = useState([]);
  const baseUrl = "https://it-issue-tracking-api.onrender.com/api";

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get(`${baseUrl}/issue/latest`);
        setIssues(response.data);
      } catch (error) {
        console.error("Error fetching issues:", error);
      }
    };

    fetchIssues();
  }, []);

  return (
    <div className="widgetLg dark:text-text-color dark:bg-secondary-dark-bg">
      <h3 className="widgetLgTitle bg-gray-900 text-white font-bold text-center">Latest Submitted Issues</h3>
      <table className="widgetLgTable">
        <thead>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Issue Title</th>
            <th className="widgetLgTh">Time Ago</th>
            <th className="widgetLgTh">Category</th>
            <th className="widgetLgTh">Status</th>
            <hr className="text-gray-500"/>
          </tr>
        </thead>
        <tbody>
          {issues.map((issue) => (
            <tr className="widgetLgTr" key={issue._id}>
              <td className="widgetLgUser">
                <span className="widgetLgName">{issue.title}</span>
              </td>
              <td className="widgetLgDate">
                {formatDistanceToNow(new Date(issue.createdAt), { addSuffix: true })}
              </td>
              <td className="widgetLgAmount">{issue.category}</td>
              <td className="widgetLgStatus">
                {issue.status === "pending" ? (
                  <span className="pending">{issue.status}</span>
                ) : issue.status === "Declined" ? (
                  <span className="declined">{issue.status}</span>
                ) : (
                  <span className="pending">{issue.status}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
