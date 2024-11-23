// NotFound.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold text-red-500">404</h1>
      <p className="text-lg mt-4">Page Not Found</p>
      <button
        onClick={() => navigate("/") && window.history.back()}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Go Back
      </button>
    </div>
  );
};

export default NotFoundPage;
