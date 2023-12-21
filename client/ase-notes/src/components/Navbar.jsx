import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import LogoSVG from './SVG/LogoSVG';
import {NAVBAR_TEXT} from '../utils/content';
import ArrowDownSVG from "./SVG/ArrowDownSVG";
import HouseSVG from "./SVG/HouseSVG";
import SettingsSVG from "./SVG/SettingsSVG";
import SignOutSVG from "./SVG/SignOutSVG";

function Navbar(props) {
    const { isHomepage, isSignUp, isMainPage, classes, prenume, handlePopUp } = props;

    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

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
                                    <ArrowDownSVG></ArrowDownSVG>
                                </button>
                                {dropdownVisible && (
                                    <div className='absolute right-1 bg-white rounded-md shadow-md mt-[0.625rem] p-3'>
                                        <ul>
                                            <li className={'flex w-[9.375rem]'}>
                                                <a href={"#"}
                                                   className={'flex gap-[1rem] w-full items-center px-5 py-4'}>
                                                    <p className={'text-[1.125rem] grow'}>Home</p>
                                                    <div>
                                                        <HouseSVG />
                                                    </div>
                                                </a>
                                            </li>
                                            <li className={'flex w-[9.375rem]'}>
                                                <a href={'#'}
                                                   className={'flex gap-[1rem] px-5 py-4 w-full items-center pt-0'}>
                                                    <p className={'text-[1.125rem] grow'}>Settings</p>
                                                    <div>
                                                        <SettingsSVG />
                                                    </div>

                                                </a>
                                            </li>
                                            <li className={'flex border-t-[1px] border-t-solid border-t-stone-300 w-[9.375rem]'}>
                                                <a href={'/'} id={'signOut'}
                                                   className={'flex gap-[1rem] px-5 py-4 w-full items-center'}
                                                    onClick={() => localStorage.removeItem('token')}>
                                                    <p className={'text-[1.125rem] grow'}>Sign out</p>
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
                            !isSignUp &&
                            <a className={'mr-3 text-white text-lg'} href="#">
                                About
                            </a>
                        )}
                        {isHomepage && (
                            <button onClick={handlePopUp} className={'nav-button button !text-lg'}>
                                Log In
                            </button>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
