import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Animate from '../Animation/Animate';
import { useNavigate } from "react-router-dom";

const ServicepageBanner = ({PostTitle, PostSubTitle, ImageURL}) => {

const navigate = useNavigate();

 const handleApplyLink = () => {
    navigate("/apply-now/quick-application");
  }
  const handleContactLink = () => {
    navigate("/contact");
  }
    return (
        <div className="d-flex align-items-center justify-content-center" >
            <Container fluid className='servicebanner-container'>
                <Row>
                    
                        <div className='service-banner-right'>
                            <div className='serviceBaner-text text-center'>
                                <Animate>
                                    <h1>{PostTitle}</h1>
                                </Animate>
                                <h3>{PostSubTitle}</h3>
                                <div className="d-flex justify-content-center mt-4">
                                <button className='home-about-us-btn-1'onClick={handleApplyLink}>Apply Now</button>
                                <button className='service-about-btn ml-3' onClick={handleContactLink} >Contact Us</button>
                            </div>
                            </div>
                        </div>
                    
                </Row>
            </Container>
        </div>
    )
}

export default ServicepageBanner;
