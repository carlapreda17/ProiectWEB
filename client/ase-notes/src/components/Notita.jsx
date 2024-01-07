import React from "react";
import {useNavigate} from "react-router-dom";

function Notita(props) {
    const {notita} = props;
    // console.log(notita)
    const text = notita?.content?.slice(0, 100)+'...';

    return (
        <div  className={'notita w-[30%] h-28 p-4 rounded-md m-tablet:w-[48%]'}>
            <p className={'text-center text-main-pink italic font-bold'}>{notita.titlu}</p>
            <p className={'mt-4 text-base line-clamp-2 text-wrap text-start'}>{text}</p>
        </div>
    )
}

export default Notita;