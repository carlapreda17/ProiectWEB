import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {getNotitaCurs,getNotitaSeminar,updateNotitaCurs, updateNotitaSeminar} from "../utils/functions";

function EditareNotita(){
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const id_notita_curs = params.get('curs');
    const id_notita_seminar=params.get('seminar')
    const [notita, setNotita] = useState(null);
    const [textareaContent, setTextareaContent] = useState('');
    const [id_curs,setId_curs]=useState(null)
    const [id_seminar,setId_seminar]=useState(null)


    useEffect(() => {
        if(id_notita_curs) {
            const idNr_notita_curs=Number(id_notita_curs)
            getNotitaCurs(idNr_notita_curs).then(response => {
                if(response) {
                    setNotita(response.data.message.notita)
                    setId_curs(response.data.message.notita.id_notita_curs)
                    setTextareaContent(response.data.message.notita.content);

                }
            });
        }
        else
        {
                const idNr_notita_seminar=Number(id_notita_seminar)
                getNotitaSeminar(idNr_notita_seminar).then(response => {
                    if(response) {
                         setNotita(response.data.message.notita)
                         setId_seminar(response.data.message.notita.id_notita_seminar)
                         setTextareaContent(response.data.message.notita.content);

                    }
                });

        }

    }, [id_notita_curs,id_notita_seminar]);

    const handleTextareaChange = (event) => {
        setTextareaContent(event.target.value);
    };

    const salveazaTextul = () => {
        if (id_curs) {
            const data = {
                id: id_curs,
                content: textareaContent
            };
            updateNotitaCurs(data)
                .then(response => {
                    {
                        alert('Notița a fost actualizată cu succes!');

                    }
                })
                .catch(error => {
                    console.error('Eroare la actualizarea notiței:', error);
                });
        } else {
            const data = {
                id: id_seminar,
                content: textareaContent
            };
            updateNotitaSeminar(data)
                .then(response => {
                   {
                        alert('Notița a fost actualizată cu succes!');

                    }
                })
                .catch(error => {
                    console.error('Eroare la actualizarea notiței:', error);
                });
        }
    };

    return(
        <div className={"textarea-container"}>
            <div className={"mb-3"}>
                <textarea className={"px-3 py-2 h-[25rem] w-full"} rows="10" cols="50" value={textareaContent}
                          onChange={handleTextareaChange}></textarea>
            </div>
            <button onClick={salveazaTextul} className={"button button-text py-[0.313rem] px-[3.125rem]"}>Salveaza</button>
        </div>
    )
}

export default EditareNotita;