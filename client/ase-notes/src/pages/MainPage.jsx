import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Login from "../components/Login";
import {useState} from "react";

function MainPage(){
    const prenume=localStorage.getItem('prenume')

    return(
       <div>
           <Navbar prenume={prenume} isMainPage={true} classes={'content-container'}></Navbar>
           <Footer></Footer>
       </div>
    )
}

export default MainPage;
