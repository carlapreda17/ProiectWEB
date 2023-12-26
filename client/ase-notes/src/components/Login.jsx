import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {mailRegex} from "../utils/constants";
import CloseSVG from "./SVG/CloseSVG";

function Login({handlePopUp}){
    const [fields, setFields] = useState({});
    const [errors, setErrors]=useState({});
    const navigate=useNavigate();


    const handleButtonClose = (event) => {
        event.stopPropagation();
        handlePopUp();
    };

    const handleValidation= ()=>
    {
        const formFields = {...fields};
        const formErrors={};
        let formIsValid = true;

        if(!formFields["email"] && !formFields["parola"])
        {
            formIsValid=false;
            formErrors["email"] = "Cannot be empty";
        }
        if(!formFields["parola"])
        {
            formIsValid=false;
            formErrors["parola"] = "Cannot be empty";
        }

        if(typeof formFields["email"] !=="undefined")
        {
            if(!mailRegex.test(formFields["email"])){
                formIsValid=false;
                formErrors["email"] = "Invalid mail";
            }
        }

        setErrors(formErrors);
        return formIsValid;
    }

    const handleChange = (field, value) => {
        setFields({
            ...fields,
            [field]: value
        })
    }


    const handleSumbit= async(event) =>
    {
        event.preventDefault();

        const isValidForm = handleValidation();
        if (!isValidForm) {
            alert("Errors in form");
            return;
        }

        const loginData = {
            email: fields['email'],
            parola: fields['parola'],
        };

        try {
            const response = await axios.post('http://localhost:3001/auth/login', loginData);

            console.log(response)

            if(response.status === 200){
                const {data: {data:{token, prenume,nume,facultate}}} =response;
                localStorage.setItem('token',token);
                localStorage.setItem('prenume',prenume);
                localStorage.setItem('nume',nume);
                localStorage.setItem('facultate', facultate)
                localStorage.getItem('token');

                // localStorage.removeItem('token');

                navigate("/main-page");
                // props.handlePopUp();
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
        <div className={"flex justify-center items-center h-screen z-50"}>
            <form className={"bg-main-pink py-20 px-20 rounded-xl tablet:w-9/12 shadow-box relative"}>
                <button onClick={handleButtonClose} className={"absolute top-[1.688rem] right-[1.938rem]"}>
                    <CloseSVG colorClass={"text-background"}></CloseSVG>
                </button>
                <div className={"flex items-center flex-col"}>
                <div className={"mb-3"}>
                    <label className={"label-text mr-11"}>
                        Email
                    </label>
                    <input className={"tablet:mt-[0.6rem]"} type="email"  placeholder={"Email"} value={fields["email"]} onChange={e=>handleChange("email",e.target.value)} />
                    <div className={"error-text"} >{errors["email"]}</div>
                </div>

                <div className={"mb-3"}>
                    <label className={"label-text mr-3"}>
                        Password
                    </label>
                    <input className={"tablet:mt-[0.6rem]"} type="password"  placeholder={"Password"} value={fields["parola"]} onChange={e=>handleChange("parola",e.target.value)} />
                    <div className={"error-text"} >{errors["parola"]}</div>
                </div>
                    <div className={"mt-8"}>
                    <button className={"form-button button button-text tablet:px-20"} onClick={handleSumbit}>Submit</button>
                    </div>
                </div>

            </form>

        </div>
    )
}

export default Login;
