import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import image1 from "../../Assets/Images/loginPage.png";
import "./auth.css";
import { Form, Input, Select } from "antd";
import icon1 from "../../Assets/Icons/apple.png"
import icon2 from "../../Assets/Icons/microsoft.png"
import icon3 from "../../Assets/Icons/google.png"
import Instance from "../../../AxiosConfig";
import { showSuccessAlert } from "../../../globalConstant";
import Loader from "../../../Loader";

export const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const loggedInUserInfo = JSON.parse(localStorage.getItem("loggedInUserInfo"));

  const validateToken = async () => {
    try {
      const response = await Instance.get("/validateToken", {
        headers: {
          Authorization: `Bearer ${loggedInUserInfo?.token}`,
        },
      });
      if (response.status === 200 && response?.data?.role === 'JOBSEEKER') {
        navigate("/user/dashboard");
      }
    } catch (error) {
    }
  };

  useEffect(() => {
    validateToken();
  }, []);

  const handleSubmitForm = async () => {
    try {
      setIsLoading(true);
      const response = await Instance.post("/register", formData, {
        headers: {
          Authorization: `Bearer ${loggedInUserInfo?.token}`,
        },
      });
      if (response.status === 201) {
        showSuccessAlert('User registration successfully');
        navigate("/user/login");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="job-seeker-register-section">
        <div className="container-fluid">
          <div className="row d-flex align-items-center justify-content-center">
            <div className="col-lg-5">
              <div className="job-seeker-signup-left">
                <h2>Create New Account</h2>
                <p>
                  Already registered? <span onClick={() => navigate('/user/login')}>Login</span>
                </p>
                <Form layout="vertical">

                  <div className="row mt-4">
                    <div className="col-lg-6 ">
                      <Form.Item
                        name="firstName"
                        label="First Name"
                        className="sign-up-input"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your first name!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter First Name *" className="signup-select" value={formData?.firstName} onChange={(e) => setFormData((prevData) => ({ ...prevData, firstName: e.target.value }))} />
                      </Form.Item>
                    </div>
                    <div className="col-lg-6">
                      <Form.Item
                        name="lastName"
                        label="Last Name"
                        className="sign-up-input"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your last name!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter Last Name *" className="signup-select" value={formData?.lastName} onChange={(e) => setFormData((prevData) => ({ ...prevData, lastName: e.target.value }))} />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 ">
                      <Form.Item
                        name="email"
                        label="Email"
                        className="sign-up-input"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your email!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter Email Id *" className="signup-select" value={formData?.email} onChange={(e) => setFormData((prevData) => ({ ...prevData, email: e.target.value }))} />
                      </Form.Item>
                    </div>
                    <div className="col-lg-6 ">
                      <Form.Item
                        label="Password"
                        name="password"
                        className="sign-up-input"
                        rules={[
                          {
                            required: true,
                            message: "Please input your password!",
                          },
                        ]}
                      >
                        <Input.Password placeholder="Enter Password" className="signup-select" value={formData?.password} onChange={(e) => setFormData((prevData) => ({ ...prevData, password: e.target.value }))} />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 ">
                      <Form.Item
                        name="discipline"
                        label="Discipline"
                        className="sign-up-input"
                      >
                        <Select placeholder="Select Discipline " className="signup-select" />
                      </Form.Item>
                    </div>
                    <div className="col-lg-6 mb-4">
                      <Form.Item
                        name="referalCode"
                        className="sign-up-input"
                        label="Referral Code"
                      >
                        <Input placeholder="Enter Referal Code" className="signup-select" />
                      </Form.Item>
                    </div>
                  </div>

                  <div className="col-lg-12 mb-1">
                    <button className="jobseeker-sign-up-button" onClick={handleSubmitForm}>Sign Up</button>
                  </div>
                  <div className="or-separator">
                    <hr className="signup-horizontal-line" />
                    <p>or</p>
                    <hr className="signup-horizontal-line" />
                  </div>
                  <div className="d-flex justify-content-center gap-4 my-1">
                    <div className="signup-icons">
                      <img src={icon3} alt=".." />
                    </div>
                    <div className="signup-icons">
                      <img src={icon1} alt=".." />
                    </div>
                    <div className="signup-icons">
                      <img src={icon2} alt=".." />
                    </div>
                  </div>
                  <p>By Creating an Account you agree to <span>Terms of use</span> and <span>Privacy policy</span></p>
                </Form>
              </div>
            </div>
            <div className="col-lg-7 pe-0  d-none d-lg-block  d-xl-block d-xxl-block">
              <div className="job-seeker-signup-right d-flex align-items-center justify-content-center">
                <img src={image1} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
