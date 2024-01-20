import React from "react";
import { Nav, Navbar, Button } from "react-bootstrap";
import "../index.css";
import "./NavigationBar.css";

const NavigationBar = () => {
  const usertype = sessionStorage.getItem("usertype");

  const handleLogout = () => {
    // Handle the logout logic here, e.g., clear sessionStorage and navigate to the login page.
    sessionStorage.clear();
    window.location.href = "/login"; // You can use your navigation method here.
  };

  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Navbar.Brand href="/">Crashify</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/about">About Us</Nav.Link>
          {usertype === "VENDOR" && <Nav.Link href="/orders">Orders</Nav.Link>}
          <Nav.Link href="/#myServicesRow">Our Services</Nav.Link>
          {usertype ? (
            <div className="d-flex align-items-center"> {/* Use d-flex and align-items-center */}
              <Button variant="outline-primary" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <Nav.Link href="/login">Login</Nav.Link>
          )}
          {usertype !== "VENDOR" && (
            <Nav.Link href="/cart">Cart</Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
