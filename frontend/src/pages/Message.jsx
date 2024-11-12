import React, { useContext } from 'react';
import { AuthContext } from '../authcontext/AuthContext';

const Message = () => {
  const { profile, SetProfile } = useContext(AuthContext);
  const contect = [
    {
      id: 1,
      sender: 'Alice Brown',
      senderImage: 'https://randomuser.me/api/portraits/women/1.jpg',
      text: 'Hi, can you send me the details?',
      time: '02:30 PM',
    },
    {
      id: 2,
      sender: 'Tom Harris',
      senderImage: 'https://randomuser.me/api/portraits/men/1.jpg',
      text: 'The project is almost done. Let’s review.',
      time: '01:15 PM',
    },
    {
      id: 3,
      sender: 'Eve White',
      senderImage: 'https://randomuser.me/api/portraits/women/2.jpg',
      text: 'Are we still meeting at 5 PM today?',
      time: '12:00 PM',
    },
    {
      id: 4,
      sender: 'Charlie Green',
      senderImage: 'https://randomuser.me/api/portraits/men/2.jpg',
      text: 'I’ve updated the document. Please check.',
      time: '11:45 AM',
    },
    {
      id: 5,
      sender: 'Grace Black',
      senderImage: 'https://randomuser.me/api/portraits/women/3.jpg',
      text: 'Looking forward to your feedback on the proposal.',
      time: '10:00 AM',
    },
    {
      id: 6,
      sender: 'John Doe',
      senderImage: 'https://randomuser.me/api/portraits/men/3.jpg',
      text: 'Could you join the call at 3 PM?',
      time: '09:30 AM',
    },
    {
      id: 7,
      sender: 'Sophia Miller',
      senderImage: 'https://randomuser.me/api/portraits/women/4.jpg',
      text: 'I’ll send over the presentation slides shortly.',
      time: '08:15 AM',
    },
    {
      id: 8,
      sender: 'Michael Scott',
      senderImage: 'https://randomuser.me/api/portraits/men/4.jpg',
      text: 'Please update me on the project status.',
      time: '07:50 AM',
    },
    {
      id: 9,
      sender: 'Emma Wilson',
      senderImage: 'https://randomuser.me/api/portraits/women/5.jpg',
      text: 'Can we discuss the design tomorrow?',
      time: '06:45 AM',
    },
    {
      id: 10,
      sender: 'Liam Taylor',
      senderImage: 'https://randomuser.me/api/portraits/men/5.jpg',
      text: 'Thanks for your help with the report!',
      time: '05:20 AM',
    },
    {
      id: 11,
      sender: 'Olivia Brown',
      senderImage: 'https://randomuser.me/api/portraits/women/6.jpg',
      text: 'The meeting has been rescheduled to next week.',
      time: '04:15 AM',
    },
    {
      id: 12,
      sender: 'William Clark',
      senderImage: 'https://randomuser.me/api/portraits/men/6.jpg',
      text: 'Let’s wrap up this phase by Friday.',
      time: '03:30 AM',
    },
    {
      id: 13,
      sender: 'Ava Martin',
      senderImage: 'https://randomuser.me/api/portraits/women/7.jpg',
      text: 'Just finished the document review.',
      time: '02:50 AM',
    },
    {
      id: 14,
      sender: 'James Rodriguez',
      senderImage: 'https://randomuser.me/api/portraits/men/7.jpg',
      text: 'Are you available for a quick call?',
      time: '01:10 AM',
    },
    {
      id: 15,
      sender: 'Isabella Thompson',
      senderImage: 'https://randomuser.me/api/portraits/women/8.jpg',
      text: 'Could you please send me the latest files?',
      time: '12:00 AM',
    },
  ];
  
  

  return (
    <div className="flex w-full h-full">
    
    
    <div className="w-[38rem] h-[42.1rem] bg-[#2E3845] flex flex-col overflow-y-scroll overflow-hidden gap-7 pt-10 cursor-pointer no-scrollbar">
    {contect.map((data,index)=>(
    <div key={index} className="flex gap-x-3 border-2 hover:border-white border-transparent p-2 mx-2">
		<img src={`https://avatar.iran.liara.run/public/${index+1}`} alt="" className="w-12 h-12 rounded-full dark:bg-gray-500 border-2 border-transparent hover:border-[#EC4A1C]" />
		<div className='text-wrap text-white'>
			<h2 className="text-lg font-semibold">Kaja Moideen</h2>
			<span className="flex items-center space-x-1">
				<p rel="noopener noreferrer" className="text-xs dark:text-gray-600">View profile</p>
			</span>
		</div>
    <div className='pr-5 text-white ml-auto'>
      10:50 AM
    </div>

	    </div>))}
      </div>
      
      <div onClick={() => SetProfile(!profile)} className="w-4/5 bg-[#F7F2F8] cursor-pointer overflow-y-scroll overflow-hidden no-scrollbar">
        Message
      </div>


      <div className={`bg-[#E0CAF0] transition-all duration-300 ease-in-out overflow-hidden ${profile ? 'w-[40rem] opacity-100' : 'w-0 opacity-0'}`}>
        profile for friend
      </div>
    </div>
  );
};

export default Message;
