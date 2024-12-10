import React, { useEffect, useState } from "react";
import image1 from "../../Assets/Images/loginPage2.png";
import logo from "../../Assets/Images/logo.png";
import "./auth.css";
import { Form, Input, Switch } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Instance from "../../../AxiosConfig";
import { showErrorAlert, showSuccessAlert } from "../../../globalConstant";
import Loader from "../../../Loader";

export const Login = () => {
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
      if (response.status === 200 && response?.data?.role === "JOBSEEKER") {
        navigate("/user/dashboard");
      }
    } catch (error) {
      // No token present means login is required
    }
  };

  useEffect(() => {
    validateToken();
  }, []);

  const handleSubmitForm = async () => {
    try {
      setIsLoading(true);
      if (!formData?.email || formData?.email?.trim() === "" || !formData?.password || formData?.password?.trim() === "") {
        return;
      }
      const response = await Instance.post("/website-login", formData, {
        headers: {
          Authorization: `Bearer ${loggedInUserInfo?.token}`,
        },
      });
      if (response.status === 200) {
        localStorage.setItem("loggedInUserInfo", JSON.stringify(response?.data?.responseData));
        showSuccessAlert('Login Successfully!');
        navigate("/user/applied-jobs");
      }
    } catch (error) {
      console.error(error);
      showErrorAlert("Failed to Login! Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="job-seeker-signup-section">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-lg-5 col-12 ">
              <div className="job-seeker-signup-left  ">
                <div className="job-seeker-login-logo d-flex justify-content-center ">
                  <img src={logo} alt="" />
                </div>
                <h2>Welcome Back</h2>
                <p>please login to your account</p>
                <Form layout="vertical">
                  <div className="col-lg-12 ">
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
                      <Input
                        placeholder="Enter Email Id *"
                        className="signup-select"
                        value={formData?.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                        }}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-lg-12">
                    <Form.Item
                      label="Password"
                      name="password"
                      className="sign-up-input"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your password!",
                        },
                      ]}
                    >
                      <Input.Password
                        placeholder="Enter Password"
                        className="signup-select"
                        value={formData?.password}
                        onChange={(e) => {
                          setFormData({ ...formData, password: e.target.value });
                        }}
                      />
                    </Form.Item>
                  </div>
                  <div className="d-flex justify-content-between my-3">
                    <div className="d-flex gap-2">
                      <Switch
                        defaultChecked
                        onChange={() => { }}
                        className="remember-me-switch"
                      />
                      <p>Remember Me</p>
                    </div>
                    <Link
                      to="/user/forgot-password"
                      className="jobseeker-forget-password"
                    >
                      Forget Password?
                    </Link>
                  </div>
                  <div className="col-lg-12 mb-1">
                    <button
                      type="submit"
                      className="jobseeker-sign-up-button"
                      onClick={handleSubmitForm}
                    >
                      {isLoading ? <div className="spinner"></div> : "Login"}
                    </button>
                  </div>
                  <p>
                    Dont have an account ?{" "}
                    <span
                      onClick={() => {
                        navigate("/user/signup");
                      }}
                    >
                      Click here to register
                    </span>
                  </p>
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
    </>
  );
};
