import React, { useRef, useState } from 'react'


import './Cart.css'
import { useCart } from './CartContext';
import axios from 'axios';

import mainLogo from '../Components/assets/Main Logo.png';
import { useNavigate } from 'react-router-dom';
export default function Cart() {

    const { cart, addToCart, removeFromCart, clearCart } = useCart();

    console.log(cart);

    const grandTotal = cart.reduce(
        (total, item) => total + (item.sellingPrice * item.quantity),
        0
    );


    const [orderData, setOrderData] = useState({
        name: "",
        mobile: "",
        address: "",
        city: "",
        district: "",
        pincode: "",
        state: "",
        paymentId: ""
    });

    const handleChange = (e) => {

        const { name, value } = e.target;
        setOrderData((prev) => ({ ...prev, [name]: value }));
    };


    const totalItems = cart.length;

    const totalQuantity = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );


    const navigate = useNavigate();

    const handleOrder = async (e) => {

        e.preventDefault();

        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }
        else if(grandTotal < 3000){
            alert("Minimum order value is ₹3,000.");
    return;
        }

        const finalOrder = {

            ...orderData,

            items: cart.map((item) => ({
                productId: item._id,
                productName: item.productName,
                price: item.sellingPrice,
                quantity: item.quantity,
                subtotal: item.sellingPrice * item.quantity
            })),

            totalItems,
            totalQuantity,
            grandTotal

        };

        try {

            const res = await axios.post(
                "https://mpcrackers-api.onrender.com/mpcrackers/order",
                finalOrder
            );
            setOrderData({
                name: "",
                mobile: "",
                address: "",
                city: "",
                district: "",
                pincode: "",
                state: "",
                paymentId: ""
            });

            clearCart();

            navigate("/order-success", {
                state: {
                    order: res.data.order,
                    orderId: res.data.orderId
                }
            });


        }

        catch (err) {

            alert(err.response?.data?.message || "Order Failed");

        }

    };






    // Payment Integration
    const openGPay = () => {

        const upiLink = `upi://pay?pa=muruganson545@oksbi&pn=MP Crackers&am=${grandTotal}&cu=INR`;

        window.location.href = upiLink;

    };

    const openPhonePe = () => {

        const upiLink = `upi://pay?pa=muruganson545@oksbi&pn=MP Crackers&am=${grandTotal}&cu=INR`;

        window.location.href = upiLink;

    };


    const checkoutRef = useRef(null);





    const states = [
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttar Pradesh",
        "Uttarakhand",
        "West Bengal"
    ];



    return (
        <div className='cart-main-container'>
            <div className='cart-item-list-checkout-container'>

                <div className="cart-items-list-container">

                    {cart.length > 0 ?

                        (cart.map((item) => (
                            <div key={item._id} className="cart-item-container">

                                <div className="cart-item-image-container">
                                    <img src={item.productImage} className="cart-item-image" alt={item.productName || 'Product'} />
                                </div>

                                <div className="cart-item-info-container">
                                    <div className="product-top">
                                        <h2>{item.productName}</h2>

                                        <div className="price-row">
                                            <p className="cart-mrp">MRP <span>₹{item.mrpPrice}</span></p>
                                            <h3 className="cart-selling">₹{item.sellingPrice}</h3>
                                        </div>

                                    </div>

                                    <div className="product-bottom">

                                        <div className="quantity-container">
                                            <button className="qty-btn" onClick={() => removeFromCart(item._id)}>-</button>
                                            <span>{item.quantity}</span>
                                            <button className="qty-btn" onClick={() => addToCart(item)}>+</button>
                                        </div>

                                        <div className="right-side">
                                            <div className="subtotal-box">₹{item.sellingPrice * item.quantity}</div>

                                            <button className="remove-btn" onClick={() => removeFromCart(item._id, true)}>Remove</button>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))) :
                        (
                            <div className="empty-cart">

                                <img src={mainLogo} className='cart-shop-logo' alt='Logo'/>

                                <h2>Your Cart is Empty</h2>

                                <p>Add your favorite crackers to start shopping.</p>

                            </div>

                        )}

                    {cart.length > 0 &&
                        <button
                            type="button"
                            className="proceed-btn"
                            onClick={() =>
                                checkoutRef.current?.scrollIntoView({
                                    behavior: "smooth"
                                })
                            }
                        >
                            Proceed to Checkout →
                        </button>
                    }

                </div>

                <div className='cart-checkout-form-container' ref={checkoutRef}>
                    <form className="checkout-form" onSubmit={handleOrder}>

                        <h2>Customer Details</h2>

                        <input
                            type="text"
                            name="name"
                            placeholder="Enter Full Name"
                            className="checkout-input"
                            value={orderData.name}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="tel"
                            name="mobile"
                            placeholder="Enter Mobile Number"
                            className="checkout-input"
                            value={orderData.mobile}
                            onChange={handleChange}
                            required
                        />

                        <textarea
                            name="address"
                            placeholder="Enter Address"
                            className="checkout-textarea"
                            value={orderData.address}
                            onChange={handleChange}
                            required
                        ></textarea>

                        <div className="location-row">

                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                className="checkout-input"
                                value={orderData.city}
                                onChange={handleChange}
                                required
                            />

                            <input
                                type="text"
                                name="district"
                                placeholder="District"
                                className="checkout-input"
                                value={orderData.district}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="location-row">

                            <input
                                type="text"
                                name="pincode"
                                placeholder="Pincode"
                                className="checkout-input"
                                value={orderData.pincode}
                                onChange={handleChange}
                                required
                            />

                            <select className='checkout-input' value={orderData.state} name='state' onChange={handleChange} required>
                                <option value="">Select State</option>
                                {states.map((state) =>
                                    <option key={state} value={state}>{state}</option>
                                )}
                            </select>

                        </div>



                        <h2>Order Summary</h2>

                        <div className="summary-row">
                            <span>Total Items</span>
                            <span>{cart.length}</span>
                        </div>

                        <div className="summary-row">
                            <span>Total Quantity</span>
                            <span>{totalQuantity}</span>
                        </div>

                        <div className="summary-row grand-total">
                            <span>Grand Total</span>
                            <span>₹{grandTotal}</span>
                        </div>

                        <h2>Payment Method</h2>

                        <div className="payment-method">

                            <button
                                type="button"
                                className={`payment-btn ${orderData.paymentMode === "gpay" ? "active" : ""}`}
                                onClick={() => {
                                    setOrderData({
                                        ...orderData,
                                        paymentMode: "gpay"
                                    });
                                    openGPay();
                                }}
                            >
                                <i className="fa-brands fa-google-pay"></i>
                            </button>

                            <button
                                type="button"
                                className={`payment-btn ${orderData.paymentMode === "phonepe" ? "active" : ""}`}
                                onClick={() => {
                                    setOrderData({
                                        ...orderData,
                                        paymentMode: "phonepe"
                                    });
                                    openPhonePe();
                                }}
                            >
                                PhonePe
                            </button>

                        </div>

                        <input
                            type="text"
                            name="paymentId"
                            placeholder="Enter Transaction ID"
                            className="checkout-input"
                            value={orderData.paymentId}
                            onChange={handleChange}
                            required
                        />

                        <button
                            type="button"
                            className="whatsapp-btn"
                            onClick={() => window.open("https://wa.me/916374007066", "_blank")}
                        >
                            <i className="fa-brands fa-whatsapp"></i> Send Payment Screenshot via WhatsApp
                        </button>

                        <button
                            type="submit"
                            className="place-order-btn"
                        >
                            Place Order
                        </button>

                    </form>
                </div>

            </div>
        </div>
    )
}
