import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import MultiStepForm from './JoinUsMultiStep';
import { FaArrowLeft } from "react-icons/fa6";

export const JoinUsFullApplication = () => {
    const navigate = useNavigate();

    const handlequickLink = () => {
        navigate("/join-us/quick-application");
    }
    const handlefullLink = () => {
        navigate("/join-us/full-application");
    }
    return (
        <div>
            <>
                <Container className='apply-job-now'>
                    <Row>
                        <Col md={12} className='apply-job-left'>
                            <button onClick={() => { navigate('/') }} className='back-button'><FaArrowLeft />Back To Home</button>
                            <div className="d-flex gap-4 justify-content-center">
                                <button onClick={handlequickLink} className='btn-log-in'>Quick Appliction</button>

                                <button onClick={handlefullLink} className='btn-sign-up'>Full Application</button>
                            </div>
                        </Col>
                        <Col md={12} className="apply-job-right-col">
                            <MultiStepForm />
                        </Col>
                    </Row>
                </Container>
            </>
        </div>
    )
}
