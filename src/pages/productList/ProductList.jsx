import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import axios from "axios";
import "./productList.css";

// Modal component defined within the same file
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default function ProductList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [currentIssue, setCurrentIssue] = useState(null);

  const baseUrl = "https://it-issue-tracking-api.onrender.com/api";
  useEffect(() => {
    getIssue();
  }, []);

  const handleNo=()=>{
    setIsModalOpen(false)
  }

  const getIssue = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${baseUrl}/issue/allIssue`);
      setLoading(false);
      setData(res.data.Issues);
      console.log(res.data);
    } catch (error) {
      console.log("Unable to fetch Issue");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseUrl}/issue/deleteIssue/${id}`);
      setData(data.filter((item) => item._id !== id));
      closeModal();
      setIsModalOpen(false)
      alert("Issue deleted successfully");
    } catch (error) {
      console.log("Unable to delete issue");
      alert("Unable to delete issue. Please try again later.");
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(`${baseUrl}/issue/${id}/approve`);
      setData(
        data.map((issue) =>
          issue._id === id ? { ...issue, status: "approved" } : issue
        )
      );
      alert("Issue approved successfully");
    } catch (error) {
      console.log("Unable to approve issue");
      alert("Unable to approve issue. Please try again later.");
    }
  };

  const openModal = (type, issue) => {
    setCurrentIssue(issue);

    let content;
    if (type === 'view') {
      content = (
        <div>
          <h2>Issue Details</h2>
          <p><strong>ID:</strong> {issue._id}</p>
          <p><strong>UserId:</strong> {issue.userId}</p>
          <p><strong>Title:</strong> {issue.title}</p>
          <p><strong>Description:</strong> {issue.description}</p>
          <p><strong>Status:</strong> {issue.status}</p>
          <p><strong>Department:</strong> {issue.department}</p>
          <p><strong>Category:</strong> {issue.category}</p>
          <p><strong>RoomNumber:</strong> {issue.roomNumber}</p>
        </div>
      );
    } else if (type === 'edit') {
      content = (
        <div>
          <h2>Edit Issue</h2>
          <form className="" style={{ display: "flex", flexDirection: "column" }}>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={currentIssue.title}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Description:
              <textarea
                name="description"
                value={currentIssue.description}
                onChange={handleInputChange}
                className="w-full"
              />
            </label>
            <label>
              Department:
              <input
                type="text"
                name="department"
                value={currentIssue.department}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Category:
              <input
                type="text"
                name="category"
                value={currentIssue.category}
                onChange={handleInputChange}
              />
            </label>
            <label>
              RoomNumber:
              <input
                type="text"
                name="roomNumber"
                value={currentIssue.roomNumber}
                onChange={handleInputChange}
              />
            </label>
            <button type="button" onClick={handleUpdate}>
              Update
            </button>
          </form>
        </div>
      );
    } else if (type === 'delete') {
      content = (
        <div>
          Are you sure you want to delete {issue.title}?
         <div className="flex justify-around mt-3 ">
          <button onClick={() => handleDelete(issue._id)} className="bg-sky-700 px-8 py-3 text-white rounded-lg">Yes</button>
          <button className="bg-red-800 px-8 py-3 text-white rounded-lg" onClick={handleNo}>No</button>
         </div>
        </div>
      );
    }

    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
    setCurrentIssue(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentIssue({ ...currentIssue, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${baseUrl}/issue/${currentIssue._id}`, currentIssue);
      setData(
        data.map((issue) =>
          issue._id === currentIssue._id ? currentIssue : issue
        )
      );
      closeModal();
      alert("Issue updated successfully");
    } catch (error) {
      console.log("Unable to update issue");
      alert("Unable to update issue. Please try again later.");
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
      field: "UpdateStatus",
      headerName: "UpdateStatus",
      width: 200,
      renderCell: (params) => (
        <div className="flex items-center">
          <button
            className="bg-blue-700 hover:bg-blue-800 h-10 px-3 text-white font-semibold rounded cursor-pointer mx-5"
            onClick={() => handleApprove(params.row._id)}
            disabled={params.row.status === "approved"}
          >
            {params.row.status === "approved" ? "Approved" : "Approve"}
          </button>
        </div>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => (
        <>
          <button
            className="text-gray-500 px-2"
            onClick={() => openModal('view', params.row)}
          >
            <GrView size={22} />
          </button>
          <button
            className="text-green-500 px-2"
            onClick={() => openModal('edit', params.row)}
          >
            <FaEdit size={22} />
          </button>
          <button
            className="text-red-600 px-2"
            onClick={() => openModal('delete', params.row)}
          >
            <MdDeleteForever size={22} />
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
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {modalContent}
      </Modal>
    </div>
  );
}
