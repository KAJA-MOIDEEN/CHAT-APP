// TopNavbar.js
import React, { useContext } from 'react';
import { AuthContext } from '../authcontext/AuthContext';

function TopNavbar() {
  const {decodedToken} = useContext(AuthContext)
  return (
    <div class="flex items-center justify-between p-3 bg-custom-gradient border">
  {/* <!-- Left Side --> */}
  <div class="w-2/3">
  <input
    type="text"
    id="animated-input"
  placeholder="Search contact, messages or options here."
  class="px-4 py-2 w-1/3 rounded-full text-gray-700 placeholder-gray-500 focus:outline-none border border-gray-300"
  />
  </div>

  {/* <!-- Right Side --> */}
  <div class="flex items-center justify-end w-1/3 text-white">
    <span class="mr-3 text-lg">{decodedToken?.fullName}</span>
    <div class="flex items-center text-sm text-gray-200 mr-3">
      <span class="h-2 w-2 bg-green-500 rounded-full mr-1"></span> Online
    </div>
    <img src={decodedToken?.profilePic} alt="Profile" class="h-9 w-9 rounded-full" />
  </div>
</div>

  );
}

export default TopNavbar;
