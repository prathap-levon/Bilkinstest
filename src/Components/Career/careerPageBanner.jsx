import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Animate from '../Animation/Animate';

export const CareerPageBanner = () => {
    return (
        <div>
            <Container fluid className='aboutBanner-container'>
                <Row>
                    <Col md={6} xs={12} className='service-banner-right'>
                        <div className="AboutBanner-text">
                            <Animate>
                                <h1>Careers</h1>
                                <h4>Explore Exciting Career Opportunities with Us</h4>
                            </Animate>
                        </div>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}