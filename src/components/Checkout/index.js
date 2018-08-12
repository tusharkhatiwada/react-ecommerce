import React, { Component } from "react";
import axios from "axios";

export default class Checkout extends Component {
    state = {
        billing_name: "",
        shipping_name: "",
        billing_company: "",
        shipping_company: "",
        billing_street1: "",
        shipping_street1: "",
        billing_street2: "",
        shipping_street2: "",
        billing_street3: "",
        shipping_street3: "",
        billing_city: "",
        shipping_city: "",
        billing_state: "",
        shipping_state: "",
        billing_postal_code: "",
        shipping_postal_code: "",
        billing_country: "",
        shipping_country: "",
        billing_phone: "",
        shipping_phone: "",
        billing_residential: false,
        shipping_residential: false,
        billing_address_verified: false,
        shipping_address_verified: false,
        isBillingShippingSame: true,
        total: 0
    };
    componentDidMount() {
        const total = this.props.location.state.total;
        const taxAmount = 0.13 * total;
        const shipping = 100;
        const customerName = sessionStorage.getItem("customerEmail");
        const items = sessionStorage.getItem("cartItems");
        this.setState({
            order_total: total,
            amount_paid: total + taxAmount + shipping,
            tax_amount: taxAmount,
            shipping_amount: shipping,
            customer_username: customerName,
            customer_email: customerName,
            order_date: new Date(),
            order_number: Math.floor(Math.random() * 100000 + 1),
            order_status: "on_hold",
            customer_id: "",
            customer_notes: "Thanks for ordering!",
            internal_notes: "test",
            gift: true,
            gift_message: "Thank you!",
            payment_method: "Credit Card",
            shipping_service: "Priority Mail",
            carrier_code: "fedex",
            service_code: "fedex_2day",
            package_code: "package",
            confirmation: "delivery",
            ship_date: new Date(),
            hold_until_date: "",
            items
        });
    }
    handleBillingInputChange = event => {
        const { type, name, value, checked } = event.target;
        if (type === "checkbox") {
            this.setState({
                [name]: checked
            });
        } else {
            this.setState({
                [name]: value
            });
        }
    };
    handleShippingInputChange = event => {
        const { type, name, value, checked } = event.target;
        if (type === "checkbox") {
            this.setState({
                [name]: checked
            });
        } else {
            this.setState({
                [name]: value
            });
        }
    };
    handleSubmit = () => {
        const {
            billing_name,
            shipping_name,
            billing_company,
            shipping_company,
            billing_street1,
            shipping_street1,
            billing_street2,
            shipping_street2,
            billing_street3,
            shipping_street3,
            billing_city,
            shipping_city,
            billing_state,
            shipping_state,
            billing_postal_code,
            shipping_postal_code,
            billing_country,
            shipping_country,
            billing_phone,
            shipping_phone,
            billing_residential,
            shipping_residential,
            billing_address_verified,
            shipping_address_verified,
            isBillingShippingSame,
            total,
            order_total,
            amount_paid,
            tax_amount,
            shipping_amount,
            customer_username,
            customer_email,
            order_date,
            order_number,
            order_status,
            customer_id,
            customer_notes,
            internal_notes,
            gift,
            gift_message,
            payment_method,
            shipping_service,
            carrier_code,
            service_code,
            package_code,
            confirmation,
            ship_date,
            hold_until_date,
            items
        } = this.state;
        if (isBillingShippingSame) {
            this.setState({
                shipping_name: billing_name,
                shipping_company: billing_company,
                shipping_street1: billing_street1,
                shipping_street2: billing_street2,
                shipping_street3: billing_street3,
                shipping_city: billing_city,
                shipping_state: billing_state,
                shipping_postal_code: billing_postal_code,
                shipping_country: billing_country,
                shipping_phone: billing_phone,
                shipping_residential: billing_residential,
                shipping_address_verified: billing_address_verified
            });
        }
        axios
            .post(`http://colorstoweb.com/shipstationClone/public/orders/createorder`, {
                order_total,
                amount_paid,
                tax_amount,
                shipping_amount,
                customer_username,
                customer_email,
                order_date,
                order_number,
                order_status,
                customer_id,
                customer_notes,
                internal_notes,
                gift,
                gift_message,
                payment_method,
                shipping_service,
                carrier_code,
                service_code,
                package_code,
                confirmation,
                ship_date,
                hold_until_date,
                billing_address: {
                    name: billing_name,
                    company: billing_company,
                    street1: billing_street1,
                    street2: billing_street2,
                    street3: billing_street3,
                    city: billing_city,
                    state: billing_state,
                    postal_code: billing_postal_code,
                    country: billing_country,
                    phone: billing_phone,
                    residential: billing_residential,
                    address_verified: billing_address_verified
                },
                shipping_address: {
                    name: shipping_name,
                    company: shipping_company,
                    street1: shipping_street1,
                    street2: shipping_street2,
                    street3: shipping_street3,
                    city: shipping_city,
                    state: shipping_state,
                    postal_code: shipping_postal_code,
                    country: shipping_country,
                    phone: shipping_phone,
                    residential: shipping_residential,
                    address_verified: shipping_address_verified
                },
                items
            })
            .then(response => {
                const res = response.data;
                console.log("Res: ", res);
            })
            .catch(err => {
                console.log("Error ordering: ", err);
            });
    };
    renderBillingForm = () => {
        const {
            billing_name,
            billing_company,
            billing_street1,
            billing_street2,
            billing_street3,
            billing_city,
            billing_state,
            billing_postal_code,
            billing_country,
            billing_phone,
            billing_residential,
            billing_address_verified,
            isBillingShippingSame
        } = this.state;
        return (
            <div className="card" style={{ width: "30rem" }}>
                <h3 className="card-header">Billing Address</h3>
                <div className="card-body">
                    <form>
                        <div className="form_group">
                            <label htmlFor="">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="billing_name"
                                value={billing_name}
                                onChange={this.handleBillingInputChange}
                            />
                        </div>
                        <div className="form_group">
                            <label htmlFor="">Company</label>
                            <input
                                type="text"
                                className="form-control"
                                name="billing_company"
                                value={billing_company}
                                onChange={this.handleBillingInputChange}
                            />
                        </div>
                        <div className="form_group">
                            <label htmlFor="">Street 1</label>
                            <input
                                type="text"
                                className="form-control"
                                name="billing_street1"
                                value={billing_street1}
                                onChange={this.handleBillingInputChange}
                            />
                        </div>
                        <div className="form_group">
                            <label htmlFor="">Street 2</label>
                            <input
                                type="text"
                                className="form-control"
                                name="billing_street2"
                                value={billing_street2}
                                onChange={this.handleBillingInputChange}
                            />
                        </div>
                        <div className="form_group">
                            <label htmlFor="">Street 3</label>
                            <input
                                type="text"
                                className="form-control"
                                name="billing_street3"
                                value={billing_street3}
                                onChange={this.handleBillingInputChange}
                            />
                        </div>
                        <div className="form_group">
                            <label htmlFor="">City</label>
                            <input
                                type="text"
                                className="form-control"
                                name="billing_city"
                                value={billing_city}
                                onChange={this.handleBillingInputChange}
                            />
                        </div>
                        <div className="form_group">
                            <label htmlFor="">State</label>
                            <input
                                type="text"
                                className="form-control"
                                name="billing_state"
                                value={billing_state}
                                onChange={this.handleBillingInputChange}
                            />
                        </div>
                        <div className="form_group">
                            <label htmlFor="">Postal Code</label>
                            <input
                                type="text"
                                className="form-control"
                                name="billing_postal_code"
                                value={billing_postal_code}
                                onChange={this.handleBillingInputChange}
                            />
                        </div>
                        <div className="form_group">
                            <label htmlFor="">Country</label>
                            <input
                                type="text"
                                className="form-control"
                                name="billing_country"
                                value={billing_country}
                                onChange={this.handleBillingInputChange}
                            />
                        </div>
                        <div className="form_group">
                            <label htmlFor="">Phone</label>
                            <input
                                type="text"
                                className="form-control"
                                name="billing_phone"
                                value={billing_phone}
                                onChange={this.handleBillingInputChange}
                            />
                        </div>
                        <div className="form_check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                name="billing_residential"
                                checked={billing_residential}
                                onChange={this.handleBillingInputChange}
                            />
                            <label className="form-check-label" htmlFor="">
                                Residential
                            </label>
                        </div>
                        <div className="form_check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                name="billing_address_verified"
                                checked={billing_address_verified}
                                onChange={this.handleBillingInputChange}
                            />
                            <label className="form-check-label" htmlFor="">
                                Address Verified
                            </label>
                        </div>
                        <div className="form_check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                name="isBillingShippingSame"
                                checked={isBillingShippingSame}
                                onChange={this.handleBillingInputChange}
                            />
                            <label className="form-check-label" htmlFor="">
                                Shipping Address same as Billing Address?
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        );
    };
    renderShippingAddress = () => {
        const {
            shipping_name,
            shipping_company,
            shipping_street1,
            shipping_street2,
            shipping_street3,
            shipping_city,
            shipping_state,
            shipping_postal_code,
            shipping_country,
            shipping_phone,
            shipping_residential,
            shipping_address_verified
        } = this.state;
        return (
            <div className="card" style={{ width: "30rem" }}>
                <h3 className="card-header">Shipping Address</h3>
                <div className="card-body">
                    <form>
                        <div className="form_group">
                            <label htmlFor="">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="shipping_name"
                                value={shipping_name}
                                onChange={this.handleShippingInputChange}
                            />
                        </div>
                        <div className="form_group">
                            <label htmlFor="">Company</label>
                            <input
                                type="text"
                                className="form-control"
                                name="shipping_company"
                                value={shipping_company}
                                onChange={this.handleShippingInputChange}
                            />
                        </div>
                        <div className="form_group">
                            <label htmlFor="">Street 1</label>
                            <input
                                type="text"
                                className="form-control"
                                name="shipping_street1"
                                value={shipping_street1}
                                onChange={this.handleShippingInputChange}
                            />
                        </div>
                        <div className="form_group">
                            <label htmlFor="">Street 2</label>
                            <input
                                type="text"
                                className="form-control"
                                name="shipping_street2"
                                value={shipping_street2}
                                onChange={this.handleShippingInputChange}
                            />
                        </div>
                        <div className="form_group">
                            <label htmlFor="">Street 3</label>
                            <input
                                type="text"
                                className="form-control"
                                name="shipping_street3"
                                value={shipping_street3}
                                onChange={this.handleShippingInputChange}
                            />
                        </div>
                        <div className="form_group">
                            <label htmlFor="">City</label>
                            <input
                                type="text"
                                className="form-control"
                                name="shipping_city"
                                value={shipping_city}
                                onChange={this.handleShippingInputChange}
                            />
                        </div>
                        <div className="form_group">
                            <label htmlFor="">State</label>
                            <input
                                type="text"
                                className="form-control"
                                name="shipping_state"
                                value={shipping_state}
                                onChange={this.handleShippingInputChange}
                            />
                        </div>
                        <div className="form_group">
                            <label htmlFor="">Postal Code</label>
                            <input
                                type="text"
                                className="form-control"
                                name="shipping_postal_code"
                                value={shipping_postal_code}
                                onChange={this.handleShippingInputChange}
                            />
                        </div>
                        <div className="form_group">
                            <label htmlFor="">Country</label>
                            <input
                                type="text"
                                className="form-control"
                                name="shipping_country"
                                value={shipping_country}
                                onChange={this.handleShippingInputChange}
                            />
                        </div>
                        <div className="form_group">
                            <label htmlFor="">Phone</label>
                            <input
                                type="text"
                                className="form-control"
                                name="shipping_phone"
                                value={shipping_phone}
                                onChange={this.handleShippingInputChange}
                            />
                        </div>
                        <div className="form_check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                name="shipping_residential"
                                checked={shipping_residential}
                                onChange={this.handleShippingInputChange}
                            />
                            <label className="form-check-label" htmlFor="">
                                Residential
                            </label>
                        </div>
                        <div className="form_check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                name="shipping_address_verified"
                                checked={shipping_address_verified}
                                onChange={this.handleShippingInputChange}
                            />
                            <label className="form-check-label" htmlFor="">
                                Address Verified
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        );
    };
    render() {
        const { isBillingShippingSame } = this.state;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <h2>Checkout</h2>
                        <div className="row">
                            <div className="col-6">{this.renderBillingForm()}</div>
                            <div className="col-6">
                                {!isBillingShippingSame && this.renderShippingAddress()}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <button className="btn btn-primary" onClick={this.handleSubmit}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
