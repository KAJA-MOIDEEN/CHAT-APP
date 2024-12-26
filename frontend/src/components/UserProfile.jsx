import React, { useContext, useRef, useState } from 'react';
import { AuthContext } from '../authcontext/AuthContext';
import { IoClose } from 'react-icons/io5';
import { MdEdit } from 'react-icons/md';
import { IoMdCheckmark } from 'react-icons/io';
import { FaCamera } from 'react-icons/fa';
import Dropdown from './Dropdown';
import axios from 'axios';
import { backendUrl } from '../../config';
import SkeletonPie from '../components/skeleton/SkeletonPIc'


const UserProfile = () => {
    const { decodedToken, editName, editAbout, isEditName, setEditName,isDropdownOpen, setDropdownOpen,isEditAbout, setEditAbout,isLoading } = useContext(AuthContext);
    const [isModalOpen, setModalOpen] = useState(false);
    const [name, setName] = useState(decodedToken.fullName);
    const nameRef = useRef(null)
    const [about, setAbout] = useState(decodedToken.about || 'I enjoy reading, traveling...');

    
    const handleEdit = (state) => {
        if (state==="name") {
            setEditName(!isEditName);  
        }
        if (state==="about") {
           setEditAbout(!isEditAbout) 
        }
        
    };

    return (
        <div className="w-full md:w-[37%] h-64 md:h-full bg-[#2E3845] flex flex-col overflow-y-auto gap-7 p-4 md:pt-10 no-scrollbar">
            {/* Profile Section */}
            <div className="flex flex-col items-center justify-evenly w-full h-96 mb-3 bg-[#ffffffc4] relative group cursor-pointer ">
                {isLoading?<SkeletonPie/>:<div className="w-52 h-52 rounded-full border-2 overflow-hidden relative">
                    {/* Profile Pic */}
                    <img
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                        src={decodedToken.profilePic}
                        alt="ProfilePic"
                        onClick={() => setModalOpen(true)} // To open the profile picture in a modal
                    />
                    <div
                        onClick={() => setDropdownOpen(!isDropdownOpen)}  // Toggle dropdown
                        className="absolute top-0 left-0 w-full h-full hover:bg-[#1d335064] opacity-0 hover:opacity-100 flex gap-1 flex-col justify-center items-center transition-opacity duration-300"
                    >
                        <FaCamera style={{ color: 'white', fontSize: '20px' }} />
                        <h1 className="text-center text-white text-base">CHANGE<br />PROFILE PHOTO</h1>
                    </div>
                </div>}
                
                {/* Dropdown Menu (Outside of Profile Picture) */}
                {isDropdownOpen && (
                    <Dropdown setModalOpen={setModalOpen} isModalOpen={isModalOpen} />
                )}
            </div>

            {/* Full-Screen Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-75">
                    <div className="relative">
                        <img
                            className="max-w-96 max-h-96 object-contain"
                            src={decodedToken.profilePic}
                            alt="FullScreenProfilePic"
                        />
                        <IoClose
                            size={35}
                            className="absolute top-4 right-4 text-black border rounded-lg shadow-sm cursor-pointer "
                            tabIndex={0}
                            onClick={() => setModalOpen(false)}
                        />
                    </div>
                </div>
            )}

            {/* name Section 1 */}
            <div className="w-full bg-[#ffffffc4] p-3 mb-3 relative">
                <p className="ml-2 text-sm text-slate-400">Your Name</p>
                {isEditName ? (
                    <input
                        type="text"
                        className="text-lg border-b-2 w-full outline-none"
                        value={name}
                        ref={nameRef}
                        // onChange={handleChange}
                        onChange={(e) => setName(e.target.value)}
                    />
                ) : (
                    <p className="text-lg border-b-2 border-white">{decodedToken?.fullName}</p>
                )}
                {isEditName ? (
                    <div onClick={() => editName(name)} className="right-3 bottom-4 absolute">
                        <IoMdCheckmark size={23} className="text-slate-500 cursor-pointer" />
                    </div>
                ) : (
                    <div onClick={() => handleEdit("name")} className="right-3 bottom-4 absolute">
                        <MdEdit size={23} className="text-slate-500 cursor-pointer" />
                    </div>
                )}
            </div>

            {/* name Section 1 */}
            <div className="w-full bg-[#ffffffc4] p-3 mb-3 relative">
                <p className="ml-2 text-sm text-slate-400">About</p>
                {isEditAbout ? (
                    <input
                        type="text"
                        className="text-lg border-b-2 w-full outline-none"
                        value={about}
                        // ref={nameRef}
                        // onChange={handleChange}
                        onChange={(e) => setAbout(e.target.value)}
                    />
                ) : (
                    <p className="text-lg border-b-2 border-white">{decodedToken?.about}</p>
                )}
                {isEditAbout ? (
                    <div onClick={() => editAbout(about)} className="right-3 bottom-4 absolute">
                        <IoMdCheckmark size={23} className="text-slate-500 cursor-pointer" />
                    </div>
                ) : (
                    <div onClick={() => handleEdit("about")} className="right-3 bottom-4 absolute">
                        <MdEdit size={23} className="text-slate-500 cursor-pointer" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
