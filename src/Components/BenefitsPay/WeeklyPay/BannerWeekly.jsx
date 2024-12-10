import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Animate from '../../Animation/Animate';

const BannerWeekly = () => {
    return (
        <div>
            <Container fluid className='aboutBanner-container'>
                <Row>
                    <Col md={6} xs={12} className='service-banner-right'>
                        <div className="AboutBanner-text">
                            <Animate>
                                <h1>Weekly Pay</h1>
                                <h4>Weekly Pay for Bilkins Inc. Travelers</h4>
                            </Animate>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default BannerWeekly;
