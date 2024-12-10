import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Animate from '../../Animation/Animate';

const BannerSickLeave = () => {
    return (
        <div>
            <Container fluid className='aboutBanner-container'>
                <Row>
                    <Col md={6} xs={12} className='service-banner-right'>
                        <div className="AboutBanner-text">
                            <Animate>
                                <h1>Referral Bonus</h1>
                                <h4>“Referral” Bonus Terms and Eligibility</h4>
                            </Animate>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default BannerSickLeave;
