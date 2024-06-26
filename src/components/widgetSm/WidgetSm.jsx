import React, { useEffect, useState } from "react";
import { Visibility, Close } from "@material-ui/icons";
import axios from "axios";
import "./widgetSm.css";

export default function WidgetSm() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const baseUrl = "https://it-issue-tracking-api.onrender.com/api";

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`${baseUrl}/users/latest-employees`);
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const closeModal = () => {
    setSelectedEmployee(null);
  };

  return (
    <div className="widgetSm dark:text-text-color p-10 dark:bg-secondary-dark-bg">
      <span className="widgetSmTitle bg-gray-900 text-white font-bold w-30">New Join Members</span>
      <ul className="widgetSmList">
        {employees.map((employee) => (
          <li className="widgetSmListItem" key={employee._id}>
            <img
              src={employee.profile || "https://via.placeholder.com/150"}
              alt={employee.firstName}
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{`${employee.firstName} ${employee.lastName}`}</span>
              <span className="widgetSmUserTitle">{employee.position}</span>
            </div>
            <button
              className="widgetSmButton bg-blue-500"
              onClick={() => setSelectedEmployee(employee)}
            >
              <Visibility className="widgetSmIcon bg-b-500"  />
              Display
            </button>
          </li>
        ))}
      </ul>
      {selectedEmployee && (
        <div className="modalBackground" onClick={closeModal}>
          <div
            className="modalContainer"
            onClick={(e) => e.stopPropagation()}
          >
            <Close className="closeIcon" onClick={closeModal} />
            <h2 className="text-lg font-bold">{`${selectedEmployee.firstName} ${selectedEmployee.lastName}`}</h2>
            <p>Email: {selectedEmployee.email}</p>
            <p>Department: {selectedEmployee.department}</p>
            <p>Address: {selectedEmployee.address}</p>
            <p>Phone Number: {selectedEmployee.phoneNumber}</p>
            <p>Employment Type: {selectedEmployee.employmentType}</p>
            <p>Emergency Contact: {selectedEmployee.emergencyContact}</p>
          </div>
        </div>
      )}
    </div>
  );
}
