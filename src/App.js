import React, { Component } from "react";
import { Router, navigate } from "@reach/router";
import "./css/App.css";

import Login from "./components/Login";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Navbar from "./navbar";

const email = sessionStorage.getItem("customerEmail");
if (!email) {
    navigate("/login");
}

const App = () => {
    return (
        <Router>
            <Login path="login" />
            <Navbar path="/">
                <Products path="products" />
                <Cart path="cart" />
                <Checkout path="checkout" />
            </Navbar>
        </Router>
    );
};

export default App;
