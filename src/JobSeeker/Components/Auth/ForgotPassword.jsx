import React,{useState} from "react";
import image1 from "../../Assets/Images/loginPage3.png";
import logo from "../../Assets/Images/logo.png";
import "./auth.css";
import { Form, Input, Select,Switch } from "antd";
import { Link, useNavigate } from 'react-router-dom';
export const ForgetPassword = () => {
    const onChange = (checked) => {
        console.log(`switch to ${checked}`);
      };
      const navigate=useNavigate();
  return (
    <div className="job-seeker-signup-section">
      <div className="container-fluid">
        <div className="row d-flex align-items-center ">
          <div className="col-lg-5 col-12">
            <div className="job-seeker-signup-left ">
              <div className="job-seeker-login-logo d-flex justify-content-center ">
                <img src={logo} alt="" />
              </div>
              <h2>Forgot Password</h2>
              <p>New Password</p>
              <Form layout="vertical">
                <div className="col-lg-12 ">
                  <Form.Item
                    name="email"
                    label="Email"
                    className="sign-up-input"
                  >
                    <Input
                      placeholder="Enter Email Id "
                      className="signup-select"
                    />
                  </Form.Item>
                </div>
                
              
                <div className="col-lg-12 mt-3">
                  <button className="jobseeker-sign-up-button" onClick={()=>navigate('/user/otp')}>Continue </button>
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
