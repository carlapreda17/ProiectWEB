import { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import {useNavigate} from "react-router-dom";

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate=useNavigate();

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('token');

            if (!token) {
                console.log('No token found');
                setIsAuthenticated(false);

                if(!isAuthenticated) {
                    navigate('/login');
                }

                return;
            }

            try {
                const decoded = jwtDecode(token);
                console.log('Decoded Token:', decoded);

                if (decoded.exp < new Date().getTime() / 1000) {
                    setIsAuthenticated(false);

                    if(!isAuthenticated) {
                        navigate('/login');
                    }
                } else {
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error('Error decoding token:', error);
                setIsAuthenticated(false);

                if(!isAuthenticated) {
                    navigate('/login');
                }
            }
        };

        checkAuth();
        const interval = setInterval(checkAuth, 300000);

        return () => clearInterval(interval);
    }, []);

    return isAuthenticated;
};

export default useAuth;