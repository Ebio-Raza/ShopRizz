import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import React from "react";
import { Link, useParams } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.css";
const OrderPage = () => {
  const OrderID = useParams();
  const [subTotal, setSubTotal] = useState(0);
  const [Charges, setShippingCharges] = useState(0);
  const [Total, setTotal] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
    console.log(data);
    let sum = 0;
    let shipping = 0;
    for (let i = 0; i < data.length; i++) {
      sum = sum + Number(data[i].price) * Number(data[i].Qty);
      shipping = shipping + Number(data[i].deliveryCharges);
    }
    setSubTotal(sum);
    setShippingCharges(shipping);
    setTotal(sum + shipping);
  }, [data]);
  const getData = async () => {
    let result = await fetch(
      "http://localhost:5000/get-Order/" + OrderID.id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (result) {
      result = await result.json();
      setData(result);
    }
  };
  return (
    <div className="container">
      <div className="mt-5 pt-5 mb-5 pb-5">
        <div className="row justify-content-center ">
          <div className="col-5 text-center">
            <div className="row justify-content-center">
              <div className="col-4">
                <img
                  src="/images/orderSuccess.png"
                  className="img-fluid"
                  alt=""
                />
              </div>
            </div>
            <p className="fs-5">Thanks For Ordering From ShopRizz</p>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-12 text-center h5">Order Details</div>
          <div
            className="col-8 mt-2"
            style={{ border: "2px solid rgb(6, 158, 6)" }}
          >
            <div className="row m-0 p-0">
              <div
                className="col-12 text-center"
                style={{ backgroundColor: "rgb(6, 158, 6)", color: "white" }}
              >
                Prodcut Details
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-7 h6 text-center">Product</div>
              <div className="col-3 h6">Qty</div>
              <div className="col-2 h6">Price</div>
              {data.map((item, index) => (
                <div key={index} className="col-12 mb-3">
                  <div className="row">
                    <div className="col-7">
                      <div className="row">
                        <div className="col-3">
                          <img
                            src={`http://localhost:5000/${item.photos[0]}`}
                            className="img-fluid"
                            alt={item.imageAlt}
                          />
                        </div>
                        <div className="col-8">
                          <div className="mt-4">{item.title}</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-3 mt-4">
                      <div className="">{item.Qty}</div>
                    </div>
                    <div className="col-2 mt-4">
                      <div className="">{item.Qty * item.price}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="row">
              <div className="col-10 font-weight-bold h6">Sub Total</div>
              <div className="col-2 h6 justify-content-end">Rs: {subTotal}</div>
              <div className="col-10 h6">Shipping Charges</div>
              <div className="col-2 h6 justify-content-end">Rs: {Charges}</div>
            </div>
            <div
              className="row mt-5 my-3 mx-1"
              style={{ border: "2px solid black" }}
            >
              <div className="col-10" style={{ fontWeight: "bold" }}>
                TOTAL
              </div>
              <div
                className="col-2 justify-content-end"
                style={{ fontWeight: "bold" }}
              >
                {Total} PKR
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderPage;
