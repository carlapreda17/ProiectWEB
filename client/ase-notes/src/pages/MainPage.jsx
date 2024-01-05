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

function MainPage(){
    const isAuthenticated = useAuth();

    const prenume=localStorage.getItem('prenume')
    const nume=localStorage.getItem('nume')
    const facultate=localStorage.getItem('facultate')
    const an=localStorage.getItem('an')
    const email=localStorage.getItem('email')

    const [notite, setNotite]=useState([]);
    const [atasamente, setAtasamente]=useState([]);
    const [materii, setMaterii]=useState([]);

    const navigate=useNavigate();

    if(!isAuthenticated) {
        navigate('/login');
    }

    useEffect(()=>{
        let response;
        async function getMaterie() {
            try {
                response = await axios.get('http://localhost:3001/info/getMaterii', {
                    params: {
                        nume_facultate: facultate,
                        an: an
                    }});

            } catch (error) {
                console.error("Eroare la crearea cererii:", error.message);
            }
        }
        getMaterie().then(r => {
            setMaterii(response.data.message.materii);
        });

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
                setAtasamente(atasamente);
                console.log(atasamente)
            }
        })
    },[]);

    const AdaugaNotita= ()=>{
        navigate('/text-note')
    }

    return(
       <div className={"page-container"}>
           <Navbar prenume={prenume} isMainPage={true} classes={'content-container'}></Navbar>
           <div className={'flex gap-4 tablet:flex-col'}>
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
                               className={"button button-text py-[0.313rem] px-[3.125rem]"}>Adauga notita
                       </button>
                   </div>
                   <div className={"notes-section"}>
                       <div className={"courses dropdown"}>
                           <div className={"titles-container"}>
                               <span className={"text-base text-dark-purple"}>Notite</span>
                               <ArrowDownSVG colorClass={"text-dark-purple"}/>
                           </div>

                           <div className={"notes-container"}>
                               {notite.map((notita, index) => (
                                   <div key={index} className={'note-content text-dark-purple'} value={notita.titlu}>{notita.titlu}</div>
                               ))}
                           </div>
                       </div>
                       <div className={"attach dropdown"}>
                           <div className={"titles-container"}>
                               <a href={'#'} className={'text-dark-purple'}>Atasamente</a>
                               <ArrowDownSVG colorClass={"text-dark-purple"}></ArrowDownSVG>
                           </div>

                           <div className={"attach-container"}>
                               {atasamente.map((atasament, index) => (
                                   <div key={index} className={'note-content'}
                                        value={atasament.nume_fisier}>
                                       {
                                           atasament.tip !== 'Link' ?
                                               <a href={`http://localhost:3001/${atasament.cale_fisier.replace('\\', '/')}`}
                                                  className={'text-dark-purple'} download={atasament.nume_fisier}>{atasament.nume_fisier}</a>
                                               : <a href={`${atasament.url}`} className={'text-dark-purple'} target="_blank" rel="noopener noreferrer">{atasament.nume_fisier}</a>
                                       }

                                   </div>
                               ))}
                           </div>
                       </div>
                   </div>
               </div>
               <div className={"materii-container w-[75%] tablet:w-full"}>
                   <p className={'text-4xl text-center text-dark-purple mb-8'}>Materii</p>
                   <div className={'flex flex-wrap flex-row gap-6 justify-around tablet:justify-center'}>
                       {materii.map(materie => {
                           return <Materie materie={materie}/>
                       })}
                   </div>
               </div>
           </div>
           <Footer />
       </div>
    )
}

export default MainPage;
