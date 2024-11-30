import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { useNavigate } from 'react-router-dom';
const Cart = () => {
    const navigate = useNavigate();
    const truncateStyle = {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 3, // Number of lines to show
        WebkitBoxOrient: 'vertical',
      };
    let user = localStorage.getItem('user');
    if(localStorage.getItem('user')){
        user = JSON.parse(localStorage.getItem('user'))._id;
    }
    const [data, setData] = useState([]);
    useEffect(() => {
        getData();
    },[]); 
    const getData = async () => {
        let result = await fetch('https://shopshuttle.onrender.com/get-cartProduct/' + user,{
            method:'get',
            headers:{
                'Content-Type':'application/json'
            }
          }
        );
        if(result){
            result = await result.json();
            setData(result);
            console.log("showed");
        }
    }

    const handleDelete = async (itemId) => {
        // Filter out the item with the given itemId from the cart data
        let result = await fetch('https://shopshuttle.onrender.com/delete-cartProduct/'+user+'/'+itemId,{
            method:'delete',
            headers:{
                'Content-Type':'application/json'
            }
        });
        if(result){
            navigate("/");
        }
    };

    const handleOrderNow = async () => {
        const array = data.map(item => ({ product: item._id, quantity: item.Qty }));
        console.log(array);
        let result = await fetch('https://shopshuttle.onrender.com/add-order/' + user, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(array)
        });
        if(result){
            result = await result.json(); 
            navigate("/order-page/"+result._id);
            console.log('Order Added');
        }
    };

    return (
        <div className="col-12 mt-5 mb-5 pt-5 pb-5">
            <div className="row mt-sm-4 mb-sm-4 justify-content-center">
                {data && data.map((cartItem) => (
                    <div className="col-sm-10 border rounded p-3 mt-2 mb-2" key={cartItem._id}>
                        <div className="row">
                            <div className="col-sm-3 col-lg-3 d-flex justify-content-center mb-3 mb-md-0">
                                <img src={`https://shopshuttle.onrender.com/${cartItem.photos[0].split('/').slice(5).join('/')}`} width="140px" height="120px" alt="Product" className="img-fluid" />
                            </div>
                            <div className="col-sm-7 col-lg-7">
                                <h3>{cartItem.title}</h3>
                                <div className="highlight-section " style={truncateStyle}>
                                    <h4>{cartItem.highlights}</h4>
                                </div>
                            </div>
                            <div className="col-sm-2 ">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <h5>Quantity:</h5>
                                        <div className="h3">
                                            {cartItem.Qty}
                                        </div>
                                    </div>
                                    <div className="col-sm-12 mt-2">
                                        <button className="btn btn-danger" onClick={() => handleDelete(cartItem._id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="col-12 text-center">
                    <button className="btn btn-primary mt-4" onClick={handleOrderNow}>Order Now</button>
                </div>
            </div>
        </div>
    );
}

export default Cart;
