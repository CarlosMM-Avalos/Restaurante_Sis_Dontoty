import React,{useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import axios from "axios";

const PrivateRoute = ({children, allowedRoles }) =>{
    const [user, setUser] = useState(null);
    const [checking, setChecking] = useState(true);



    useEffect(() =>{
        const fetchUser = async () => {
            try{
                const token = localStorage.getItem("access_token");
                if (!token) return setChecking(false);

                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const res = await axios.get("http://localhost:8000/api/me");
                setUser(res.data);

            }   catch (error){
                console.error("ERROR AL VERIFICAR EL USUARIO", error);
            } finally{
                setChecking(false);
            }
        };
        fetchUser();
    },[]);

    if (checking) return <p>CargandO....</p>;

    if (!user) return <Navigate to="/login"/>;

    if (!allowedRoles.includes(user.role)){
        return <p style={{color:"red"}}> ACCESO DENEGADO NO TIENES PERMISOS</p>
    }

    return children;

};

export default PrivateRoute
