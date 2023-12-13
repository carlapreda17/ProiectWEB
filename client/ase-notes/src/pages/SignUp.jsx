import React from "react";
import {useState} from "react";

function SignUp(props) {
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
        try {
            const response = await fetch('/addUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                // Datele au fost trimise cu succes către server
                console.log('Datele au fost trimise cu succes către server.');
            } else {
                // A apărut o problemă la trimiterea datelor către server
                console.error('Eroare la trimiterea datelor către server.');
            }
        } catch (error) {
            console.error('Eroare:', error);
        }
    };

    return(
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" value={valueNume} onChange={handleChangeNume} />
            </label>
            <label>
                Prenume:
                <input type="text" value={valuePrenume} onChange={handleChangePrenume} />
            </label>
            <label>
                Mail:
                <input type="email" value={valueMail} onChange={handleChangeMail} />
            </label>
            <label>
                Parola
                <input type="password" value={valueParola} onChange={handleChangeParola} />
            </label>
            <label>
                Telefon
                <input type="number" value={valueTelefon} onChange={handleChangeTelefon} />
            </label>
            <label>
                Facultate:
                <input type="text" value={valueFacultate} onChange={handleChangeFacultate} />
            </label>
            <input type="submit" value="Submit" />
        </form>
    )
}

export default SignUp