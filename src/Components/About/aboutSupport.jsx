import { Container, Card, Row, Col } from "react-bootstrap";
import image from "../../Assets/Img/hero/SupportProfile.png";
import { Link } from "react-router-dom";
import arrow from "../../Assets/Img/icons/rightarrow.png"
const AboutSupport = () => {

  return (
    <>
      <Container className="supportContainer">
        <Row>
          <Col md={6} className="">
            <Card className="shadow-sm supportCard">
              <Card.Body className="d-flex flex-row align-items-center">
                <div style={{ marginRight: "2rem" }}>
                  <img src={image} alt="icon" />
                </div>
                <div style={{ marginRight: "2rem" }}>
                  <h3>Streamlined Recruitment Process</h3>
                  <p>
                    Bilkins streamlines the recruitment process by leveraging advanced technology and industry insights.
                  </p>
                </div>
                <div className="mr-3">
                <Link to="/career">
                    <img src={arrow} alt="Arrow" />
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="">
            <Card
              className="shadow-sm supportCard "

            >
              <Card.Body className="d-flex flex-row align-items-center">
                <div style={{ marginRight: "2rem" }}>
                  <img src={image} alt="icon" />
                </div>
                <div style={{ marginRight: "2rem" }}>
                  <h3>Access to Top Talent</h3>
                  <p>
                    Bilkins has a vast network and expertise in identifying and recruiting top talent across various industries.</p>
                </div>
                <div className="mr-3">
                  <Link to="/career">
                    <img src={arrow} alt="Arrow" />
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <div className="container-fluid">
        <div className="joinUs">
          <h1>
            Let's start joining us and
             get a job
          </h1>
          <p>
            Let’s join our platform at jobs me for an experience in finding a
            job that is easier <br /> and matches what you are looking for{" "}
          </p>
          <div className="d-flex align-items-center justify-content-center">
            <button className="joinUsBtn">
              <Link to="/contact">Join Now</Link>
              </button>
            <Link to="/service" style={{marginLeft:"8px"}}>
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
      </div>
    </>
  );
};
export default AboutSupport;
