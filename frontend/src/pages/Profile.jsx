import React, { useContext } from 'react';
import { AuthContext } from '../authcontext/AuthContext';

const Profile = () => {
  const { profile, SetProfile } = useContext(AuthContext);

  return (
    <div className="flex w-full h-full">
      <div className="w-[38rem] bg-lime-500">Contacts</div>
      <div onClick={() => SetProfile(!profile)} className="w-4/5 bg-teal-500 cursor-pointer">
        Message
      </div>
      
      <div className={`bg-white transition-all duration-300 ease-in-out overflow-hidden ${profile ? 'w-[40rem] opacity-100' : 'w-0 opacity-0'}`}>
        profile for friend
      </div>
    </div>
  );
};

export default Profile;
