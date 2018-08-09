import React, { Component } from "react";

import { products } from "./products";

import "./styles.css";

export default class Products extends Component {
    handleAddToCart = product => {
        let ci = sessionStorage.getItem("cartItems");
        let cartItems = JSON.parse(ci);
        console.log("Cart Items: ", cartItems);
        if (cartItems) {
            cartItems.push(product);
            sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
        } else {
            sessionStorage.setItem("cartItems", JSON.stringify([product]));
        }
    };
    renderProducts = () => {
        return products.map(product => {
            return (
                <div key={product.sku} className="card product">
                    <img src={product.image_url} alt="" className="card-img-top productImage" />
                    <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">{product.description}</p>
                    </div>
                    <div className="card-footer d-inline-flex justify-content-between align-items-center">
                        <h5 className="card-title">{`RS. ${product.unit_price}`}</h5>
                        <button
                            className="btn btn-info"
                            onClick={() => this.handleAddToCart(product)}
                        >
                            Add to cart
                        </button>
                    </div>
                </div>
            );
        });
    };
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <h2>Products</h2>
                        <div className="productContainer">{this.renderProducts()}</div>
                    </div>
                </div>
            </div>
        );
    }
}
