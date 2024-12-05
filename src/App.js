import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Navbar, Nav, NavDropdown, Row, Col } from "react-bootstrap";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.css";
import Cards from "./Components/Cards";
import AddProduct from "./Components/AddProduct";
import Cart from "./Cart.js";
import CartDetail from "./CartProductInner.js";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import { Link } from "react-router-dom";
import Carousel from "./Carousel";
import Categories from "./Categories";
import SellerRegister from "./SellerRegister";
import SellerLogin from "./SellerLogin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import {
  faCreditCard,
  faMoneyCheckAlt,
} from "@fortawesome/free-solid-svg-icons";
import ManageProducts from "./ManageProducts.js";
import ShowSeller from "./ShowSeller.js";
import Logout from "./Logout.js";
import NavbarComponent from "./Components/NavBar.js";
import OrderPage from "./OrderPage.js";

function App() {
  const images = ["images/img1.jpeg", "images/img2.jpeg", "images/img4.jpeg"];
  let data1 = [
    { id: "C1", name: "Mobiles", img: "images/mobiles.jpeg" },
    { id: "C2", name: "Accessories", img: "images/accessories.webp" },
    { id: "C3", name: "Laptops", img: "images/laptops.jpeg" },
    { id: "C4", name: "Beauty", img: "images/beauty.jpeg" },
    { id: "C5", name: "Electronics", img: "images/electronics.jpeg" },
    { id: "C6", name: "Kitchen", img: "images/kitchen.jpeg" },
    { id: "C7", name: "Furniture", img: "images/img3.jpeg" },
    { id: "C8", name: "Sports", img: "images/sports.webp" },
    { id: "C9", name: "Groceries", img: "images/Grocery.jpeg" },
    { id: "C10", name: "Fashion", img: "images/fashion.webp" },
    { id: "C11", name: "Decoration", img: "images/DECOR.jpeg" },
    { id: "C12", name: "Books", img: "images/books.jpeg" },
  ];
  return (
    <div className="App m-0 p-0">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <NavbarComponent />
                <div className="row  bg-grey justify-content-center m-0 p-0">
                  {/* <div className="col-12 m-0">
                    <Carousel images={images} />
                  </div> */}
                </div>
                <Cards />
                <Categories data={data1} />
              </>
            }
          />
          <Route
            path="/manage-products"
            element={
              <>
                <NavbarComponent />
                <ManageProducts />
              </>
            }
          />
          <Route
            path="/seller-register"
            element={
              <>
                <NavbarComponent />
                <SellerRegister />
              </>
            }
          />
          <Route
            path="/seller-login"
            element={
              <>
                <NavbarComponent />
                <SellerLogin />
              </>
            }
          />
          <Route
            path="/cart"
            element={
              <>
                <NavbarComponent />
                <Cart />
              </>
            }
          />
          <Route
            path="/cardDetail/:id"
            element={
              <>
                <NavbarComponent />
                <CartDetail />
              </>
            }
          />
          <Route
            path="/add-product"
            element={
              <>
                <NavbarComponent />
                <AddProduct />
              </>
            }
          />
          <Route
            path="/add-product/:id"
            element={
              <>
                <NavbarComponent />
                <AddProduct />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <NavbarComponent />
                <Login />
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <NavbarComponent />
                <Signup />
              </>
            }
          />
          <Route
            path="/show-seller"
            element={
              <>
                <NavbarComponent />
                <ShowSeller />
              </>
            }
          />
          <Route
            path="/logout"
            element={
              <>
                <NavbarComponent />
                <Logout />
              </>
            }
          />
          <Route
            path="/order-page/:id"
            element={
              <>
                <NavbarComponent />
                <OrderPage />
              </>
            }
          />
        </Routes>
      </Router>
      <div className="py-5 bg-light-grey m-0">
        <div className="row pt-5 pb-5  m-0 justify-content-center">
          <div className="col-10 col-md-10 col-lg-10">
            <div className="row justify-content-center">
              <div className="col-12 col-md-5 col-lg-4 ">
                <h3 style={{ color: "#212a45" }}>Customer Care</h3>
                <ul className="list-unstyled">
                  <li>Help Center</li>
                  <li>How to Buy</li>
                  <li>Returns & Refunds</li>
                  <li>ShopRizz Shop</li>
                  <li>Purchase Protection</li>
                  <li>ShopRizz Pick up Points</li>
                </ul>
              </div>

              <div className="col-12 col-md-5 col-lg-4">
                <h3 style={{ color: "#212a45" }}>ShopRizz</h3>
                <ul className="list-unstyled">
                  <li>About Us</li>
                  <li>Contact Us</li>
                  <li>ShopRizz Shop</li>
                  <li>Make Money With Us</li>
                  <li>Sell on ShopRizz</li>
                  <li>ShopRizz Exclusive</li>
                </ul>
              </div>

              <div className="col-lg-4">
                <div className="row justify-content-center">
                  <div className="col-12 col-md-5 col-lg-12">
                    <h3 style={{ color: "#212a45" }}>Payment Methods</h3>
                    <div className="row r">
                      <div className="col-3 p-2 m-0">
                        <FontAwesomeIcon
                          icon={faCreditCard}
                          style={{ color: "#3036d9" }}
                          size="2x"
                          className="mx-2"
                        />
                      </div>
                      <div className="col-3 p-2 m-0">
                        <FontAwesomeIcon
                          icon={faMoneyCheckAlt}
                          style={{ color: "#b14e0b" }}
                          size="2x"
                          className="mx-2"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-md-5 col-lg-12 pt-lg-2 ">
                    <h3 style={{ color: "#212a45" }}>Follow Us</h3>
                    <div className="row ">
                      <div className="col-3 p-2 m-0">
                        <FontAwesomeIcon
                          icon={faFacebook}
                          size="2x"
                          className="mx-2"
                          style={{ color: "blue" }}
                        />
                      </div>
                      <div className="col-3 p-2 m-0">
                        <FontAwesomeIcon
                          icon={faTwitter}
                          size="2x"
                          className="mx-2"
                          style={{ color: "#74C0FC" }}
                        />
                      </div>
                      <div className="col-3 p-2 m-0">
                        <FontAwesomeIcon
                          icon={faInstagram}
                          size="2x"
                          className="mx-2"
                          style={{ color: "red" }}
                        />
                      </div>
                    </div>
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
export default App;
