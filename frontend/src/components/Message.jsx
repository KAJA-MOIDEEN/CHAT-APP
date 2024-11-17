import React, { useContext } from 'react';
import { AuthContext } from '../authcontext/AuthContext';
import { IoVideocam } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import { FiSend } from "react-icons/fi";

const Message = ({ user }) => {
  const { profile, SetProfile } = useContext(AuthContext);

  if (!user || !user.profilePic) {
    return (
      <div className="flex justify-center items-center w-full md:w-3/4 h-full bg-gray-100">
        <p className="text-gray-500 text-lg">No profile data available</p>
      </div>
    );
  }

  return (
    <div className="w-full md:w-3/4 bg-[#F7F2F8] h-full flex flex-col">
      {/* Header */}
      <div className="h-20 border-b-2 flex items-center px-4 bg-white shadow-md">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => SetProfile(!profile)}
        >
          <img
            src={user.profilePic}
            alt="User Profile"
            className="w-12 h-12 rounded-full border-2 border-transparent hover:border-[#EC4A1C]"
          />
          <div className="ml-4 font-bold text-lg hover:text-[#EC4A1C]">
            {user.fullName}
          </div>
        </div>
        <div className="ml-auto flex gap-6 text-gray-600">
          <IoVideocam size={23} className="cursor-pointer hover:text-black" />
          <FaSearch size={23} className="cursor-pointer hover:text-black" />
          <CiMenuKebab size={23} className="cursor-pointer hover:text-black" />
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-grow bg-gray-100 overflow-y-auto p-4">
        {/* Sample Messages */}
        <div className="flex flex-col space-y-4">
          {/* Message from Other User */}
          <div className="flex items-start space-x-3">
            <img
              src={user.profilePic}
              alt="User"
              className="w-10 h-10 rounded-full"
            />
            <div className="bg-white shadow-md px-4 py-2 rounded-lg text-gray-800">
              <p>Hi there! How are you?</p>
            </div>
          </div>

          {/* Message from Logged-in User */}
          <div className="flex items-end justify-end space-x-3">
            <div className="bg-blue-500 text-white shadow-md px-4 py-2 rounded-lg max-w-xs">
              <p>I’m good, thank you! What about you?</p>
            </div>
            <img
              src="https://via.placeholder.com/40"
              alt="Me"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Message Input */}
      <div className="h-16 border-t-2 bg-white flex items-center px-4">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-grow bg-gray-100 rounded-lg px-4 py-2 outline-none"
        />
        <button className="ml-3 bg-blue-500 text-white rounded-full p-2 shadow-md hover:bg-blue-600">
          <FiSend size={20} />
        </button>
      </div>
    </div>
  );
};

export default Message;
