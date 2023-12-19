import React from "react";
import {useNavigate} from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
function Homepage(params){

    const navigate=useNavigate();
    const navigateToSignUp = () => {
        navigate('/sign-up')
    }

    return(
        <div>
            <Navbar isHomepage={true}></Navbar>
            <button onClick={navigateToSignUp}>Sign up</button>
            <Footer></Footer>
        </div>
    )
}

export default Homepage