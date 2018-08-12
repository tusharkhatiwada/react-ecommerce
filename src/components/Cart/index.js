import React, { Component } from "react";
import { navigate } from "@reach/router";

export default class Cart extends Component {
    state = {
        quantity: 1,
        newItems: [],
        total: 0
    };
    componentDidMount() {
        const cartItems = JSON.parse(sessionStorage.getItem("cartItems"));
        if (cartItems) {
            const newItems = cartItems.map(item => {
                const qty = Object.assign({}, item);
                qty.quantity = 1;
                return qty;
            });
            this.setState({
                newItems
            });
            this.renderTotal(newItems);
        }
    }
    handleQuantityUpdate = (id, qty) => {
        const { newItems } = this.state;
        const index = newItems.findIndex(obj => obj.sku === id);
        newItems[index].quantity = qty;
        this.setState({
            newItems
        });
        this.renderTotal(newItems);
    };
    renderTotal = newItems => {
        if (newItems.length > 0) {
            const total = newItems.reduce((a, b) => {
                return parseFloat(a) + parseFloat(b.unit_price * b.quantity);
            }, 0);
            this.setState({
                total
            });
        }
    };
    renderTableBody = () => {
        const { newItems } = this.state;
        return newItems.map(item => {
            return (
                <tr key={item.sku}>
                    <td>
                        <div className="item d-inline-flex justify-content-center align-items-center">
                            <img src={item.image_url} alt="" style={{ width: 100, height: 100 }} />
                            <h5>{item.name}</h5>
                        </div>
                    </td>
                    <td className="align-middle">
                        <input
                            type="number"
                            className="form-control"
                            value={item.quantity}
                            onChange={event =>
                                this.handleQuantityUpdate(item.sku, event.target.value)
                            }
                        />
                    </td>
                    <td className="align-middle">{`RS. ${item.unit_price}`}</td>
                    <td className="align-middle">{`RS. ${parseFloat(item.unit_price) *
                        item.quantity}`}</td>
                </tr>
            );
        });
    };
    render() {
        const { total } = this.state;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <h2>Cart</h2>
                        <table className="table table-bordered">
                            <thead className="bg-light">
                                <tr>
                                    <th>ITEM</th>
                                    <th style={{ width: 90 }}>QUANTITY</th>
                                    <th>UNIT PRICE</th>
                                    <th>SUBTOTAL</th>
                                </tr>
                            </thead>
                            <tbody>{this.renderTableBody()}</tbody>
                            <tfoot>
                                <tr>
                                    <td>
                                        <h2>{`TOTAL: ${total}`}</h2>
                                    </td>
                                    <td />
                                    <td />
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => navigate("checkout", { total: total })}
                                        >
                                            CHECKOUT
                                        </button>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
