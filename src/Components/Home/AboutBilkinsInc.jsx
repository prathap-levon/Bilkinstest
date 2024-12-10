import React from "react";
import hero2 from "../../Assets/Img/hero/hero-2.png";
import icons1 from "../../Assets/Img/icons/icons-1.png";
import icons2 from "../../Assets/Img/icons/icons-2.png";
import Animate from "../Animation/Animate";
import { useNavigate } from "react-router-dom";


const AboutBilkinsInc = () => {

  const navigate = useNavigate();

  const handleAboutLink = () =>{
    navigate("/about");
  }
  const handleCareerLink=()=>{
    navigate("/career")
  }

  return (
    <>
      <div className="home-about-bilkins">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="home-about-image">
              <img src={hero2} alt="hero" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="home-about-content">
              <Animate>
                <h3>About Bilkins inc</h3>
              </Animate>
              <p>
                Established in 2016, Bilkins operates from its World
                Headquarters in Washington D.C., serving as the hub for
                Recruitment & Staffing Services nationwide. With a rich legacy
                of over two decades of thought leadership, Bilkins has emerged
                as a global leader, providing unmatched recruiting and staffing
                solutions to a diverse clientele including large corporations,
                esteemed companies, and small to medium enterprises throughout
                the USA. Proudly contributing to the nation's economy, Bilkins
                remains dedicated to delivering world-class service as it
                continues its growth journey.
              </p>
            </div>

            <div className="row">
              <div className="col-lg-6">
                <div className="d-flex align-items-center mb-2">
                  <div className="icons-home-bilkins">
                    <img src={icons1} alt="icons" />
                  </div>
                  <div className="content-home-bilkins">
                    <h6>Tailored Solutions</h6>
                    <p>
                      <strong>
                        Tailored Recruitment & Staffing for Every Business Size.
                      </strong>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="d-flex align-items-center">
                  <div className="icons-home-bilkins ">
                    <img src={icons2} alt="icons" />
                  </div>
                  <div className="content-home-bilkins">
                    <h6>Economic Impact</h6>
                    <p>
                      <strong>
                        We drive business growth, fueling economic prosperity.
                      </strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex gap-4">
            <button onClick={handleAboutLink} className="home-about-us-btn mt-5">About Us</button>

            <button onClick={handleCareerLink} className="home-about-us-career-btn mt-5">Career</button>
            </div>
            

          </div>
        </div>
      </div>
    </>
  );
};

export default AboutBilkinsInc;
