import UserSVG from "./SVG/UserSVG";
import ArrowDownSVG from "./SVG/ArrowDownSVG";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getAtasamente, getNotite, openImage} from "../utils/functions";
import useAuth from "./useAuth";

function Sidebar(props) {
    const isAuthenticated = useAuth();
    const prenume=localStorage.getItem('prenume');
    const nume=localStorage.getItem('nume');
    const facultate=localStorage.getItem('facultate');
    const an=localStorage.getItem('an');
    const email=localStorage.getItem('email');

    const [notite, setNotite]=useState([]);
    const [atasamente, setAtasamente]=useState([]);

    useEffect(()=>{
        if(!isAuthenticated) return;

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
    },[isAuthenticated]);

    const navigate=useNavigate();

    const AdaugaNotita= ()=>{
        navigate('/text-note')
    }

    return (
        <div className={"sidebar-container w-[25%] tablet:flex-col tablet:w-full tablet:gap-4"}>
            <div className={"info-section tablet:flex-row tablet:w-full"}>
                <div className={'border-2 border-main-text border-solid p-1 bg-baby-pink'}>
                    <UserSVG/>
                </div>
                <div className={"user-data text-dark-purple"}>
                    <p>{nume} {prenume}</p>
                    <p className={"text-base"}>{facultate}</p>
                    <p className={"text-base"}>An: {an}</p>
                </div>
            </div>
            <div className={"addNote-section"}>
                <button onClick={AdaugaNotita}
                        className={"button button-text py-[0.313rem] px-[3.125rem]"}>Adaugă notiță
                </button>
            </div>
            <div className={"notes-section"}>
                <div className={"courses dropdown tablet:w-full"}>
                    <div className={"titles-container"}>
                        <span className={"text-base text-dark-purple"}>Notițe</span>
                        <ArrowDownSVG colorClass={"text-dark-purple"}/>
                    </div>

                    <div className={"notes-container"}>
                        {notite?.map((notita, index) => (
                            <div key={index} className={'note-content text-dark-purple'}
                                 value={notita.titlu}>
                                <a href={`/editNotita?${notita.id_notita_seminar ? 'seminar' : 'curs'}=${notita.id_notita_seminar ? notita.id_notita_seminar : notita.id_notita_curs}`}>{notita.titlu}</a>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={"attach dropdown tablet:w-full"}>
                    <div className={"titles-container"}>
                        <a href={'#'} className={'text-dark-purple'}>Atașamente</a>
                        <ArrowDownSVG colorClass={"text-dark-purple"}></ArrowDownSVG>
                    </div>

                    <div className={"attach-container"}>
                        {atasamente?.filter(atasament => atasament != null && atasament.nume_fisier)
                            .map((atasament, index) => (
                                <div key={index} className={'note-content'}
                                     value={atasament.nume_fisier}>
                                    {
                                        atasament.tip !== 'Link' ?
                                            atasament.tip !== 'Imagine' ?
                                                <a href={`http://localhost:3001/${atasament.cale_fisier}`}
                                                   className={'text-dark-purple'}
                                                   download={atasament.nume_fisier}>{atasament.nume_fisier}</a>
                                                :
                                                <a href={'#'}
                                                   className={'text-dark-purple'}
                                                   onClick={() => openImage(`http://localhost:3001/${atasament.cale_fisier}`)}>
                                                    {atasament.nume_fisier}</a>
                                            :
                                            <a href={`${atasament.url}`} className={'text-dark-purple'} target="_blank"
                                               rel="noopener noreferrer">{atasament.nume_fisier}</a>
                                    }

                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;