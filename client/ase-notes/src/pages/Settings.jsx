import React from "react";
import useAuth from "../components/useAuth";
import {useNavigate} from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar";
import CloseSVG from "../components/SVG/CloseSVG";
import Materie from "../components/Materie";
import Notita from "../components/Notita";
function Settings(){
    const isAuthenticated = useAuth();
    const navigate=useNavigate();
    const prenume=localStorage.getItem('prenume');
    const email = localStorage.getItem('email');

    // if(!isAuthenticated) {
    //     navigate('/login');
    // }

    return (
        <div className={"page-container"}>
            <Navbar prenume={prenume} isMainPage={true} classes={'content-container'} />
            <div className={'flex gap-0 tablet:flex-col'}>
                <Sidebar />
                <div className={"!px-0 !pt-0 setari-container w-[75%] tablet:w-full"}>
                        <h1>Setari</h1>
                        <p>Resetare parola</p>
                        <div className={"flex flex-col"}>
                            <label>Parola</label>
                            <input type="parola" className={'pr-16 laptop:pr-12 w-[40%]'} placeholder={"Password"}/>
                            <button className={"!text-xl w-1/5 form-button button button-text m-tablet:px-20"}>Salveaza</button>
                        </div>
                </div>



            </div>
            <Footer/>
        </div>
    )
}

export default Settings;