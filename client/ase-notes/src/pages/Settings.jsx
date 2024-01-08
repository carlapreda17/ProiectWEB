import React from "react";
import useAuth from "../components/useAuth";
import {useNavigate} from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar";
function Settings(){
    const isAuthenticated = useAuth();
    const navigate=useNavigate();


    if(!isAuthenticated) {
        navigate('/login');
    }

    return (
        <div>
            <Footer></Footer>
        </div>
    )
}

export default Settings;