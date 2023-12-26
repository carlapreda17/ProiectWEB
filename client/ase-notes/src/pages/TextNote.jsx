import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

function TextNote() {
    const prenume=localStorage.getItem('prenume')
    const an=localStorage.getItem('an')
    const facultate=localStorage.getItem('facultate')

    const [noteText, setNoteText] = useState('');
    const[materii,setMaterii]=useState([]);



    const handleInputChange = (event) => {
        setNoteText(event.target.value);
    };

    const stergeText = () =>{
        setNoteText('');
    }

    return (
        <div className={"page-container"}>
            <Navbar prenume={prenume} isMainPage={true} classes={'content-container'}></Navbar>
            <div className={"flex flex-col items-start"}>
            <div className={"options-wrapper"}>
            <div className={"mb-8 flex gap-8 items-center"}>
                <select
                    className={"bg-white text-base border-solid rounded-2xl pl-2 py-1.5 px-3 text-main-pink  laptop:pr-12"}
                    name="notita">
                    <option className={"bg-white"} value="Curs">Curs</option>
                    <option className={"bg-white"} value="Seminar">Seminar</option>
                </select>
            </div>
            <div className={"mb-8 flex gap-8 items-center"}>
                <label className={"text-main-pink mr-3"}>
                    Materii
                </label>
                <select
                    className={"bg-white text-base border-solid rounded-2xl pl-2 py-1.5 text-main-pink pr-16 laptop:pr-12"}
                    name="materii">
                </select>
            </div>
            </div>
            <div className={"text-container"}>
            <div className={"ml-[4.25rem] flex flex-col items-center"}>
                 <textarea className={"px-2 py-2"}
                     value={noteText}
                     onChange={handleInputChange}
                     placeholder="Type your notes using Markdown..."
                     rows={10}
                     cols={50}
                ></textarea>
                <div className={"mt-3"}>
                    <button className={"button button-text px-[1.25rem] py-[0.625rem]"} onClick={stergeText}>Sterge</button>
                </div>

            </div>
            <div className={"flex flex-col items-center w-[500px] m-tablet:w-[350px] tablet:w-[200px] relative"}>
                    <ReactMarkdown id={"text"} className={`pl-3 markdown-content mb-[6.25rem] ${noteText === '' ? 'no-border' : ''}`}>{noteText}</ReactMarkdown>
                <button className={"absolute mt-3 bottom-0 right-1/4 button button-text px-[1.25rem] py-[0.625rem]"}>Salveaza</button>
            </div>
            </div>
            </div>
            <Footer></Footer>
        </div>


    );
}

export default TextNote;
