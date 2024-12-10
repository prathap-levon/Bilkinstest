import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import hiringTeam from "../../Assets/Img/user/hiringTeam.png"
import { showErrorAlert, showSuccessAlert } from "../../globalConstant";
import Instance from "../../AxiosConfig";


const HiringForm = () => {
  const [formData, setFormData] = useState({});
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleFieldChange = (fieldName, e) => {
    try {
      setFormData((prevData)=>({
        ...prevData,
        [fieldName]:e.target.value
      }))
    } catch (error) {
      console.error(error);
    }
  }

  const isFormValid = ()=>{
    try {
      if (!formData?.firstName || formData?.firstName?.trim() === '') {
        showErrorAlert('First Name required')
        return false;
      }
      if (!formData?.email || formData?.email?.trim() === '') {
        showErrorAlert('Email required')
        return false;
      }else if (!emailRegex.test(formData?.email)) {
        showErrorAlert('Please Enter valid Email')
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

  const handleSubmit = async()=>{
    try {
      if (!isFormValid()) return;
      const response = await Instance.post('/sendQuery',formData,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response?.status === 200) {
        showSuccessAlert('Message sent successfully. We will contact you soon.');
        setFormData({});
      }
    } catch (error) {
      showErrorAlert(error?.response?.data?.message || 'An error occured');
      console.error(error);
    }  
  }


  return (
    <Container fluid className="hiringForm-container">
      <Row className='hiringForm-row align-items-center'>
        <Col md={6}>
          <div>
            <Col md={10}>
              <Form className="hiringform-section-contact">
                <h3>I'm Interested</h3>
                <Row className="mb-3 mt-5 align-items-center">
                  <Col>
                    <h5 className="form-heading">Your Name*</h5>
                    <Form.Control
                      type="text"
                      placeholder="Enter Your Name"
                      value={formData?.firstName || ''}
                      onChange={(e) => {handleFieldChange('firstName',e)}}
                      className="input-field"
                    />
                    <div className="bottom-line"></div>
                  </Col>

                </Row>
                <Row className="my-3 align-items-center">
                  <Col>
                    <h5 className="form-heading"> Your Email*</h5>
                    <Form.Control
                      type="email"
                      placeholder="Enter Your Email"
                      value={formData?.email || ''}
                      onChange={(e) => handleFieldChange('email',e)}
                      className="input-field"
                    />
                    <div className="bottom-line"></div>
                  </Col>

                </Row>

                <Row className="mb-3 align-items-center">
                  <Col>
                    <h5 className="form-heading"> Your Message*</h5>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter Your Message"
                      value={formData?.message || ''}
                      onChange={(e) => handleFieldChange('message',e)}
                      className="input-field"
                      style={{ resize: "none" }}
                    />
                    <div className="bottom-line"></div>
                  </Col>
                </Row>
                <Button variant="primary" className="submit-button" onClick={handleSubmit}>
                  Send Message
                </Button>
              </Form>
            </Col>

          </div>

        </Col>
        <Col md={6} className="hiringImage-col">
          <img src={hiringTeam} className="img-fluid" alt=".." />

        </Col>


      </Row>
    </Container>
  )
}
export default HiringForm;