import React, { useContext, useRef, useState } from 'react';
import { AuthContext } from '../authcontext/AuthContext';
import { IoClose } from 'react-icons/io5';
import { MdEdit } from 'react-icons/md';
import { IoMdCheckmark } from "react-icons/io";

const UserProfile = () => {
    const { decodedToken,editName,editAbout,isEditName, setEditName } = useContext(AuthContext);
    const [isModalOpen, setModalOpen] = useState(false); 
    const [name, setName] = useState(decodedToken.userName);

    const handleEdit = () => {
        setEditName(!isEditName);
    };

    const handleClick = (state) =>{
        if (state=== "name") {
            editName()
            console.log(state);
            
        }
        if(state === "about"){
            editAbout()
        }
    }

    return (
        <div className="w-full md:w-[37%] h-64 md:h-full bg-[#2E3845] flex flex-col overflow-y-auto gap-7 p-4 md:pt-10 cursor-pointer no-scrollbar">
            {/* Profile Section */}
            <div className="flex flex-col items-center justify-evenly w-full h-96 mb-3 bg-white">
                <div className="w-52 h-52 rounded-full border-2 overflow-hidden" onClick={() => setModalOpen(true)}>
                    <img className="w-full h-full object-cover hover:scale-105 transition-transform" src={decodedToken.profilePic} alt="ProfilePic" />
                </div>
            </div>

            {/* Full-Screen Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
                    <div className="relative">
                        <img className="max-w-full max-h-full object-contain" src={decodedToken.profilePic} alt="FullScreenProfilePic" />
                        <IoClose
                            size={35}
                            className="absolute top-4 right-4 text-white cursor-pointer"
                            onClick={() => setModalOpen(false)} // Close modal
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
                {isEditName?<div onClick={()=>handleClick("name")} className="right-3 bottom-4 absolute">
                    <IoMdCheckmark size={23} className="text-slate-500 cursor-pointer" />
                </div>:<div onClick={()=>handleEdit()} className="right-3 bottom-4 absolute">
                    <MdEdit size={23} className="text-slate-500 cursor-pointer" />
                </div>}
            </div>

            {/* About Section 2 */}
            <div className="w-full bg-white p-3 mb-3 relative">
                <p className="ml-2 text-sm text-slate-400">About</p>
                <p className="text-base">I enjoy reading, traveling, and exploring new cultures. Creativity fuels my passion for painting and photography.</p>
                <div className="right-3 bottom-2 absolute">
                    <MdEdit size={23} className="text-slate-500 cursor-pointer" />
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
