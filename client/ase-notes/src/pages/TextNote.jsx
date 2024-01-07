import React, { useState, useEffect, useRef } from 'react';
import {useNavigate} from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import useAuth from "../components/useAuth";

function TextNote() {
    const isAuthenticated = useAuth();

    const prenume=localStorage.getItem('prenume')
    const an=localStorage.getItem('an')
    const facultate=localStorage.getItem('facultate')
    const email = localStorage.getItem('email');

    const [noteText, setNoteText] = useState('');
    const [materii,setMaterii]=useState([]);
    const [title, setTitle] = useState('');
    const [descriere,setDescriere]=useState('')
    const [selectedDocument,setSelectedDocument]=useState('PDF')
    const [fisier,setFisier]=useState(null)
    const [url,setUrl]=useState('')

    const [selectedTip, setSelectedTip] = useState('Curs');
    const [selectedMaterie, setSelectedMaterie] = useState('');

    const navigate=useNavigate();

    if(!isAuthenticated) {
        navigate('/login');
    }

    useEffect(() => {
        if(an && facultate) {
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
                setSelectedMaterie(response.data.message.materii[0].nume);
            });
        }
    }, []);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFisier(file);
        }
    };
    const handleSelectedDocument=(event) =>{
        setSelectedDocument(event.target.value)
    }
    const handleDescriere =(event) =>{
        setDescriere(event.target.value)
    }

    const handleInputChange = (event) => {
        setNoteText(event.target.value);
    };

    const stergeText = () =>{
        setNoteText('');
    }

    const handleSelectTip = (event) => {
        setSelectedTip(event.target.value);
    };
    const handleSelectMaterie = (event) => {
        setSelectedMaterie(event.target.value);
    };

    const handleTitle = (event) => {
        setTitle(event.target.value);

    }
    const handleUrl= (event) => {
        setUrl(event.target.value);
    }

    const salveazaText = async () => {
        if (!noteText.trim()) {
            alert('Introduceți notita!');
            return;
        }

        if (!title.trim()) {
            alert('Introduceți un titlu valid!');
            return;
        }

        const data = {
            email: email,
            title: title,
            tip: selectedTip,
            materie: selectedMaterie,
            note: noteText
        };

        try {
            const response = await axios.post('http://localhost:3001/info/addNotita', data);
            if(response.status===201) {
                alert('Notita a fost adaugata cu succes!');
                const responseData = response.data;
                const date = responseData.data.date;
                localStorage.setItem('date',date)
            }

        } catch (error){
            console.error("Eroare la crearea cererii:", error.message);
        }

    }

    const adaugaAtasament = async () => {
        const date = localStorage.getItem('date');

        // Crearea unui obiect FormData
        const formData = new FormData();
        formData.append('tipMaterie', selectedTip);
        formData.append('email', email);
        formData.append('tip', selectedDocument);
        formData.append('descriere', descriere);
        if (fisier) {
            formData.append('fisier', fisier);
        }
        formData.append('materie', selectedMaterie);
        formData.append('note', noteText);
        formData.append('url', url);
        formData.append('date', date);

        try {
            const response = await axios.post('http://localhost:3001/info/addAtasament', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response);
            if (response.status === 201) {
                alert('Atasamentul a fost adaugat cu succes!');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                console.error("Eroare de la server:", error.response.data.message);
            } else if (error.request) {
                console.error("Cererea a fost trimisă, dar nu s-a primit niciun răspuns");
            } else {
                console.error("Eroare la crearea cererii:", error.message);
            }
        }
    }


    return (
        <div className={"page-container"}>
            <Navbar prenume={prenume} isMainPage={true} classes={'content-container'} />
            <div className={"content-container tablet:pr-4 tablet:pl-4"}>
                <div className={"flex flex-col items-start"}>
                    <div className={"options-wrapper"}>
                        <div className={"mb-8 flex gap-8 items-center"}>
                            <select
                                className={"bg-white text-base border-solid rounded-2xl pl-2 py-1.5 px-3 text-main-pink  laptop:pr-12"}
                                name="notita" value={selectedTip} onChange={handleSelectTip}>
                                <option className={"bg-white"} value="Curs">Curs</option>
                                <option className={"bg-white"} value="Seminar">Seminar</option>
                            </select>
                        </div>
                        <div className={"mb-8 flex items-center tablet:flex-wrap tablet:gap-2 tablet:pr-0"}>
                            <label className={"text-main-pink mr-3"}>
                                Materii
                            </label>
                            <select
                                className={"bg-white text-base border-solid rounded-2xl pl-2 py-1.5 text-main-pink pr-16 laptop:pr-12"}
                                name="materii" value={selectedMaterie} onChange={handleSelectMaterie}>
                                {materii.map(materie => (
                                    <option className={'bg-white'} value={materie.nume}>{materie.nume}</option>
                                ))};
                            </select>
                        </div>
                        <div className={"mb-8 flex gap-8 items-center"}>
                            <input type={"text"} placeholder={"Title"} value={title} onChange={handleTitle}/>
                        </div>
                    </div>
                    <div className={"text-container"}>
                        <div className={"flex flex-col items-center mr-auto ml-auto w-full"}>
                 <textarea className={"px-2 py-2 h-[25rem] w-full"}
                           value={noteText}
                           onChange={handleInputChange}
                           placeholder="Type your notes using Markdown..."
                           rows={10}
                           cols={50}
                 ></textarea>
                            <div className={"mt-3"}>
                                <button className={"button button-text px-[1.25rem] py-[0.625rem] w-[10rem]"}
                                        onClick={stergeText}>Sterge
                                </button>
                            </div>

                        </div>
                        <div
                            className={"flex flex-col items-center w-full relative mr-auto ml-auto"}>
                            <ReactMarkdown id={"text"}
                                           className={`pl-3 markdown-content mb-[3.25rem] w-full${noteText === '' ? ' no-border' : ''}`}>{noteText}</ReactMarkdown>
                            <button
                                className={"absolute mt-3 bottom-0 button button-text px-[1.25rem] py-[0.625rem] w-[10rem]"}
                                onClick={salveazaText}>Salveaza
                            </button>
                        </div>
                    </div>
                </div>
                <div className="input-container">
                    <label className={"text-main-pink mb-12 text-2xl font-bold"} htmlFor="fileInput">
                        Atasamente
                    </label>
                    <div className={"mb-8 flex gap-8 items-center laptop:flex-col laptop:gap-1"}>
                        <label className={"text-main-pink text-lg mr-3 laptop:w-28"}>
                            Tip document
                        </label>
                        <select
                            className={"bg-white text-base border-solid rounded-2xl pl-2 py-1.5 text-main-pink pr-16 laptop:pr-12"}
                            name="an_facultate" value={selectedDocument} onChange={handleSelectedDocument}>
                            <option className={"bg-white"} value="PDF">PDF</option>
                            <option className={"bg-white"} value="Document Word">Document Word</option>
                            <option className={"bg-white"} value="Imagine">Imagine</option>
                            <option className={"bg-white"} value="Excel">Excel</option>
                            <option className={"bg-white"} value="Link">Link</option>
                        </select>
                    </div>
                    <div className={"mb-8 flex gap-8 items-center"}>
                    <textarea className={"px-2 py-2 mobile:w-[18rem]"} placeholder={"Descriere"} value={descriere}
                              onChange={handleDescriere} rows={5}
                              cols={30}/>
                    </div>
                    <div className={"mb-8 flex gap-8 items-center tablet:flex-col tablet:gap-0"}>
                        <label className={"text-main-pink text-lg mr-3 laptop:w-24 tablet:w-[7rem]"}>Adauga Link</label>
                        <input type={"text"} id={'url-input'} placeholder={"URL"} value={url} onChange={handleUrl}
                               disabled={selectedDocument !== 'Link'}/>
                    </div>
                    <input className={"mb-5 mobile:w-[15rem]"} type="file" id="fileInput"
                           accept=".docx, .doc, .xlsx, .xls, .pdf, image/*"
                           onChange={handleFileChange} disabled={selectedDocument === 'Link'}/>
                    <button className={"button-text button mt-4 px-[1.25rem] py-[0.625rem]"}
                            onClick={adaugaAtasament}>Adaugă document
                    </button>
                </div>
            </div>

            <Footer/>
        </div>


    );
}

export default TextNote;
