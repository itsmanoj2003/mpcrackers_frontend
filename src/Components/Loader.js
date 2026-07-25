import React from 'react'

import './Loader.css'
import logo from '../Components/assets/Main Logo.png'
export default function Loader() {
  return (
    <div className="loader-main-container">
        <div className="loader-wrapper">
            <div className="loader-ring"></div>

            <img
                src={logo}
                alt="Logo"
                className="loader-logo"
            />
        </div>

        <p className="loading-text">Loading...</p>
    </div>
  )
}
