import React from "react";
import image from "../../Assets/Img/hero/aboutBanner1.png";
import { Row, Col } from "react-bootstrap";
import Animate from "../Animation/Animate";
import { Link } from "react-router-dom";

const HeroBanner = () => {
  return (
    <div className=" ">
      <div className="container-fluid">
        <Row className="no-gutters">
          <Col md={6} className="order-md-1 order-2">
            <div className="headLeft mt-5 ml-8">
              <Animate>
              <h3 className="mt-1">Company Overview</h3>
                <h1> Bilkins Inc</h1>
              </Animate>
              
              <p className="mt-4">
                Established in 2016, Bilkins operates from its World
                Headquarters in Washington D.C., serving as the hub for
                Recruitment & Staffing Services nationwide. With a rich legacy
                of over two decades of thought leadership, Bilkins has emerged
                as a global leader, providing unmatched recruiting and staffing
                solutions to a diverse clientele including large corporations,
                esteemed companies, and small to medium enterprises throughout
                the USA.
              </p>
              <button className="aboutButton mt-4">
              <Link to="/contact" className="button-link">Contact Us</Link>
                </button>
            </div>
          </Col>
          <Col md={6} className="order-md-2 order-1">
            <div className="headRight">
              <div className="d-flex justify-content-center align-items-center">
                <img
                  className="aboutImage img-fluid"
                  src={image}
                  alt="aboutimage"
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default HeroBanner;
