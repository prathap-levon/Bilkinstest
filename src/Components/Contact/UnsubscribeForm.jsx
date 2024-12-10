import React, { useState } from "react";
import { showErrorAlert, showSuccessAlert } from "../../globalConstant";
import Instance from "../../AxiosConfig";

export const UnsubscribeForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    unSubscribeFrom: "PROMOTIONALMAILANDMESSAGE",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData?.fullName?.trim()) {
      showErrorAlert("Please enter your name");
      return false;
    }
    if (!formData?.email?.trim()) {
      showErrorAlert("Please enter your email");
      return false;
    } else if (!emailRegex.test(formData?.email)) {
      showErrorAlert("Please enter a valid email");
      return false;
    }
    if (!formData?.phoneNumber?.trim()) {
      showErrorAlert("Please enter your phone number");
      return false;
    }
    if (!formData?.unSubscribeFrom?.trim()) {
      showErrorAlert("Please select a reason to unsubscribe");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await Instance.post("/unsubscribe", formData);
      if (response.status === 200) {
        setFormData({
          fullName: "",
          email: "",
          phoneNumber: "",
          unSubscribeFrom: "PROMOTIONALMAILANDMESSAGE",
        });
        showSuccessAlert(response.data.message);
      }
    } catch (error) {
      showErrorAlert(
        error?.response?.data?.message || "An error occurred while unsubscribing"
      );
      console.error(error);
    }
  };

  return (
    <div className="unsubscribe-form-container container mt-5">
      <div className="unsubscribe-form">
        <h4>Do You Want To Unsubscribe?</h4>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="fullName" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                name="fullName"
                placeholder="Your Name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Your Mail"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number
              </label>
              <input
                type="tel"
                className="form-control"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Your Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="form-label">Unsubscribe from</label>
            <div className="d-flex gap-5">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="unSubscribeFrom"
                  id="promotional"
                  value="PROMOTIONALMAILANDMESSAGE"
                  checked={formData.unSubscribeFrom === "PROMOTIONALMAILANDMESSAGE"}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="promotional" style={{ fontSize: "16px" }}>
                  Promotional Mails and Messages
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="unSubscribeFrom"
                  id="notifications"
                  value="NOTIFICATION"
                  checked={formData.unSubscribeFrom === "NOTIFICATION"}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="notifications" style={{ fontSize: "16px" }}>
                  Notifications
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="unSubscribeFrom"
                  id="mailsAndMessages"
                  value="MAILANDMESSAGE"
                  checked={formData.unSubscribeFrom === "MAILANDMESSAGE"}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="mailsAndMessages" style={{ fontSize: "16px" }}>
                  Mails and Messages
                </label>
              </div>
            </div>
          </div>
          <div className="text-center">
            <button type="submit" className="btn-sign-up">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
