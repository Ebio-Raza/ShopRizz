import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { useParams } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

const CartProductInner = () => {
    const navigate = useNavigate();
    let user= JSON.parse(localStorage.getItem('user'));
    if(user){
        user = user._id;
    }
     let ID = useParams();
    const [cartIteminner, setCartItems] = useState([]);
    const [editedQuantity, setEditedQuantity] = useState(1);
    const [check,setCheck] = useState(false);
    useEffect(() => {
        getProduct();
    }, []);
    const getProduct = async()=>{
        console.log(ID.id);
        let result = await fetch('http://localhost:5000/get-product/' + ID.id,{
            method:'get',
            headers:{
                'Content-Type':'application/json'
            },
        });
        if(result){

            result = await result.json();
            console.log(result);
            let array=[result];
            setCartItems(array);
        }
    }
    const addToCart = async () =>{
        if(localStorage.getItem('user')){
            const productID = cartIteminner[0]._id;
            let result = await fetch('http://localhost:5000/add-cart/' + user +'/' + productID + '/' + editedQuantity,{
                method:'post',
                headers:{
                    'Content-Type':'application/json'
                },
            });
            if(result){
                console.log("cart ADDED");
                navigate("/cart");
            }
        }
        else{
            alert('Please Login or Signup First');
            navigate("/signup");
        }
        
    }
    const handleQuantityChange = (e, itemId,Total) => {
        const newQuantity = parseInt(e.target.value);
        if (!isNaN(newQuantity) && newQuantity >= 1 && newQuantity <= Total) {
            setEditedQuantity(newQuantity);
            const updatedCartItems = cartIteminner.map(item => {
                if (item.id === itemId) {
                    return { ...item, TotalQty: newQuantity };
                }
                return item;
            });
            setCartItems(updatedCartItems);
        }
    };
    const handleOrderNow = async () => {
        if(localStorage.getItem('user')){
            const productID = cartIteminner[0]._id;
            let obj = { product: productID, quantity: editedQuantity };
            let array = [obj];
            let result = await fetch('http://localhost:5000/add-order/' + user, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(array)
            });
            if(result){
                result = await result.json();
                console.log('Order Added');
                navigate("/order-page/" + result._id);
            }
        }
        else {
            alert('Please Login or Signup First');
            navigate("/signup");
        }
    };

    return (
        <div className="container">
        <div className=" row justify-content-center">
        <div className="col-11 p-1 mt-lg-3 mb-lg-3 ">
            {cartIteminner && cartIteminner.map((cartItem) => (
                <div className='row justify-content-center mt-4 mb-4' key={cartItem._id}>
                    <div className='col-sm-12 col-md-8'>
                        <div className='row justify-content-center'>
                            <div className='col-sm-10 col-md-5 mb-3 mb-md-0'>
                                <img src={`http://localhost:5000/${cartItem.photos[0]}`} alt="Product" className="img-fluid border border-3 border-dark" />
                            </div>
                            <div className='mb-3 mb-md-0 col-sm-10 col-md-7'>
                                <div className='row'>
                                    <div className='col-12'>
                                        <h2>{cartItem.title}</h2>
                                    </div>
                                    <div className='col-12 mb-0 pb-0'>
                                        <h5>Rs: {cartItem.discount_price}</h5>
                                    </div>
                                    <div className='col-12 mt-0 pt-0'>
                                        <del>Rs: {cartItem.price}</del>
                                    </div>
                                    <div className='col-12'>
                                        <h6>{"Rating: " + cartItem.rating}</h6>
                                    </div>
                                    <div className="col-10 col-md-8 col-lg-6">
                                        <div className="row">
                                            <div className="col-5 col-md-8 col-lg-6">
                                                <h5>Quantity:</h5>
                                            </div>
                                            <div className=" col-5 col-md-4 col-lg-6">
                                                <div className="input-group">
                                                    <input 
                                                        type="number" 
                                                        className="form-control"
                                                        value={editedQuantity} 
                                                        onChange={(e) => handleQuantityChange(e, cartItem._id, cartItem.TotalQty- cartItem.SoldQty)} 
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12 mt-4'>
                                        <div className="row justify-content-center">
                                        <button className="btn btn-primary col-4 m-2" onClick={handleOrderNow}>Order Now</button>
                                        <button className="btn btn-secondary col-4 m-2" onClick={addToCart}>Add to Cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-7 mt-md-3 mt-lg-0 col-lg-4 '>
                        <div className='row border border-dark'>
                            <div className='col-12 border-bottom border-dark pt-3 '>
                                <h5>Delivery Days: {cartItem.deliveryDays}</h5>
                            </div>
                            <div className='col-12 border-bottom border-dark pt-3 '>
                                <h5>Shipping Charges: {cartItem.deliveryCharges}</h5>
                            </div>
                            <div className='col-12 pt-3 '>
                                <h5>Payment Method: {cartItem.PaymentMethod}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="h2 mt-5">
                        Product Highlights
                    </div>
                    <div className="mt-3 mb-5 pb-5">{cartItem.highlights}</div>
                </div>
            ))}
            </div>
        </div>
        </div>
    );
}

export default CartProductInner;
