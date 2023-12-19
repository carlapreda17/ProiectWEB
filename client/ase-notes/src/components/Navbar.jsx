import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import LogoSVG from './SVG/LogoSVG';
import {NAVBAR_TEXT} from '../utils/content';

function Navbar(props) {
    const {isHomepage, isMainPage, classes} = props
    const navigate = useNavigate();
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const navigateToLogIn = () => {
        navigate('/login');
    };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    return (
        <div className={'bg-main-pink shadow-nav z-10 sticky'}>
            <nav className={"navbar" + " " + classes}>
                <div className={"flex py-4 px-4 justify-between"}>
                    <div className={'flex items-end gap-3'}>
                        <LogoSVG/>
                    </div>
                    <div className="flex items-center">
                        {isMainPage ? (
                            <div className="relative">
                                <button className={"flex items-center pr-7"} onClick={toggleDropdown}>
                                    <div className={"pr-3"}>Nume</div>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14"
                                         viewBox="0 0 448 512">
                                        <path
                                            d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/>
                                    </svg>
                                </button>
                                {dropdownVisible && (
                                    <div className="absolute right-0 bg-white rounded-md shadow-md mt-[0.625rem]">
                                        <ul>
                                            <li className={"flex"}>
                                                <a href={"#"}
                                                   className={"flex gap-[1rem] w-full items-center px-5 py-4"}>
                                                    <p className={"text-[1.125rem] grow"}>Home</p>
                                                    <div>
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18"
                                                             viewBox="0 0 576 512">
                                                            <path
                                                                d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/>
                                                        </svg>
                                                    </div>
                                                </a>
                                            </li>
                                            <li className={"flex"}>
                                                <a href={"#"}
                                                   className={"flex gap-[1rem] px-5 py-4 w-full items-center"}>
                                                    <p className={"text-[1.125rem] grow"}>Settings</p>
                                                    <div>
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16"
                                                             viewBox="0 0 512 512">
                                                            <path
                                                                d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"/>
                                                        </svg>
                                                    </div>

                                                </a>
                                            </li>
                                            <li className={"flex border-t-[1px] border-t-solid border-t-stone-300"}>
                                                <a href={"#"}
                                                   className={"flex gap-[1rem] px-5 py-4 w-full items-center"}>
                                                    <p className={"text-[1.125rem] grow"}>Sign out</p>
                                                    <div>
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16"
                                                             viewBox="0 0 512 512">
                                                            <path
                                                                d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/>
                                                        </svg>
                                                    </div>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <a className={"mr-3 text-white"} href="#">
                                About
                            </a>
                        )}
                        {isHomepage && (
                            <button onClick={navigateToLogIn} className={"nav-button"}>
                                Log in
                            </button>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
