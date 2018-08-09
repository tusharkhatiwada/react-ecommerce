import React, { Component } from "react";
import { Link } from "@reach/router";
import { navigate } from "@reach/router";

export default class Navbar extends Component {
    componentDidMount() {}
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <nav className="navbar navbar-expand-lg navbar-dark bg-info">
                            <Link className="navbar-brand" to="products">
                                Ecommerce
                            </Link>
                            <button
                                className="navbar-toggler"
                                type="button"
                                data-toggle="collapse"
                                data-target="#navbarNav"
                                aria-controls="navbarNav"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <span className="navbar-toggler-icon" />
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item active">
                                        <Link className="nav-link" to="products">
                                            Products
                                        </Link>
                                    </li>
                                </ul>
                                <button
                                    type="button"
                                    className="btn btn-outline-light"
                                    onClick={() => navigate("/cart")}
                                >
                                    Cart <span className="badge-badge-light">0</span>
                                </button>
                            </div>
                        </nav>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">{this.props.children}</div>
                </div>
            </div>
        );
    }
}
