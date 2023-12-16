import React from "react";
import {useState} from "react";
import axios from 'axios';


function SignUp(props){
    const [fields, setFields] = useState({});
    const [errors, setErrors] = useState({});
    const [selectedFacultate, setSelectedFacultate] = useState("");

    const handleValidation = () => {
        const formFields = {...fields};
        const formErrors = {};
        let formIsValid = true;
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/;
        const phoneRegex=/^07\d{8}$/;
        const nameRegex=/^[a-zA-Z]+$/
        const mailRegex=/^[^@\s]+@stud\.ase\.ro$/

        //verificam daca fiecare field e completat
        if(!formFields["nume"] && !formFields["prenume"] && !formFields["email"] && !formFields["parola"] && !formFields["telefon"] && !formFields["facultate"]){
            formIsValid = false;
            formErrors["nume"] = "Cannot be empty";
            formErrors["prenume"] = "Cannot be empty"
            formErrors["parola"] = "Cannot be empty"
            formErrors["email"] = "Cannot be empty"
            formErrors["telefon"] = "Cannot be empty"
            formErrors["facultate"] = "Cannot be empty"
        }

        //fara numere in nume/prenume
        if(typeof formFields["nume"] !== "undefined" && typeof formFields["prenume"] !== "undefined"){
            if(!nameRegex.test(formFields["nume"] && !nameRegex.test(formFields["prenume"]))){
                formIsValid = false;
                formErrors["nume"] = "Only letters";
                formErrors["prenume"] = "Only letters";
            }
        }

        if(typeof formFields["email"] !=="undefined")
        {
            if(!mailRegex.test(formFields["email"]))
            {
                formIsValid = false;
                formErrors["mail"] = "Invalid mail";
            }
        }

        //parola
        if(typeof formFields["parola"] !=="undefined"){
            if(!passwordRegex.test(formFields["parola"]))
            {
                formIsValid=false;
                formFields["parola"] ="Invalid password"
            }
        }

        //nr telefon
        if(typeof formFields["telefon"] !=="undefined"){
            if(!phoneRegex.test(formFields["telefon"]))
            {
                formIsValid=false;
                formFields["telefon"]="Incorrect number"
            }
        }

        setErrors(formErrors)
        return formIsValid;
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

        const userData = {
            nume: fields["nume"],
            prenume: fields["prenume"],
            email: fields["email"],
            parola: fields["parola"],
            telefon: fields["telefon"],
            facultate: selectedFacultate
        };

        if(handleValidation())
        {
            alert("Form submitted")
        }
        else
        {
            alert("Errors")
        }
        console.log(userData)

        console.log(userData);

        try {
            const response = await axios.post('http://localhost:3001/users/signUp', userData);

            console.log(response);
        } catch(error) {
            console.log(error);
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