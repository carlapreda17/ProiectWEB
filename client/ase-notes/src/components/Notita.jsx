import React from "react";
import {useNavigate} from "react-router-dom";
import ReactMarkdown from "react-markdown";

function Notita(props) {
    const {notita} = props;
    const text = notita?.content?.slice(0, 100)+'...';
    const content=notita?.content;
    const navigate=useNavigate();
    const navigateToNotita = () => {
        if(notita.id_notita_curs)
        {
            navigate(`/editNotita?curs=${notita.id_notita_curs}`);
        }
        else
        {
            navigate(`/editNotita?seminar=${notita.id_notita_seminar}`)
        }
    }

    return (
        <div onClick={navigateToNotita} className={'notita cursor-pointer w-[30%] h-40 p-4 rounded-md m-tablet:w-[48%]'}>
            <p className={'text-center text-main-pink italic font-bold'}>{notita.titlu}</p>
            <ReactMarkdown className={'markdown-notita mt-4 !ext-sm line-clamp-2 text-wrap text-start'}>{text}</ReactMarkdown>
        </div>
    )
}

export default Notita;