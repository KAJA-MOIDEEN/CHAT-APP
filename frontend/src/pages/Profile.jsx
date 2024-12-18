import React from 'react';
import assets from '../assets/assets';

const HomePage = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-gradient-to-r from-blue-500 to-teal-500 text-white"
    style={{ backgroundImage: `url(${assets.HomeBG})`,
    backgroundSize:'cover',
    backgroundPosition:'no-repeat',
    width: '100%',
    height: '100vh', // or any height you want
    }}>
    </div>
  );
};

export default HomePage;
