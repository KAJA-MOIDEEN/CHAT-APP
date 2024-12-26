import React from 'react';
import assets from '../assets/assets';

const HomePage = () => {
  return (
    <>
      <div className="flex items-center justify-evenly w-full h-screen text-black relative overflow-hidden">
        {/* background image */}
        <img className='absolute -bottom-36 object-cover w-full' src={assets.homepage} alt="homepage" />
        <img className='absolute bottom-24 h-[45%]' src={assets.BlueOrangebg} alt="BlueOrangebg" />
        <img className='absolute top-24 ml-44 my-12 w-[18%]' src={assets.purpleBG} alt="purpleBG" />
        <div className='absolute w-full h-full'>
          <div className='flex flex-col items-center justify-center h-full w-full'>
            <p className="absolute top-6 text-gray-600 text-center leading-relaxed">
              <span className="font-semibold text-lg">Welcome to the conversation hub! 💬</span><br />
              <span className="italic">Let's make meaningful connections. 😊</span>
            </p>

            <img className='sm: absolute xl:w-[24%] -top-1' src={assets.WomenPicBG} alt="WomenPicBG" />
            <img className='absolute w-[40%] bottom-0' src={assets.MsgInput} alt="MsgInput" />
          </div>
        </div>

        <div className='w-2/4 h-full flex flex-col justify-evenly items-center'>
          <img className='z-20 w-[30%]' src={assets.LeftCHAT} alt="leftCHAT" />
          <img className='z-20 w-[40%]' src={assets.LeftMSG} alt="leftMSG" />
        </div>

        <div className='w-2/4 h-full flex flex-col justify-evenly items-center overflow-hidden'>
          <img className='z-20 -mt-5 w-[30%]' src={assets.RightCHAT} alt="leftCHAT" />
          <img className='z-20 w-[35%]' src={assets.RightMSG} alt="leftMSG" />
        </div>
      </div>
    </>
  );
};

export default HomePage;
