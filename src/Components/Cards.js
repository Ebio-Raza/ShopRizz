 // Import Bootstrap CSS
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Navbar, Nav, NavDropdown,Row,Col } from 'react-bootstrap';
import React from 'react';
import { Link } from 'react-router-dom';
import './cards.css'; 
import '@fortawesome/fontawesome-free/css/all.css';


const Cards = () => {
    const [isPending, setPending] = useState(true);
    const [data,setData] = useState([]);
    const [star,setStar]=useState(null);

    const HelperStar = (index,star) => {
      return index + 1 <= star ? "fa-solid fa-star" : index + 0.5 === star ? "fa-solid fa-star-half-stroke": "fa-regular fa-star";
    }
    
    const Find = (star) =>{
        const imageSource = new Array(5).fill(0).map((data, index) => HelperStar(index,star));
        return imageSource;
    }
    const getProducts = async()=>{
        let result = await fetch('http://localhost:5000/get-products',{
          method:'get',
          headers:{
              'Content-Type':'application/json'
          },
      });
      if(result.ok){
        result =  await result.json();
        setData(result.filter(item => item.SellerStatus !== 'Inactive'));
      }
    }
    useEffect(() => {
        getProducts();
        if(data && data.rating){
           setStar(data.rating);
        }
        setPending(false);
    }, []);
    return (
        <div className=" pb-5 m-0 p-0 bg-grey" >
        <div className="pt-5 m-0 p-0 row justify-content-center  pb-5">
         <div className="col-10">
         <div className="h2 pt-3 p-2" style={{fontFamily:'Tahoma, sans-serif',color:'#212a45'}}>Explore Top Picks Tailored Just for You!</div>
          <div className="row" >
            {data && data.map((item) => (
                <div className="col-lg-2 col-xl-2 col-md-3 col-sm-12 col-xs-12 col-12"   key={item._id}>
                     <Link  style={{ textDecoration: 'none' }} className={`${item.Status === 'Sold Out' ? 'sold-out' : ''}`} to={"/cardDetail/" + item._id}><div className="p-2 mt-4  cart" >
                    {item.Status === 'Sold Out' && <span className="">Sold Out</span>}
                    <img src={`http://localhost:5000/${item.photos[0]}`} className='img-fluid' alt="There is an image" />
                    <p className="text-black title mt-1">{item.title}</p>
                    <div className="d-flex text-green">
                        <h5>Rs.</h5>
                        <h5 className='ms-1'>{item.price}</h5>
                    </div>
                    <div className="d-flex">
                    {/* {imageSource && imageSource.map((data, index) => <div key={index} className="ms-2"><i className={data} alt="Ratings icon" /></div>)} */}
                    {Find(item.rating).map((data,index) => (<div key={index} className="ms-1 text-yellow" style={{fontSize:'10px'}}><i className={data} alt="Ratings icon" aria-hidden="true" /></div>))}
                    </div>
                    </div></Link>
                </div>
            ))}
            </div>
          </div>
        </div>
        </div>
    )
}

export default Cards;

