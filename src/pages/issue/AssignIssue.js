import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import "./assigned.css";

export default function AssignIssue() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [staffEmail, setEmail] = useState([]);
  const [selectedIssueId, setSelectedIssueId] = useState(null);
  const [priority, setPriority] = useState(""); // Add state for priority

  const baseUrl = "http://localhost:5600/api";

  useEffect(() => {
    getIssue();
    fetchEmail();
  }, []);

  const fetchEmail = async () => {
    try {
      const res = await axios.get(`${baseUrl}/users/getITstaffEmail`);
      setEmail(res.data.ITStaffDetails);
    } catch (error) {
      console.log("Error fetching IT staff email:", error);
    }
  };

  const handleAssign = (issueId) => {
    setSelectedIssueId(issueId); // Set selectedIssueId when assign button is clicked
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleEmailChange = (e) => {
    setSelectedEmail(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value); // Handle priority change
  };

  const handleAssignIssue = async (selectedIssueId, selectedEmail, priority) => {
    try {
      const res = await axios.put(`${baseUrl}/issue/assignIssue`, {
        issueId: selectedIssueId,
        assignedTo: selectedEmail,
        priority: priority, // Include priority in the request
      });
      console.log(res);
      alert("Success");
      setShowModal(false);
      // Remove the assigned issue from the data state
      setData((prevData) => prevData.filter((issue) => issue._id !== selectedIssueId));
    } catch (error) {
      setShowModal(false);
      console.log("Error in assigning Issue:", error);
      alert("Error");
    }
  };

  const getIssue = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${baseUrl}/issue/approved`);
      // Filter to only include issues that have not been assigned
      const unassignedIssues = res.data.Issues.filter(issue => !issue.assignedTo);
      setData(unassignedIssues);
      console.log(unassignedIssues);
      setLoading(false);
    } catch (error) {
      console.log("Unable to fetch unassigned issues:", error);
      setLoading(false);
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    { field: "userId", headerName: "UserId", width: 220 },
    { field: "title", headerName: "Issue Title", width: 180 },
    { field: "description", headerName: "Description", width: 400 },
    { field: "status", headerName: "Status", width: 120 },
    { field: "department", headerName: "Department", width: 200 },
    { field: "category", headerName: "Category", width: 160 },
    { field: "roomNumber", headerName: "Employee RoomNumber", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => (
        <>
          <button
            className="text-white bg-blue-500 p-2 mt-2"
            onClick={() => handleAssign(params.row._id)}
          >
            Assign Issue
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="productList m-4 px-4 dark:bg-white">
      {loading && <p className="bg-green-500 text-white p-2">Loading...</p>}
      <DataGrid
        rows={data}
        getRowId={(row) => row._id}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-10 rounded-lg flex flex-col " style={{ width: "600px" }}>
            <h2 className="text-xl font-bold mb-4 bg-gray-900 text-white p-3">
              Assign Issue for Staff members
            </h2>
            <select
              value={selectedEmail}
              onChange={handleEmailChange}
              className="border border-gray-300 rounded-md p-3 mb-4"
            >
              <option value="">Select IT staff </option>
              {staffEmail.map((staff) => (
                <option key={staff.email} value={staff.email} className="p-3 my-2">
                  {`${staff.email} (${staff.firstName} ${staff.lastName})`}
                </option>
              ))}
            </select>
            <select
              value={priority}
              onChange={handlePriorityChange} // Handle priority change
              className="border border-gray-300 rounded-md p-3 mb-4 select-dropdown"
            >
              <option value="" className="select-option">Select Priority</option>
              <option value="low" className="select-option">Low</option>
              <option value="medium" className="select-option">Medium</option>
              <option value="high" className="select-option">High</option>
            </select>
            <div className="flex justify-between">
              <button
                onClick={() => handleAssignIssue(selectedIssueId, selectedEmail, priority)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Assign
              </button>
              <button
                onClick={handleModalClose}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
