import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Login from "../components/Login";
import {useState} from "react";
import UserSVG from "../components/SVG/UserSVG";
import ArrowDownSVG from "../components/SVG/ArrowDownSVG";
import {useNavigate} from "react-router-dom";

function MainPage(){
    const prenume=localStorage.getItem('prenume')
    const nume=localStorage.getItem('nume')
    const facultate=localStorage.getItem('facultate')
    const navigate=useNavigate();
    const AdaugaNotita= ()=>{
        navigate('/text-note')
    }


    return(
       <div>
           <Navbar prenume={prenume} isMainPage={true}></Navbar>
           <div className={"sidebar-container"}>
               <div className={"info-section"}>
                    <UserSVG></UserSVG>
                    <div className={"user-data"}>
                        <p>{nume} {prenume}</p>
                        <a href={"#"}>{facultate}</a>
                    </div>
               </div>
               <div className={"addNote-section"}>
                   <button onClick={AdaugaNotita} className={"button button-text py-[0.313rem] px-[3.125rem]"}>Aduga notita</button>
               </div>
               <div className={"notes-section"}>
                   <div className={"courses"}>
                       <a href={'#'}>Cursuri</a>
                       <ArrowDownSVG colorClass={"main-text"}></ArrowDownSVG>
                   </div>
                   <div className={"courses"}>
                       <a href={'#'}>Seminarii</a>
                       <ArrowDownSVG colorClass={"main-text"}></ArrowDownSVG>
                   </div>
               </div>
           </div>
           <Footer></Footer>
       </div>
    )
}

export default MainPage;
