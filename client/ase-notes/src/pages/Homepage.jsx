import React from "react";
import {useNavigate} from "react-router-dom";

function Homepage(params){

    const navigate=useNavigate();
    const navigateToSignUp = () => {
        navigate('/sign-up')
    }

    const navigateToLogIn = () => {
        navigate('/login')
    }

    return(
        <div>
            <button onClick={navigateToSignUp}>Sign up</button>
            <button onClick={navigateToLogIn}>Log in</button>
        </div>
    )
}

export default Homepage