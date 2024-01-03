import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UserSVG from "../components/SVG/UserSVG";
import ArrowDownSVG from "../components/SVG/ArrowDownSVG";
import {useNavigate} from "react-router-dom";
import {useEffect,useState} from "react";
import axios from "axios";

function MainPage(){
    const prenume=localStorage.getItem('prenume')
    const nume=localStorage.getItem('nume')
    const facultate=localStorage.getItem('facultate')
    const an=localStorage.getItem('an')
    const email=localStorage.getItem('email')

    const [notite, setNotite]=useState([]);
    const [atasamente, setAtasamente]=useState([]);

    useEffect(()=>{
        let response;
        async function getNotite(){
            try {
                response = await axios.get('http://localhost:3001/notes/getNotite', {
                    params: {
                      email:email
                    }});
            console.log(response.data)
            } catch (error) {
                console.error("Eroare la crearea cererii:", error.message);
            }
        }

        getNotite().then(r => {
            const notite = response.data.message.notite;
            if (notite && Array.isArray(notite)) {
                // const titluriNotite = notite.map(notita => {
                //     if (Array.isArray(notita)) {
                //         return notita[0].titlu;
                //     } else {
                //         return notita.titlu;
                //     }
                // });
                setNotite(notite);
            }
        })

        async function getAtasamente() {
            try {
                response = await axios.get('http://localhost:3001/notes/getAtasamente', {
                    params: {
                        email: email
                    }});
                console.log(response.data);
            } catch(error) {
                console.error("Eroare la crearea cererii:", error.message);
            }
        }

        getAtasamente().then(() => {
            const atasamente = response.data.message.atasamente;
            if(atasamente && Array.isArray(atasamente)) {
                // const titluriAtasamente = atasamente.map(atasament => {
                //     if(Array.isArray(atasament)) {
                //         return atasament[0].nume_fisier;
                //     } else {
                //         return atasament.nume_fisier;
                //     }
                // });
                setAtasamente(atasamente);
                console.log(atasamente)
            }
        })
    },[]);

    const navigate=useNavigate();
    const AdaugaNotita= ()=>{
        navigate('/text-note')
    }

    return(
       <div className={"page-container"}>
           <Navbar prenume={prenume} isMainPage={true} classes={'content-container'}></Navbar>
           <div>
               <div className={"sidebar-container"}>
                   <div className={"info-section"}>
                       <div className={'border-2 border-main-text border-solid p-1 bg-baby-pink'}>
                           <UserSVG/>
                       </div>
                       <div className={"user-data"}>
                           <p>{nume} {prenume}</p>
                           <p className={"text-base"}>{facultate}</p>
                           <p className={"text-base"}>An: {an}</p>
                       </div>
                   </div>
                   <div className={"addNote-section"}>
                       <button onClick={AdaugaNotita}
                               className={"button button-text py-[0.313rem] px-[3.125rem]"}>Adauga notita
                       </button>
                   </div>
                   <div className={"notes-section"}>
                       <div className={"courses dropdown"}>
                           <div className={"titles-container"}>
                               <span className={"text-base"}>Notite</span>
                               <ArrowDownSVG colorClass={"main-text"}/>
                           </div>

                           <div className={"notes-container"}>
                               {notite.map((notita, index) => (
                                   <div key={index} className={'note-content'} value={notita.titlu}>{notita.titlu}</div>
                               ))}
                           </div>
                       </div>
                       <div className={"attach dropdown"}>
                           <div className={"titles-container"}>
                               <a href={'#'}>Atasamente</a>
                               <ArrowDownSVG colorClass={"main-text"}></ArrowDownSVG>
                           </div>

                           <div className={"attach-container"}>
                               {atasamente.map((atasament, index) => (
                                   <div key={index} className={'note-content'}
                                        value={atasament.nume_fisier}>
                                       {
                                           atasament.tip !== 'Link' ?
                                               <a href={`http://localhost:3001/${atasament.cale_fisier.replace('\\', '/')}`}
                                                  download={atasament.nume_fisier}>{atasament.nume_fisier}</a>
                                               : <a href={`${atasament.url}`} target="_blank" rel="noopener noreferrer">{atasament.nume_fisier}</a>
                                       }

                                   </div>
                               ))}
                           </div>
                       </div>
                   </div>
               </div>
           </div>
           <Footer></Footer>
       </div>
    )
}

export default MainPage;
