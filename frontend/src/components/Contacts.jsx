import React, { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../authcontext/AuthContext';

const Contacts = ({ setUser }) => {
  const { users, getMessages, SetProfile } = useContext(AuthContext);
  const messageRefs = useRef([]);

  const handleMessageClick = (index) => {
    if (messageRefs.current[index]) {
      messageRefs.current[index].focus();
    }
  };
  useEffect(()=>{
    return SetProfile(false);
  },[])
  return (
    <div className="w-full md:w-[35%] h-64 md:h-full bg-[#2E3845] flex flex-col overflow-y-auto gap-7 p-4 md:pt-10 cursor-pointer no-scrollbar">
      {users?.map((data, index) => (
        <div
          key={index}
          ref={(el) => (messageRefs.current[index] = el)}
          onClick={() => {
            handleMessageClick(index);
            SetProfile(false);
            setUser(data);
            getMessages(data._id)
          }}
          className="flex gap-3 p-2 border-2 hover:border-white border-transparent rounded-lg focus:outline-none focus:bg-[#e4674576]"
          tabIndex="0"
        >
          <img
            src={data.profilePic}
            alt=""
            className="w-12 h-12 rounded-full border-2 border-transparent hover:border-[#EC4A1C]"
          />
          <div className="text-wrap text-white">
            <h2 className="text-lg font-semibold">{data.fullName}</h2>
            <p className="text-xs dark:text-gray-600">View profile</p>
          </div>
          <div className="ml-auto text-white text-sm">10:50 AM</div>
        </div>
      ))}
    </div>
  );
};

export default Contacts;
