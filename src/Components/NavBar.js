import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Navbar, Nav, NavDropdown, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../App.css";
const NavbarComponent = () => {
  const search = () => {};
  return (
    <header className="App-header m-0 p-0 positionStick">
      <Navbar
        className="navbar-color row justify-content-center m-0 "
        collapseOnSelect
        expand="lg"
      >
        <div className="col-10 m-0 p-1">
          <div className="row">
            <div className="col-2">
              <Link to="/">
                <img
                  src="../images/logo1png.png"
                  width="80px"
                  className="img-fluid"
                  alt="vgg"
                />
              </Link>
            </div>
            <div className="col-lg-6 col-xl-6 col-md-6 col-sm7 col-7 col-xs-7">
              <div
                className="input-group mt-md-3"
                style={{
                  border: "1px solid white",
                  borderRadius: "10px 4px 4px 10px",
                }}
              >
                <input
                  style={{ textDecoration: "none", border: "none" }}
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-success" type="button">
                  <i className="text-white fa fa-search"></i>{" "}
                  {/* Bootstrap Icons search icon */}
                </button>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-4 col-sm-3 col-3 justify-content-end"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div className="fs-5 justify-content-end">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse
                  id="responsive-navbar-nav"
                  className=" m-0 p-0"
                >
                  <Nav className="mt-1 p-0">
                    {localStorage.getItem("user") && (
                      <Link to="/cart">
                        <div className="m-2">
                          <i className="color-white fas fa-shopping-cart"></i>
                        </div>
                      </Link>
                    )}
                  </Nav>
                  <Nav>
                    <div className="ms-3  mt-1">
                      {localStorage.getItem("seller") && (
                        <Link
                          style={{ textDecoration: "none" }}
                          to="/show-seller"
                          className="fs-6 color-white"
                        >
                          Become a seller
                        </Link>
                      )}
                      {!localStorage.getItem("seller") && (
                        <Link
                          style={{ textDecoration: "none" }}
                          to="/seller-register"
                          className="fs-6 color-white"
                        >
                          Become a seller
                        </Link>
                      )}
                    </div>
                  </Nav>

                  <Nav className="mt-1 p-0">
                    <div className="ms-3">
                      <Link
                        style={{ textDecoration: "none" }}
                        to="/login"
                        className="fs-6 color-white"
                      >
                        Login
                      </Link>
                    </div>
                    <div className="ms-3">
                      <Link
                        style={{ textDecoration: "none" }}
                        to="/signup"
                        className="fs-6  color-white"
                      >
                        Register
                      </Link>
                    </div>
                    <div className="ms-3">
                      <Link
                        style={{ textDecoration: "none" }}
                        to="/logout"
                        className="fs-6  color-white"
                      >
                        Logout
                      </Link>
                    </div>
                  </Nav>
                </Navbar.Collapse>
              </div>
            </div>
          </div>
        </div>
      </Navbar>
    </header>
  );
};
export default NavbarComponent;
