import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Animate from '../Animation/Animate';

export const ApplyBanner = () => {
  return (
    <div>
      <Container fluid className='servicebanner-container'>
        <Row>
          <div className='service-banner-right'>
            <div className='serviceBaner-text text-center'>
              <Animate>
                <h1>Apply Now</h1>
              </Animate>
              <h4>Apply Now and Start Your Journey!</h4>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  )
}
