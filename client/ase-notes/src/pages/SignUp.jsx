import React from "react";
import {useState} from "react";
import axios from 'axios';
import { passwordRegex, phoneRegex, nameRegex, mailRegex} from "../utils/constants";


function SignUp(props){
    const [fields, setFields] = useState({});
    const [errors, setErrors] = useState({});
    const [selectedFacultate, setSelectedFacultate] = useState("");

    const handleValidation = () => {
        const formFields = {...fields};
        const formErrors = {};
        let isValid = true;

        //verificam daca fiecare field e completat
        if(!formFields["nume"] && !formFields["prenume"] && !formFields["email"] && !formFields["parola"] && !formFields["telefon"] && !formFields["facultate"]){
            isValid = false;
            formErrors["nume"] = "Cannot be empty";
            formErrors["prenume"] = "Cannot be empty";
            formErrors["parola"] = "Cannot be empty";
            formErrors["email"] = "Cannot be empty";
            formErrors["telefon"] = "Cannot be empty";
            formErrors["facultate"] = "Cannot be empty";
        }

        //fara numere in nume/prenume
        if(typeof formFields["nume"] !== "undefined" && typeof formFields["prenume"] !== "undefined"){
            if(!nameRegex.test(formFields["nume"] && !nameRegex.test(formFields["prenume"]))){
                isValid = false;
                formErrors["nume"] = "Only letters";
                formErrors["prenume"] = "Only letters";
            }
        }

        if(typeof formFields["email"] !=="undefined")
        {
            if(!mailRegex.test(formFields["email"]))
            {
                isValid = false;
                formErrors["mail"] = "Invalid mail";
            }
        }

        //parola
        if(typeof formFields["parola"] !=="undefined"){
            if(!passwordRegex.test(formFields["parola"]))
            {
                isValid = false;
                formFields["parola"] ="Invalid password";
            }
        }

        //nr telefon
        if(typeof formFields["telefon"] !=="undefined"){
            if(!phoneRegex.test(formFields["telefon"]))
            {
                isValid = false;
                formFields["telefon"]="Incorrect number";
            }
        }

        setErrors(formErrors)
        return isValid;
    }
    const handleChange = (field, value) => {
        setFields({
            ...fields,
            [field]: value
        })
    }

    const handleSelectChange = (event) => {
        setSelectedFacultate(event.target.value);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        const isValidForm = handleValidation();

        if (!isValidForm) {
            alert("Errors in form");
            return;
        }

        const userData = {
            nume: fields["nume"],
            prenume: fields["prenume"],
            email: fields["email"],
            parola: fields["parola"],
            telefon: fields["telefon"],
            facultate: selectedFacultate
        };

        try {
            const response = await axios.post('http://localhost:3001/users/signUp', userData);

            console.log(response);

            if(response.status === 201){
                alert('Form submitted');
            }
            else {
                alert('Errors');
            }
        } catch (error) {
            if (error.response) {
                console.error("Eroare de la server:", error.response.data);
            } else if (error.request) {
                console.error("Cererea a fost trimisă, dar nu s-a primit niciun răspuns");
            } else {
                console.error("Eroare la crearea cererii:", error.message);
            }
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text"  className={"border-2 border-main-pink"} value={fields["nume"]} onChange={e=>handleChange("nume",e.target.value)}/>
                <span>{errors["nume"]}</span>
            </label>
            <label>
                Prenume:
                <input type="text" className={"border-2 border-main-pink"} value={fields["prenume"]} onChange={e=>handleChange("prenume",e.target.value)} />
                <span>{errors["prenume"]}</span>
            </label>
            <label>
                Mail:
                <input type="email" className={"border-2 border-main-pink"} value={fields["email"]} onChange={e=>handleChange("email",e.target.value)} />
                <span>{errors["email"]}</span>
            </label>
            <label>
                Parola
                <input type="password" className={"border-2 border-main-pink"} value={fields["parola"]} onChange={e=>handleChange("parola",e.target.value)} />
                <span>{errors["parola"]}</span>
            </label>
            <label>
                Telefon
                <input className={"border-2 border-main-pink"} value={fields["telefon"]} onChange={e=>handleChange("telefon",e.target.value)} />
                <span>{errors["telefon"]}</span>
            </label>
            <label>
                Facultate:
            </label>
            <select name="facultate" value={selectedFacultate} onChange={handleSelectChange}>
                <option value="cibe">Cibernetica</option>
                <option value="info">Informatica economica</option>
                <option value="stat">Statistica</option>
            </select>
            <input type="submit"  value="Submit" />
        </form>
    )
}

export default SignUp;