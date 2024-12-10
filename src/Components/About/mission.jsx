import React from "react";
import image from "../../Assets/Img/hero/aboutMission.png";
import { Card } from "react-bootstrap";
import Animate from "../Animation/Animate";

const Mission = () => {
  return (
    <div>
      <div className="container-fluid">
        <div className="no-gutters row py-5">
          <div className="order-md-1 order-1 col-lg-5">
            <div className="missionLeft">
              <div className="d-flex ">
                <img className="aboutMission" src={image} alt="aboutimage" />
              </div>
            </div>
          </div>
          <div className="order-md-2 order-2 col-lg-7">
            <div className="missionRight ">
              <Animate>
                <h1>Our Mission</h1>
              </Animate>
              <h3 className="mt-1">Committed to serve you</h3>
              <p className="mt-4">
              Bilkins' mission is to assist our clients in enhancing corporate efficiency
               by matching the best people to their needs and ensuring that the professionals 
               we place achieve their career objectives. To deliver top professionals in every area 
               and specialty we serve, we strive to be a trusted resource and partner, embracing a diverse
                range of talents, experiences, and capabilities. Our corporate culture is grounded in mutual respect
                 for our clients, partners, and all individuals we serve. It's the dedication, integrity, competence, 
                 creativity, and execution that contribute to our growth and success year after year.

              </p>
            </div>
          </div>
        </div>

        <div className="visionHead">
          <Animate>
            <h1>Our Vision</h1>
          </Animate>
          <h3>Empowering Careers, Connecting Futures</h3>
        </div>
        <div className="row py-5">
          <div className="col-lg-4 d-flex justify-content-center">
            <Card className="cardBody shadow hover-cardd">
              <Card.Body>
                <Card.Title className="cardTitle">
                Excellence in <br /> Service Delivery
                </Card.Title>
                <Card.Text className="cardText">
                Our vision is to lead the industry in service excellence, consistently exceeding client expectations by delivering tailored solutions with precision and efficiency.

                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-4 d-flex justify-content-center">
            <Card  className="cardBody shadow">
              <Card.Body>
                <Card.Title className="cardTitle">
                Innovation  <br /> and Adaptability
                </Card.Title>
                <Card.Text className="cardText">
                We aspire to be at the forefront of innovation, continually evolving to meet the dynamic needs of our clients and the ever-changing business landscape.

                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-4 d-flex justify-content-center">
            <Card  className="cardBody shadow">
              <Card.Body>
                <Card.Title className="cardTitle">
                Global  <br /> Impact
                </Card.Title>
                <Card.Text className="cardText">
                Our vision extends globally, aiming to make a meaningful impact on communities and industries worldwide through our commitment to integrity, sustainability, and social responsibility
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Mission;
