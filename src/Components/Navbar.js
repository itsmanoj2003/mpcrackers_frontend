import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
// import { useContext } from "react";
import { useCart } from "../Components/CartContext";

import mainLogo from '../Components/assets/Main Logo.png';

export default function Navbar() {

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {

        const handleScroll = () => {
            setScrolled(window.scrollY > 100);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };

    }, []);


    const [popup, setPopup] = useState(false)
    function handlePopup() {
        setPopup(!popup)
    }



    // Outside Click
    const menuRef = useRef(null);
    useEffect(() => {
        const handleScroll = () => {
            if (popup) {
                setPopup(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [popup]);



    const navigate = useNavigate()
    function handleCart() {
        navigate('/cart')
    }


    const { cart } = useCart();

    return (

        <>
            <div className={`nav-main-container ${scrolled ? 'scrolled' : ''}`}>

                <div className='nav-image-container'>
                    <img src={mainLogo} className='logo-image' alt='Logo' />
                </div>

                <div className='nav-links-container'>

                    <NavLink
                        to='/'
                        className={`pc-links ${scrolled ? 'scrolled-text' : ''}`}
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to='/crackers'
                        className={`pc-links ${scrolled ? 'scrolled-text' : ''}`}
                    >
                        Crackers
                    </NavLink>

                    <NavLink
                        to='/about'
                        className={`pc-links ${scrolled ? 'scrolled-text' : ''}`}
                    >
                        About
                    </NavLink>

                    <NavLink
                        to='/contact'
                        className={`pc-links ${scrolled ? 'scrolled-text' : ''}`}
                    >
                        Contact
                    </NavLink>

                    <div className='cart-btn-container'>
                        <button className='cart-btn' onClick={handleCart}>
                            <i className="fa-solid fa-cart-shopping cart-icon"></i>
                        </button>

                        <span className="cart-count">{cart.length}</span>
                    </div>

                </div>

            </div>



            {/* Mobile Navbar */}

            <div className='mobile-nav-container'>
                <div className='mobile-logo-container'>
                    <img src={mainLogo} className='mobile-nav-logo-img'  alt='Logo'/>
                </div>

                <div className='mobile-btn-container'>
                    <button className='mobile-cart-btn' onClick={handleCart}><i className="fa-solid fa-cart-shopping mobile-cart-icon"></i></button>
                    <button className='mobile-menu-btn' onClick={handlePopup}><i className="fa-solid fa-ellipsis mobile-menu-icon"></i></button>
                </div>
            </div>





            {popup && (
                <div className='mobile-menu-links-container' ref={menuRef}>
                    <div className='mobile-menu-icons-container'>
                        <i className="fa-solid fa-house mobile-menu-link-icon"></i>

                        <i className="fa-solid fa-bomb mobile-menu-link-icon"></i>

                        <i className="fa-solid fa-store mobile-menu-link-icon"></i>

                        <i className="fa-solid fa-phone mobile-menu-link-icon"></i>
                    </div>

                    <div className='mobile-links-container'>
                        <NavLink to="/" className="mobile-links" onClick={() => setPopup(false)}>Home</NavLink>

                        <NavLink to="/crackers" className="mobile-links" onClick={() => setPopup(false)}>Crackers</NavLink>

                        <NavLink to="/about" className="mobile-links" onClick={() => setPopup(false)}>About</NavLink>

                        <NavLink to="/contact" className="mobile-links" onClick={() => setPopup(false)}>Contact</NavLink>
                    </div>
                </div>
            )}

        </>
    );
}