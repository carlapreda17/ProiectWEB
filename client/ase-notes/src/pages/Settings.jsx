import React, {useEffect, useState} from "react";
import useAuth from "../components/useAuth";
import {useNavigate} from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar";
import {passwordRegex} from "../utils/constants";
import axios from "axios";

function Settings(){
    const isAuthenticated = useAuth();
    console.log("isAuthenticated:", isAuthenticated);

    const [newPassword, setNewPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');

    const prenume=localStorage.getItem('prenume');
    const email = localStorage.getItem('email');

    const handleChange = (event) => {
        setNewPassword(event.target.value);
    };

    const handleChangeRepeated = (event) => {
        setRepeatedPassword(event.target.value);
    };

    const handlePasswordChange = async (event) => {
        event.preventDefault();

        const errorContainer = document.getElementById('error-form-password');
        const succesContainer = document.getElementById('succes-form-password');

        if(!passwordRegex.test(newPassword))
        {
            if(succesContainer && succesContainer.children.length > 0 && succesContainer.children[0].innerText !== '') {
                succesContainer.children[0].innerText = '';
            }
            if(errorContainer && errorContainer.children.length > 0) {
                errorContainer.children[0].innerText = 'Parola trebuie să aibă minim 8 caractere, să includă o majusculă, o cifră și un caracter special!';
            }
        } else if(newPassword !== repeatedPassword) {
            if(succesContainer && succesContainer.children.length > 0 && succesContainer.children[0].innerText !== '') {
                succesContainer.children[0].innerText = '';
            }
            if(errorContainer && errorContainer.children.length > 0) {
                errorContainer.children[0].innerText = 'Parolele trebuie să coincidă!';
            }
        } else {
            try {
                const data = {
                    email: email,
                    newPassword: newPassword
                };

                const response = await axios.put('http://localhost:3001/auth/changePassword', data);
                console.log(response)

                if(response.status === 200) {
                    if(errorContainer && errorContainer.children.length > 0 && errorContainer.children[0].innerText !== '') {
                        errorContainer.children[0].innerText = '';
                    }
                    if(succesContainer && succesContainer.children.length > 0) {
                        succesContainer.children[0].innerText = 'Parola a fost schimbată!';
                    }
                }
            } catch(error) {
                if(error.response) {
                    if(error.response.status === 403) {
                        if(succesContainer && succesContainer.children.length > 0 && succesContainer.children[0].innerText !== '') {
                            succesContainer.children[0].innerText = '';
                        }
                        if(errorContainer && errorContainer.children.length > 0) {
                            errorContainer.children[0].innerText = 'Parola nouă trebuie să difere de parola veche!';
                        }
                    }
                }
                console.error("Eroare la crearea cererii:", error.message);
            }
        }
    };

    return (
        <div className={"page-container"}>
            <Navbar prenume={prenume} isMainPage={true} classes={'content-container'} />
            <div className={'flex gap-0 tablet:flex-col'}>
                <Sidebar />
                <div className="px-4 pt-4 setari-container w-3/4 tablet:w-full">
                    <h1 className={"mb-6 text-dark-purple"}>Setări</h1>
                    <hr className="mb-6 border-t-2 border-dashed border-main-pink"/>
                    <p className={"mb-6 text-dark-purple"}>Resetare parolă</p>
                    <div className={"flex flex-col space-y-4"}>
                        <label htmlFor="password" className={"text-sm  text-dark-purple"}>Introduceți noua
                            parolă:</label>
                        <input
                            id="password"
                            type="password"
                            className={"pr-16 m-tablet:w-full input-settings tablet:w-1/2 laptop:pr-12 w-1/2 rounded-xl py-2 px-4"}
                            value={newPassword} onChange={handleChange}
                        />
                        <label htmlFor="passwordRepeat" className={"text-sm  text-dark-purple"}>Repetă parola:</label>
                        <input
                            id="passwordRepeat"
                            type="password"
                            className={"pr-16 m-tablet:w-full input-settings tablet:w-1/2 laptop:pr-12 w-1/2 rounded-xl py-2 px-4"}
                            value={repeatedPassword} onChange={handleChangeRepeated}
                        />
                        <button
                            className={"text-xl button-settings m-tablet:w-1/3 w-1/5 form-button button button-text px-4"}
                            onClick={handlePasswordChange}>Salveaza
                        </button>
                    </div>

                    <div id={'error-form-password'}
                         className={'pt-4 text-sm text-pink-600'}>
                        <p></p>
                    </div>
                    <div id={'succes-form-password'}
                         className={'pt-4 text-sm text-fuchsia-700'}>
                        <p></p>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Settings;