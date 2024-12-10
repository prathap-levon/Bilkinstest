import React, { useState } from "react";
import fb from "../../Assets/Img/icons/fb.png";
import x from "../../Assets/Img/icons/x.png";
import linkedin from "../../Assets/Img/icons/linkedin.png";
import instagram from "../../Assets/Img/icons/instagram.png";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { ToastContainer } from 'react-toastify';
import { PhoneInput } from 'react-international-phone';
import 'react-toastify/dist/ReactToastify.css';
import Instance from "../../AxiosConfig";
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { showErrorAlert, showSuccessAlert } from "../../globalConstant";

const ContactForm = () => {
  const [formData, setFormData] = useState({});
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [isChecked, setIsChecked] = useState(false); // State for checkbox

  const handleFieldChange = (e, fieldName) => {
    try {
      const value =  e.target.type === "checkbox" ? e.target.checked : e.target.value
      setFormData((prevData) => ({
        ...prevData,
        [fieldName]: value
      }));
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

  const validateForm = () => {
    try {
      if (!formData?.firstName || formData?.firstName?.trim() === '') {
        showErrorAlert('Please enter your name');
        return false;
      }
      if (!formData?.email || formData?.email?.trim() === '') {
        showErrorAlert('Please enter your email');
        return false;
      } else if (!emailRegex.test(formData?.email)) {
        showErrorAlert("Please enter valid email");
        return false;
      }
      if (!formData?.message || formData?.message?.trim() === '') {
        showErrorAlert('Please enter your message');
        return false;
      }
      return true;
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!validateForm()) return;
      const response = await Instance.post('/sendQuery', formData);
      if (response.status === 200) {
        setFormData({});
        setIsChecked(false);
        showSuccessAlert('Message sent successfully. We will contact you soon.');
      };
    } catch (error) {
      showErrorAlert(error?.response?.data?.message ||   'An error occured');
      console.error(error);
    }
  };

  return (
    <>
      <ToastContainer style={{ zIndex: "999999999" }} />
      <div className="contact-form-section">
        <div className="cardcontact">
          <Container className="containerContact">
            <Row>
              <Col md={5}>
                <div className="contact-info">
                  <h2 className="contact-heading">Contact Information</h2>
                  <p className="contact-subheading">
                    Say something to start a live chat!
                  </p>
                  <div className="details-info-section">
                    <div className="contact-details">
                      <svg
                        className="contact-icon"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 10.999H22C22 5.869 18.127 2 12.99 2V4C17.052 4 20 6.943 20 10.999Z"
                          fill="white"
                        />
                        <path
                          d="M13 8.00024C15.103 8.00024 16 8.89724 16 11.0002H18C18 7.77524 16.225 6.00024 13 6.00024V8.00024ZM16.422 13.4432C16.2299 13.2686 15.9774 13.1754 15.7178 13.1835C15.4583 13.1915 15.212 13.3001 15.031 13.4862L12.638 15.9472C12.062 15.8372 10.904 15.4762 9.71204 14.2872C8.52004 13.0942 8.15904 11.9332 8.05204 11.3612L10.511 8.96724C10.6975 8.78637 10.8062 8.54006 10.8142 8.28045C10.8222 8.02083 10.7289 7.76828 10.554 7.57624L6.85904 3.51324C6.68408 3.3206 6.44092 3.20374 6.18119 3.1875C5.92146 3.17125 5.66564 3.2569 5.46804 3.42624L3.29804 5.28724C3.12515 5.46075 3.02196 5.69169 3.00804 5.93624C2.99304 6.18624 2.70704 12.1082 7.29904 16.7022C11.305 20.7072 16.323 21.0002 17.705 21.0002C17.907 21.0002 18.031 20.9942 18.064 20.9922C18.3086 20.9786 18.5394 20.8749 18.712 20.7012L20.572 18.5302C20.7415 18.3328 20.8273 18.077 20.8113 17.8173C20.7952 17.5576 20.6785 17.3143 20.486 17.1392L16.422 13.4432Z"
                          fill="white"
                        />
                      </svg>
                      <p className="contact-detail">+1-703-349-1777</p>
                    </div>
                    <div className="contact-details">
                      <svg
                        className="contact-icon"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M22 4H2V20H22V4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"
                          fill="white"
                        />
                      </svg>
                      <p className="contact-detail">info@bilkins.com</p>
                    </div>
                    <div className="contact-details">
                      <svg
                        className="contact-icon"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 1.5C9.81276 1.50258 7.71584 2.3726 6.16923 3.91922C4.62261 5.46584 3.75259 7.56276 3.75001 9.75C3.74739 11.5374 4.33124 13.2763 5.41201 14.7C5.41201 14.7 5.63701 14.9963 5.67376 15.039L12 22.5L18.3293 15.0353C18.3623 14.9955 18.588 14.7 18.588 14.7L18.5888 14.6978C19.669 13.2747 20.2526 11.5366 20.25 9.75C20.2474 7.56276 19.3774 5.46584 17.8308 3.91922C16.2842 2.3726 14.1873 1.50258 12 1.5ZM12 12.75C11.4067 12.75 10.8266 12.5741 10.3333 12.2444C9.83995 11.9148 9.45543 11.4462 9.22837 10.8981C9.00131 10.3499 8.9419 9.74667 9.05765 9.16473C9.17341 8.58279 9.45913 8.04824 9.87869 7.62868C10.2982 7.20912 10.8328 6.9234 11.4147 6.80764C11.9967 6.69189 12.5999 6.7513 13.1481 6.97836C13.6962 7.20542 14.1648 7.58994 14.4944 8.08329C14.8241 8.57664 15 9.15666 15 9.75C14.999 10.5453 14.6826 11.3078 14.1202 11.8702C13.5578 12.4326 12.7954 12.749 12 12.75Z"
                          fill="white"
                        />
                      </svg>
                      <p className="contact-detail">
                        44031 Pipeline Plaza STE
                        <br />
                        300 Ashburn VA 20147 USA
                      </p>
                    </div>
                  </div>
                  <p>Follow us on</p>
                  <div className="contact-details-footer">
                    <div className="d-flex align-items-center">
                      <div className="d-flex align-items-center">
                        <a href="https://www.facebook.com/bilkins" target="__blank">
                          <div className="social-icons-footer">
                            <img src={fb} alt="" />
                          </div>
                        </a>
                        <a href="https://x.com/BilkinsInc" target="__blank">
                          <div className="social-icons-footer">
                            <img src={x} alt="" />
                          </div></a>
                        <a href="https://www.linkedin.com/company/bilkinsinc/" target="__blank">
                          <div className="social-icons-footer">
                            <img src={linkedin} alt="" />
                          </div>
                        </a>
                        <a href="https://www.instagram.com/bilkinsinc/" target="__blank">
                          <div className="social-icons-footer">
                            <img src={instagram} alt="" />
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>

              <Col md={7}>
                <Form className="form-section-contact">
                  <Row className="mb-3 mt-5 align-items-center">
                    <Col>
                      <h5 className="form-heading">First Name*</h5>
                      <Form.Control
                        type="text"
                        placeholder="Enter full name"
                        value={formData?.firstName || ""}
                        onChange={(e) => handleFieldChange(e, 'firstName')}
                        className="input-field"
                      />
                      <div className="bottom-line"></div>
                    </Col>
                    <Col>
                      <h5 className="form-heading">Email*</h5>
                      <Form.Control
                        type="email"
                        placeholder="Enter email address"
                        value={formData?.email || ""}
                        onChange={(e) => handleFieldChange(e, 'email')}
                        className="input-field"
                      />
                      <div className="bottom-line"></div>
                    </Col>
                  </Row>
                  <Row className="my-3 align-items-center">
                    <Col>
                      <h5 className="form-heading">Mobile Number</h5>
                      <PhoneInput
                        defaultCountry="us"
                        value={formData?.mobileNumber || ""}
                        onChange={(phone) => {
                          setFormData(values => ({ ...values, "mobileNumber": phone }))
                        }}
                        inputStyle={{
                          width: "100%"
                        }}
                      />
                      <div className="bottom-line"></div>
                    </Col>
                    <Col>
                      <h5 className="form-heading">Location</h5>
                      <Form.Control
                        type="text"
                        placeholder="Enter your location"
                        value={formData?.location || ""}
                        onChange={(e) => handleFieldChange(e, 'location')}
                        className="input-field"
                      />
                      <div className="bottom-line"></div>
                    </Col>
                  </Row>

                  <Row className="mb-3 align-items-center">
                    <Col>
                      <h5 className="form-heading">Message*</h5>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Write your message..."
                        value={formData?.message || ""}
                        onChange={(e) => handleFieldChange(e, 'message')}
                        className="input-field"
                        style={{ resize: "none" }}
                      />
                      <div className="bottom-line"></div>
                    </Col>
                  </Row>
                  <Row className="mb-3 align-items-center">
                    <Col>
                    <Form.Group>
                      <Form.Check
                        type="checkbox"
                        label="By providing your phone number, you agree to receive a text message from Bilkins. Message and Data rates may apply, Message frequency varies. To stop receiving messages, reply 'STOP' at any time."
                        checked={isChecked}
                        onChange={(e) => {
                          setIsChecked(e.target.checked)
                          handleFieldChange(e, "concentOfPhoneNo")
                        }}
                      />
                    </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    type="submit"
                    variant="primary"
                    className="submit-button mt-5"
                    onClick={handleSubmit}
                  >
                    Submit Message
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
