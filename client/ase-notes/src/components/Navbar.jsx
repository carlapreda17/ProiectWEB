import React from 'react';
import {useState} from 'react';
import LogoSVG from './SVG/LogoSVG';
import ArrowDownSVG from "./SVG/ArrowDownSVG";
import HouseSVG from "./SVG/HouseSVG";
import SettingsSVG from "./SVG/SettingsSVG";
import SignOutSVG from "./SVG/SignOutSVG";
import {useNavigate} from "react-router-dom";

function Navbar(props) {
    const { isHomepage, isSignUp, isMainPage, classes, prenume, handlePopUp } = props;

    const [dropdownVisible, setDropdownVisible] = useState(false);

    const navigate=useNavigate()

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const navigateToSettings = () =>{
        navigate("/settings")
    }

    const navigateToLogin = () =>{
        navigate("/login-page")
    }

    return (
        <div className={'bg-main-pink shadow-nav z-10 sticky'}>
            <nav className={'navbar ' + classes + ' m-tablet:px-8 tablet:px-6'}>
                <div className={'flex py-4 justify-between'}>
                    <div className={'flex items-end gap-3 tablet:w-5/12'}>
                        <LogoSVG/>
                    </div>
                    <div className='flex items-center'>
                        {isMainPage ? (
                            <div className='relative'>
                                <button className={'flex items-center'} onClick={toggleDropdown}>
                                    <div className={'pr-3 text-lg text-white'}>{prenume}</div>
                                    <div className={'pt-[5px]'}>
                                        <ArrowDownSVG colorClass={'text-white'} />
                                    </div>
                                </button>
                                {dropdownVisible && (
                                    <div className='absolute right-1 bg-white rounded-md shadow-md mt-[0.625rem] p-3'>
                                        <ul>
                                            <li className={'flex w-[9.375rem]'}>
                                                <a href={"/main-page"}
                                                   className={'flex gap-[1rem] w-full items-center px-5 py-4'}>
                                                    <p className={'text-[1.125rem] grow'}>Acasa</p>
                                                    <div>
                                                        <HouseSVG />
                                                    </div>
                                                </a>
                                            </li>
                                            <li onClick={navigateToSettings} className={'flex w-[9.375rem]'}>
                                                <a href={'#'}
                                                   className={'flex gap-[1rem] px-5 py-4 w-full items-center pt-0'}>
                                                    <p className={'text-[1.125rem] grow'}>Setari</p>
                                                    <div>
                                                        <SettingsSVG />
                                                    </div>

                                                </a>
                                            </li>
                                            <li className={'flex border-t-[1px] border-t-solid border-t-stone-300 w-[9.375rem]'}>
                                                <a href={'/'} id={'signOut'}
                                                   className={'flex gap-[0.625rem] px-5 py-4 w-full items-center'}
                                                   onClick={() => localStorage.clear()}>
                                                    <p className={'text-[1.125rem] grow'}>Deconectare</p>
                                                    <div>
                                                        <SignOutSVG  />
                                                    </div>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ) : (
                            isSignUp && (
                                <button onClick={navigateToLogin} className={'nav-button button !text-lg'}>
                                    Conectare
                                </button>
                            )
                        )}
                        {isHomepage && (
                            <button onClick={handlePopUp} className={'nav-button button !text-lg'}>
                                Conectare
                            </button>
                        )}

                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
