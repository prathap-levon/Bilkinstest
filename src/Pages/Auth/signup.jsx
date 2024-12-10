import React, { useState } from 'react';
import logo from "../../Assets/Img/logos/bilkins-logo.png";
import { Link, useNavigate } from 'react-router-dom';
import Instance from '../../AxiosConfig';
import { ToastContainer, toast } from 'react-toastify';
import Select from "react-select";
import { showErrorAlert } from '../../globalConstant';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { useGoogleLogin } from '@react-oauth/google';
import google from '../../Assets/Img/logos/google.png';
import axios from 'axios';

const discipOptions = [{ label: 'Respiratory Therapist', value: 'Respiratory Therapist' }, { label: 'Physical Therapist', value: 'Physical Therapist' }];

const SignUp = () => {
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleFieldChange = (e) => {
        try {
            if (e.target.name === 'termsConditionAgreed') {
                setFormData((prevData) => ({
                    ...prevData,
                    [e.target.name]: e.target.checked
                }))
            } else {
                setFormData((prevData) => ({
                    ...prevData,
                    [e.target.name]: e.target.value
                }))
            }
        } catch (error) {
            console.error(error);
        }
    }

    const isFormValid = () => {
        if (!formData?.firstName || formData?.firstName?.trim() === '') {
            showErrorAlert('First name required');
            return false;
        }
        if (!formData?.mobileNumber || formData?.mobileNumber?.length < 6) {
            showErrorAlert('Mobile Number reauired');
            return false;
        } else if (!validatePhoneNumber(formData?.mobileNumber)) {
            showErrorAlert("Please enter valid Mobile Number");
            return false;
        }
        if (!formData?.email || formData?.email?.trim() === '') {
            showErrorAlert('Email required');
            return false;
        } else if (!emailRegex.test(formData?.email)) {
            showErrorAlert("Please enter valid Email");
            return false;
        }
        if (!formData?.password || formData?.password?.trim() === '') {
            showErrorAlert('Password required');
            return false;
        }
        if (!formData?.termsConditionAgreed) {
            showErrorAlert('Please accept the terms & conditions');
            return false;
        }
        return true;
    }

    const handleFormSubmit = async (e) => {
        try {
            e.preventDefault();
            if (!isFormValid()) return;

            let payload = { ...formData };
            payload['discipline'] = payload['discipline']?.value;

            const response = await Instance.post('/register', payload);
            if (response.status === 201) {
                navigate('/sign-in');
            }
        } catch (error) {
            console.error(error);
        }
    }

    const validatePhoneNumber = (value) => {
        const phoneNumber = parsePhoneNumberFromString(value);
        if (phoneNumber && phoneNumber.isValid()) {
            return true;
        } else {
            return false;
        }
    };


    const handleGoogleLoginSuccess = async (res) => {
        try {
        const response = await Instance.post(`/googleRegister?code=${res?.code}`);
            if (response.status === 201) {
                navigate('/sign-in');
            }
        } catch (error) {
            console.error(error);
            showErrorAlert(error?.response?.data?.message || 'An error occured');
        }
    }

    const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess, onFailure: () => showErrorAlert('Failed to Sign up. Please try again'), flow: 'auth-code' });

    return (
        <>
            <ToastContainer style={{ zIndex: "999999" }} />
            <form className="signup-form">
                <Link className="signin-navbar-brand d-flex justify-content-center  my-4" to="/">
                    <img src={logo} alt="logo" />
                </Link>
                <div className="discipline">
                    <Select
                        options={discipOptions}
                        value={formData?.discipline || null}
                        placeholder="Select Discipline"
                        onChange={(e) => {
                            let newData = { ...formData };
                            newData['discipline'] = e;
                            setFormData(newData);
                        }}
                    />
                </div>
                <div className="name my-2">
                    <input
                        type="text"
                        id="firstName"
                        className="mb-2"
                        name="firstName"
                        value={formData?.firstName || ""}
                        onChange={handleFieldChange}
                        required
                        placeholder="Full Name*"
                    />
                    {/* <input
                        type="text"
                        id="lastName"
                        name='lastName'
                        value={formData?.lastName || ""}
                        onChange={handleFieldChange}
                        required
                        placeholder="Last Name*"
                    /> */}
                </div>
                <div className="email mb-2">
                    <PhoneInput
                        defaultCountry="us"
                        value={formData?.mobileNumber}
                        onChange={(phone) => {
                            setFormData(values => ({ ...values, ["mobileNumber"]: phone }))
                        }}
                        inputStyle={{
                            width: "100%"
                        }}
                    />
                </div>
                <div className="email mb-2">
                    <input
                        type="email"
                        id="email"
                        name='email'
                        value={formData?.email || ""}
                        onChange={handleFieldChange}
                        required
                        placeholder="Email Address*"
                    />
                </div>
                <div className="password mb-2">
                    <input
                        type="password"
                        id="password"
                        name='password'
                        value={formData?.password || ""}
                        onChange={handleFieldChange}
                        required
                        placeholder="Password*"
                    />
                </div>
                <div className="referral mb-2">
                    <input
                        type="text"
                        id="referralCode"
                        name='referralCode'
                        value={formData?.referralCode || ""}
                        onChange={handleFieldChange}
                        placeholder="Referral Code (optional)"
                    />
                </div>
                <div className="terms mb-2">
                    <label htmlFor="isAgreed">
                        <input
                            type="checkbox"
                            id="isAgreed"
                            name='termsConditionAgreed'
                            checked={formData?.termsConditionAgreed}
                            onChange={handleFieldChange}
                            required
                            style={{ marginRight: '10px' }}
                        />
                        By creating an account with Bilkins you agree to the Terms and Conditions
                    </label>
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className='btn-sign-up' style={{ width: "100%", justifyContent: "center" }} onClick={handleFormSubmit}>Sign Up</button>
                </div>
                <button className="google-btn" onClick={() => login()}>
                    <img src={google} />
                    Sign in with Google
                </button>
            </form>
        </>

    );
};

export default SignUp;
