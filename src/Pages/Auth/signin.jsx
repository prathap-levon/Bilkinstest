import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../Assets/Img/logos/bilkins-logo.png";
import Instance from '../../AxiosConfig';
import { showErrorAlert } from '../../globalConstant';

export const SignIn = () => {
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleFieldChange = (e) => {
        try {
            setFormData((prevData) => ({
                ...prevData,
                [e.target.name]: e.target.value
            }))
        } catch (error) {
            console.error(error);
        }
    }

    const handleFormSubmit = async () => {
        try {
            if (!formData?.email || formData?.email?.trim() === '') {
                showErrorAlert('Email required');
                return;
            } else if (!emailRegex.test(formData?.email)) {
                showErrorAlert("Please enter valid email");
                return;
            }

            if (!formData?.password || formData?.password?.trim() === '') {
                showErrorAlert('Password required');
                return;
            }

            const response = await Instance.post('/website-login', formData, {});
            if (response.status === 200) {
                const data = response.data.responseData;
                let stringData = JSON.stringify(data);
                localStorage.setItem('token', data.token);
                localStorage.setItem('loggedInUserInfo', stringData);
                navigate('/');
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
            showErrorAlert(error?.response?.data?.message || 'An error occured');
        }
    }

    return (
        <div>
            <form className="signup-form">
                <Link className="signin-navbar-brand d-flex justify-content-center  my-4" to="/">
                    <img src={logo} alt="logo" />
                </Link>

                <div className="name my-2">
                    <label class="form-label" >Email address*</label>
                    <input
                        type="email"
                        required
                        className="mb-2"
                        value={formData?.email || ""}
                        placeholder="Enter Email"
                        name='email'
                        onChange={handleFieldChange}
                    />
                    <label class="form-label">Enter Password*</label>
                    <input
                        type="password"
                        required
                        name='password'
                        value={formData?.password || ""}
                        placeholder="Enter Password"
                        onChange={handleFieldChange}
                    />
                </div>
                <div class="row mb-4 mt-4">
                    <div class="col d-flex ">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" checked />
                            <label class="form-label">Remember me </label>
                        </div>
                    </div>
                    <div class="col">
                        <Link to={'/forgot-password'}>Forgot password?</Link>
                    </div>
                </div>

                <button type="button" class="btn-sign-up mb-4" onClick={handleFormSubmit}>Sign in</button>

                <div class="text-center">
                    <p>Not a member? <a href="/sign-up">Register</a></p>
                </div>
            </form>
        </div>
    )
}
