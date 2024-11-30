import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Navbar, Nav, NavDropdown,Row,Col } from 'react-bootstrap';
import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.css';
const ShowSeller = () =>{
    const seller = JSON.parse(localStorage.getItem('seller'));
    return (
        <div className="container pb-5">
            <div className="row justify-content-center mt-5 pb-5">
                <div className="col-10">
                    <div className="row justify-content-center mt-5">
                        <div className="col-9">
                            <div className="h2">Name: {seller.name}</div>
                            <div className="h3">Email: {seller.email}</div>
                        </div>
                   
                    <div className="col-lg-4 col-md-5 col-12 mt-5">
                        <div className="" style={{borderRadius:'20px', border:'2px solid green'}}>
                        <div className="row justify-content-center">
                            <div className="text-white container col-6 py-5">
                               <Link className='' to="/add-product" style={{textDecoration:'none',color:'green'}}>Add Product</Link> 
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-5 col-12 mt-5">
                        <div className="" style={{borderRadius:'20px', border:'2px solid green'}}>
                            <div className="row justify-content-center">
                            <div className="text-white container col-6 py-5">
                               <Link className='' to="/manage-products" style={{textDecoration:'none',color:'green'}}>Manage Products</Link> 
                            </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ShowSeller;