import React, { useContext, useState } from 'react';
import { AuthContext } from '../authcontext/AuthContext';
import { IoClose } from 'react-icons/io5';
import { MdEdit } from 'react-icons/md';
import { IoMdCheckmark } from 'react-icons/io';
import { FaCamera } from 'react-icons/fa';
import Dropdown from './Dropdown';

const UserProfile = () => {
    const { decodedToken, editName, editAbout, isEditName, setEditName } = useContext(AuthContext);
    const [isModalOpen, setModalOpen] = useState(false);
    const [name, setName] = useState(decodedToken.userName);
    const [about, setAbout] = useState(decodedToken.about || 'I enjoy reading, traveling...');
    const [isEditAbout, setEditAbout] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const handleEdit = () => {
        setEditName(!isEditName);
    };

    const handleClick = (state) => {
        if (state === 'name') {
            editName();
        }
        if (state === 'about') {
            editAbout();
        }
    };

    return (
        <div className="w-full md:w-[37%] h-64 md:h-full bg-[#2E3845] flex flex-col overflow-y-auto gap-7 p-4 md:pt-10 no-scrollbar">
            {/* Profile Section */}
            <div className="flex flex-col items-center justify-evenly w-full h-96 mb-3 bg-white relative group cursor-pointer">
                <div className="w-52 h-52 rounded-full border-2 overflow-hidden relative">
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
                </div>
                
                {/* Dropdown Menu (Outside of Profile Picture) */}
                {isDropdownOpen && (
                    <Dropdown/>
                )}
            </div>

            {/* Full-Screen Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-75">
                    <div className="relative">
                        <img
                            className="max-w-full max-h-full object-contain"
                            src={decodedToken.profilePic}
                            alt="FullScreenProfilePic"
                        />
                        <IoClose
                            size={35}
                            className="absolute top-4 right-4 text-white cursor-pointer"
                            tabIndex={0}
                            onClick={() => setModalOpen(false)}
                        />
                    </div>
                </div>
            )}

            {/* About Section 1 */}
            <div className="w-full bg-white p-3 mb-3 relative">
                <p className="ml-2 text-sm text-slate-400">Your Name</p>
                {isEditName ? (
                    <input
                        type="text"
                        className="text-lg border-b-2 w-full outline-none"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                ) : (
                    <p className="text-lg border-b-2 border-white">{decodedToken.userName}</p>
                )}
                {isEditName ? (
                    <div onClick={() => handleClick('name')} className="right-3 bottom-4 absolute">
                        <IoMdCheckmark size={23} className="text-slate-500 cursor-pointer" />
                    </div>
                ) : (
                    <div onClick={() => handleEdit()} className="right-3 bottom-4 absolute">
                        <MdEdit size={23} className="text-slate-500 cursor-pointer" />
                    </div>
                )}
            </div>

            {/* About Section 2 */}
            <div className="w-full bg-white p-3 mb-3 relative">
                <p className="ml-2 text-sm text-slate-400">About</p>
                {isEditAbout ? (
                    <textarea
                        className="w-full border-b-2 outline-none resize-none"
                        rows="3"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                    />
                ) : (
                    <p className="text-base">{about}</p>
                )}
                {isEditAbout ? (
                    <div onClick={() => handleClick('about')} className="right-3 bottom-2 absolute">
                        <IoMdCheckmark size={23} className="text-slate-500 cursor-pointer" />
                    </div>
                ) : (
                    <div onClick={() => setEditAbout(!isEditAbout)} className="right-3 bottom-2 absolute">
                        <MdEdit size={23} className="text-slate-500 cursor-pointer" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
