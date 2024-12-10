import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import upArrow from "../../Assets/Img/hero/upwardArrow.png";
import downArrow from "../../Assets/Img/hero/downwardArrow.png";
import woman from "../../Assets/Img/user/woman.png";
// import image from "../../Assets/Img/hero/SupportProfile.png";
import icon1 from "../../Assets/Img/icons/flowchartIcon1.png";
import icon2 from "../../Assets/Img/icons/flowcharticon2.jpg";
import icon3 from "../../Assets/Img/icons/FlowchartIcon3.png";
import icon4 from "../../Assets/Img/icons/FlowchartIcon4.png"
import { Link } from "react-router-dom";

const Step = ({ title, description, image }) => {
  return (
    <div>
      <img src={image} alt="icon" style={{ marginLeft: "4rem" }} />
      <h6>{title}</h6>
      <p>{description}</p>
    </div>
  );
};

const WorkingChart = () => {
  return (
    <div className="workingChart-container container-fluid">
      <Row className="workingChart-row">
        <h3>How It Works</h3>
        <div className="flowchart-latest">
          <Step
            title="Create Account"
            description="Join our platform to unlock exclusive job opportunities and take the next step in your career journey."
            image={icon1}

          />
          <img src={upArrow} className="uparrowImage" alt=",..." />
          <Step
            title="Upload CV/Resume"
            description="Share your professional story effortlessly by uploading your CV/Resume and showcase your skills and experience to potential employers."
            image={icon2}
          />
          <img src={downArrow} className="downarrowImage" alt=",..." />
          <Step
            title="Find Suitable Job"
            description="Discover the perfect job match tailored to your skills, preferences, and career goals with our intuitive job search tools."
            image={icon3}
          />
          <img src={upArrow} className="uparrowImage" alt=",..." />
          <Step
            title="Apply Job"
            description="Seize the opportunity and apply for your dream job with just a few clicks, taking the first step towards a rewarding career path"
            image={icon4}
          />
        </div>
      </Row>
      <Row className="locationSupportUs">
        <Col md={4} style={{ paddingLeft: "2rem" }}>
          <img className="locationImg-hiring" src={woman} alt="..." />
        </Col>
        <Col md={8}>
          <div className="hiringjoinUs">
            <h1>
              Let's start joining us and
              <br /> get a job
            </h1>
            <p>
              Let’s join our platform at jobs me for an experience in finding a
              job that is easier <br /> and matches what you are looking for{" "}
            </p>
            <div className="d-flex  justify-content-center">
              <button className="joinUsBtn">
                <Link to="/contact">Join Now</Link>
              </button>
              <Link to="/service" style={{ marginLeft: "8px" }}>
                Learn More
                <svg
                  style={{ marginLeft: "4px" }}
                  width="16"
                  height="12"
                  viewBox="0 0 16 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 6H15M15 6L9.75 1M15 6L9.75 11"
                    stroke="#CE1B28"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default WorkingChart;
