import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Navbar, Nav, NavDropdown, Row, Col, Button } from "react-bootstrap";
import "./Enter.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const Enter = ({ titleData, btnData, flag, submitLogin }) => {
  const screenWidth = window.innerWidth;
  let classes = "";
  if (!flag && screenWidth > 768) {
    classes = "mt-5 pt-5";
  }
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [contact_no, setNumber] = useState("");
  const [address, setAddress] = useState("");
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
  const submit = async () => {
    if (flag) {
      if (
        name &&
        email &&
        password &&
        ConfirmPassword &&
        contact_no &&
        address
      ) {
        if (password === ConfirmPassword) {
          if (email.includes("@") && email.endsWith(".com")) {
            if (contact_no.length == 11) {
              if (validatePassword(password)) {
                let obj = {
                  name: name,
                  email: email,
                  password: password,
                  contact_no: contact_no,
                  address: address,
                };
                let result = await fetch(
                  "http://localhost:5000/user-register",
                  {
                    method: "post",
                    body: JSON.stringify(obj),
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );
                if (result) {
                  result = await result.json();
                  if (result.result === "Already Registered") {
                    alert("Already Registered");
                  } else {
                    localStorage.setItem("user", JSON.stringify(result));
                    localStorage.removeItem("seller");
                    setName("");
                    setEmail("");
                    setPassword("");
                    setConfirmPassword("");
                    setNumber("");
                    setAddress("");
                    alert("Customer Registered Successfully");
                    navigate("/");
                  }
                } else {
                  alert("Error");
                }
              } else {
                alert("Please Enter a Valid Password");
              }
            } else {
              alert("Please Enter a valid Number");
            }
          } else {
            alert("Please Enter a Valid Email");
          }
        } else {
          alert("Your Password does not match with Confirm Password");
        }
      } else {
        alert("Please Enter all the Fields");
      }
    } else {
      if (email && password) {
        let obj = { email: email, password: password };
        let result = await fetch(
          "http://localhost:5000/user-login",
          {
            method: "post",
            body: JSON.stringify(obj),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (result) {
          result = await result.json();
          if (result.result === "Not Found") {
            alert("Not Found");
          } else if (result.result === "Enter Correct Info") {
            alert("Enter Correct Info");
          } else {
            localStorage.setItem("user", JSON.stringify(result));
            localStorage.removeItem("seller");
            console.log(result);
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setNumber("");
            setAddress("");
            alert("User Logged in Successfully");
            navigate("/");
          }
        } else {
          alert("Error");
        }
        await submitLogin(email, password);
      } else {
        alert("Please Enter all the Fields");
      }
    }
  };
  return (
    <div className="row mb-5 pb-5" style={{ overflow: "hidden" }}>
      <div className="col-lg-6 col-md-12 col-sm-12 col-12 col-xs-12">
        <div className="row justify-content-center">
          <div className="col-9">
            <div className="mt-5 size">
              <div className="pt-5 mt-5">
                <h2 className="text-center">ShopRizz</h2>
                <p className="text-size  text-center">
                  Introducing ShopRizz, the ultimate destination for modern
                  online shopping enthusiasts. Seamlessly blending convenience
                  with efficiency, ShopRizz revolutionizes the way you shop by
                  offering a curated selection of products at your fingertips.
                  With a user-friendly interface and intuitive design,
                  navigating through our vast array of categories—from fashion
                  and electronics to beauty and home essentials—is a breeze. At
                  ShopRizz, we understand the importance of a seamless shopping
                  experience , which is why we've prioritized simplicity every
                  step of the way. Whether you're browsing for the latest
                  fashion trends or searching for must-have gadgets, our
                  platform ensures that every click brings you closer to finding
                  exactly what you're looking for.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6 col-xl-6 col-md-12 col-xs-12 col-sm-12 col-12">
        <div className="row mt-4 pt-4 justify-content-center">
          <div className="col-10">
            <div className={classes}>
              <div className="mt-0 pt-0">
                <div className="h3 text-center mb-4 ">{titleData}</div>
                {flag && (
                  <div className="mt-2 mb-2">
                    <label htmlFor="" className="h6 ">
                      Enter Name
                    </label>
                    <input
                      className="form-control"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      type="text"
                      placeholder="Name"
                    />
                  </div>
                )}
                <label htmlFor="" className="h6 ">
                  Enter Email
                </label>
                <input
                  className="form-control"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="text"
                  placeholder="@gmail.com"
                />
              </div>
              <div className="mt-2">
                <label htmlFor="" className="h6 ">
                  Enter Password
                </label>
                <input
                  className="form-control"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type="password"
                  placeholder="Password"
                />
              </div>
              {flag && (
                <div className="mt-2">
                  <label htmlFor="" className="h6 ">
                    Confirm Password
                  </label>
                  <input
                    className="form-control"
                    value={ConfirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                    type="password"
                    placeholder="Confirm Password"
                  />
                </div>
              )}
              {flag && (
                <div className="mt-2">
                  <label htmlFor="" className="h6 ">
                    Contact Number
                  </label>
                  <input
                    className="form-control"
                    value={contact_no}
                    onChange={(e) => {
                      setNumber(e.target.value);
                    }}
                    type="text"
                    placeholder="Contact Number"
                  />
                </div>
              )}
              {flag && (
                <div className="mt-2">
                  <label htmlFor="" className="h6 ">
                    Address
                  </label>
                  <input
                    className="form-control"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                    type="text"
                    placeholder="Address"
                  />
                </div>
              )}
              <div className="mt-2 text-center">
                <button
                  style={{ border: "none" }}
                  onClick={submit}
                  className="p-2 rounded text-white bgGreen"
                >
                  {btnData}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enter;
