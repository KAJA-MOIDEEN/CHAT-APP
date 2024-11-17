import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {backendUrl} from "../../config.js"

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [token,setToken] = useState(null);
    const [profile,SetProfile] = useState(false)
    const [toggle, setToggle] = useState(true);
    const [state, setState] = useState("Login");
    const [users, setUsers] = useState([]);
    const navigate = useNavigate()

    const checkToken = ()=>{
        const token = localStorage.getItem("accessToken");
        if(token){
            setToken(token)
        }
    }
    const getAllUser = async()=>{
        try {
            const res = await axios.get(backendUrl+"/api/user/getalluser",{withCredentials:true})
            console.log(res.data)
            setUsers(res.data)
        } catch (error) {
            if (error.response?.data?.error) {
            return toast.error(error.response?.data?.error)  
            }
            toast.error(error.message)
        }
    }

    const data = {
        token,setToken,state,setState,navigate,profile,SetProfile,checkToken,toggle,setToggle,getAllUser,users,setUsers
    }
    useEffect(()=>{
        checkToken()
       },[]);
       
    return(
    <AuthContext.Provider value={data}>
        {children}
    </AuthContext.Provider>
    );
};