import React from "react";
import {useNavigate} from "react-router-dom";

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
        <div onClick={navigateToNotita} className={'notita cursor-pointer w-[30%] h-28 p-4 rounded-md m-tablet:w-[48%]'}>
            <p className={'text-center text-main-pink italic font-bold'}>{notita.titlu}</p>
            <p className={'mt-4 text-base line-clamp-2 text-wrap text-start'}>{text}</p>
        </div>
    )
}

export default Notita;