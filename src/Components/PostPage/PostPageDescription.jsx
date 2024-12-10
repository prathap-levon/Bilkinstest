import React, { useState, useRef } from 'react'
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import icon10 from "../../Assets/Img/icons/MapTrifold.png";
import insta from "../../Assets/Img/icons/insta.png"
import facebook from "../../Assets/Img/icons/facebook.png"
import twitter from "../../Assets/Img/icons/twitte.png";
import mail from "../../Assets/Img/icons/mailicon.png";
import arrow from "../../Assets/Img/icons/chevron-right.png";
import phonecall from "../../Assets/Img/icons/ph_phone-call-bold.png";
import Animate from '../Animation/Animate';

const PostPageDescription = ({ postData }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [referalCode, setReferalCode] = useState("");
    const [resumeUpload, setResumeUpload] = useState("");
    const fileInputRef = useRef(null);


    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        setResumeUpload(file ? file.name : "");
    };

    const handleButtonClick = (e) => {
        e.preventDefault();
        fileInputRef.current.click();
    };

    const [acceptTC, setAcceptTC] = useState(false);

    const handleAcceptTCChange = (e) => {
        setAcceptTC(e.target.checked);
    };
    // const cardsData = [
    //     { title: "Job Posted:", date: "14 March 2024", icon: icon6 },
    //     { title: "Job expire in:", date: "14 August 2024", icon: icon7 },
    //     { title: "Job Level:", date: "Entry Level", icon: icon5 },
    //     { title: "Experience", date: "$50k-80k/month", icon: icon8 },
    //     { title: "Education", date: "Graduation", icon: icon9 },
    // ];

    return (
        <div>
            <Container fluid className='servicepage-Process-container'>
                <Row>
                    <Col md={8}>
                        <div className='service-page-process-text'>
                            <p>
                                {postData?.postDescription}
                            </p>
                        </div>

                    </Col >
                    <Col md={4} className="service-page-right mt-4 " style={{ position: 'sticky', top: 0 }}>
                        <div className='hiringForm-row align-items-center'>
                            <Form className="servicehiringform-section-contact">
                                <h3>Fill Form</h3>
                                <div className="p-3">
                                    <Row className="mb-2  align-items-center">
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

                                            <Form.Control
                                                type="phone"
                                                placeholder="Your Phone Number"
                                                value={phoneNumber}
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                                className="service-input-field"
                                            />

                                        </Col>

                                    </Row>
                                    <Row className="my-3 align-items-center">
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                placeholder="Referal Code"
                                                value={referalCode}
                                                onChange={(e) => setReferalCode(e.target.value)}
                                                className="service-input-field"
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="my-3 align-items-center">
                                        <Col className="d-flex flex-column gap-2 ">
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                style={{ display: "none" }}
                                                onChange={handleFileInputChange}
                                            />
                                            <button className="btn-sign-up justify-content-center" onClick={handleButtonClick}>
                                                Upload Resume
                                            </button>
                                            {resumeUpload && (
                                                <span > {resumeUpload}</span>
                                            )}
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
                                </div>

                            </Form>
                        </div>
                        <Animate>
                            <h1 className='job-details-h1'>Job Overview</h1>
                        </Animate>

                        <div className='service-job-details'>
                            <div className='service-job-location'>
                                <div style={{ borderRight: "2px solid #e0e7fa", paddingRight: "3px" }}>
                                    <h3>Salary(USD)</h3>
                                    <h4>${postData?.minSalary} - ${postData?.maxSalary}</h4>
                                    <p>Yearly salary</p>
                                </div>
                                <div className="align-items-center justify-content-center">
                                    <img src={icon10} alt="..." style={{ paddingLeft: "40px" }} />
                                    <p>Job Location</p>
                                    <p>Dhaka,Bangladesh</p>
                                </div>
                            </div>
                            <button className='apply-button'>
                                Apply Now
                                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.5 12H19.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M12.5 5L19.5 12L12.5 19" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>

                            </button>
                        </div>
                        <div className='service-job-details'>
                            <div className="d-flex justify-content-center post-page-hiring  ">
                                <h1 className=''>Hiring</h1>
                            </div>
                            <div className="d-flex justify-content-center flex-column">
                                <button className='post-page-apply-button'>
                                    Nursing Jobs
                                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="24" height="24" transform="translate(0.859375)" fill="#CE1B28" />
                                        <path d="M5.85938 12H19.8594" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M12.8594 5L19.8594 12L12.8594 19" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </button>
                                <button className='post-page-apply-button'>
                                    Allied Jobs
                                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="24" height="24" transform="translate(0.859375)" fill="#CE1B28" />
                                        <path d="M5.85938 12H19.8594" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M12.8594 5L19.8594 12L12.8594 19" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className='servicePage-socialmedia'>
                            <Animate>
                                <h1>Share This Job:</h1>
                            </Animate>

                            <button className='copylinks-button'>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.81738 15.1804L15.1813 8.81641" stroke="#CE1B28" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M13.5909 16.7722L10.9392 19.4238C10.0953 20.2675 8.95077 20.7414 7.75743 20.7413C6.56409 20.7412 5.41965 20.2671 4.57583 19.4233C3.73201 18.5794 3.25791 17.435 3.25781 16.2417C3.25771 15.0483 3.73161 13.9038 4.57529 13.0598L7.22694 10.4082" stroke="#CE1B28" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M16.7731 13.5909L19.4248 10.9392C20.2685 10.0953 20.7424 8.95077 20.7423 7.75743C20.7422 6.56409 20.2681 5.41965 19.4243 4.57583C18.5804 3.73201 17.436 3.25791 16.2427 3.25781C15.0493 3.25771 13.9048 3.73161 13.0608 4.57529L10.4092 7.22694" stroke="#CE1B28" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>

                                Copy Links
                            </button>
                            <div className="d-flex gap-4 mt-4 align-items-center">
                                <button className='copylinks-button'>
                                    <img src={insta} alt=".." />
                                </button>
                                instagram.com
                            </div>
                            <div className="d-flex gap-4 mt-4 align-items-center">
                                <button className='copylinks-button'>
                                    <img src={facebook} alt=".." />
                                </button>
                                facebook.com
                            </div>
                            <div className="d-flex gap-4 mt-4 align-items-center">
                                <button className='copylinks-button'>
                                    <img src={twitter} alt=".." />
                                </button>
                                twitter.com
                            </div>
                            <div className="d-flex gap-4 mt-4 align-items-center">
                                <button className='copylinks-button'>
                                    <img src={mail} alt=".." />
                                </button>
                                Mail Us
                            </div>
                        </div>

                        <div className='location-service-list'>
                            <h3>Location</h3>
                            <div className="d-flex gap-2">
                                <img src={arrow} alt=".." />
                                <h4>Virginia</h4>

                            </div>
                            <div className="d-flex gap-2">
                                <img src={arrow} alt=".." />
                                <h4>Massachusetts</h4>

                            </div>
                            <div className="d-flex gap-2">
                                <img src={arrow} alt=".." />
                                <h4>illinois</h4>

                            </div>
                            <div className="d-flex gap-2">
                                <img src={arrow} alt=".." />
                                <h4>New york</h4>

                            </div>
                            <div className="d-flex gap-2">
                                <img src={arrow} alt=".." />
                                <h4>Rhode islands</h4>

                            </div>
                            <div className="d-flex gap-2">
                                <img src={arrow} alt=".." />
                                <h4>Maryland</h4>

                            </div>
                        </div>
                        <div className='serviceCall'>
                            <img src={phonecall} alt=".." />
                            <h3>Feel Free To give us A Call</h3>
                            <p>We are available 24X7</p>
                            <button className='submit-button'>+91 8660048488</button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default PostPageDescription;