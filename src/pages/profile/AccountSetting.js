
// AccountSetting component

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
} from '@material-ui/icons';
import '../user/user.css';

const AccountSetting = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    address: '',
    firstName: '',
    lastName: '',
  });

  const baseUrl = 'http://localhost:5600/api';
  const storedUserData = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    // Fetch data from localStorage
    if (storedUserData) {
      setFormData({
        username: storedUserData.username || '',
        email: storedUserData.email || '',
        firstName: storedUserData.firstName || '',
        lastName: storedUserData.lastName || '',
        phone: storedUserData.phone || '',
        address: storedUserData.address || '',
        fullName: storedUserData.firstName + ' ' + storedUserData.lastName,
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${baseUrl}/users/updateUser/${storedUserData._id}`,
        formData
      );
      if (response.status === 200) {
        alert('Profile updated successfully');
        // Optionally update localStorage with new data
        localStorage.setItem('user', JSON.stringify(formData));
        console.log(response.data);
      } else {
        alert('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('An error occurred while updating the profile');
    }
  };

  return (
    <div className="user">
      <div className="userTitleContainer bg-gray-800 p-2">
        <h1 className="userTitle text-center text-white dark:text-gray-200">
          Welcome {storedUserData.firstName}
        </h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://i.pinimg.com/564x/d2/98/4e/d2984ec4b65a8568eab3dc2b640fc58e.jpg"
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername dark:text-gray-400">{formData.fullName}</span>
              <span className="userShowUserTitle dark:text-gray-400">Software Engineer</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon dark:text-gray-400" />
              <span className="userShowInfoTitle dark:text-gray-400">{formData.username}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon dark:text-gray-400" />
              <span className="userShowInfoTitle dark:text-gray-400">10.12.1999</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon dark:text-gray-400" />
              <span className="userShowInfoTitle dark:text-gray-400">{formData.phone}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon dark:text-gray-400" />
              <span className="userShowInfoTitle dark:text-gray-400">{formData.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon dark:text-gray-400" />
              <span className="userShowInfoTitle dark:text-gray-400">{formData.address}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle dark:text-gray-400">Update Profile</span>
          <form className="userUpdateForm" onSubmit={handleFormSubmit}>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label className='dark:text-gray-400'>Username</label>
                <input
                  type="text"
                  placeholder="annabeck99"
                  className="userUpdateInput px-2"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>
              <div className="userUpdateItem">
                <label className='dark:text-gray-400'>Full Name</label>
                <input
                  type="text"
                  placeholder="Anna Becker"
                  className="userUpdateInput px-2"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="userUpdateItem">
                <label className='dark:text-gray-400'>Email</label>
                <input
                  type="text"
                  placeholder="annabeck99@gmail.com"
                  className="userUpdateInput px-2"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="userUpdateItem">
                <label className='dark:text-gray-400'>Phone</label>
                <input
                  type="text"
                  placeholder="+1 123 456 67"
                  className="userUpdateInput px-2"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="userUpdateItem">
                <label className='dark:text-gray-400'>Address</label>
                <input
                  type="text"
                  placeholder="New York | USA"
                  className="userUpdateInput px-2"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="">
              <button className=" m-3 bg-sky-700 px-3 py-2 text-white rounded-md hover: bg-sky-900" type="submit">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountSetting;