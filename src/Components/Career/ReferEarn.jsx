import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import image from "../../Assets/Img/hero/referfriend.jpg";
import Animate from "../Animation/Animate";
import { MdOutlineEmail } from "react-icons/md";

const ReferEarn = () => {
  
  return (
    <Container className="refer-earn-container">
      <Row className="">
        <Col md={5} className="referText_img" >
          <img src={image} alt="referImage" className="img-fluid" />
        </Col>
        <Col md={7} className="referText" >
          <Animate>
            <h1>Refer Friends.</h1>
            <h1>Earn Money Together</h1>
          </Animate>

          <p className="mt-4">
            Invite Your friends and share up to 30% of trading fee for Referral Reward.
          </p>

          <a href="mailto:referral@bilkins.com" className="email_referral_code"><MdOutlineEmail style={{ fontSize: '25px', color: 'gray' }} />  referral@bilkins.com</a>
        </Col>
      </Row>
    </Container>
  );
};
export default ReferEarn;
