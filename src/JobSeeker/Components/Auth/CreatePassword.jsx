import React from "react";
import image1 from "../../Assets/Images/loginpage5.png";
import logo from "../../Assets/Images/logo.png";
import "./auth.css";
import { Form, Input } from "antd";
import { useNavigate } from 'react-router-dom';
export const CreatePassword = () => {
      const navigate=useNavigate();
  return (
    <div className="job-seeker-signup-section">
      <div className="container-fluid">
        <div className="row d-flex align-items-center">
          <div className="col-lg-5 col-12">
            <div className="job-seeker-signup-left ">
              <div className="job-seeker-login-logo d-flex justify-content-center ">
                <img src={logo} alt="" />
              </div>
              <h2>Create New Password</h2>
              <p>Please Create your New Password</p>
              <Form layout="vertical">
                
                <div className="col-lg-12  mt-5">
                  <Form.Item
                    label="Create New Password (Must be at least 8 characters.) "
                    name="password"
                    className="sign-up-input"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password
                      placeholder="Enter Your New Password"
                      className="signup-select"
                    />
                  </Form.Item>
                </div>
                <div className="col-lg-12 ">
                  <Form.Item
                    label="Re-enter New Password"
                    name="password"
                    className="sign-up-input"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password
                      placeholder="Re-enter New Password"
                      className="signup-select"
                    />
                  </Form.Item>
                </div>
                
                <div className="col-lg-12 mb-1 mt-4">
                  <button className="jobseeker-sign-up-button">Create New Password </button>
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
