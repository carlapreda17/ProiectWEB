import {useParams} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import {getMaterie, getNotiteMaterie} from "../utils/functions";
import Notita from "../components/Notita";
import {useNavigate} from "react-router-dom";

function PaginaMaterie() {
    const [materie, setMaterie] = useState(null);
    const [notite, setNotite] = useState([]);
    const notiteInitialeRef = useRef([]);

    const [sortType, setSortType] = useState('');
    const [sortOrder, setSortOrder] = useState('');

    const { id_materie } = useParams();
    const prenume=localStorage.getItem('prenume');
    const email = localStorage.getItem('email');
    const navigate=useNavigate();

    useEffect(() => {
        if(id_materie) {
            getMaterie(id_materie).then(response => {
                if(response) {
                    setMaterie(response.data.message.materie);
                }
            });

            getNotiteMaterie(id_materie, email).then(response => {
                if(response) {
                    setNotite(response.data.message.notite);
                    notiteInitialeRef.current = response.data.message.notite;
                }
            })
        }
    }, []);

    useEffect(() => {
        if(!notiteInitialeRef.current.length) return;

        let notiteSortate = [...notiteInitialeRef.current];

        if(sortType === 'Course') {
            notiteSortate = notiteSortate.filter(notita => notita.id_notita_curs);
        } else if(sortType === 'Seminar') {
            notiteSortate = notiteSortate.filter(notita => notita.id_notita_seminar);
        } else if (sortType === 'All') {
            notiteSortate = [...notiteInitialeRef.current];
        }

        if(sortOrder !== "") {
            notiteSortate.sort((a, b) => {
                if(sortOrder.includes('Date')) {
                    const dateA = new Date(a.data);
                    const dateB = new Date(b.data);
                    return sortOrder.includes('Asc.') ? dateA - dateB : dateB - dateA;
                } else if(sortOrder.includes('Name')) {
                    return sortOrder.includes('Asc.') ? a.titlu?.localeCompare(b.titlu) : b.titlu?.localeCompare(a.titlu);
                }
            });
        }

        setNotite(notiteSortate);
    }, [sortType, sortOrder]);



    return (
        <div className={"page-container"}>
            <Navbar prenume={prenume} isMainPage={true} classes={'content-container'} />
            <div className={'flex gap-0 tablet:flex-col'}>
                <Sidebar />
                <div className={"!px-0 !pt-0 materii-container materie-pag w-[75%] tablet:w-full"}>
                    <div className={'photo-container relative !rounded-none h-0 w-full pb-[35%]'}>
                        <img src={`${materie?.poza}`} alt={'Photo of materie'}
                             className={'absolute !rounded-none top-0 left-0 object-cover h-full w-full rounded-md'}/>
                        <div className="overlay"></div>
                        <div className={'materie-name m-tablet:text-xl mobile:text-lg'}>{materie?.nume}</div>
                    </div>

                    <div className={'sorting-container flex justify-between mobile:flex-col mobile:gap-2'}>
                        <div>
                            <label className={"text-base leading-4 text-dark-purple font-bold mr-3 w-28 laptop:w-24"}>
                                Tip
                            </label>
                            <select
                                className={'bg-white text-base border-solid rounded-2xl pl-2 py-1.5 text-dark-purple pr-16 laptop:pr-12'}
                                name={'sortType'}
                                value={sortType}
                                onChange={(e) => setSortType(e.target.value)}>
                                <option className={"bg-white"} value="">Alege...</option>
                                <option className={"bg-white"} value="Course">Curs</option>
                                <option className={"bg-white"} value="Seminar">Seminar</option>
                                <option className={"bg-white"} value="All">Toate</option>
                            </select>
                        </div>

                        <div>
                        <label className={"text-base leading-4 text-dark-purple font-bold mr-3 w-28 laptop:w-24"}>
                                Sortează după
                            </label>
                            <select
                                className={'bg-white text-base border-solid rounded-2xl pl-2 py-1.5 text-dark-purple pr-16 laptop:pr-12'}
                                name={'sort'}
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}>
                                <option className={"bg-white"} value="">Alege...</option>
                                <option className={"bg-white"} value="By Date Asc.">Cele mai vechi</option>
                                <option className={"bg-white"} value="By Date Desc.">Cele mai recente</option>
                                <option className={"bg-white"} value="By Name Asc.">A-Z</option>
                                <option className={"bg-white"} value="By Name Desc.">Z-A</option>
                            </select>
                        </div>
                    </div>

                    <div className={'notes-container-materie'}>
                        {notite?.map((notita, idx) => <Notita key={idx} notita={notita}/>)}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default PaginaMaterie;