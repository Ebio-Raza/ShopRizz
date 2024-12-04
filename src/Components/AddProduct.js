// Import Bootstrap CSS
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, NavDropdown, Row, Col } from "react-bootstrap";
import React from "react";
import "./cards.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { useParams, useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [highlights, setHighlights] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState();
  const [price, setPrice] = useState();
  const [discount_price, setDiscount_price] = useState();
  const [deliveryDays, setDeliveryDays] = useState();
  const [deliveryCharges, setDeliveryCharges] = useState();
  const [TotalQty, setTotalQty] = useState();
  const [file, setFile] = useState([]);
  let status = false;
  let { id } = useParams();
  const [sellerID, setID] = useState(null);
  if (id) {
    status = true;
  }
  useEffect(() => {
    if (id) {
      fetchSingleProduct();
    }
    const data = JSON.parse(localStorage.getItem("seller"));
    if (data) {
      setID(data._id);
    }
  }, []);
  const fetchSingleProduct = async () => {
    let data = await fetch(
      "http://localhost:5000/get-product/" + id,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (data) {
      data = await data.json();
      setTitle(data.title);
      setHighlights(data.highlights);
      setCategory(data.category);
      setRating(data.rating);
      setPrice(data.price);
      setDiscount_price(data.discount_price);
      setDeliveryDays(data.deliveryDays);
      setDeliveryCharges(data.deliveryCharges);
      setTotalQty(data.TotalQty);
      setFile(data.photos);
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length <= 8) {
      setFile(selectedFiles);
    } else {
      alert("You can upload maximum 8 photos.");
    }
  };

  const upload = async () => {
    if (
      title &&
      highlights &&
      category &&
      rating &&
      price &&
      discount_price &&
      TotalQty &&
      file &&
      deliveryDays &&
      deliveryCharges
    ) {
      if (Number(discount_price) < Number(price)) {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("highlights", highlights);
        formData.append("category", category);
        formData.append("rating", rating);
        formData.append("price", price);
        formData.append("discount_price", discount_price);
        formData.append("TotalQty", TotalQty);
        formData.append("deliveryDays", deliveryDays);
        formData.append("deliveryCharges", deliveryCharges);
        for (let i = 0; i < file.length; i++) {
          formData.append("photos", file[i]);
        }
        if (status) {
          let result = await fetch(
            "http://localhost:5000/edit-product/" +
              sellerID +
              "/" +
              id,
            {
              method: "put",
              body: formData,
            }
          );
          if (result) {
            console.log(result);
            navigate("/");
          }
        } else {
          let result = await fetch(
            "http://localhost:5000/add-product/" + sellerID,
            {
              method: "POST",
              body: formData,
            }
          );
          if (result) {
            console.log(result);
          }
        }
      } else {
        alert("Please Enter a valid Discount Price");
      }
    } else {
      alert("Please Fill all the Fields");
    }
  };
  return (
    <div className="container mb-5">
      <div className="row justify-content-center mt-5 pt-3">
        <div className="col-8">
          {!status && <div className="h2 text-center">Add Product</div>}
          {status && <div className="h2 text-center">Edit Product</div>}
          <div className="h6 mt-3">Title</div>
          <input
            type="text"
            className="form-control"
            value={title}
            placeholder="Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <div className="h6 mt-3">Highlights</div>
          <input
            type="text"
            className="form-control"
            value={highlights}
            placeholder="Description"
            onChange={(e) => {
              setHighlights(e.target.value);
            }}
          />
          <div className="h6 mt-3">Photos</div>
          <input
            type="file"
            className="form-control"
            onChange={handleFileChange}
            multiple
          />
          <div className="h6 mt-3">Category</div>
          <input
            type="text"
            value={category}
            placeholder="Mobiles"
            className="form-control"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
          <div className="h6 mt-3">Rating</div>
          <input
            type="number"
            value={rating}
            className="form-control"
            onChange={(e) => {
              setRating(e.target.value);
            }}
          />
          <div className="h6 mt-3">Price</div>
          <input
            type="number"
            value={price}
            placeholder="1000"
            className="form-control"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          <div className="h6 mt-3">Discount Price</div>
          <input
            type="number"
            value={discount_price}
            placeholder="890"
            className="form-control"
            onChange={(e) => {
              setDiscount_price(e.target.value);
            }}
          />
          <div className="h6 mt-3">Total Quantity</div>
          <input
            type="number"
            value={TotalQty}
            className="form-control"
            onChange={(e) => {
              setTotalQty(e.target.value);
            }}
          />
          <div className="h6 mt-3">Delivery Days</div>
          <input
            type="number"
            value={deliveryDays}
            className="form-control"
            onChange={(e) => {
              setDeliveryDays(e.target.value);
            }}
          />
          <div className="h6 mt-3">Delivery Charges</div>
          <input
            type="number"
            value={deliveryCharges}
            className="form-control"
            onChange={(e) => {
              setDeliveryCharges(e.target.value);
            }}
          />
          <div className=" mt-4 mb-3 text-center">
            {!status && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={upload}
              >
                Add
              </button>
            )}
            {status && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={upload}
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
