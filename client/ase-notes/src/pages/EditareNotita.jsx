import useAuth from "../components/useAuth";
import {useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {
    closeImageAttachment,
    getAtasamenteNotita,
    getNotitaCurs,
    getNotitaSeminar, openImage,
    updateNotitaCurs,
    updateNotitaSeminar
} from "../utils/functions";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import ReactMarkdown from "react-markdown";
import CloseSVG from "../components/SVG/CloseSVG";

function EditareNotita() {
    const isAuthenticated = useAuth();

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const idCurs = params.get('curs');
    const idSeminar = params.get('seminar');

    const prenume = localStorage.getItem('prenume');
    const email = localStorage.getItem('email');

    const [notita, setNotita] = useState(null);
    const [textareaContent, setTextareaContent] = useState('');
    const [id_curs,setId_curs]=useState(null);
    const [id_seminar,setId_seminar]=useState(null);

    const [atasamente, setAtasamente] = useState([]);

    const [materie, setMaterie] = useState('');
    const [titlu, setTitlu] = useState('');

    useEffect(() => {
        if(!isAuthenticated) return;

        if(idCurs) {
            const id = Number(idCurs);

            getNotitaCurs(id).then(response => {
                if(response) {
                    setNotita(response.data.message.notita);
                    setId_curs(response.data.message.notita.id_notita_curs);
                    setTextareaContent(response.data.message.notita.content);

                    setMaterie(response.data.message.notita.nume_materie);
                    setTitlu(response.data.message.notita.titlu);
                }
            });

            getAtasamenteNotita(email, id, null).then(response => {
                if(response) {
                    setAtasamente(response.data.message.atasamente);
                }
            });
        } else {
            const id = Number(idSeminar);

            getNotitaSeminar(id).then(response => {
                if(response) {
                    setNotita(response.data.message.notita);
                    setId_seminar(response.data.message.notita.id_notita_seminar);
                    setTextareaContent(response.data.message.notita.content);

                    setMaterie(response.data.message.notita.nume_materie);
                    setTitlu(response.data.message.notita.titlu);
                }
            });
            getAtasamenteNotita(email, null, id).then(response => {
                if(response) {
                    setAtasamente(response.data.message.atasamente);
                }
            });
        }
    }, [idCurs, idSeminar, isAuthenticated]);

    const handleTextareaChange = (event) => {
        setTextareaContent(event.target.value);
    };

    const salveazaTextul = () => {
        if (idCurs) {
            const data = {
                id: idCurs,
                content: textareaContent
            };
            updateNotitaCurs(data)
                .then(response => {
                    {
                        alert('Notița a fost actualizată cu succes!');
                        document.getElementById('textareaNote').style.display = "none";
                    }
                })
                .catch(error => {
                    console.error('Eroare la actualizarea notiței:', error);
                });
        } else {
            const data = {
                id: idSeminar,
                content: textareaContent
            };
            updateNotitaSeminar(data)
                .then(response => {
                    {
                        alert('Notița a fost actualizată cu succes!');
                        document.getElementById('textareaNote').style.display = "none";
                    }
                })
                .catch(error => {
                    console.error('Eroare la actualizarea notiței:', error);
                });
        }
    };

    return (
        <div className={'page-container relative'}>
            <div id={'overlay-photo'} className={'hidden z-[1]'}>
                    <button className={'absolute top-[8%] right-[1%] cursor-pointer'}
                            onClick={closeImageAttachment}>
                        <CloseSVG colorClass={'text-white'} classes={'h-[20px] w-[20px]'}/>
                    </button>
                </div>

            <Navbar prenume={prenume} isMainPage={true} classes={'content-container'}/>
            <div className={'flex gap-4 tablet:flex-col min-h-[50rem]'}>
                <Sidebar/>
                <div className={'w-[75%] my-12 mx-8 tablet:w-[85%]'}>
                    <div className={'text-center text-dark-purple text-2xl'}>{titlu}</div>
                    <div className={'flex flex-col'}>
                        <span className={'text-dark-purple'}>{materie}</span>
                        <span className={'text-main-pink'}>{idCurs ? 'Curs' : 'Seminar'}</span>
                    </div>
                    <div id="textareaNote" className={"textarea-container"} style={{display: "none"}}>
                        <div className={"mb-3"}>
                            <textarea className={"px-3 py-2 h-[25rem] w-full"} rows="10" cols="50"
                                      value={textareaContent}
                                      onChange={handleTextareaChange}></textarea>
                        </div>
                        <button onClick={salveazaTextul}
                                className={"button button-text py-[0.313rem] px-[3.125rem]"}>Salveaza
                        </button>
                    </div>

                    <div
                        className={"items-center w-full relative mr-auto ml-auto mt-4"}>
                        <ReactMarkdown id={"text"}
                                       className={`pl-3 markdown-content w-full`}>{textareaContent}</ReactMarkdown>
                    </div>
                    <div className={'flex justify-center mt-4'}>
                        <button className={'button button-text py-[0.313rem] px-[3.125rem]'}
                                onClick={() => {
                                    document.getElementById('textareaNote').style.display = "flex";
                                }}>Editează
                        </button>
                    </div>

                    <div className={'mt-8'}>
                        <span className={'text-dark-purple'}>Atașamente</span>
                        <div className={'mt-4'}>
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
                                                <a href={`${atasament.url}`} className={'text-dark-purple'}
                                                   target="_blank"
                                                   rel="noopener noreferrer">{atasament.nume_fisier}</a>
                                        }
                                    </div>
                                ))}
                        </div>
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

export default EditareNotita;