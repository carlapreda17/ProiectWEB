import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setIsAuthenticated(false);
                return;
            }

            try {
                const { exp } = jwtDecode(token);
                if (exp < new Date().getTime() / 1000) {
                    setIsAuthenticated(false);
                } else {
                    setIsAuthenticated(true);
                }
            } catch (error) {
                setIsAuthenticated(false);
            }
        };

        checkAuth();

        const interval = setInterval(checkAuth, 300000);

        return () => clearInterval(interval);
    }, []);

    return isAuthenticated;
};

export default useAuth;