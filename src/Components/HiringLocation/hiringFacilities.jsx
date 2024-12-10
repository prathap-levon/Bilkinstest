import React from "react";
import { Row, Col } from "react-bootstrap";
import image from "../../Assets/Img/user/hiringFacilities.png";

export const HiringFacilities = () => {
  return (
    <div>
      <div className="facilityContainer container-fluid ">
        <div className="facilitiesHead ">
          <h1>Our Facilities</h1>
          <h3 className="mt-1">You are at right place</h3>
        </div>
        <Row className="facilityRow">
          <Col md={6} className="order-md-1 order-1">
            <div className="missionLeft">
              <div className="facilityImg">
                <img className="aboutFacility" src={image} alt="aboutimage" />
              </div>
            </div>
          </Col>
          <Col md={6} className="order-md-2 order-2 featuresAccordion">
            <div>
              <h3>Empowering Careers, Connecting Futures</h3>

              <p>
                Transforming Recruitment & Staffing Solutions for Success
              </p>
            </div>
            <div className="accordion" id="accordionPanelsStayOpenExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button customAccordion-button justify-content-between  "
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapseOne"
                    aria-expanded="true"
                    aria-controls="panelsStayOpen-collapseOne"
                  >
                    What type of facilities does Bilkins offer?
                  </button>
                </h2>
                <div
                  id="panelsStayOpen-collapseOne"
                  className="accordion-collapse collapse show"
                >
                  <div className="accordion-body">
                    Bilkins provides state-of-the-art facilities designed to facilitate seamless operations and
                    enhance client experiences. Our facilities include modern office spaces, dedicated meeting rooms,
                    and advanced technological infrastructure.


                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button customAccordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapseTwo"
                    aria-expanded="false"
                    aria-controls="panelsStayOpen-collapseTwo"
                  >
                    Where are Bilkins' facilities located?
                  </button>
                </h2>
                <div
                  id="panelsStayOpen-collapseTwo"
                  className="accordion-collapse collapse"
                >
                  <div className="accordion-body">
                    Bilkins' facilities are strategically located in key business hubs
                    to ensure accessibility and convenience for clients and employees. Our primary
                    locations include our World Headquarters in Washington D.C. and regional offices
                    in major cities across the USA.

                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button customAccordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapseThree"
                    aria-expanded="false"
                    aria-controls="panelsStayOpen-collapseThree"
                  >
                    Are Bilkins' facilities equipped with the latest technology?
                  </button>
                </h2>
                <div
                  id="panelsStayOpen-collapseThree"
                  className="accordion-collapse collapse"
                >
                  <div className="accordion-body">
                    Yes, Bilkins' facilities are equipped with cutting-edge technology to support
                    our clients' needs and provide a conducive environment for collaboration and productivity.
                    This includes high-speed internet connectivity, video conferencing capabilities, and advanced
                    security systems.
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default HiringFacilities;
