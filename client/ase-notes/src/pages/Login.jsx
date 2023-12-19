import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {mailRegex} from "../utils/constants";

function Login(props){
    const [fields, setFields] = useState({});
    const [errors, setErrors]=useState({});
    const navigate=useNavigate();

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

            if(response.status === 200){
                navigate("/main-page");
                const {data: {data: {nume, prenume}}} = response;
                console.log(nume, prenume);
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
        <div className={"flex justify-center items-center h-screen"}>
            <form className={"bg-main-pink py-20 px-20 rounded-xl shadow-box"}>

                <div className={"mb-3"}>
                    <label className={"label-text mr-11"}>
                        Email
                    </label>
                    <input type="email"  placeholder={"Email"} value={fields["email"]} onChange={e=>handleChange("email",e.target.value)} />
                    <div className={"error-text"} >{errors["email"]}</div>
                </div>

                <div className={"mb-3"}>
                    <label className={"label-text mr-3"}>
                        Password
                    </label>
                    <input type="password"  placeholder={"Password"} value={fields["parola"]} onChange={e=>handleChange("parola",e.target.value)} />
                    <div className={"error-text"} >{errors["parola"]}</div>
                </div>
                <div className={"flex justify-center mt-8"}>
                    <button className={"form-button button-text"} onClick={handleSumbit}>Submit</button>
                </div>

            </form>
        </div>
    )
}

export default Login;