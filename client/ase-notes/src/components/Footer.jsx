import React from "react";
import LinkedinSVG from "./SVG/LinkedinSVG";
import StudyGirlSVG from "./SVG/StudyGirlSVG";

function Footer(){
    return(
        <div className={"page-container bg-main-pink shadow-footer"}>
            <div className={'content-container py-14 flex justify-between'}>
                <div>
                    <h3 className={'text-dark-purple'}>Contact Us</h3>
                    <div className={'flex gap-1 items-center mb-2'}>
                        <LinkedinSVG colorClass={'text-main-text'} link={'https://www.linkedin.com/in/carla-preda-63668b246/'}/>
                        <span className={'text-lg'}>Preda Carla Maria</span>
                    </div>
                    <div className={'flex gap-1 items-center'}>
                        <LinkedinSVG colorClass={'text-main-text'} link={'https://www.linkedin.com/in/m%C4%83riuca-pricop-737997237/'}/>
                        <span className={'text-lg'}>Pricop Măriuca</span>
                    </div>
                </div>
                <div className={'w-2/12 text-center'}>
                    <div className={'flex justify-center'}>
                        <StudyGirlSVG />
                    </div>
                    <span className={'text-base'}>
                        Knowledge is beautiful, and so is the mind that holds it.
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Footer;