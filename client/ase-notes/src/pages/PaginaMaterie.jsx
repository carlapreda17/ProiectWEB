import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import {getMaterie} from "../utils/functions";

function PaginaMaterie() {
    const [materie, setMaterie] = useState(null);

    const { id_materie } = useParams();
    const prenume=localStorage.getItem('prenume');

    useEffect(() => {
        if(id_materie) {
            getMaterie(id_materie).then(response => {
                if(response) {
                    setMaterie(response.data.message.materie);
                }
            });
        }
    }, []);

    console.log(materie);

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

                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default PaginaMaterie;