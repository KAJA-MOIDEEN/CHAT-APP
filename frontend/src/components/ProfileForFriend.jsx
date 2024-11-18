import React, { useContext } from 'react';
import { IoClose } from "react-icons/io5";
import { MdEdit, MdBlock, MdDelete, MdOutlineFavoriteBorder } from "react-icons/md";
import { BiSolidDislike } from "react-icons/bi";
import { AuthContext } from '../authcontext/AuthContext';

const ProfileForFriend = ({ user }) => {
  const { SetProfile, profile } = useContext(AuthContext);

  return (
    <div className="no-scrollbar flex flex-col overflow-y-auto bg-[#d6d8da] border-r-4 w-full md:w-[40%] h-64 md:h-full transition-all duration-300 ease-in-out">
      {/* Header */}
      <div className="flex items-center text-sm gap-4 w-full px-4 py-2 bg-white">
        <IoClose size={25} onClick={() => SetProfile(!profile)} className="cursor-pointer" />
        <p className="flex-grow">Contact Info</p>
        <MdEdit size={25} className="cursor-pointer" />
      </div>

      {/* Profile Section */}
      <div className="flex flex-col items-center justify-evenly w-full h-96 mb-3 bg-white">
        <div className="w-52 h-52 rounded-full border-2 overflow-hidden">
          <img className="w-full h-full object-cover hover:scale-105 transition-transform" src={user.profilePic} alt="ProfilePic" />
        </div>
        <p className="text-3xl text-slate-800">{user.fullName}</p>
        <p className="text-base text-slate-800">+91 {user.phone}</p>
      </div>

      {/* About Section */}
      <div className="w-full bg-white p-3 mb-3">
        <p className="text-base text-slate-400">About</p>
        <p className="text-base">Peace is a piece of life that I want most in my life.</p>
      </div>

      {/* About Section */}
      <div className="w-full bg-white p-3 mb-3">
        <p className="text-base text-slate-400">About</p>
        <p className="text-base">Peace is a piece of life that I want most in my life.</p>
      </div>

      {/* About Section */}
      <div className="w-full bg-white p-3 mb-3">
        <p className="text-base text-slate-400">About</p>
        <p className="text-base">Peace is a piece of life that I want most in my life.</p>
      </div>
      
      {/* Action Section */}
      <div className="w-full text-lg bg-white p-8 px-24 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <MdOutlineFavoriteBorder />
          <span>Add To Favourites</span>
        </div>
        <div className="flex items-center gap-3 text-red-700">
          <MdBlock />
          <span>Block {user.fullName}</span>
        </div>
        <div className="flex items-center gap-3 text-red-700">
          <BiSolidDislike />
          <span>Report {user.fullName}</span>
        </div>
        <div className="flex items-center gap-3 text-red-700">
          <MdDelete />
          <span>Delete</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileForFriend;
