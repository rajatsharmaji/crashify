import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";

// Pages
import HomePage from "./Pages/Home";
import LoginPage from "./Pages/Login";
import RegisterPage from "./Pages/Register";
import AboutPage from "./Pages/About";
import CartPage from "./Pages/Cart";
import NoMatchPage from "./Pages/404";
import RegisterVendorPage from "./Pages/RegisterVendor";
import LoginVendorPage from "./Pages/LoginVendor";
import OrdersPage from "./Pages/Orders";

function App() {
  // Check if the user is logged in by looking at sessionStorage
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";

  // Set the initial user data if logged in
  const initialUserData = isLoggedIn
    ? {
        username: sessionStorage.getItem("username"),
        usertype: sessionStorage.getItem("usertype"),
      }
    : null;

  return (
    <Router>
      <>
        <NavigationBar isLoggedIn={isLoggedIn} userData={initialUserData} />
        <Routes>
          <Route
            path="/"
            element={<HomePage isLoggedIn={isLoggedIn} userData={initialUserData} />}
          />
          <Route path="/cart" element={<CartPage isLoggedIn={isLoggedIn} userData={initialUserData} />} />
          <Route
            path="/login"
            element={<LoginPage isLoggedIn={isLoggedIn} userData={initialUserData} />}
          />
          <Route
            path="/loginvendor"
            element={<LoginVendorPage isLoggedIn={isLoggedIn} userData={initialUserData} />}
          />
          <Route
            path="/register"
            element={<RegisterPage isLoggedIn={isLoggedIn} userData={initialUserData} />}
          />
          <Route
            path="/registervendor"
            element={<RegisterVendorPage isLoggedIn={isLoggedIn} userData={initialUserData} />}
          />
          <Route path="/about" element={<AboutPage isLoggedIn={isLoggedIn} userData={initialUserData} />} />
          <Route path="/orders" element={<OrdersPage isLoggedIn={isLoggedIn} userData={initialUserData} />} />
          <Route path="/404" element={<NoMatchPage />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
