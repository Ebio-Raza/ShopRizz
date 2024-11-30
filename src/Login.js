import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Navbar, Nav, NavDropdown,Row,Col,Button } from 'react-bootstrap';
import './App.css';
import Enter from './Components/Enter';
const Login = () => {
    return ( 
        <Enter titleData="Login" btnData="Login" flag= {false} />
     );
}
 
export default Login;
