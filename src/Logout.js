import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('user')) {
            localStorage.clear();
            navigate("/");
        }
        if(localStorage.getItem('seller')) {
            localStorage.clear();
            navigate("/");
        }
        if(!localStorage.getItem('user') && !localStorage.getItem('seller')){
            navigate("/");
        }
        
    }, [navigate]);

}

export default Logout;