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
                    <span className={'text-4xl text-dark-purple pb-4 tablet:text-3xl'}>You don't have an account yet?</span>
                    <span className={'text-4xl text-dark-purple pb-4 tablet:text-3xl'}>Join us in a magical learning adventure!</span>
                    <div className={'flex justify-center'}>
                        <button className={'!text-xl button py-3 w-3/12 tablet:w-5/12 mobile:w-6/12'} onClick={navigateToSignUp}>Sign up</button>
                    </div>
                </div>
            </div>
            <div className={'background-svg bg-background w-full'}>
                <div id={'about-section'} className={'content-container bg-transparent py-14 m-tablet:px-8 tablet:px-6'}>
                    <h2 className={'text-dark-purple text-center tablet:text-3xl'}>About Us</h2>
                    <div className={'mb-5'}>
                        <h4 className={'text-dark-purple text-2xl tablet:text-xl'}>Welcome to GirlGnosis - Where Empowerment and Education Intersect!</h4>
                        <span className={'text-lg text-justify tablet:text-base'}>
                            GirlGnosis is born from the vision of a group of dedicated female students at ASE, united by the mission to create an exclusive space where young women in Cybernetics, Informatics, and Statistics can thrive academically. Our platform is tailored specifically for the aspiring female leaders, innovators, and thinkers of tomorrow.
                        </span>
                    </div>
                    <div className={'mb-5'}>
                        <h4 className={'text-dark-purple text-2xl tablet:text-xl'}>Why GirlGnosis?</h4>
                        <span className={'text-lg text-justify tablet:text-base'}>
                            We believe in a world where education is the foundation of empowerment. GirlGnosis embodies this belief by offering a secure and supportive environment for female students to curate, share, and explore academic materials. From meticulously crafted notes to insightful seminar discussions, our platform is a testament to the collective wisdom and the power of community.
                        </span>
                    </div>
                    <div className={'mb-5'}>
                        <h4 className={'text-dark-purple text-2xl tablet:text-xl'}>A Sisterhood of Scholars</h4>
                        <span className={'text-lg text-justify tablet:text-base'}>
                            GirlGnosis is more than an academic tool; it's a sisterhood. Designed by women for women, our platform is a beacon of inclusivity and support. We celebrate diversity, encourage collaboration, and foster an atmosphere where every question asked is a step towards greater understanding and confidence.
                        </span>
                    </div>
                    <div className={'mb-5'}>
                        <h4 className={'text-dark-purple text-2xl tablet:text-xl'}>Take Notes, Make Strides</h4>
                        <span className={'text-lg text-justify tablet:text-base'}>
                            Capture the essence of every lecture and seminar with tools that are designed to make
                            note taking simple, engaging, and effective. With GirlGnosis, you can annotate, organize, and revisit
                            youracademic materials in a way that resonates with your personal learning style. Our platform is your canvas; paint your path to success with every note you take.
                        </span>
                    </div>
                    <div>
                        <h4 className={'text-dark-purple text-2xl tablet:text-xl'}>Join Our Circle</h4>
                        <span className={'text-lg text-justify tablet:text-base'}>
                            Embrace the collective strength of female academia. Whether you're deciphering complex concepts, engaging in thought-provoking discussions, or seeking inspiration, GirlGnosis is your sanctuary. Here, every note shared is a seed planted for knowledge, growth, and empowerment.

                            Step into GirlGnosis – where the brilliance of female minds is celebrated, nurtured, and amplified. Together, let's unlock the potential within every page and every girl.
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