import axios from 'axios';
import React, { useContext, useState } from 'react';
import { IoMdCamera } from 'react-icons/io';
import { IoEyeSharp } from 'react-icons/io5';
import { MdDeleteForever, MdDriveFolderUpload } from 'react-icons/md';
import { backendUrl } from '../../config';
import { AuthContext } from '../authcontext/AuthContext';

const Dropdown = ({ isModalOpen, setModalOpen }) => {

  const {ProfilePicUpload,setDropdownOpen,isDropdownOpen}=useContext(AuthContext)

  const handleFile = (e)=>{
    const file = e.target.files[0];
    ProfilePicUpload(file)
  }

  return (
    <div className="absolute bottom-10 right-10 border bg-white shadow-md rounded-md">
      <ul>
        <li 
          onClick={() => {
            setModalOpen(!isModalOpen)
            setDropdownOpen(!isDropdownOpen)
          }} 
          className="p-2 flex items-center gap-2 hover:text-orange-400 cursor-pointer"
        >
          <IoEyeSharp style={{ color: 'black', fontSize: '20px' }} /> View Profile
        </li>
        <li className="p-2 flex items-center gap-2 hover:text-orange-400 cursor-pointer">
          <IoMdCamera style={{ color: 'black', fontSize: '20px' }} /> Take Photo
        </li>
        <li className="p-2 flex items-center gap-2 hover:text-orange-400 cursor-pointer">
          <label htmlFor="file-upload" className="flex items-center gap-2 cursor-pointer">
            <MdDriveFolderUpload style={{ color: 'black', fontSize: '20px' }} /> Upload Photo
          </label>
          <input
            id="file-upload"
            type="file"
            name='profilePic'
            className="hidden"
            onChange={handleFile}
            accept="image/*"
          />
        </li>
        <li className="p-2 flex items-center gap-2 hover:text-orange-400 cursor-pointer">
          <MdDeleteForever style={{ color: 'black', fontSize: '20px' }} /> Remove Photo
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;
