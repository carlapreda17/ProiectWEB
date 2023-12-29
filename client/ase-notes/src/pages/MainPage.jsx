import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UserSVG from "../components/SVG/UserSVG";
import ArrowDownSVG from "../components/SVG/ArrowDownSVG";
import {useNavigate} from "react-router-dom";

function MainPage(){
    const prenume=localStorage.getItem('prenume')
    const nume=localStorage.getItem('nume')
    const facultate=localStorage.getItem('facultate')
    const an=localStorage.getItem('an')

    const navigate=useNavigate();
    const AdaugaNotita= ()=>{
        navigate('/text-note')
    }

    return(
       <div className={"page-container"}>
           <Navbar prenume={prenume} isMainPage={true} classes={'content-container'}></Navbar>
           <div className={"sidebar-container"}>
               <div className={"info-section"}>
                    <div className={'border-2 border-main-text border-solid p-1 bg-baby-pink'}>
                        <UserSVG />
                    </div>
                    <div className={"user-data"}>
                        <p>{nume} {prenume}</p>
                        <a href={"#"}>{facultate} {an}</a>
                    </div>
               </div>
               <div className={"addNote-section"}>
                   <button onClick={AdaugaNotita} className={"button button-text py-[0.313rem] px-[3.125rem]"}>Adauga notita</button>
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
