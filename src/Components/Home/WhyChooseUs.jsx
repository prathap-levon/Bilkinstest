import React from "react";
import choose from "../../Assets/Img/hero/hero-choose-us.png";
import choose1 from "../../Assets/Img/icons/choose-1.png";
import choose2 from "../../Assets/Img/icons/choose-2.png";
import choose3 from "../../Assets/Img/icons/choose-3.png";
import choose4 from "../../Assets/Img/icons/choose-4.png";
import Animate from "../Animation/Animate";

const WhyChooseUs = () => {
  const services = [
    { title: "Potential Unleashed", icon: choose1 },
    { title: "Tailored Guidance", icon: choose2 },
    { title: "Industry Insight", icon: choose3 },
    { title: "Supportive Partnership", icon: choose4 },
  ];

  return (
    <>
      <div className="why-choose-us-section">
        <div className="row align-items-sm-center">
          <div className="col-lg-6">
            <div className="home-choose-img">
              <img src={choose} alt="choose" />
            </div>
          </div>

          <div className="col-lg-6">
            <div className="home-choose-content">
              <Animate>
                <h3>Why Choose Us</h3>
              </Animate>
              <h5>Unleashing Potential, Guiding Futures</h5>
              <p>
              Choose Bilkins for your CNA career in New York and unlock unparalleled opportunities. We specialize in connecting CNAs with high-paying travel jobs in New York, ensuring top compensation and flexible schedules. As one of the top-paying CNA travel agencies in New York, we prioritize your success and satisfaction. Our local presence and expertise make us one of the best CNA staffing agencies in New York, providing personalized support and access to the highest-paying CNA jobs in the region. Trust Bilkins to elevate your career with the top travel CNA agencies in New York.
              </p>
            </div>

            <div className="row mt-4">
              {services.map((service, index) => (
                <div key={index} className="col-lg-6 mt-4">
                  <div className="choose-card-service">
                    <div className="d-flex align-items-center">
                      <div className="choose-icons">
                        <img src={service.icon} alt={`choose${index + 1}`} />
                      </div>
                      <div className="choose-title-content">
                        <span>{service.title}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhyChooseUs;
