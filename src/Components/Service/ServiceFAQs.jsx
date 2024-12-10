import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ServiceHero from "../../Assets/Img/hero/serviceHero (1).png";
import Icon from "../../Assets/Img/icons/faq-icon.png";


const faqItems = [
  {
    question: "What sets Bilkins apart from other recruitment agencies?",
    answer:
      "Bilkins is known for its commitment to innovation, bold approach to challenging convention, and relentless pursuit of excellence. With a focus on pushing boundaries and driving positive change, Bilkins offers unparalleled recruiting and staffing services to its clients.",
  },
  {
    question: "Does Bilkins provide benefits to its employees?",
    answer:
      "Yes, Bilkins offers a range of benefits to its employees, including vacation time, holidays, medical, vision, and dental insurance, short-term disability, and more. Specific benefits may vary depending on the position and location.",
  },
  {
    question: "How can I apply for a job at Bilkins?",
    answer:
      "To apply for a job at Bilkins, you can visit their official website and browse through the available job openings. Alternatively, you can reach out to their recruitment team for more information on the application process.",
  },
  {
    question: "Does Bilkins offer opportunities for career growth?",
    answer:
      "Yes, Bilkins is committed to supporting the career growth and development of its employees. Through training programs, mentorship opportunities, and advancement opportunities, Bilkins empowers its employees to reach their full potential.",
  },
];


const ServiceFAQs = () => {
  return (
    <div>
      <Container fluid  className="faqContainer">
      <Row className="faqRow align-items-center">
        <Col md={6} className="order-md-1 order-1">
          <div className="missionLeft">
            <div className="faqImg">
              <img className="aboutfaq" src={ServiceHero} alt="Service Hero" />
            </div>
          </div>
        </Col>
        <Col md={6} className="order-md-2 order-2 featuresAccordion faqcolumn">
          <div className="heading-with-icon-container">
            <img src={Icon} alt="FAQ Icon" />
            <h5 className="faqpre-head">FAQ Question</h5>
          </div>
          <h3 className="faqhead">Frequently Asked Questions</h3>
          <div className="accordion" id="accordionPanelsStayOpenExample">
            {faqItems.map((item, index) => (
              <div className="accordion-item" key={index}>
                <h2 className="accordion-header">
                  <button
                    className={`accordion-button customAccordion-button ${
                      index === 0 ? "" : "collapsed"
                    }`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#panelsStayOpen-collapse-${index}`}
                    aria-expanded={index === 0 ? "true" : "false"}
                    aria-controls={`panelsStayOpen-collapse-${index}`}
                  >
                    {item.question}
                  </button>
                </h2>
                <div
                  id={`panelsStayOpen-collapse-${index}`}
                  className={`accordion-collapse collapse ${
                    index === 0 ? "show" : ""
                  }`}
                >
                  <div className="accordion-body">{item.answer}</div>
                </div>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default ServiceFAQs;
