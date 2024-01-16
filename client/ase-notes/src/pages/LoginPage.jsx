import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {mailRegex} from "../utils/constants";
import CloseSVG from "../components/SVG/CloseSVG";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function LoginPage(props){
    const [fields, setFields] = useState({});
    const [errors, setErrors]=useState({});
    const navigate=useNavigate();

    const [notFound, setNotFound] = useState(false);
    const [wrongPassword, setWrongPassword] = useState(false)

    const handleValidation= ()=>
    {
        const formFields = {...fields};
        const formErrors={};
        let formIsValid = true;

        if(!formFields["email"] && !formFields["parola"])
        {
            formIsValid=false;
            formErrors["email"] = "Cannot be empty!";
        }
        if(!formFields["parola"])
        {
            formIsValid=false;
            formErrors["parola"] = "Cannot be empty!";
        }

        if(typeof formFields["email"] !== "undefined")
        {
            if(!mailRegex.test(formFields["email"])){
                formIsValid=false;
                formErrors["email"] = "Invalid email!";
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

        if(isValidForm) {
            const loginData = {
                email: fields['email'],
                parola: fields['parola'],
            };

            try {
                const response = await axios.post('http://localhost:3001/auth/login', loginData);

                if(response.status === 200){
                    const {data: {data:{token, prenume, nume, email, facultate, an}}} =response;
                    localStorage.setItem('token',token);
                    localStorage.setItem('prenume',prenume);
                    localStorage.setItem('nume',nume);
                    localStorage.setItem('email', email);
                    localStorage.setItem('facultate', facultate)
                    localStorage.setItem('an',an);
                    localStorage.getItem('token');
                    navigate("/main-page");

                }
            } catch (error) {
                if (error.response) {
                    if(error.response.status === 404) {
                        setNotFound(true);
                        setWrongPassword(false);
                    } else if(error.response.status === 403) {
                        setWrongPassword(true);
                        setNotFound(false);
                    }
                    console.error("Eroare de la server:", error.response.data);
                } else if (error.request) {
                    console.error("Cererea a fost trimisă, dar nu s-a primit niciun răspuns");
                } else {
                    console.error("Eroare la crearea cererii:", error.message);
                }
            }
        }
    }

    return(
        <div className={'page-container'}>
            <Navbar isHomepage={false} isSignUp={false} isMainPage={false} classes={'content-container'}></Navbar>
            <div className={"flex justify-center items-center h-screen z-50"}>
                <form className={"bg-main-pink py-20 px-20 rounded-xl tablet:w-9/12 shadow-box relative"}>
                    <div className={"flex items-center flex-col"}>
                        <div className={"mb-3"}>
                            <label className={"label-text mr-11"}>
                                Email
                            </label>
                            <input className={"tablet:mt-[0.6rem]"} type="email" placeholder={"Email"}
                                   value={fields["email"]}
                                   onChange={e => handleChange("email", e.target.value)}
                                   onKeyDown={e => e.key === 'Enter' && handleSumbit(e)}
                            />
                            <div className={"error-text pt-1"}>{errors["email"]}</div>
                        </div>

                        <div className={"mb-3"}>
                            <label className={"label-text mr-3"}>
                                Password
                            </label>
                            <input className={"tablet:mt-[0.6rem]"} type="password" placeholder={"Password"}
                                   value={fields["parola"]}
                                   onChange={e => handleChange("parola", e.target.value)}
                                   onKeyDown={e => e.key === 'Enter' && handleSumbit(e)}
                            />
                            <div className={"error-text pt-1"}>{errors["parola"]}</div>
                        </div>
                        <div className={"mt-8"}>
                            <button className={"form-button button button-text tablet:px-20"}
                                    onClick={handleSumbit}>Submit
                            </button>
                        </div>

                        {notFound && (
                            <div className={'error-text pt-1 text-center'}>
                                <span>User not found!</span>
                            </div>
                        )}
                        {wrongPassword && (
                            <div className={'error-text pt-1 text-center'}>
                                <span>Incorrect password or email!</span>
                            </div>
                        )}
                    </div>
                </form>
            </div>

            <Footer/>
        </div>
    )
}

export default LoginPage;