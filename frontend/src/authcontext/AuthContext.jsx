import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [token,setToken] = useState("");
    
    const [state, setState] = useState("Login");
    const navigate = useNavigate()
    const data = {
        token,setToken,state,setState,navigate
    }
    return(
    <AuthContext.Provider value={data}>
        {children}
    </AuthContext.Provider>
    );
};