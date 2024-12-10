import React from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import Animate from '../Animation/Animate';

export const HealthCareBanner = () => {
    return (
        <div>
            <Container fluid className='servicebanner-container'>
                <Row>
                    <Col xs={0} md={6}>

                    </Col>
                    <Col md={6} xs={12} className='service-banner-right'>
                        <div className="AboutBanner-text">
                            <Animate>
                            <h1>Health Care Staffing</h1>
                            </Animate>
                            
                            
                            
                        </div>

                    </Col>
                </Row>


            </Container>

        </div>
    )
}
