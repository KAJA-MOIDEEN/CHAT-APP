import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../authcontext/AuthContext';

const VerifyEmail = () => {
    const { verifyEmail, verifiMessage,loading,setLoading } = useContext(AuthContext);
    const { id, token,fullname } = useParams();

    const handleVerifyEmail = async () => {
        setLoading(true); // Start loading
        await verifyEmail(id, token); // Trigger verification via context
        setLoading(false); // Stop loading
    };

    return (
        <div className="flex w-full h-screen justify-center items-center bg-gray-100">
            <div className="flex flex-col gap-4 justify-center items-center bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-gray-800">Verify Email</h1>
                <h2 className="text-base font-bold text-gray-800">Hi... {fullname}</h2>
                {!loading && !verifiMessage && (
                    <p className="text-lg text-gray-600">
                        Please verify your email address by clicking the button below.
                    </p>
                )}
                {verifiMessage && (
                    <p className={`text-lg ${verifiMessage.includes('Invalid') ? 'text-red-600' : 'text-green-600'}`}>
                        {verifiMessage}
                    </p>
                )}
                <button
                    onClick={handleVerifyEmail}
                    className="cursor-pointer bg-gradient-to-r from-slate-950 to-gray-800 font-semibold text-white rounded-lg py-2 px-4 duration-300 hover:translate-y-[-2px] w-[200px] hover:shadow-2xl"
                    disabled={loading} // Disable button during loading
                >
                    {loading ? 'Verifying...' : 'Verify Email'}
                </button>
            </div>
        </div>
    );
};

export default VerifyEmail;
