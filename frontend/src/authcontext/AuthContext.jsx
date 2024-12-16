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
    const [toggle, setToggle] = useState(false);
    const [state, setState] = useState("Login");
    const [users, setUsers] = useState([]);
    const [decodedToken, setDecodedToken] = useState(null);
    const [conversation,setConversation] = useState(null)
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false)
    const [msgLoading,setMsgLoading] = useState(false)
    const [verifiMessage ,setVerifiMessage] = useState()
    // Logout function memoized with useCallback
    const logout = useCallback(() => {
        setToken(null);
        SetProfile(false);
        setToggle(true);
        setState("Login");
        setUsers([]);
        setDecodedToken(null);
        localStorage.removeItem('accessToken');
    }, []);

    // login
    const login = async (data) => {
        setLoading(true)
        try {
          const res = await axios.post(backendUrl + "/api/auth/login", data, { withCredentials: true });
    
          if (res.status === 201) {
            return toast.success(res.data.message, { style: { backgroundColor: '#994AD2', color: "white" } });
          }
    
          if (res.status === 200) {
            toast.success(res.data.message, { style: { backgroundColor: '#994AD2', color: "white" } });
            const token = res.data?.accessToken
            setToken(token);
            localStorage.setItem("accessToken", token)
            navigate("/")
            return
          }
        } catch (error) {
          toast.error(error.response?.data?.error)
        }finally{
          setLoading(false)
        }
      }

    // signup 
    const signup = async (data) => {
        setLoading(true)
        try {
          const res = await axios.post(backendUrl + "/api/auth/signup", data, { withCredentials: true });
          if (res.status === 201) {
            toast.success(res.data.message, { style: { backgroundColor: '#EC4A1C', color: "white" } });
            const token = res.data.accessToken
            setToken(token);
            navigate("/")
            return
          }
        } catch (error) {
          if (error.response?.data?.error) {
            return toast.error(error.response?.data?.error)
          }
          toast.error(error.message)
        }finally{
          setLoading(false)
        }
      }
      
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
        setLoading(true)
        try {
            const res = await axios.get(`${backendUrl}/api/user/getalluser`, { withCredentials: true });
            setUsers(res.data);
        } catch (error) {
            if (error.response?.data?.error) {
                return toast.error(error.response?.data?.error);
            }
            toast.error(error.message);
        }finally{
            setLoading(false)
        }
    }, []);

    // Get all conversation function memoized with useCallback
    const getMessages = useCallback(async (id) => {
        // setConversation(null)
        try {
            setMsgLoading(true)
            const res = await axios.get(`${backendUrl}/api/message/get/${id}`, { withCredentials: true });
            if (res.status === 200) {
                // console.log("Messages Fetched: ", res.data.messages);
                setConversation(res.data.messages);
            }
        } catch (error) {
            // Error Handling
            if (error.response) {
                // Server responded with a status code outside the 2xx range
                const { status, data } = error.response;
                if (status === 401) {
                    // Unauthorized
                    toast.error(data.message || "You Are Not Authorized to Access This Resource");
                    navigate("/login"); // Redirect to login page
                } else if (status === 404) {
                    // Not Found
                    toast.error(data.message || "Resource Not Found");
                } else if (status === 500) {
                    toast.error(data.message || "Internal Server Error");
                } else {
                    toast.error("An Unexpected Error Occurred. Please Try Again.");
                }
            } else if (error.request) {
                // No response was received from the server
                toast.error("No Response From The Server. Please Check Your Network Connection.");
            } else {
                // Something went wrong in setting up the request
                toast.error(`Request Failed: ${error.message}`);
            }
            console.error("Error Fetching Messages:", error);
            return null; // Return null if an error occurred
        }finally{
            setMsgLoading(false)
        }
    }, [backendUrl, navigate]); // Add dependencies here

    // Get all conversation function memoized with useCallback
    const getMessage = useCallback(async (id) => {
        setConversation(null)
        try {
            const res = await axios.get(`${backendUrl}/api/message/get/${id}`, { withCredentials: true });
            if (res.status === 200) {
                // console.log("Messages Fetched: ", res.data.messages);
                setConversation(res.data.messages);
            }
        } catch (error) {
            // Error Handling
            if (error.response) {
                // Server responded with a status code outside the 2xx range
                const { status, data } = error.response;
                if (status === 401) {
                    // Unauthorized
                    toast.error(data.message || "You Are Not Authorized to Access This Resource");
                    navigate("/login"); // Redirect to login page
                } else if (status === 404) {
                    // Not Found
                    toast.error(data.message || "Resource Not Found");
                } else if (status === 500) {
                    toast.error(data.message || "Internal Server Error");
                } else {
                    toast.error("An Unexpected Error Occurred. Please Try Again.");
                }
            } else if (error.request) {
                // No response was received from the server
                toast.error("No Response From The Server. Please Check Your Network Connection.");
            } else {
                // Something went wrong in setting up the request
                toast.error(`Request Failed: ${error.message}`);
            }
            console.error("Error Fetching Messages:", error);
            return null; // Return null if an error occurred
        }
    }, [backendUrl, navigate]); // Add dependencies here

    // verifyEmail
    const verifyEmail = useCallback(async (id,token) => {
        try {
            setLoading(true)
            const response = await axios.get(`${backendUrl}/api/auth/${id}/verify/${token}`);
            setVerifiMessage(response.data.message);
            console.log(response.data.message);
            toast.success(response.data.message);
        } catch (error) {
            console.error("Error Verifying Email:", error);
            toast.error(error.response?.data?.message);
            setVerifiMessage(error.response?.data?.message);
        }finally{
            setLoading(false)
        }
    },[backendUrl, navigate]);

    // sending message
    const sendMessage = useCallback( async(message,id)=>{
        console.log(message);
        
        try {
            const res = await axios.post(`${backendUrl}/api/message/send/${id}`, {message}, { withCredentials: true });
            if (res.status === 200) {
                console.log("Message Sent Successfully");
                return setConversation((prev) => [...prev, res.data.message]);
                }
        } catch (error) {
            // Error Handling
            if (error.response) { 
                // Server responded with a status code outside the 2xx range
                const { status, data } = error.response;
                if (status === 401) {
                    // Unauthorized
                    toast.error(data.message || "You Are Not Authorized to Access This Resource");
                    navigate("/login"); // Redirect to login page
                    } else if (status === 404) {
                        // Not Found
                        toast.error(data.message || "Resource Not Found");
                        } else if (status === 500) {
                            toast.error(data.message || "Internal Server Error");
                            } else {
                                toast.error("An Unexpected Error Occurred. Please Try Again.");
                                }
                                } else if (error.request) {
                                    // No response was received from the server
                                    toast.error("No Response From The Server. Please Check Your Network Connection.");
                                    } else {
                                        // Something went wrong in setting up the request
                                        toast.error(`Request Failed: ${error.message}`);
                                        }
                                        console.error("Error Sending Message:", error);
                                        return null; // Return null if an error occurred
                                        }
                                         // Add dependencies here
    }, [backendUrl, navigate]);

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
        getMessages,
        conversation,
        setConversation,
        loading,
        setLoading,
        sendMessage,
        verifyEmail,
        verifiMessage,
        signup,login,getMessage,msgLoading
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
        getMessages,
        conversation,
        setConversation,
        loading,
        setLoading,
        sendMessage,
        verifyEmail,
        verifiMessage,
        signup,login,getMessage,msgLoading
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
