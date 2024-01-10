import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Login from "../components/Login";

function Homepage(props){
    const [popUpVisible, setPopUpVisible] = useState(false);
    const navigate=useNavigate();
    const navigateToSignUp = () => {
        navigate('/sign-up')
    }

    let imgURL;
    if(window.innerWidth<750) {
        imgURL = 'banner_mobile.png'
    } else {
        imgURL = 'banner.png'
    }

    const handlePopUp = () => {
        setPopUpVisible(!popUpVisible);
    };

    return(
        <div className={'page-container'}>
            <Navbar isHomepage={true} handlePopUp={handlePopUp} classes={'content-container'}></Navbar>

            <div className={'bg-baby-blue'}>
                <div className={'relative h-0 pb-[41%] max-w-[90rem] mr-auto ml-auto tablet:pb-[110%]'}>
                    <img className={'absolute w-full h-full top-0 right-0 object-cover'}
                         src={imgURL}
                         alt={'Banner'}></img>
                </div>
            </div>
            <div className={'content-container m-tablet:px-8 tablet:px-6'}>
                <div className={'flex flex-col text-center py-14'}>
                    <span className={'text-4xl text-dark-purple pb-4 tablet:text-3xl'}>Încă nu ai un cont?</span>
                    <span className={'text-4xl text-dark-purple pb-4 tablet:text-3xl'}>Alătură-te nouă într-o aventură magică de învățare!</span>
                    <div className={'flex justify-center'}>
                        <button className={'!text-xl button py-3 w-3/12 tablet:w-5/12 mobile:w-6/12'} onClick={navigateToSignUp}>Inregistrare</button>
                    </div>
                </div>
            </div>
            <div className={'background-svg bg-background w-full'}>
                <div className={'content-container bg-transparent py-14 m-tablet:px-8 tablet:px-6'}>
                    <h2 className={'text-dark-purple text-center tablet:text-3xl'}>Despre noi</h2>
                    <div className={'mb-5'}>
                        <h4 className={'text-dark-purple text-2xl tablet:text-xl'}>Bine ai venit la GirlGnosis - Unde Puterea și Educația se intersectează!</h4>
                        <span className={'text-lg text-justify tablet:text-base'}>
                           GirlGnosis se naște din viziunea unui grup de studente dedicate de la ASE, unite de misiunea de a crea un spațiu exclusiv în care tinerele în domeniile Cibernetică, Informatică și Statistică pot prospera academic. Platforma noastră este concepută special pentru viitoarele lideri, inovatoare și gânditoare feminine.
                        </span>
                    </div>
                    <div className={'mb-5'}>
                        <h4 className={'text-dark-purple text-2xl tablet:text-xl'}>De ce GirlGnosis?</h4>
                        <span className={'text-lg text-justify tablet:text-base'}>
                          Noi credem într-o lume în care educația este fundamentul emancipării. GirlGnosis îmbrățișează această credință oferind un mediu sigur și de susținere pentru studentele feminine pentru a aduna, a împărtăși și a explora materiale academice. De la note meticulos realizate la discuții seminționale pline de înțelepciune, platforma noastră este o dovadă a înțelepciunii colective și a puterii comunității.
                        </span>
                    </div>
                    <div className={'mb-5'}>
                        <h4 className={'text-dark-purple text-2xl tablet:text-xl'}>O Suroritate a studentelor</h4>
                        <span className={'text-lg text-justify tablet:text-base'}>
                            GirlGnosis este mai mult decât un instrument academic; este o sororitate. Concepută de femei pentru femei, platforma noastră este un far al incluziunii și al sprijinului. Noi sărbătorim diversitatea, încurajăm colaborarea și cultivăm o atmosferă în care fiecare întrebare pusă reprezintă un pas către o mai mare înțelegere și încredere.
                        </span>
                    </div>
                    <div className={'mb-5'}>
                        <h4 className={'text-dark-purple text-2xl tablet:text-xl'}>Ia Notițe, Fă Progrese</h4>
                        <span className={'text-lg text-justify tablet:text-base'}>
                           Capturează esența fiecărei prelegeri și seminar cu instrumente concepute pentru a face luarea de notițe simplă, captivantă și eficientă. Cu GirlGnosis, poți adnota, organiza și revedea materialele tale academice într-un mod care se potrivește stilului tău personal de învățare.
                            Platforma noastră este pânza ta; pictează-ți calea către succes cu fiecare notă pe care o iei.
                        </span>
                    </div>
                    <div>
                        <h4 className={'text-dark-purple text-2xl tablet:text-xl'}>Alătură-te Cercului Nostru</h4>
                        <span className={'text-lg text-justify tablet:text-base'}>
                            Îmbrățișează forța colectivă a mediului academic feminin.
                            Fie că descifrezi concepte complexe, te implici în discuții provocatoare sau cauți inspirație, GirlGnosis este sanctuarul tău. Aici, fiecare notă partajată este o sămânță semănată pentru cunoaștere, creștere și emancipare. Intră în lumea GirlGnosis – acolo unde geniul minților feminine este sărbătorit, îngrijit și amplificat.
                            Împreună, să descoperim potențialul din fiecare pagină și din fiecare fată.
                        </span>
                    </div>
                </div>
            </div>

            <Footer/>
            <div>
            {popUpVisible &&
                <div className={'modal-container'}>
                    <div>
                        <Login handlePopUp={handlePopUp}/>
                    </div>
                </div>
            }
        </div>
        </div>
    )
}

export default Homepage