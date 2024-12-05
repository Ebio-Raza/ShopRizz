import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './App.css';
import Enter from './Components/Enter';

const Login = () => {
    const submitLogin = async (email, password) => {
        if (email && password) {
            let obj = { email, password };
            try {
                let result = await fetch('http://localhost:5000/user-login', {
                    method: 'post',
                    body: JSON.stringify(obj),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (result.ok) {
                    result = await result.json();

                    if (result.result === 'Not Found') {
                        alert('User Not Found');
                    } else if (result.result === 'Enter Correct Info') {
                        alert('Please Enter Correct Info');
                    } else {
                        // Store user data and token in localStorage
                        localStorage.setItem('user', JSON.stringify(result.user));
                        localStorage.setItem('user_token', result.token); // Store token
                        localStorage.removeItem('seller'); // Remove seller data if any
                        alert('User Logged in Successfully');
                        console.log('Email:', email);
                        console.log('Password:', password);
                        console.log('Token:', result.token);

                    }
                } else {
                    alert('Login Failed. Please try again.');
                }
            } catch (error) {
                console.error('Error during login:', error);
                alert('An error occurred. Please try again.');
            }
        } else {
            alert('Please Enter all the Fields');
        }
    };

    return (
        <Enter
            titleData="Login"
            btnData="Login"
            flag={false}
            submitLogin={submitLogin} // Pass the login function as a prop
        />
    );
};

export default Login;
