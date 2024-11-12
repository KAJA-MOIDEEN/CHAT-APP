import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [token,setToken] = useState(null);
    const [profile,SetProfile] = useState(false)
    const [toggle, setToggle] = useState(true);
    const [state, setState] = useState("Login");
    const navigate = useNavigate()

    const checkToken = ()=>{
        const token = localStorage.getItem("accessToken");
        if(token){
            setToken(token)
        }
    }

    const data = {
        token,setToken,state,setState,navigate,profile,SetProfile,checkToken,toggle,setToggle
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