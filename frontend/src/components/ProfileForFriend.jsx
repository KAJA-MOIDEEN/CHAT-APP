import React, { useContext, useState } from 'react';
import { IoClose } from "react-icons/io5";
import { MdEdit, MdBlock, MdDelete, MdOutlineFavoriteBorder } from "react-icons/md";
import { BiSolidDislike } from "react-icons/bi";
import { AuthContext } from '../authcontext/AuthContext';

const ProfileForFriend = ({ user }) => {
  const { SetProfile, profile } = useContext(AuthContext);
  const [isModalOpen, setModalOpen] = useState(false); // State for modal

  return (
    <div className="no-scrollbar flex flex-col overflow-y-auto bg-[#F3F4F6] border border-l-2 w-full md:w-[40%] h-64 md:h-full transition-all duration-300 ease-in-out">

      {/* Header */}
      <div className="flex items-center text-sm gap-4 w-full px-4 py-2 bg-white">
        <IoClose size={25} onClick={() => SetProfile(!profile)} className="cursor-pointer" />
        <p className="flex-grow">Contact Info</p>
        <MdEdit size={25} className="cursor-pointer" />
      </div>

      {/* Profile Section */}
      <div className="flex flex-col items-center justify-evenly w-full h-96 mb-3 bg-white">
        <div className="w-52 h-52 rounded-full border-2 overflow-hidden" onClick={() => setModalOpen(true)}>
          <img className="w-full h-full object-cover hover:scale-105 transition-transform" src={user.profilePic} alt="ProfilePic" />
        </div>
        <p className="text-3xl text-slate-800">{user.fullName}</p>
        <p className="text-base text-slate-800">+91 {user.phone}</p>
      </div>

      {/* Full-Screen Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative">
            <img
              className="max-w-full max-h-full object-contain"
              src={user.profilePic}
              alt="FullScreenProfilePic"
            />
            <IoClose
              size={35}
              className="absolute top-4 right-4 text-white cursor-pointer"
              onClick={() => setModalOpen(false)} // Close modal
            />
          </div>
        </div>
      )}

      {/* About Section 1 */}
      <div className="w-full bg-white p-3 mb-3">
        <p className="text-base text-slate-400">About</p>
        <p className="text-base">"Peace is a piece of life that I want most in my life."</p>
      </div>

      {/* About Section 2 */}
      <div className="w-full bg-white p-3 mb-3">
        <p className="text-base text-slate-400">Hobbies</p>
        <p className="text-base">I enjoy reading, traveling, and exploring new cultures. Creativity fuels my passion for painting and photography.</p>
      </div>

      {/* About Section 3 */}
      <div className="w-full bg-white p-3 mb-3">
        <p className="text-base text-slate-400">Professional Interests</p>
        <p className="text-base">I'm passionate about technology and innovation. My goal is to contribute to projects that create meaningful solutions for real-world challenges.</p>
      </div>

      {/* Action Section */}
      <div className="w-full text-lg bg-white p-4 md:pl-12 flex flex-col md:justify-around gap-3 md:gap-6">
        <div className="flex items-center gap-3 text-center md:text-left">
          <MdOutlineFavoriteBorder className="text-xl md:text-2xl" />
          <span className="text-sm md:text-base">Add To Favourites</span>
        </div>
        <div className="flex items-center gap-3 text-red-700 text-center md:text-left">
          <MdBlock className="text-xl md:text-2xl" />
          <span className="text-sm md:text-base">Block {user.fullName}</span>
        </div>
        <div className="flex items-center gap-3 text-red-700 text-center md:text-left">
          <BiSolidDislike className="text-xl md:text-2xl" />
          <span className="text-sm md:text-base">Report {user.fullName}</span>
        </div>
        <div className="flex items-center gap-3 text-red-700 text-center md:text-left">
          <MdDelete className="text-xl md:text-2xl" />
          <span className="text-sm md:text-base">Delete</span>
        </div>
      </div>

    </div>
  );
};

export default ProfileForFriend;
