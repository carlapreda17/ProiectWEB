import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function Login(props){
    const [fields, setFields] = useState({});

    const navigate=useNavigate();

    const handleValidation= ()=>
    {
        const formFields = {...fields};
        let formIsValid = true;
        const mailRegex=/^[^@\s]+@stud\.ase\.ro$/;

        if(!formFields["email"] && !formFields["parola"])
        {
            formIsValid=false;
        }
        if(typeof formFields["email"] !=="undefined")
        {
            if(!mailRegex.test(formFields["email"])){
                formIsValid=false;
            }
        }
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

            console.log(response);

            if(response.status === 200){
                navigate("/main-page");
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
       <form onSubmit={handleSumbit}>
           <label>
               Mail:
               <input type="email" className={"border-2 border-main-pink"} value={fields["email"]} onChange={e=>handleChange("email",e.target.value)} />

           </label>
           <label>
               Parola
               <input type="password" className={"border-2 border-main-pink"} value={fields["parola"]} onChange={e=>handleChange("parola",e.target.value)} />
           </label>
           <input type="submit"  value="Submit" />
       </form>
    )
}

export default Login;