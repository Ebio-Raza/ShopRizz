import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Navbar, Nav, NavDropdown,Row,Col } from 'react-bootstrap';
import React from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
const SellerLogin = () =>{
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    function validatePassword(password) {
        if (password.length < 8) {
            return false;
        }
        if (!/\d/.test(password)) {
            return false;
        }
        if (!/[a-zA-Z]/.test(password)) {
            return false;
        }
        if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
            return false;
        }
        return true;
    }
    const submit = async () =>{
        if(email && password){
        let obj = {email:email,password:password};
        let result = await fetch ('https://shopshuttle.onrender.com/seller-login',{
              method:'post',
              body:JSON.stringify(obj),
              headers:{
                  'Content-Type':'application/json'
              },
        });
        if(result){
            result = await result.json();
            if(result.result === 'Not Found'){
                alert('Seller Not Found');
            }
            else if (result.result === 'Enter Correct Info'){
                alert('Please Enter Correct Info');
            }
            else{
                localStorage.setItem('seller',JSON.stringify(result));
                localStorage.removeItem('user');
                alert('Seller Logged in Successfully')
            }
        }
    }
    else{
        alert('Please Enter all the Fields');
    }
     }
     return(
        <div className="container mb-5 ">
            <div className="row justify-content-center">
                <div className="col-md-6 col-12">
                    <div className="text-center h2 mt-5">Seller Login</div>
                    <div className="mt-3">Enter Email</div>
                    <input className='form-control' type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='email' />
                    <div className="mt-3">Enter Password</div>
                    <input className='form-control' type="text" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='password' />
                    <div className='text-center mt-4'>
                      <button className='text-center btn btn-primary' onClick={submit} type="button">Login</button>
                      <div className="h5 mt-3">Want To Register?<span className='ms-1'><Link to="seller-register">Sign up</Link></span></div>
                    </div>
                
                </div>
            </div>
        </div>
    );
}
export default SellerLogin;
