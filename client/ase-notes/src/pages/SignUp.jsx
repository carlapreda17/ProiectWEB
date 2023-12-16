import React from "react";
import {useState} from "react";

function SignUp(params){
    const [valueNume, setValueNume] = useState('');
    const [valuePrenume, setValuePrenume] = useState('');
    const [valueMail, setValueMail] = useState('');
    const [valueTelefon, setValueTelefon] = useState('');
    const [valueFacultate, setValueFacultate] = useState('');
    const [valueParola, setValueParola] = useState('');

    const handleChangeNume = (event) => {
        setValueNume(event.target.value);
    }

    const handleChangePrenume = (event) => {
        setValuePrenume(event.target.value);
    }
    const handleChangeMail= (event) => {
        setValueMail(event.target.value);
    }

    const handleChangeTelefon = (event) => {
        setValueTelefon(event.target.value);
    }
    const handleChangeParola = (event) => {
        setValueParola(event.target.value);
    }
    const handleChangeFacultate = (event) => {
        setValueFacultate(event.target.value);
    }
    const handleSubmit = async (event) => {

        const userData = {
            nume: valueNume,
            prenume: valuePrenume,
            email: valueMail,
            parola: valueParola,
            telefon: valueTelefon,
            facultate: valueFacultate
        };
        console.log(userData)
    }
    return(
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" className={"border-2 border-main-pink"} value={valueNume} onChange={handleChangeNume} />
            </label>
            <label>
                Prenume:
                <input type="text" className={"border-2 border-main-pink"} value={valuePrenume} onChange={handleChangePrenume} />
            </label>
            <label>
                Mail:
                <input type="email" className={"border-2 border-main-pink"} value={valueMail} onChange={handleChangeMail} />
            </label>
            <label>
                Parola
                <input type="password" className={"border-2 border-main-pink"} value={valueParola} onChange={handleChangeParola} />
            </label>
            <label>
                Telefon
                <input type="number" className={"border-2 border-main-pink"} value={valueTelefon} onChange={handleChangeTelefon} />
            </label>
            <label>
                Facultate:
                <input type="text" className={"border-2 border-main-pink"} value={valueFacultate} onChange={handleChangeFacultate} />
            </label>
            <input type="submit"  value="Submit" />
        </form>
    )
}

export default SignUp;