import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../authcontext/AuthContext';
import { IoVideocam } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import { FiSend } from "react-icons/fi";
import Loader from './Loader';
import ChatBG from "../assets/img/ChatBG.svg"

const Message = ({ user }) => {
  const { profile, SetProfile, getMessages, conversation,sendMessage } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const inputRef = useRef()

  useEffect(() => {
    SetProfile(false);
  }, [SetProfile, user]);

  // Handle loading state on chat change
  useEffect(() => {
    if (!user) return;

    setIsLoading(true); // Show loader when chat changes
    const fetchMessages = async () => {
      try {
        await getMessages(user._id); // Replace with your function to fetch messages
        setIsLoading(false); // Hide loader after messages are loaded
      } catch (error) {
        console.error("Error fetching messages:", error);
        setIsLoading(false); // Hide loader on error as well
      }
    };

    fetchMessages();
  }, [user, getMessages]);

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
      <div className={`flex-grow bg-[url(${ChatBG})] bg-cover bg-center overflow-y-auto`}
      style={{
        backgroundImage:`url(${ChatBG})`
      }}>
        {isLoading ? (
          <Loader />
        ) : conversation && conversation.length > 0 ? (
          // Render conversation messages here
          <div>
            {conversation.map((message,index)=>(
              <div key={index}>
                <div className="flex items-center justify-between p-4 border-b-2 border-gray-300">
                  <div className="flex items-center">
                    <img src={message.message} alt="Sender Profile" className="w-8 h-8 rounded-full" />
                    <div className="ml-2 text-sm text-gray-600">{message}</div>
                    </div>
                    </div>
                    </div>
            ))}
          </div>
        ) : (
          <p className="flex text-gray-500 text-xl justify-center items-center h-full">No data available</p>
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
        <button onClick={
          () => {
            sendMessage(inputRef.current.value,user._id)
          }
        } className="ml-3 bg-[#EC4A1C] text-white rounded-full p-2 shadow-md hover:bg-[#281A34]">
          <FiSend size={20} />
        </button>
      </div>
    </div>
  );
};

export default Message;
