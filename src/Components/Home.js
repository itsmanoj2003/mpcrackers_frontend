import React, { useEffect, useRef, useState } from 'react';
import { Fireworks } from 'fireworks-js';

import './Home.css';
import { useNavigate } from 'react-router-dom';
import hands from '../Components/assets/hands.png'

export default function Home() {

  const fireworksRef = useRef(null);

  // ================= DIWALI COUNTDOWN =================
  const diwaliDate = new Date("2026-11-08T00:00:00").getTime();

  const getTimeLeft = () => {
    const now = new Date().getTime();
    const distance = diwaliDate - now;

    if (distance <= 0) return null;

    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000),
    };
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  // ================= FIREWORKS =================
useEffect(() => {

  if (!fireworksRef.current) return;

  const isMobile = window.innerWidth <= 768;

  const options = {
    hue: { min: 0, max: 360 },

    delay: isMobile
      ? { min: 40, max: 70 }
      : { min: 15, max: 30 },

    speed: isMobile ? 1.5 : 2,

    acceleration: 1.02,
    friction: 0.96,
    gravity: 1.2,

    particles: isMobile ? 30 : 80,

    trace: isMobile ? 1 : 3,

    explosion: isMobile ? 3 : 5,

    autoresize: true,

    brightness: { min: 50, max: 80 },

    decay: isMobile
      ? { min: 0.03, max: 0.05 }
      : { min: 0.015, max: 0.03 },

    boundaries: {
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    },

    sound: {
      enabled: false,
    },
  };

  const fireworks = new Fireworks(fireworksRef.current, options);

  fireworks.start();

  return () => {
    fireworks.stop();
  };

}, []);

  // ================= BUTTON =================
  const navigate = useNavigate();

  function handleClick() {
    navigate('/crackers');
  }

  return (
    <>

      {/* Fireworks */}
      <div ref={fireworksRef} className="fireworks-layer"></div>

      {/* Main */}
      <div className="crackers-container">

        <div className="crackers-titles-container">

          <div className="crackers-left-container">

            {timeLeft ? (

              <div className="countdown-card">

                <div className="time-box">
                  <h2>{timeLeft.days}</h2>
                  <span>Days</span>
                </div>

                <div className="time-box">
                  <h2>{timeLeft.hours}</h2>
                  <span>Hours</span>
                </div>

                <div className="time-box">
                  <h2>{timeLeft.minutes}</h2>
                  <span>Minutes</span>
                </div>

                <div className="time-box">
                  <h2>{timeLeft.seconds}</h2>
                  <span>Seconds</span>
                </div>

              </div>

            ) : (

              <h1 className="wishes"> Happy Diwali! </h1>

            )}

            <p className="wishing-quotes">
              Celebrate the festival of lights with joy, love, and laughter.
            </p>

            <button
              className="crackers-order-btn"
              onClick={handleClick}
            >
              Order Now
            </button>

          </div>

        </div>

        <div className="caption-msg-container">
          <h3>Orders Starting From ₹3,000</h3>
        </div>

      </div>

      <div className='home-second-container'>

        <h1 className='features-title'>Our Features</h1>

      <div className='home-special-features'>
            <div className='feature'>
              <i className="fa-solid fa-bomb feature-icon"></i>
              <p className='features-para'>200+ Varieties</p>
            </div>
            <div className='feature'>
              <i class="fa-solid fa-tag feature-icon"></i>
              <p className='features-para'>Upto 80% Discount</p>
            </div>
            <div className='feature'>
              <i class="fa-regular fa-money-bill-1 feature-icon"></i>
              <p className='features-para'>Fast & Secure Payments</p>
            </div>
            <div className='feature'>
              <i class="fa-solid fa-truck-fast feature-icon"></i>
              <p className='features-para'>Free Shipping All Over India</p>
            </div>
      </div>

      <div className='welcome-msg-container'>
        <img src={hands} className='hands-image'/>
        <div className='welcome-msg'>
            <h2 className='welcome-title'>Celebrate This Diwali With Us</h2>
            <p className='welcome-para'>May your home be filled with happiness, prosperity, and countless moments of joy. Join us in celebrating the Festival of Lights with premium fireworks, exciting offers, and unforgettable memories. Let's light up the sky together! ✨</p>
        </div>
      </div>
      
      <footer>
            <p>&copy; 2026 MP Crackers. All Rights Reserved.</p>
      </footer>

      </div>

    </>
  );
}