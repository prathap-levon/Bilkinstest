import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import ServiceHero from "../../Assets/Img/hero/postFaqImage.png";
import Icon from "../../Assets/Img/icons/faq-icon.png";
import Animate from "../Animation/Animate";



const FAQPost = ({ FAQs }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleAccordion = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div>
      <div className="home-faq-section my-4">
        <Row className="align-items-center">
          <Col md={6} className="order-md-1 order-1">
            <div className="missionLeft mx-4">
              <div className="faqImg">
                <img className="postfaq" src={ServiceHero} alt="" />
              </div>
            </div>
          </Col>
          <Col
            md={6}
            className="order-md-2 order-2 featuresAccordion faqcolumn"
          >
            <div className="heading-with-icon-container">
              <img src={Icon} alt="..." />
              <h5 className="faqpre-head">FAQ Question</h5>
            </div>

            <Animate>
              <h3 className="faqhead">Frequently Asked Questions</h3>
            </Animate>
            <div className="accordion" id="accordionPanelsStayOpenExample">
              {FAQs?.map((item, index) => (
                <div
                  className={`accordion-item ${expandedIndex === index ? "active" : ""
                    }`}
                  key={index}
                >
                  <h2 className="accordion-header">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="faq-line"></div>
                      <button
                        className="accordion-button"
                        type="button"
                        onClick={() => toggleAccordion(index)}
                        aria-expanded={expandedIndex === index}
                        aria-controls={`faq-collapse-${index}`}
                      >
                        {item.question}
                      </button>
                      <div className="plus-minus-icon">
                        {expandedIndex === index ? "-" : "+"}
                      </div>
                    </div>
                  </h2>
                  <div
                    id={`faq-collapse-${index}`}
                    className={`accordion-collapse collapse ${expandedIndex === index ? "show" : ""
                      }`}
                  >
                    <div className="accordion-body">{item.answer}</div>
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default FAQPost;
