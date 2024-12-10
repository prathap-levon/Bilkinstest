import React from "react";
import Animate from "../Animation/Animate";
import { showErrorAlert, showSuccessAlert } from "../../globalConstant";
import Instance from "../../AxiosConfig";
import { PhoneInput } from "react-international-phone";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { useState } from "react";

const CareerForm = () => {
  const [formData, setFormData] = useState({});
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [isChecked, setIsChecked] = useState(false); // State for checkbox

  const handleFieldChange = (fieldName, e) => {
    try {
      const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
      setFormData((prevData) => ({
        ...prevData,
        [fieldName]: value,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const validatePhoneNumber = (value) => {
    const phoneNumber = parsePhoneNumberFromString(value);
    if (phoneNumber && phoneNumber.isValid()) {
      return true;
    } else {
      return false;
    }
  };

  const validateForm = () => {
    try {
      if (!formData?.firstName || formData?.firstName?.trim() === "") {
        showErrorAlert("Please enter your name");
        return false;
      }
      if (!formData?.email || formData?.email?.trim() === "") {
        showErrorAlert("Please enter your email");
        return false;
      } else if (!emailRegex.test(formData?.email)) {
        showErrorAlert("Please enter valid email");
        return false;
      }
      if (!formData?.message || formData?.message?.trim() === "") {
        showErrorAlert("Please enter your message");
        return false;
      }
      return true;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!validateForm()) return;
      const response = await Instance.post("/sendQuery", formData);
      if (response.status === 200) {
        setFormData({});
        showSuccessAlert(
          "Message sent successfully. We will contact you soon."
        );
      }
    } catch (error) {
      showErrorAlert(error?.response?.data?.message || "An error occured");
      console.error(error);
    }
  };
  return (
    <div>
      <div className="careerForm-container container-fluid">
        <center>
          <div className="d-flex align-items-center justify-content-center my-4 fill-form-career">
            <svg
              style={{ marginRight: "3px" }}
              width="13"
              height="12"
              viewBox="0 0 13 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="0.75" width="12" height="12" fill="#CE1B28" />
            </svg>
            &nbsp;
            <span>Fill Form</span>
          </div>
        </center>
        <Animate>
          <h1>We will get back to you!</h1>
        </Animate>

        <form className="row g-3 career-input-form ">
          <div className="col-md-6">
            <input
              type="text"
              className="career-input-filed"
              value={formData?.firstName || ""}
              placeholder="Name*"
              onChange={(e) => {
                handleFieldChange("firstName", e);
              }}
            />
          </div>
          <div className="col-md-6">
            <input
              type="email"
              value={formData?.email || ""}
              className="career-input-filed"
              placeholder="Email*"
              onChange={(e) => {
                handleFieldChange("email", e);
              }}
            />
          </div>
          <div className="col-md-6">
            <PhoneInput
              defaultCountry="us"
              value={formData?.mobileNumber || ""}
              onChange={(phone) => {
                setFormData((values) => ({ ...values, mobileNumber: phone }));
              }}
              inputStyle={{
                width: "100%",
                border: "none",
                backgroundColor: "transparent",
              }}
              className="career-phone-filed"
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              value={formData?.location || ""}
              className="career-input-filed"
              placeholder="Location"
              onChange={(e) => {
                handleFieldChange("location", e);
              }}
            />
          </div>

          <div className="col-12">
            <textarea
              type="text"
              value={formData?.message || ""}
              style={{ resize: "none" }}
              className="career-input-filed"
              placeholder="Message*"
              onChange={(e) => {
                handleFieldChange("message", e);
              }}
            />
          </div>
          <div className="mb-3 align-items-center">
            <label
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "14px",
              }}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => {
                  setIsChecked(e.target.checked);
                  handleFieldChange("concentOfPhoneNo", e);
                }}
                style={{ marginRight: "8px" }} // Add space between checkbox and text
              />
              By providing your phone number, you agree to receive a text
              message from Bilkins. Message and Data rates may apply, Message
              frequency varies. To stop receiving messages, reply 'STOP' at any
              time.
            </label>
          </div>

          <div className="col-12 d-flex justify-content-center">
            <button onClick={handleSubmit} className="input-form-button">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CareerForm;
