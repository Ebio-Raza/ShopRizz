import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './App.css';
import Enter from './Components/Enter';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './redux/slices/authSlice';

const Login = () => {
    const dispatch = useDispatch();
    const { loading, error, user } = useSelector((state) => state.auth);

    const submitLogin = (email, password) => {
        if (email && password) {
            dispatch(loginUser({ email, password }));
        } else {
            alert('Please Enter all the Fields');
        }
    };

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {user && <p style={{ color: 'green' }}>Welcome, {user.name}!</p>}

            <Enter
                titleData="Login"
                btnData="Login"
                flag={false}
                submitLogin={submitLogin} // Pass the login function as a prop
            />
        </div>
    );
};

export default Login;
