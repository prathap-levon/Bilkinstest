import React, { useState } from "react";
import image1 from "../../Assets/Images/loginPage4.png";
import logo from "../../Assets/Images/logo.png";
import "./auth.css";
import { Form} from "antd";
import {  useNavigate } from "react-router-dom";
export const OtpPage = () => {
    const [otpCode, setOtpCode] = useState(new Array(5).fill(''));
    const [startDate, setStartDate] = useState(new Date());
     const handleOtpChange = (e, index) => {
           const value = e.target.value.replace(/[^0-9]/g, '');
           if (value.length <= 1) {
               const newOtpCode = [...otpCode];
               newOtpCode[index] = value;
               setOtpCode(newOtpCode);
   
               if (value && index < otpCode.length - 1) {
                   document.getElementById(`otp-input-${index + 1}`).focus();
               }
           }
       };
    const handleResendCode = () => {
           setStartDate(new Date());
       };
  const navigate = useNavigate();
  return (
    <div className="job-seeker-signup-section">
      <div className="container-fluid">
        <div className="row d-flex align-items-center">
          <div className="col-lg-5 col-12">
            <div className="job-seeker-signup-left ">
              <div className="job-seeker-login-logo d-flex justify-content-center ">
                <img src={logo} alt="" />
              </div>
              <h2>OTP Verification</h2>
              <p>Enter OTP Code sent to bilkins@gmail.com</p>
              <Form layout="vertical">
              
                  <div className="otp-input-group mt-5">
                    {otpCode.map((code, index) => (
                      <input
                        key={index}
                        id={`otp-input-${index}`}
                        type="text"
                        maxLength={1}
                        value={code}
                        onChange={(e) => handleOtpChange(e, index)}
                        className="otp-input"
                      />
                    ))}
                  </div>
                  <div className="resend-info">
                    <p>
                      Didn’t get OTP?{" "}
                      <span>
                        Resend in{" "}
                        {Math.max(
                          0,
                          30 - Math.floor((new Date() - startDate) / 1000)
                        )}{" "}
                        seconds
                      </span>
                    </p>
                    <p className="resend-link" onClick={handleResendCode}>
                      Resend Code
                    </p>
                  </div>
                
               
                <div className="col-lg-12 mb-1 mt-4">
                  <button className="jobseeker-sign-up-button" onClick={()=>navigate('/user/create-password')}>Verify & Proceed </button>
                </div>
                
              </Form>
            </div>
          </div>
          <div className="col-lg-7 pe-0  d-none d-lg-block  d-xl-block d-xxl-block">
            <div className="job-seeker-login-right d-flex align-items-center justify-content-center">
              <img src={image1} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
