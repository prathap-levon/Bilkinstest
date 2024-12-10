import React, { useState } from 'react'
import { Row, Container, Col, Form, Button } from 'react-bootstrap';
import image from "../../Assets/Img/hero/healthCareBg.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export const HealthCareDetails = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [acceptTC, setAcceptTC] = useState(false);

    const handleAcceptTCChange = (e) => {
        setAcceptTC(e.target.checked);
    };
    return (
        <>
            <Container>
                <Row>
                    <img src={image} alt=".." />
                </Row>
                <Row className="mt-4">
                    <Col md={8} >
                        <div className="servicePageDetails-text pe-4">
                            <h4>Unlock Your Future in Healthcare with Us</h4>
                            <h2>Empowering Your Career in the Dynamic World of Health Services</h2>
                            <p>Bilkins specializes in providing quality healthcare professionals to major Medical centers,
                                healthcare homes and reputed hospitals as well. Bilkins ensures to provide only the top class
                                medical practitioners, support staff, nursing attendants, anesthesia specialists, surgeons of
                                repute, subject matter experts from different departments including but not limited to gynecology,
                                psychology, radiology, dentistry, pulmonology, orthopedics, neurology, pediatrics etc. Our long association
                                of providing the healthcare services to the communities helps us to pro-actively work on the multiple staffing
                                requirements of this industry at priority</p>
                            <p>
                                <FontAwesomeIcon icon={faCheckCircle} style={{ color: "#f00f0f" }} />
                                <FontAwesomeIcon icon={faCheck} style={{ color: "white" }} />
                                Emphasis on Professional Qualities
                            </p>
                            <p>
                            <FontAwesomeIcon icon={faCheckCircle} style={{ color: "#f00f0f" }} />
                                <FontAwesomeIcon icon={faCheck} style={{ color: "white" }} />
                                Simplified Application Process
                            </p>
                        </div>
                    </Col>
                    <Col md={4} className='service-page-right-col'>
                        <div className='hiringForm-row align-items-center'>
                            <Form className="servicehiringform-section-contact">
                                <h3>Fill Form</h3>
                                <Row className="mb-2 mt-5 align-items-center">
                                    <Col>
                                        <Form.Control
                                            type="text"
                                            placeholder="Your First name"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            className="service-input-field"
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-2 mt-4 align-items-center">
                                    <Col>
                                        <Form.Control
                                            type="text"
                                            placeholder="Your Last name"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            className="service-input-field"
                                        />
                                    </Col>
                                </Row>
                                <Row className="my-3 align-items-center">
                                    <Col>
                                        <Form.Control
                                            type="email"
                                            placeholder="Your Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="service-input-field"
                                        />
                                    </Col>
                                </Row>
                                <Row className="my-3 align-items-center">
                                    <Col>
                                        <Form.Check
                                            type="checkbox"
                                            label="I hereby accept T&C of Bilkins Inc."
                                            checked={acceptTC}
                                            onChange={handleAcceptTCChange}
                                            className='checkbox-service'
                                        />
                                    </Col>
                                </Row>
                                <Button variant="primary" className="service-submit-button">
                                    Save
                                </Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
