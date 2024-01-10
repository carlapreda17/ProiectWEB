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
                <div className="px-4 pt-4 setari-container w-3/4 tablet:w-full">
                    <h1 className={"mb-6 text-dark-purple"}>Setari</h1>
                    <hr className="mb-6 border-t-2 border-dashed border-main-pink" />
                    <p className={"mb-6 text-dark-purple"}>Resetare parola</p>
                    <div className={"flex flex-col space-y-4"}>
                        <label htmlFor="password" className={"text-sm  text-dark-purple"}>Introduceti noua parola:</label>
                        <input
                            id="password"
                            type="password"
                            className={"pr-16 m-tablet:w-full input-settings tablet:w-1/2 laptop:pr-12 w-1/2 rounded-xl py-2 px-4"}

                        />
                        <label htmlFor="password" className={"text-sm  text-dark-purple"}>Repeta parola:</label>
                        <input
                            id="password"
                            type="password"
                            className={"pr-16 m-tablet:w-full input-settings tablet:w-1/2 laptop:pr-12 w-1/2 rounded-xl py-2 px-4"}

                        />
                        <button className={"text-xl button-settings m-tablet:w-1/3 w-1/5 form-button button button-text px-4"}>Salveaza</button>
                    </div>
                </div>

            </div>
            <Footer/>
        </div>
    )
}

export default Settings;