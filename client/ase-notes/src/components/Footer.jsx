import React from "react";
import LinkedinSVG from "./SVG/LinkedinSVG";
import StudyGirlSVG from "./SVG/StudyGirlSVG";

function Footer(){
    return(
        <div className={"page-container bg-main-pink shadow-footer"}>
            <div className={'content-container py-14 flex justify-between m-tablet:py-10 m-tablet:px-8 tablet:px-6 mobile:flex-wrap mobile:gap-y-4'}>
                <div>
                    <h3 className={'text-dark-purple tablet:text-2xl'}>Contact Us</h3>
                    <div className={'mb-2'}>
                        <LinkedinSVG colorClass={'text-background'}
                                     link={'https://www.linkedin.com/in/carla-preda-63668b246/'}
                                     name={'Preda Carla Maria'}/>
                    </div>
                    <div>
                        <LinkedinSVG colorClass={'text-background'}
                                     link={'https://www.linkedin.com/in/m%C4%83riuca-pricop-737997237/'}
                                     name={'Pricop Măriuca'}/>
                    </div>
                </div>
                <div className={'w-3/12 text-center tablet:w-4/12 mobile:flex mobile:items-end'}>
                    <div className={'flex justify-center'}>
                        <StudyGirlSVG/>
                    </div>
                    <span className={'text-base text-background mobile:hidden'}>
                        Knowledge is beautiful, and so is the mind that holds it.
                    </span>
                </div>
                <div className={'hidden text-center mobile:block'}>
                    <span className={'text-base text-background'}>
                        Knowledge is beautiful, and so is the mind that holds it.
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Footer;