import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useState, useEffect } from "react";
import { GrView } from "react-icons/gr";
import axios from "axios";
import Modal from 'react-modal';

Modal.setAppElement('#root');  // Important for accessibility

export default function UserList() {
  const baseUrl = "https://it-issue-tracking-api.onrender.com/api";
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseUrl}/users/delete/${id}`);
      setData(data.filter((item) => item._id !== id));
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${baseUrl}/users/getAll`);
      setData(res.data.users);
      setLoading(false)
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  const openViewModal = (user) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const closeModal = () => {
    setIsViewModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedUser(null);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${baseUrl}/users/updateUser/${selectedUser._id}`, selectedUser);
      alert('User Is Updated ')
      setIsEditModalOpen(false);
      getUser(); // Refresh the data
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };






  const columns = [
    { field: "_id", headerName: "ID", width: 230 },
    {
      field: "user",
      headerName: "Full Name",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.profile} alt="" />
            {params.row.firstName + " " + params.row.lastName}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    { field: "address", headerName: "Address", width: 180 },
    { field: "phoneNumber", headerName: "Phone Number", width: 200 },
    { field: "emergencyContact", headerName: "Emergency Contact", width: 220 },
    { field: "department", headerName: "Department", width: 220 },
    { field: "employmentType", headerName: "Employment Type", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <button className="text-gray-500 px-2" onClick={() => openViewModal(params.row)}>
              <GrView size={22} />
            </button>
            <button className="text-green-500 px-2" onClick={() => openEditModal(params.row)}>
              <FaEdit size={22} />
            </button>
            <button className="text-red-600 px-2" onClick={() => openDeleteModal(params.row)}>
              <MdDeleteForever size={22} />
            </button>
          </>
        );
      },
    },
  ];

  return (
    <div className="userList m-4 px-4 dark:bg-white">
       {loading && <p className="bg-green-500 text-white p-2">Loading...</p>}
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />

      {/* View Modal */}
      {isViewModalOpen && selectedUser && (
        <Modal
          isOpen={isViewModalOpen}
          onRequestClose={closeModal}
          className="modal "
          overlayClassName="overlay"
          contentLabel="View User"
        >
          <h2 className="p-2 text-xl font-bold bg-gray-800 text-white text-center">View Employee Data</h2>
          <p className="my-2 text-gray-700 text-lg font-sans">Full Name:<p>{selectedUser.firstName} {selectedUser.lastName}</p> </p>
          <p className="my-2 text-gray-700 text-lg font-sans">Email:<p>{selectedUser.email}</p> </p>
          <p className="my-2 text-gray-700 text-lg font-sans">Address: <p>{selectedUser.address}</p></p>
          <p className="my-2 text-gray-700 text-lg font-sans">Phone Number: <p>{selectedUser.phoneNumber}</p></p>
          <p className="my-2 text-gray-700 text-lg font-sans">Emergency Contact: <p>{selectedUser.emergencyContact}</p></p>
          <p className="my-2 text-gray-700 text-lg font-sans">Department:<p>{selectedUser.department}</p> </p>
          <p className="my-2 text-gray-700 text-lg font-sans">Employment Type:<p>{selectedUser.employmentType}</p> </p>
          <button onClick={closeModal} className="btn bg-red-900 text-white font-bold mb-8">Close</button>
        </Modal>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && selectedUser && (
        <Modal
          isOpen={isEditModalOpen}
          onRequestClose={closeModal}
          className="modal"
          overlayClassName="overlay"
          contentLabel="Edit User"
        >
          <h2>Edit Employee</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
            <div className="modalField">
              <label>First Name</label>
              <input
                type="text"
                value={selectedUser.firstName}
                onChange={(e) => setSelectedUser({ ...selectedUser, firstName: e.target.value })}
              />
            </div>
            <div className="modalField">
              <label>Last Name</label>
              <input
                type="text"
                value={selectedUser.lastName}
                onChange={(e) => setSelectedUser({ ...selectedUser, lastName: e.target.value })}
              />
            </div>
            <div className="modalField">
              <label>Email</label>
              <input
                type="text"
                value={selectedUser.email}
                onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
              />
            </div>
            <div className="modalField">
              <label>Address</label>
              <input
                type="text"
                value={selectedUser.address}
                onChange={(e) => setSelectedUser({ ...selectedUser, address: e.target.value })}
              />
            </div>
            <div className="modalField">
              <label>Phone Number</label>
              <input
                type="text"
                value={selectedUser.phoneNumber}
                onChange={(e) => setSelectedUser({ ...selectedUser, phoneNumber: e.target.value })}
              />
            </div>
            <div className="modalField">
              <label>Emergency Contact</label>
              <input
                type="text"
                value={selectedUser.emergencyContact}
                onChange={(e) => setSelectedUser({ ...selectedUser, emergencyContact: e.target.value })}
              />
            </div>
            <div className="modalField">
              <label>Department</label>
              <input
                type="text"
                value={selectedUser.department}
                onChange={(e) => setSelectedUser({ ...selectedUser, department: e.target.value })}
              />
            </div>
            <div className="modalField">
              <label>Employment Type</label>
              <input
                type="text"
                value={selectedUser.employmentType}
                onChange={(e) => setSelectedUser({ ...selectedUser, employmentType: e.target.value })}
              />
            </div>

            <div className="my-8  flex  pb-6 justify-around">
            <button type="submit" className="btn p-2 mb-3 bg-gray-900 text-white">Update</button>
            <button type="submit" className="btn p-2 mb-3 bg-red-900 text-white" onClick={closeModal}>Close</button>
            </div>
          </form>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedUser && (
        <Modal
          isOpen={isDeleteModalOpen}
          onRequestClose={closeModal}
          className="modal pb-0"
          overlayClassName="overlay"
          contentLabel="Delete User"
          
        >
          <h2 className="mb-2 p-2 text-lg text-gray-600">Are you sure you want to delete {selectedUser.firstName} {selectedUser.lastName}?</h2>
          <div className="flex gap-8">
          <button onClick={() => handleDelete(selectedUser._id)} className="btn text-white bg-gray-900">Yes</button>
          <button onClick={closeModal} className="btn bg-red-900 text-white">No</button>

          </div>
          
        </Modal>
      )}
    </div>
  );
}
