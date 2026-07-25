import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";


import './Login.css'
export default function Login() {

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    function handleChange(e) {
        const { name, value } = e.target
        setLoginData((prev) => ({ ...prev, [name]: value }))
    }

    const [password, showPassword] = useState(false)
    function handlePassword() {
        showPassword(!password)
    }

    function handleLogin(e) {
        e.preventDefault()
        axios.post('http://localhost:3001/mpcrackers/login', loginData)
            .then(res => {
                alert(res.data.message)
                // Login session save
                localStorage.setItem("admin", "true");

                // Redirect to admin page
                navigate("/admin");
            })
            .catch((err) => {
                alert(err.response?.data?.message || "Login Failed");
            });
    }

    const navigate = useNavigate();


    return (
        <div className='login-main-container'>
            <div className='login-form-container'>
                <h1>ADMIN LOGIN</h1>
                <form className='login-form' onSubmit={handleLogin}>

                    <div className='email-field'>
                        <div className='email-icon'>
                            <i className="fa-solid fa-envelope"></i>
                        </div>
                        <input type='email' placeholder='Email' name='email' value={loginData.email} onChange={handleChange} className='email-input' required />
                    </div>

                    <div className='password-field'>
                        <div className='password-icon'>
                            <i className="fa-solid fa-key"></i>
                        </div>
                        <input type={password ? 'text' : 'password'} placeholder='Password' name='password' value={loginData.password} onChange={handleChange} className='password-input' required />
                    </div>
                    <button type='button' className='password-show-btn' onClick={handlePassword}>{password ? 'Hide Password' : 'Show Password'}</button>

                    <button className='login-btn' type='submit'><i className="fa-solid fa-right-to-bracket"></i> Login</button>

                </form>
            </div>
        </div>
    )
}
