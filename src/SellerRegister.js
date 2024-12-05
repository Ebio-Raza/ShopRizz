import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Navbar, Nav, NavDropdown,Row,Col } from 'react-bootstrap';
import React from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
const SellerRegister = () =>{
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [contact_no, setNumber] = useState('');
    const [address, setAddress] = useState('');
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
      if(name && email && password && ConfirmPassword && contact_no && address){
        if(password === ConfirmPassword){
          if (email.includes("@") && email.endsWith(".com")) {
            if(contact_no.length==11){
          if(validatePassword(password)){
            let obj = {name:name, email:email,password:password,contact_no:contact_no,address:address};
            let result = await fetch ('http://localhost:5000/seller-register',{
              method:'post',
              body:JSON.stringify(obj),
              headers:{
                  'Content-Type':'application/json'
              },
            });
            if(result){
              result = await result.json();
              if(result.result === 'Already Registered'){
                alert('Already Registered');
              }
              else{
                localStorage.setItem('seller',JSON.stringify(result));
                localStorage.removeItem('user');
                setName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                setNumber("");
                setAddress("");
                alert('Seller Registered Successfully');
              }
            }
            else{
              alert('Error');
            }
          }
          else{
              alert('Please Enter a Valid Password')
          }
        }
        else{
          alert('Please Enter Valid Number');
        }
         }
         else{
          alert('Please Enter a Valid Email');
         }
        }
        else{
          alert('Your Password does not match with the Confirm Password')
        }
        
      }
      else{
        alert('Please Fill all the Fields');
      }
    }
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8 col-11">
                    <div className="mb-5">
                        <div className="text-center h2 mt-5">Seller Registration</div>
                        <div className="mt-5">Enter Name</div>
                        <input type="text" value={name} onChange={((e)=>{setName(e.target.value)})} className='form-control' placeholder='Name' />
                        <div className="mt-3">Enter Email</div>
                        <input type="text" value={email} onChange={((e)=>{setEmail(e.target.value)})} className='form-control' placeholder='Email' />
                        <div className="mt-3">Enter Password</div>
                        <input type="text" value={password} onChange={((e)=>{setPassword(e.target.value)})} className='form-control' placeholder='Password' />
                        <div className="mt-3">Enter Confirm Password</div>
                        <input type="text" value={ConfirmPassword} onChange={((e)=>{setConfirmPassword(e.target.value)})} className='form-control' placeholder='Password' />
                        <div className="mt-3">Enter Contact Number</div>
                        <input type="text" value={contact_no} onChange={((e)=>{setNumber(e.target.value)})} className='form-control' placeholder='Number' />
                        <div className="mt-3">Enter Address</div>
                        <input type="text" value={address} onChange={((e)=>{setAddress(e.target.value)})} className='form-control' placeholder='Address' />
                        <div className='text-center mt-3'>
                           <div className="p-2 rounded text-white"><button className='btn btn-primary mt-2' onClick={submit} type='button'>Register</button></div>
                           <div className="mt-4 h5">Already Registered? <span><Link to="/seller-login" className="ms-1">Login</Link></span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SellerRegister