import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Login from "../components/Login";
function Homepage(params){

    const [popUpVisible, setPopUpVisible] = useState(false);
    const navigate=useNavigate();
    const navigateToSignUp = () => {
        navigate('/sign-up')
    }

    const handlePopUp = () => {
        setPopUpVisible(!popUpVisible);
        console.log(popUpVisible)
    };

    return(
        <div>
            <Navbar isHomepage={true} handlePopUp={handlePopUp}></Navbar>
            <button onClick={navigateToSignUp}>Sign up</button>
            {popUpVisible && <Login />}
            <Footer></Footer>
        </div>
    )
}

export default Homepage