import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Animate from '../Animation/Animate';

export const ConatctBanner = () => {
    return (
        <div>
            <Container fluid className='contactbanner-container'>
                <Row>
                    <Col md={6} className='contact-banner-right'>
                        <div className="contactBanner-text">
                            <Animate>
                                <h1>Contact Us</h1>
                                <h2>Let's Get In Touch</h2>
                                <h4>Feel free to ask any questions before your next travel job.</h4>
                            </Animate>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
