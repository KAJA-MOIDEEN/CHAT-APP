// NotFound.js
import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold text-red-500">404</h1>
      <p className="text-lg mt-4">Page Not Found</p>
      <button
        onClick={() => window.history.back()}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Go Back
      </button>
    </div>
  );
};

export default NotFoundPage;
