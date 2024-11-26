import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../authcontext/AuthContext';
import Contacts from '../components/Contacts';
import Message from '../components/Message';
import ProfileForFriend from '../components/ProfileForFriend';
import Loader from '../components/Loader';

const Chat = () => {
  const { profile, getAllUser,loading} = useContext(AuthContext);
  const [user, setUser] = useState({});

  useEffect(() => {
    getAllUser();
  }, []);

  if (loading) {
    return(
      <div className="w-full h-full">
      <Loader/>
      </div>
    )
  }
  return (
    <div className="flex flex-col md:flex-row w-full h-full overflow-hidden">
      <Contacts user={user} setUser={setUser} />
      <Message user={user} />
      {profile && (
        <ProfileForFriend user={user}/>
      )}:""
    </div>
  );
};

export default Chat;
