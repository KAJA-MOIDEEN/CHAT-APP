// VerifyEmail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { backendUrl } from '../../config';

const VerifyEmail = () => {
    const {id , token } = useParams();
    const [message, setMessage] = useState('Verifying your email...');
    
    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/auth/${id}/verify/${token}`);
                setMessage(response.data.message);
                toast.success(response.data.message, { style: { backgroundColor: '#4CAF50', color: '#fff' } });
            } catch (error) {
                setMessage(error.response.data.message || 'Email verification failed');
                toast.error(error.response.data.message || 'Email verification failed', { style: { backgroundColor: '#f44336', color: '#fff' } });
            }
        };
        
        verifyEmail();
    }, [token]);

    return (
        <div className="verify-email-page">
            <h2>{message}</h2>
        </div>
    );
};

export default VerifyEmail;
