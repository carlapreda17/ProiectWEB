import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
function MainPage(props){
    return(
       <div>
           <Navbar isMainPage={true}></Navbar>
           <Footer></Footer>
       </div>
    )
}

export default MainPage;