import React, { useContext, useRef, useState, useEffect } from 'react';
import { AuthContext } from '../authcontext/AuthContext';
import { IoVideocam } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import { FiSend } from "react-icons/fi";
import ChatBG from "../assets/img/ChatBG.svg";
import Skeleton from './Skeleton';
import Convo from './convo';

const Message = ({ user }) => {
  const { profile, SetProfile, conversation, sendMessage, getMessage, msgLoading,decodedToken } = useContext(AuthContext);
  const [isSending, setSending] = useState(false);
  const inputRef = useRef();
  
  // Fetch conversation when component mounts or when the user changes
  useEffect(() => {
    if (user) {
      getMessage(user._id);
    }
  }, [user, getMessage]);

  const handleSendMessage = async (message, _id) => {
    if (!message) return;
    setSending(true);
    await sendMessage(message, _id);
    inputRef.current.value = ''; // Clear input after sending
    await getMessage(_id); // Re-fetch conversation after sending a message
    setSending(false);
  };

  if (msgLoading) {
    return (
      <div className="w-full h-full">
        <Skeleton />
      </div>
    );
  }

  if (!user || !user.profilePic) {
    return (
      <div className="flex justify-center items-center w-full h-full bg-gray-100">
        <p className="text-gray-500 text-lg">No profile data available</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="h-20 border-b-2 flex items-center px-4 bg-white shadow-md">
        <div className="flex w-full items-center cursor-pointer" onClick={() => SetProfile(!profile)}>
          <img
            src={user.profilePic}
            alt="User Profile"
            className="w-12 h-12 rounded-full border-2 border-transparent hover:border-[#EC4A1C]"
          />
          <div className="ml-4 font-bold text-lg hover:text-[#EC4A1C]">
            {user.fullName}
          </div>
          <div className="flex items-center mx-3 text-sm text-slate-500">
            <span className="h-2 w-2 bg-green-500 rounded-full mr-1"></span> Online
          </div>
        </div>
        <div className="ml-auto flex gap-6 text-gray-600">
          <IoVideocam size={23} className="cursor-pointer hover:text-black" />
          <FaSearch size={23} className="cursor-pointer hover:text-black" />
          <CiMenuKebab size={23} className="cursor-pointer hover:text-black" />
        </div>
      </div>

      {/* Chat Messages */}
      <div
        className="flex-grow bg-cover bg-center overflow-y-auto"
        style={{ backgroundImage: `url(${ChatBG})` }}
      >
        {conversation && conversation.length > 0 ? (
          conversation?.map((message, index) => (
          <Convo key={index} message={message} user={user} author={decodedToken} />
          ))
        ) : (
          <p className="flex text-gray-500 text-xl justify-center items-center h-full">
            {conversation === null || conversation.length === 0 ?
              "Send a message to start a conversation" :
              "Loading conversation..."}
          </p>
        )}
      </div>


      {/* Message Input */}
      <div className="h-16 border-t-2 bg-white flex items-center px-4">
        <input
          ref={inputRef}
          type="text"
          placeholder="Type a message..."
          className="flex-grow bg-gray-100 rounded-lg px-4 py-2 outline-none"
        />
        <button
          onClick={() => handleSendMessage(inputRef.current.value, user._id)}
          className="ml-3 bg-[#EC4A1C] text-white rounded-full p-2 w-9 h-9 shadow-md hover:bg-[#281A34]"
        >
          {isSending ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            <FiSend size={20} />
          )}
        </button>
      </div>
    </div>
  );
};

export default Message;
