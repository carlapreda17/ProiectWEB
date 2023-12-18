import React from "react";
import {useNavigate} from "react-router-dom";
import Navbar from "../components/Navbar";
function Homepage(params){

    const navigate=useNavigate();
    const navigateToSignUp = () => {
        navigate('/sign-up')
    }

    return(
        <div>
            <Navbar isHomepage={true}></Navbar>
            <button onClick={navigateToSignUp}>Sign up</button>

        </div>
    )
}

export default Homepage