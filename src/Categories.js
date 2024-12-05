// Categories.js

import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { useState, useEffect } from 'react';
import './Categories.css'; 

const Categories = (props) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        setData(props.data);
    }, [props.data]); // Specify props.data as a dependency for useEffect

    return ( 
        <div className="row bg-grey p-0 m-0 justify-content-center">
        <div className="h2 mb-5 text-center pt-3 pb-2 p1" style={{fontFamily:'Tahoma, sans-serif',color:'#212a45'}}>Shop by Category – Discover What You Need!</div>
         <div className="col-md-12 col-sm-2 col-12 py-5">
             <div className="row" style={{ overflow: 'hidden' }}>
               <div className="marquee">
                {data && data.map((item) => (
                <div className="col-4 col-md-3 col-lg-2 round-div text-center" key={item.id}>
                    <img  style={{borderRadius:'40px'}} src={item.img} className='cimg' alt="CategoriesImage" />
                    <p className='cname mt-2'> {item.name} </p>
               </div>
            ))}
      </div>
    </div>
  </div>
</div>
    );
}
 
export default Categories;
