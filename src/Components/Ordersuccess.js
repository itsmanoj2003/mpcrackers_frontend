import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "./Ordersuccess.css";
import generateInvoice from "../Components/Bill";

export default function Ordersuccess() {

    const { state } = useLocation();
    const navigate = useNavigate();

    const order = state?.order;
    const orderId = state?.orderId;

    if (!order) {
        return (
            <div className="order-success-page">

                <div className="order-success-card">

                    <h2>No Order Found</h2>

                    <button
                        className="shop-btn"
                        onClick={() => navigate("/")}
                    >
                        <i className="fa-solid fa-backward"></i> Continue Shopping
                    </button>

                </div>

            </div>
        );
    }

    return (

        <div className="order-success-page">

            <div className="order-success-card">

                <div className="success-header">

                    <div className="success-icon">
                        <i class="fa-solid fa-circle-check"></i>
                    </div>
                    <h3 className="order-success-heading">Order Placed Successfully</h3>

                </div>

                <div className="order-success-footer">
                    <p>Order ID : {orderId}</p>
                    <p>Name : {order.name}</p>
                    <p>Mobile : {order.mobile}</p>
                    <p>Total Amount : {order.grandTotal}</p>
                    <h3>Thank you for shopping with MP Crackers.</h3>
                    <div className="order-success-btn-container">
                        <button onClick={() => generateInvoice(order, orderId)}><i className="fa-solid fa-download"></i> Download Invoice</button>
                        <button onClick={()=>navigate('/')}><i className="fa-solid fa-backward"></i> Continue Shopping</button>
                    </div>
                </div>


            </div>

        </div>


    );
}