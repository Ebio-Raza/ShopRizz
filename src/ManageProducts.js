// Categories.js

import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { useState, useEffect } from 'react';
import './Categories.css'; 
import {Link,useNavigate} from 'react-router-dom'

const ManageProducts = () => {
    const navigate = useNavigate();
    const seller = JSON.parse(localStorage.getItem('seller'));
    const [products,setProducts] = useState([]);
    useEffect(()=>{
        getProducts();
    },[]);
    const getProducts = async ()=>{
        let result = await fetch("https://shopshuttle.onrender.com/get-sellerProducts/" + seller._id,{
            method:'get',
            headers:{
              'Content-Type':'application/json'
            }
        });
        if(result){
            result = await result.json();
            setProducts(result);
        }
    }
    const changeStatus = async (ID,STATUS) =>{
        let result = await fetch('https://shopshuttle.onrender.com/statusChange/' + ID + '/' + STATUS,{
            method: 'put',
            headers:{
                'Content-Type':'application/json'
            }
        });
        if(result){
            console.log("Success");
            navigate("/");
        }
    }
    return (
        <div className="container mb-5">
            <div className="h1 mt-5 text-center">Manage Products</div>
            <div className="h2 mt-4 text-center">{seller.name}</div>
            <div className="row justify-content-center mt-5 pt-3 align-item-center">
            {products && products.map(item => (
             <div className="col-lg-7 col-md-8 col-12 m-1 p-1 " key={item._id} style={{border:'2px solid black'}}>
               <div className="row justify-content-center">
                <div className="col-md-2 col-6">
                   <img src={'http://localhost:5000/' + item.photos[0]} className='img-fluid'  alt="" />
                </div>
                <div className="col-lg-8 col-md-7 col-10">
                   <div className="">{item.title}</div>
                   <div className="">{item.highlights}</div>
                   <div className="">Rs: {item.price}</div>
                   <div className="h6">Quantity: <span>{item.TotalQty}</span></div>
                </div>
                <div className="col-md-2 col-10">
                    <Link to = {"/add-product/" + item._id }><button className='btn btn-primary mt-1'  type='button'>Edit</button></Link>
                    <button 
                        className='mt-2 btn btn-danger' 
                        type='button' 
                        onClick={() => changeStatus(item._id, item.SellerStatus === 'Inactive' ? 'Active' : 'Inactive')}>
                        {item.SellerStatus === 'Inactive' ? 'Active' : 'Inactive'}
                    </button>
                </div>
               </div>
            </div>
        ))}
            </div>
        </div>
    );
}
 
export default ManageProducts;
