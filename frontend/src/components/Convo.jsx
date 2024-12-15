import React from 'react';

const Convo = ({ message, user, author }) => {
  console.log(message, user);

  const fromMe = author._id === message.senderId;

  const chatBubbleClass = fromMe
    ? "ml-auto bg-[#EC4A1C] text-white rounded-lg p-3 max-w-[70%] break-words"
    : "mr-auto bg-gray-200 text-gray-600 rounded-lg p-3 max-w-[70%] break-words";

  const ProfilePic = fromMe ? author.profilePic : user.profilePic;

  return (
    <div className={`flex items-start p-2 ${fromMe ? 'justify-end' : 'justify-start'}`}>
      {/* Conditional rendering for Profile Picture and Message Bubble */}
      {fromMe ? (
        // Layout when the message is from the current user
        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            {/* Message bubble for current user */}
            <div className={`${chatBubbleClass}`}>
              <div className={`text-sm ${fromMe ? "text-white" : "text-gray-600"}`}>
                {message.messages}
              </div>
            </div>
            <img
              src={ProfilePic}
              alt="Sender Profile"
              className="w-8 h-8 rounded-full"
            />
          </div>
        </div>
      ) : (
        // Layout when the message is from the other user
        <div className="flex items-center space-x-2">
          <img
            src={ProfilePic}
            alt="Sender Profile"
            className="w-8 h-8 rounded-full"
          />
          <div className={`${chatBubbleClass}`}>
            <div className={`text-sm ${fromMe ? "text-white" : "text-gray-600"}`}>
              {message.messages}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Convo;
