import React from 'react';

const HomePage = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-gradient-to-r from-blue-500 to-teal-500 text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">Welcome to ChatApp</h1>
        <p className="text-xl mb-6">Connect with friends and family effortlessly.</p>
        <img 
          src="https://via.placeholder.com/400x200" 
          alt="ChatApp Poster" 
          className="mx-auto rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default HomePage;
