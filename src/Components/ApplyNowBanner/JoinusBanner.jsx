import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Animate from '../Animation/Animate';

export const JoinusBanner = () => {
  return (
    <div>
      <Container fluid className='servicebanner-container'>
        <Row>
          <div className='service-banner-right'>
            <div className='serviceBaner-text text-center'>
              <Animate>
                <h1>Join Us</h1>
              </Animate>
              <h4>Discover Your Next Career Opportunity</h4>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  )
}