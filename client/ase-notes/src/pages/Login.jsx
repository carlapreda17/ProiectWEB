import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
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


        if(!formFields["email"])
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
               <span className={"text-red-500"}>{errors["email"]}</span>
           </label>
           <label>
               Parola
               <input type="password" className={"border-2 border-main-pink"} value={fields["parola"]} onChange={e=>handleChange("parola",e.target.value)} />
               <span className={"text-red-500"} >{errors["parola"]}</span>
           </label>
           <input type="submit"  value="Submit" />
       </form>
    )
}

export default Login;