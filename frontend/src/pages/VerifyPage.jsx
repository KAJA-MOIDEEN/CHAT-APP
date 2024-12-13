import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../authcontext/AuthContext';
import assets from '../assets/assets';

const VerifyEmail = () => {
    const { verifyEmail, verifiMessage, loading, setLoading } = useContext(AuthContext);
    const { id, token, email } = useParams();

    const handleVerifyEmail = async () => {
        setLoading(true); // Start loading
        await verifyEmail(id, token); // Trigger verification via context
        setLoading(false); // Stop loading
    };

    return (
        <div className="flex w-full h-screen justify-center items-center bg-gray-100 px-4">
            <div className="w-full lg:w-[60%] flex flex-col gap-5 justify-center items-center bg-white p-6 sm:p-8 rounded-lg shadow-md">
                <img 
                    src={assets.VerifyBG} 
                    className="w-3/4 sm:w-full max-w-xs"
                    alt="Verify Background"
                />
                <h1 className="text-2xl font-bold text-gray-800 text-center sm:text-xl">Verify your email address</h1>
                {!loading && !verifiMessage && (
                    <p className="text-lg text-gray-600 text-center sm:text-base">
                        You've entered <span className='text-xl font-bold sm:text-lg'>{email}</span> as the email for your account. Please click the button below to verify your email address.
                    </p>
                )}
                {verifiMessage && (
                    <p className={`text-lg sm:text-base ${verifiMessage.includes('Invalid') ? 'text-red-600' : 'text-green-600'} text-center`}>
                        {verifiMessage}
                    </p>
                )}
                <button
                    onClick={handleVerifyEmail}
                    className="cursor-pointer bg-gradient-to-r from-slate-950 to-gray-800 font-semibold text-white rounded-lg py-2 px-4 duration-300 hover:translate-y-[-2px] w-full max-w-xs hover:shadow-2xl sm:w-auto sm:px-6 sm:py-2"
                    disabled={loading} // Disable button during loading
                >
                    {loading ? 'Verifying...' : 'Verify Email'}
                </button>
            </div>
        </div>
    );
};

export default VerifyEmail;
