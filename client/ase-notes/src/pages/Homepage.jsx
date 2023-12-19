import React from "react";
import {useNavigate} from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
function Homepage(params){

    const navigate=useNavigate();
    const navigateToSignUp = () => {
        navigate('/sign-up')
    }

    return(
        <div className={'page-container'}>
            <Navbar isHomepage={true} classes={'content-container'}></Navbar>

            <div className={'bg-main-pink'}>
                <div className={'relative h-[27rem] max-w-[90rem] mr-auto ml-auto'}>
                    <img className={'absolute w-full h-full top-0 right-0 bg-cover'} src={'banner.jpg'}
                         alt={'Banner image'}></img>
                </div>
            </div>
            <div className={'content-container'}>
                <div className={'flex flex-col text-center py-14'}>
                    <span className={'text-4xl text-dark-purple pb-4'}>You don't have an account yet?</span>
                    <span className={'text-4xl text-dark-purple pb-4'}>Join us in a magical learning adventure!</span>
                    <div className={'flex justify-center'}>
                        <button className={'!text-xl button py-3 w-3/12'} onClick={navigateToSignUp}>Sign up</button>
                    </div>
                </div>
            </div>
            <div className={'background-svg bg-background w-full'}>
                <div className={'content-container bg-transparent py-14'}>
                    <h2 className={'text-dark-purple text-center'}>About Us</h2>
                    <div className={'mb-5'}>
                        <h4 className={'text-dark-purple text-2xl'}>Welcome to GirlGnosis - Where Empowerment and Education Intersect!</h4>
                        <span className={'text-lg text-justify'}>
                            GirlGnosis is born from the vision of a group of dedicated female students at ASE, united by the mission to create an exclusive space where young women in Cybernetics, Informatics, and Statistics can thrive academically. Our platform is tailored specifically for the aspiring female leaders, innovators, and thinkers of tomorrow.
                        </span>
                    </div>
                    <div className={'mb-5'}>
                        <h4 className={'text-dark-purple text-2xl'}>Why GirlGnosis?</h4>
                        <span className={'text-lg text-justify'}>
                            We believe in a world where education is the foundation of empowerment. GirlGnosis embodies this belief by offering a secure and supportive environment for female students to curate, share, and explore academic materials. From meticulously crafted notes to insightful seminar discussions, our platform is a testament to the collective wisdom and the power of community.
                        </span>
                    </div>
                    <div className={'mb-5'}>
                        <h4 className={'text-dark-purple text-2xl'}>A Sisterhood of Scholars</h4>
                        <span className={'text-lg text-justify'}>
                            GirlGnosis is more than an academic tool; it's a sisterhood. Designed by women for women, our platform is a beacon of inclusivity and support. We celebrate diversity, encourage collaboration, and foster an atmosphere where every question asked is a step towards greater understanding and confidence.
                        </span>
                    </div>
                    <div className={'mb-5'}>
                        <h4 className={'text-dark-purple text-2xl'}>Take Notes, Make Strides</h4>
                        <span className={'text-lg text-justify'}>
                            Capture the essence of every lecture and seminar with tools that are designed to make
                            note taking simple, engaging, and effective. With GirlGnosis, you can annotate, organize, and revisit
                            youracademic materials in a way that resonates with your personal learning style. Our platform is your canvas; paint your path to success with every note you take.
                        </span>
                    </div>
                    <div>
                        <h4 className={'text-dark-purple text-2xl'}>Join Our Circle</h4>
                        <span className={'text-lg text-justify'}>
                            Embrace the collective strength of female academia. Whether you're deciphering complex concepts, engaging in thought-provoking discussions, or seeking inspiration, GirlGnosis is your sanctuary. Here, every note shared is a seed planted for knowledge, growth, and empowerment.

                            Step into GirlGnosis – where the brilliance of female minds is celebrated, nurtured, and amplified. Together, let's unlock the potential within every page and every girl.
                        </span>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    )
}

export default Homepage