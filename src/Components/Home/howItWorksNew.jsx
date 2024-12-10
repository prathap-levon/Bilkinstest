import React from 'react'
import banner from "../../Assets/Img/hero/hero-1.png";
import { Container, Row, Col } from "react-bootstrap";
import circleCheck from "../../Assets/Img/icons/circle-check.png";


export const HowItWorksNew = () => {
    return (
        <div>
            <Container className="how-it-work-container">
                <Row>
                    <Col md={6} className="how-it-work-left">
                        <h3>How It Works</h3>
                        <h4>Interested in Traveling With Bilkins? Just Click</h4>
                        <p>As America's largest travel Nursing Agency, and a leading allied and Bilkins, We make this simple, we provide you with the opportunities, Resources, Technology and support you need to grow your career, Travelling with Bilkins is as Easy as 1-2-3.</p>
                        <div className="d-flex gap-4  achievement-points">
                            <img src={circleCheck} alt="" />
                            <div>
                                <p>Register now and Complete your profile. Be as detailed as possible.</p>
                            </div>
                        </div>
                        <div className="d-flex gap-4 mt-2 achievement-points">
                            <img src={circleCheck} alt="" />
                            <div>
                                <p>Log into search jobs, View pay packages and review facility Information.</p>
                            </div>
                        </div>
                        <div className="d-flex gap-4 mt-2 achievement-points">
                            <img src={circleCheck} alt="" />
                            <div>
                                <p>Click I’m Interested to let your Recruiter Know.</p>
                            </div>
                        </div>
                    </Col>
                    <Col md={6}>
                        <img src={banner} alt="" className='img-fluid how-it-works-banner' />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
