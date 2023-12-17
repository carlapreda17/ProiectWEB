import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

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
        if(handleValidation())
        {
            navigate("/main-page");
        }
        else
        {
            alert("Erori inputuri");
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