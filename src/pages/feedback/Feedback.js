
import { DataGrid } from "@material-ui/data-grid";
import { MdDeleteForever } from "react-icons/md";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { useState, useEffect } from "react";
import { GrView } from "react-icons/gr";
import axios from "axios";

export default function Feedback() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  const baseUrl = "http://localhost:5600/api";
  useEffect(() => {
    getIssue();
  }, []);
  const getIssue = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${baseUrl}/feedback/getFeedback`);
      setData(res.data);
      console.log(res.data);
      setLoading(false)
    } catch (error) {
      console.log("Unable to fetch Feedback");
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    { field: "employeeFullName", headerName: "Full Name", width: 220 },
    { field: "email", headerName: "Email", width: 220 },
    
    {
      field: "message",
      headerName: "Message",
      width: 400,
    },
    {
      field: "department",
      headerName: "Department",
      width: 200,
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
    </div>
  );
}
