import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UserSVG from "../components/SVG/UserSVG";
import ArrowDownSVG from "../components/SVG/ArrowDownSVG";
import {useNavigate} from "react-router-dom";
import {useEffect,useState} from "react";
import axios from "axios";
import useAuth from "../components/useAuth";
import Materie from "../components/Materie";
import Sidebar from "../components/Sidebar";
import {getAtasamente, getMaterii, getNotite} from "../utils/functions";
import CloseSVG from "../components/SVG/CloseSVG";

function MainPage(){
    const isAuthenticated = useAuth();

    const prenume=localStorage.getItem('prenume');
    const facultate=localStorage.getItem('facultate');
    const an=localStorage.getItem('an');
    const email=localStorage.getItem('email');

    const [notite, setNotite]=useState([]);
    const [atasamente, setAtasamente]=useState([]);
    const [materii, setMaterii]=useState([]);

    const navigate=useNavigate();

    if(!isAuthenticated) {
        navigate('/login');
    }

    useEffect( () => {
        getMaterii(facultate, an).then(response=> {
            if(response) {
                setMaterii(response.data.message.materii);
            }
        });

        getNotite(email).then(response=> {
            if(response) {
                setNotite(response.data.message.notite);
            }
        });

        getAtasamente(email).then(response => {
            if(response) {
                const atasamente = response.data.message.atasamente;
                if (atasamente && Array.isArray(atasamente)) {
                    setAtasamente(atasamente);
                }
            }
        });
    },[]);

    function closeImageAttachment() {
        const container = document.getElementById('attach-image-container');
        if(container) {
            container.style.display = 'none';
        }

        const overlay = document.getElementById('overlay-photo');
        if(overlay) {
            overlay.style.display = 'none';
        }
    }

    return(
        <div className={"page-container relative"}>
            <div id={'overlay-photo'} className={'hidden z-[1]'}>
                <button className={'absolute top-[8%] right-[1%] cursor-pointer'}
                onClick={closeImageAttachment}>
                    <CloseSVG colorClass={'text-white'} classes={'h-[20px] w-[20px]'}/>
                </button>
            </div>
            <Navbar prenume={prenume} isMainPage={true} classes={'content-container'}></Navbar>
            <div className={'flex gap-4 tablet:flex-col min-h-[50rem]'}>
                <Sidebar/>
                <div className={"materii-container w-[75%] tablet:w-full"}>
                    <p className={'text-4xl text-center text-dark-purple mb-8'}>Materii</p>
                    <div className={'flex flex-wrap flex-row gap-6 justify-around tablet:justify-center'}>
                        {materii.map((materie, idx) => {
                            return <Materie key={idx} materie={materie}/>
                        })}
                    </div>
                </div>
            </div>

            <div id={'attach-image-container'} className={'hidden absolute top-[15%] right-[20%] w-[60%] z-[2]'}>
                <div className={'relative h-0 pb-[100%] m-tablet:pb-[130%]'}>
                    <img src={''} className={'absolute top-0 left-0 object-contain h-full w-full'}
                         alt={'Attachment image'}/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default MainPage;
