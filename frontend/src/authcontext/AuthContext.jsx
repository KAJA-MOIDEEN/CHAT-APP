import { jwtDecode } from 'jwt-decode'; // Correct import for jwt-decode
import { createContext, useEffect, useState, useMemo, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { backendUrl } from "../../config.js";
import toast from 'react-hot-toast';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [profile, SetProfile] = useState(false);
    const [toggle, setToggle] = useState(true);
    const [state, setState] = useState("Login");
    const [users, setUsers] = useState([]);
    const [decodedToken, setDecodedToken] = useState(null);
    const navigate = useNavigate();

    // Logout function memoized with useCallback
    const logout = useCallback(() => {
        console.log("call");
        setToken(null);
        SetProfile(false);
        setToggle(true);
        setState("Login");
        setUsers([]);
        setDecodedToken(null);
        localStorage.removeItem('accessToken');
    }, []);

    // Check token function memoized with useCallback
    const checkToken = useCallback(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            setToken(token);
            let decoded = jwtDecode(token);
            decoded = decoded?.user
            setDecodedToken(decoded);
        }
    }, []);

    // Get all users function memoized with useCallback
    const getAllUser = useCallback(async () => {
        try {
            const res = await axios.get(`${backendUrl}/api/user/getalluser`, { withCredentials: true });
            setUsers(res.data);
        } catch (error) {
            if (error.response?.data?.error) {
                return toast.error(error.response?.data?.error);
            }
            toast.error(error.message);
        }
    }, []);

    const getMessages = useCallback(async (id) => {
        const navigate = useNavigate();
    
        try {
            const res = await axios.get(`${backendUrl}/api/message/get/${id}`, { withCredentials: true });
            if (res.status === 200) {
                console.log("Messages fetched: ", res.data.messages);
                return res.data.messages; // Return the fetched messages
            }
        } catch (error) {
            // Error Handling
            if (error.response) {
                // Server responded with a status code outside the 2xx range
                const { status, data } = error.response;
                if (status === 401) {
                    // Unauthorized
                    toast.error(data.message || "You are not authorized to access this resource");
                    navigate("/login"); // Redirect to login page
                } else if (status === 404) {
                    // Not Found
                    toast.error(data.message || "Resource not found");
                } else if (status === 500) {
                    toast.error(data.message || "Internal Server Error");
                } else {
                    toast.error("An unexpected error occurred. Please try again.");
                }
            } else if (error.request) {
                // No response was received from the server
                toast.error("No response from the server. Please check your network connection.");
            } else {
                // Something went wrong in setting up the request
                toast.error(`Request failed: ${error.message}`);
            }
            console.error("Error fetching messages:", error);
            return null; // Return null if an error occurred
        }
    }, [backendUrl, navigate]); // Add dependencies here

    // Memoized data object
    const data = useMemo(() => ({
        token,
        setToken,
        state,
        setState,
        navigate,
        profile,
        SetProfile,
        checkToken,
        toggle,
        setToggle,
        getAllUser,
        users,
        setUsers,
        decodedToken,
        logout,
        getMessages
    }), [
        token,
        state,
        navigate,
        profile,
        toggle,
        users,
        decodedToken,
        logout,
        checkToken,
        getAllUser,
        getMessages
    ]);

    // Run checkToken on mount
    useEffect(() => {
        checkToken();
    }, []);

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};
