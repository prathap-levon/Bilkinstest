import React from 'react'
import banner from "../../Assets/Img/hero/achievementBanner.png";
import { Container, Row, Col } from "react-bootstrap";
import circleCheck from "../../Assets/Img/icons/circle-check.png";
import { useNavigate } from "react-router-dom";

export const Achievements = () => {
    const navigate = useNavigate();

  const handleApplyLink = () =>{
    navigate("/join-us/quick-application");
  }
  const handleCareerLink=()=>{
    navigate("/career")
  }
  return (
    <div>
        <Container fluid className="achievment-container">
            <Row>
                <Col md={6}>
                <img src={banner} alt="" className="img-fluid"/>
                </Col>
                <Col md={6} className="achievement-right">
                    <h3>Achievements</h3>
                    <div className="d-flex gap-4  achievement-points">
                        <img src={circleCheck} alt="" />
                        <div>
                            <h4>Tailored Job Matches</h4>
                            <p>Fill out your profile, and let recruiters find the perfect job matches for you.</p>
                        </div>
                    </div>
                    <div className="d-flex gap-4 mt-2 achievement-points">
                        <img src={circleCheck} alt="" />
                        <div>
                            <h4>Top Pay Rates</h4>
                            <p>Discover positions offering competitive compensation, helping you reach your career ambitions faster.
.</p>
                        </div>
                    </div>
                    <div className="d-flex gap-4 mt-2 achievement-points">
                        <img src={circleCheck} alt="" />
                        <div>
                            <h4>Dedicated Support Team</h4>
                            <p>Our expert Guides are here round-the-clock to assist with any queries and offer on-the-job assistance.</p>
                        </div>
                    </div>
                    <div className="d-flex gap-4 mt-4">
                        <button onClick={handleCareerLink} className='btn-sign-up'>
                            Career
                        </button>
                        <button onClick={handleApplyLink} className='btn-log-in'>
                            Apply Now
                        </button>
                    </div>
                
                </Col>
            </Row>

        </Container>
    </div>
  )
}
