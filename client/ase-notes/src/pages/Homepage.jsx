// Homepage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Homepage() {
    const navigate = useNavigate();

    const navigateToSignUp = () => {

        navigate('/sign-up');
    };
    return (
        <button onClick={navigateToSignUp}>Sign up</button>
    );
}

export default Homepage;
