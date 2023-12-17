import React from "react";
import {useState} from "react";
import axios from 'axios';
import { passwordRegex, phoneRegex, nameRegex, mailRegex} from "../utils/constants";
import './SignUp.css'


function SignUp(props){
    const [fields, setFields] = useState({});
    const [errors, setErrors] = useState({});
    const [selectedFacultate, setSelectedFacultate] = useState("");

    const handleValidation = () => {
        const formFields = {...fields};
        const formErrors = {};
        let formIsValid = true;

        //verificam daca fiecare field e completat
        if (!formFields["nume"]) {
            formIsValid = false;
            formErrors["nume"] = "Cannot be empty";
        }

        if (!formFields["prenume"]) {
            formIsValid = false;
            formErrors["prenume"] = "Cannot be empty";
        }

        if (!formFields["parola"]) {
            formIsValid = false;
            formErrors["parola"] = "Cannot be empty";
        }

        if (!formFields["email"]) {
            formIsValid = false;
            formErrors["email"] = "Cannot be empty";
        }

        if (!formFields["telefon"]) {
            formIsValid = false;
            formErrors["telefon"] = "Cannot be empty";
        }

        //fara numere in nume/prenume
        if(typeof formFields["nume"] !== "undefined"){
            if(!nameRegex.test(formFields["nume"])){
                formIsValid = false;
                formErrors["nume"] = "Only letters";

            }
        }
        if(typeof formFields["prenume"] !== "undefined"){
            if(!nameRegex.test(formFields["prenume"])){
                formIsValid = false
                formErrors["prenume"] = "Only letters";
            }
        }

        if(typeof formFields["email"] !=="undefined")
        {
            if(!mailRegex.test(formFields["email"]))
            {
                formIsValid = false;
                formErrors["email"] = "Invalid mail";
            }
        }

        //parola
        if(typeof formFields["parola"] !=="undefined")
        {
            if(!passwordRegex.test(formFields["parola"]))
            {
                formIsValid = false;
                formErrors["parola"] = "Invalid password";
            }
        }

        //nr telefon
        if(typeof formFields["telefon"] !=="undefined")
        {
            if(!phoneRegex.test(formFields["telefon"]))
            {
                formIsValid = false;
                formErrors["telefon"] = "Invalid number";
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
        <div className={"form-container"}>
        <form>
            <div className={"mb-3"}>
                <label className={"label-text"}>
                    Name
                    <input type="text" placeholder={"Name"} value={fields["nume"]} onChange={e=>handleChange("nume",e.target.value)}/>
                    <div className={"text-red-500"}>{errors["nume"]}</div>
                </label>
            </div>
            <div className={"mb-3"}>
                <label className={"label-text"}>
                    Surrname
                    <input type="text"  placeholder={"Surrname"} value={fields["prenume"]} onChange={e=>handleChange("prenume",e.target.value)} />
                    <div className={"text-red-500"}>{errors["prenume"]}</div>
                </label>
            </div>

            <div className={"mb-3"}>
                <label className={"label-text"}>
                    Email
                    <input type="email"  placeholder={"Email"} value={fields["email"]} onChange={e=>handleChange("email",e.target.value)} />
                    <div className={"text-red-500"}>{errors["email"]}</div>
                </label>
            </div>
            <div className={"mb-3"}>
                <label className={"label-text"}>
                    Password
                    <input type="password"  placeholder={"Password"} value={fields["parola"]} onChange={e=>handleChange("parola",e.target.value)} />
                    <div className={"text-red-500"} >{errors["parola"]}</div>
                </label>
            </div>
            <div className={"mb-3"}>
                <label className={"label-text"}>
                    Phone Number
                    <input  placeholder={"Phone number"} value={fields["telefon"]} onChange={e=>handleChange("telefon",e.target.value)} />
                    <div className={"text-red-500"} >{errors["telefon"]}</div>
                </label>
            </div>
            <div className={"mb-3"}>
                <label className={"label-text"}>
                    Univeristy
                </label>
                <select className={"bg-white text-base border-solid border-main-pink rounded-lg pl-2"} name="facultate" value={selectedFacultate} onChange={handleSelectChange}>
                    <option className={"bg-white"} value="cibe">Cibernetica</option>
                    <option className={"bg-white"} value="info">Informatica economica</option>
                    <option className={"bg-white"} value="stat">Statistica</option>
                </select>
            </div>

           <button onClick={handleSubmit}>Submit</button>
        </form>
        </div>
    )
}

export default SignUp;