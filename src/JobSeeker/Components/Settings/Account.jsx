import { Form, Input, Modal } from "antd";
import React, { useState } from "react";
import { showErrorAlert, showSuccessAlert } from "../../../globalConstant";
import Loader from "../../../Loader";
import Instance from "../../../AxiosConfig";

export const Account = () => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showChangeEmailForm, setShowChangeEmailForm] = useState(false);
  const loggedInUserInfo = JSON.parse(localStorage.getItem("loggedInUserInfo"));
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleEmailChangeClick = () => {
    setShowChangeEmailForm(true);
  };

  const handleShowModal = () => {
    setIsModalVisible(true);
  };
  const handleCancelClick = () => {
    setShowChangeEmailForm(false);
  };
  const handleCancelOtpClick = () => {
    setShowOtpForm(false);
  };
  const handleEmailChangeSubmit = () => {
    setShowChangeEmailForm(false);
    setShowOtpForm(true);
  };
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

  const handlePasswordChange = async () => {
    try {
      if (
        !formData?.oldPassword?.trim() ||
        !formData?.newPassword?.trim() ||
        !formData?.confirmNewPassword?.trim() ||
        formData?.newPassword?.trim() !== formData?.confirmNewPassword?.trim()
      ) {
        showErrorAlert("Passwords do not match");
        return;
      }
      setIsLoading(true);
      const response = await Instance.put(
        "/change-password",
        {
          oldPassword: formData?.oldPassword,
          newPassword: formData?.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${loggedInUserInfo?.token}`,
          },
        }
      );
      if (response.status === 200) {
        showSuccessAlert("Password changed successfully");
        form.resetFields();
        setFormData({});
      }
    } catch (error) {
      console.error(error);
      showErrorAlert("Failed to change password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="container">
        <div className="account-settings-section">
          <div>
            <h4>Account Settings</h4>
            <h5>Change your email, mobile number or password.</h5>
          </div>
        </div>

        {!showChangeEmailForm && (
          <div className="job-preferences-settings">
            <div className="row">
              <div className="col-lg-6">
                <h4>Email Address</h4>
                <p>
                  We never share your email address without your permission.
                </p>
              </div>
              <div className="col-lg-6">
                <h4>Current Email</h4>
                <p className="mb-0">siddu002@gmai.com</p>
                <button
                  className="add-profile-education"
                  onClick={handleEmailChangeClick}
                >
                  Change Email
                </button>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-lg-6">
                <h4>Change Password</h4>
                <p>
                  You must enter your old password to change to a new password.
                </p>
              </div>
              <div className="col-lg-6">
                <Form
                  layout="vertical"
                  form={form}
                  onFinish={handlePasswordChange}
                >
                  <div className="col-lg-12">
                    <Form.Item
                      label="Current Password"
                      name="currentPassword"
                      className="job-preference-form-input"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your current password!",
                        },
                      ]}
                    >
                      <Input.Password
                        placeholder="Enter your current password"
                        value={formData?.oldPassword}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            oldPassword: e.target.value,
                          })
                        }
                      />
                    </Form.Item>
                  </div>
                  <div className="col-lg-12">
                    <Form.Item
                      label="New Password"
                      name="newPassword"
                      className="job-preference-form-input"
                      rules={[
                        {
                          required: true,
                          message: "Please input your new password!",
                        },
                      ]}
                    >
                      <Input.Password
                        placeholder="Enter your new password"
                        value={formData?.newPassword}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            newPassword: e.target.value,
                          })
                        }
                      />
                    </Form.Item>
                  </div>
                  <div className="col-lg-12">
                    <Form.Item
                      label="Confirm New Password"
                      name="confirmNewPassword"
                      className="job-preference-form-input"
                      rules={[
                        {
                          required: true,
                          message: "Please confirm your new password!",
                        },
                      ]}
                    >
                      <Input.Password
                        placeholder="Confirm your new password"
                        value={formData?.confirmNewPassword}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            confirmNewPassword: e.target.value,
                          })
                        }
                      />
                    </Form.Item>
                  </div>
                  <button className="jobseeker-basic-button" type="submit">
                    Save
                  </button>
                </Form>
              </div>
            </div>
          </div>
        )}

        {showChangeEmailForm && (
          <div className="job-preferences-settings">
            <h4>Change Email</h4>
            <Form layout="vertical">
              <div className="col-lg-6">
                <Form.Item
                  label="Enter New Email"
                  name="email"
                  className="add-profile-form"
                  rules={[
                    { required: true, message: "Please enter your email!" },
                  ]}
                >
                  <p className="mb-0">
                    We will send you a verification email on this email ID.
                  </p>
                  <Input placeholder="Enter Your New Email" />
                </Form.Item>
              </div>
              <div className="col-lg-6">
                <Form.Item
                  label="Enter Your Password"
                  name="password"
                  className="job-preference-form-input"
                >
                  <Input.Password placeholder="Enter your password" />
                </Form.Item>
              </div>
              <div className="d-flex gap-4 mt-4">
                <button
                  className="jobseeker-discard-button"
                  onClick={handleCancelClick}
                >
                  Cancel
                </button>
                <button
                  className="jobseeker-basic-button"
                  onClick={handleShowModal}
                >
                  Save
                </button>
              </div>
            </Form>
          </div>
        )}

        <Modal
          open={isModalVisible}
          onOk={() => setIsModalVisible(false)}
          onCancel={() => setIsModalVisible(false)}
          footer={[
            <div className="d-flex gap-2 justify-content-end">
              <button
              key="cancel"
              className="jobseeker-discard-button"
              onClick={()=>{setIsModalVisible(false)}}
            >
              Cancel
            </button>
            <button
              key="submit"
              className="jobseeker-basic-button"
              onClick={() => {
                setIsModalVisible(false);
              }}
            >
              Submit
            </button>
            </div>
          ]}
        >
          <div className="account-settings-otp-modal">
            <p>Otp hs been sent to your regitered mail</p>
            <h5>Enter OTP</h5>
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
                
               
               
                
              </Form>
          </div>
        </Modal>

        {!showChangeEmailForm && !showOtpForm && (
          <div className="d-flex justify-content-between my-4">
            <button className="jobseeker-discard-button">
              Deactivate Account
            </button>
            <button className="jobseeker-basic-button">Save</button>
          </div>
        )}
      </div>
    </>
  );
};
