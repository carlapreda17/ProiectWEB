import React from "react";
import {useNavigate} from "react-router-dom";

function Homepage(params){

    const navigate=useNavigate();
    const navigateToSignUp = () =>{
        navigate("/sign-up")
    }

    return(
        <button onClick={navigateToSignUp}>Sign up</button>
    )
}

export default Homepage