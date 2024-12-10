import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import careerBanner from "../../Assets/Img/hero/careerHero.png";
import image1 from "../../Assets/Img/hero/careerProfile1.png";
import image2 from "../../Assets/Img/hero/careerProfile2.png";
import image3 from "../../Assets/Img/hero/careerProfile3.png";
import { Link } from "react-router-dom";
import Animate from "../Animation/Animate";

const CareerBanner = () => {
  return (
    <>
      <div className="career-container container-fluid">
        <Row>
          <Col md={6} className="order-md-1 order-1 careerHead">
            <Animate>
              <h1>Craft Your Career Path</h1>
            </Animate>
            <h3>Navigate Your Professional Future</h3>
            <p>
              Welcome to Bilkins, where we invite professionals like you to embark on a journey of growth and success.
              We value enthusiasm, passion, and innovation, and we're always open to new ideas. At Bilkins, we seek individuals
              with exceptional technical and interpersonal skills, deep domain knowledge, and proven expertise in their fields.
              Bilkins is here to partner with you in your career growth and success story.
            </p>
            <button className="careerButton ">
              <Link to="/contact" className="button-link">Let's Connect</Link>
              <svg
                style={{ marginLeft: "4px" }}
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.586 5.65643L6.636 1.70643C6.45384 1.51783 6.35305 1.26523 6.35533 1.00303C6.3576 0.740833 6.46277 0.49002 6.64818 0.304612C6.83359 0.119204 7.0844 0.014035 7.3466 0.0117566C7.6088 0.00947813 7.8614 0.110273 8.05 0.292431L13.707 5.94943C13.8002 6.04208 13.8741 6.15224 13.9246 6.27358C13.9751 6.39491 14.001 6.52502 14.001 6.65643C14.001 6.78784 13.9751 6.91795 13.9246 7.03928C13.8741 7.16062 13.8002 7.27078 13.707 7.36343L8.05 13.0204C7.95775 13.1159 7.84741 13.1921 7.7254 13.2445C7.6034 13.2969 7.47218 13.3245 7.3394 13.3257C7.20662 13.3268 7.07494 13.3015 6.95205 13.2513C6.82915 13.201 6.7175 13.1267 6.62361 13.0328C6.52971 12.9389 6.45546 12.8273 6.40518 12.7044C6.3549 12.5815 6.3296 12.4498 6.33075 12.317C6.3319 12.1842 6.35949 12.053 6.4119 11.931C6.46431 11.809 6.54049 11.6987 6.636 11.6064L10.586 7.65643H1C0.734784 7.65643 0.48043 7.55107 0.292893 7.36354C0.105357 7.176 0 6.92165 0 6.65643C0 6.39121 0.105357 6.13686 0.292893 5.94932C0.48043 5.76179 0.734784 5.65643 1 5.65643H10.586Z"
                  fill="white"
                />
              </svg>
            </button>
          </Col>
          <Col md={6} className="order-md-2 order-2">
            <div className="d-flex justify-content-center align-items-center">
              <img
                src={careerBanner}
                alt="careerBanner"
                className="img-fluid"
              />
            </div>
          </Col>
        </Row>
      </div>
      <Container className=" shadow-sm career-container-icons">
        <Row className="IconRow">
          <Col className="careerIcons">
            <img src={image1} alt="icon" />
            <div>
              <h1>1.5K</h1>
              <span>Happy People</span>
            </div>
          </Col>
          <Col className="careerIcons">
            <img src={image2} alt="icon" />
            <div>
              <h1>1.5K</h1>
              <span>Happy People</span>
            </div>
          </Col>
          <Col className="careerIcons">
            <img src={image3} alt="icon" />
            <div>
              <h1>1.5K</h1>
              <span>Happy People</span>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default CareerBanner;
