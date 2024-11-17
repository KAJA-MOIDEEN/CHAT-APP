import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../authcontext/AuthContext';
import Contacts from '../components/Contacts';
import Message from '../components/Message';

const Chat = () => {
  const { profile, getAllUser } = useContext(AuthContext);
  const [user, setUser] = useState({});

  useEffect(() => {
    getAllUser();
    return () => {};
  }, []);

  return (
    <div className="flex flex-col md:flex-row w-full h-full overflow-hidden">
      <Contacts user={user} setUser={setUser} />
      <Message user={user} />
      {profile && (
        <div
          className="bg-[#E0CAF0] w-full md:w-[35%] h-64 md:h-full transition-all duration-300 ease-in-out overflow-hidden md:block"
        >
          Profile for friend
        </div>
      )}
    </div>
  );
};

export default Chat;
