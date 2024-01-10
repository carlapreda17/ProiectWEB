import React from "react";
import {useState} from "react";
import axios from 'axios';
import { passwordRegex, phoneRegex, nameRegex, mailRegex} from "../utils/constants";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CloseSVG from "../components/SVG/CloseSVG";



function SignUp(props){
    const [fields, setFields] = useState({});
    const [errors, setErrors] = useState({});
    const [selectedFacultate, setSelectedFacultate] = useState("Cibernetica");
    const [selectedAn, setSelectedAn] = useState("1");
    const [showErrorEmail, setShowErrorEmail] = useState(false);

    const handleValidation = () => {
        const formFields = {...fields};
        const formErrors = {};
        let formIsValid = true;

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

        if(typeof formFields["nume"] !== "undefined"){
            if(!nameRegex.test(formFields["nume"])){
                formIsValid = false;
                formErrors["nume"] = "Only letters";
                document.querySelector("#nume-error").classList.remove("hidden");
            }
        }
        if(typeof formFields["prenume"] !== "undefined"){
            if(!nameRegex.test(formFields["prenume"])){
                formIsValid = false
                formErrors["prenume"] = "Only letters";
                document.querySelector("#prenume-error").classList.remove("hidden");
            }
        }

        if(typeof formFields["email"] !=="undefined")
        {
            if(!mailRegex.test(formFields["email"]))
            {
                formIsValid = false;
                formErrors["email"] = "Invalid email";
                document.querySelector("#email-error").classList.remove("hidden");
            }
        }

        if(typeof formFields["parola"] !=="undefined")
        {
            if(!passwordRegex.test(formFields["parola"]))
            {
                formIsValid = false;
                formErrors["parola"] = "Invalid password";
                document.querySelector("#parola-error").classList.remove("hidden");
            }
        }

        if(typeof formFields["telefon"] !=="undefined")
        {
            if(!phoneRegex.test(formFields["telefon"]))
            {
                formIsValid = false;
                formErrors["telefon"] = "Invalid number";
                document.querySelector("#telefon-error").classList.remove("hidden");
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

    const handleSelectFacultate = (event) => {
        setSelectedFacultate(event.target.value);

    };
    const handleSelectAn = (event) => {
        setSelectedAn(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const userData = {
            nume: fields["nume"],
            prenume: fields["prenume"],
            email: fields["email"],
            parola: fields["parola"],
            telefon: fields["telefon"],
            facultate: selectedFacultate,
            an:selectedAn
        };

        try {
            const response = await axios.post('http://localhost:3001/users/signUp', userData);

            if(response.status === 201){
                document.querySelector("#success-form").style.display = "block";
            }
            else {
                document.querySelector("#error-form").style.display = "block";
            }
        } catch (error) {
            if (error.response) {
                if(error.response.status === 409) {
                    setErrors(prevErrors => ({ ...prevErrors, email: 'This email is already in use.' }));
                    setShowErrorEmail(true);
                }
                console.error("Eroare de la server:", error.response.data);
            } else if (error.request) {
                console.error("Cererea a fost trimisă, dar nu s-a primit niciun răspuns");
            } else {
                console.error("Eroare la crearea cererii:", error.message);
            }
        }
    }

    return(
        <div className={'page-container'}>
            <Navbar isHomepage={false} isSignUp={true} classes={'content-container'}></Navbar>
            <div className={"flex justify-center py-16 "}>
              <div className={"relative"}>
                  <form className={"bg-main-pink p-16 rounded-xl shadow-box"}>
                      <div className={"mb-8 flex gap-8 items-center laptop:flex-col laptop:gap-1"}>
                          <label className={"label-text mr-3 w-28 laptop:w-16 laptop:mb-2"}>
                              Prenume
                          </label>
                          <input type="text" className={'pr-16 laptop:pr-12'} placeholder={"Prenume"}
                                 value={fields["prenume"]} onChange={e => handleChange("prenume", e.target.value)}/>
                      </div>
                      <div id={'prenume-error'} className={"error-text pt-4 pl-40 hidden"}>{errors["prenume"]}</div>

                      <div className={'mb-8'}>
                          <div className={"flex gap-8 items-center laptop:flex-col laptop:gap-1"}>
                              <label className={"label-text mr-3 w-28 laptop:w-16 laptop:mb-2"}>
                                  Nume
                              </label>
                              <input type="text" className={'pr-16 laptop:pr-12'} placeholder={"Nume"}
                                     value={fields["nume"]} onChange={e => handleChange("nume", e.target.value)}/>
                          </div>
                          <div id={'nume-error'} className={"error-text pt-4 pl-40 hidden"}>{errors["nume"]}</div>
                      </div>

                      <div className={'mb-8'}>
                          <div className={"flex gap-8 items-center laptop:flex-col laptop:gap-1"}>
                              <label className={"label-text mr-3 w-28 laptop:w-16 laptop:mb-2"}>
                                  Email
                              </label>
                              <input type="email" className={'pr-16 laptop:pr-12'} placeholder={"Email"}
                                     value={fields["email"]} onChange={e => handleChange("email", e.target.value)}/>
                          </div>
                          <div id={'email-error'} className={"error-text pt-4 pl-40 hidden"}>{errors["email"]}</div>
                      </div>

                      <div className={'mb-8'}>
                          <div className={"flex gap-8 items-center laptop:flex-col laptop:gap-1"}>
                              <label className={"label-text mr-3 w-28 laptop:w-16 laptop:mb-2"}>
                                  Parola
                              </label>
                              <input type="password" className={'pr-16 laptop:pr-12'} placeholder={"Parola"}
                                     value={fields["parola"]} onChange={e => handleChange("parola", e.target.value)}/>
                          </div>
                          <div id={'parola-error'} className={"error-text pt-4 pl-40 hidden"}>{errors["parola"]}</div>
                      </div>

                      <div className={'mb-8'}>
                          <div className={"flex gap-8 items-center laptop:flex-col laptop:gap-1"}>
                              <label className={"label-text mr-3 w-28 laptop:w-16 laptop:mb-2"}>
                                  Telefon
                              </label>
                              <input className={'pr-16 laptop:pr-12'} placeholder={"Telefon"}
                                     value={fields["telefon"]} onChange={e => handleChange("telefon", e.target.value)}/>
                          </div>
                          <div id={'telefon-error'} className={"error-text pt-4 pl-40 hidden"}>{errors["telefon"]}</div>
                      </div>

                      <div className={"mb-8 flex gap-8 items-center laptop:flex-col laptop:gap-1"}>
                          <label className={"label-text mr-3 w-28 laptop:w-16 laptop:mb-2"}>
                              Facultate
                          </label>
                          <select
                              className={"bg-white text-base border-solid rounded-2xl pl-2 py-1.5 text-main-pink pr-16 laptop:pr-12"}
                              name="facultate" value={selectedFacultate} onChange={handleSelectFacultate}>
                              <option className={"bg-white"} value="Cibernetica">Cibernetică economică</option>
                              <option className={"bg-white"} value="Informatica Economica">Informatică Economică</option>
                              <option className={"bg-white"} value="Statistica">Statistică</option>
                          </select>
                      </div>
                      <div className={"mb-8 flex gap-8 items-center laptop:flex-col laptop:gap-1"}>
                          <label className={"label-text mr-3 w-28 laptop:w-16 laptop:mb-2"}>
                              An
                          </label>
                          <select
                              className={"bg-white text-base border-solid rounded-2xl pl-2 py-1.5 text-main-pink pr-16 laptop:pr-12"}
                              name="an_facultate" value={selectedAn} onChange={handleSelectAn}>
                              <option className={"bg-white"} value="1">1</option>
                              <option className={"bg-white"} value="2">2</option>
                              <option className={"bg-white"} value="3">3</option>
                          </select>
                      </div>
                      <div className={"flex justify-center mt-20"}>
                          <button className={"!text-xl form-button button button-text m-tablet:px-20"}
                                  onClick={handleSubmit}>Înregistrare
                          </button>
                      </div>

                  </form>
              </div>
            </div>

            <Footer/>

            <div id={'success-form'}
                 className={'absolute bg-baby-blue text-center w-[20%] p-1 pb-5 bottom-[16%] right-[40%] rounded-lg laptop:bottom-[5%] wide:bottom-[40%]  m-tablet:w-[30%] m-tablet:right-[35%] mobile:w-[40%] mobile:right-[30%]'}
                 style={{'display': 'none'}}>
                <div className={'relative'}>
                    <div className={'h-6 flex justify-end'}>
                        <button type="button" className={'w-6'} onClick={() => {
                            document.querySelector("#success-form").style.display = "none";
                        }}>
                            <CloseSVG/>
                        </button>
                    </div>
                    <span className={'text-base'}>The account was created successfully!</span>
                </div>
            </div>
            <div id={'error-form'}
                 className={'absolute bg-baby-purple text-center w-[20%] p-1 pb-5 bottom-[16%] right-[40%] rounded-lg laptop:bottom-[5%] m-tablet:w-[30%] m-tablet:right-[35%] mobile:w-[40%] mobile:right-[30%]'}
                 style={{'display': 'none'}}>
                <div className={'relative'}>
                    <div className={'h-6 flex justify-end'}>
                        <button type="button" className={'w-6'} onClick={() => {
                            document.querySelector("#error-form").style.display = "none";
                        }}>
                            <CloseSVG/>
                        </button>
                    </div>
                    <span className={'text-base'}>There was an error creating the account!</span>
                </div>
            </div>
            {showErrorEmail && (
                <div className={'absolute bg-baby-purple text-center w-[20%] p-1 pb-5 bottom-[16%] right-[40%] rounded-lg laptop:bottom-[5%] m-tablet:w-[30%] m-tablet:right-[35%] mobile:w-[40%] mobile:right-[30%]'}>
                    <div className={'relative'}>
                        <div className={'h-6 flex justify-end'}>
                            <button type="button" className={'w-6'} onClick={() => setShowErrorEmail(false)}>
                                <CloseSVG/>
                            </button>
                        </div>
                        <span className={'text-base'}>{errors.email}</span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SignUp;


