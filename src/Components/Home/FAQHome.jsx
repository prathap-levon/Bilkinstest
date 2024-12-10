import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Icon from "../../Assets/Img/icons/faq-icon.png";
import "../../Pages/PostDetails/postdetails.css"

const FAQHome = ({ FAQs = [] }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [visibleFAQs, setVisibleFAQs] = useState(2);

  const toggleAccordion = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const showMoreFAQs = () => {
    setVisibleFAQs(visibleFAQs + 2);
  };

  const hideFAQs = () => {
    setVisibleFAQs(2);
  };

  return (
    <div>
      <div className="home-faq-section">
        <Row className="d-flex justify-content-center align-items-center mt-4">
          <Col
            md={6}
            className="order-md-2 order-2 featuresAccordion faqcolumn"
          >
            <div className="heading-with-icon-container">
              <img src={Icon} alt="..." />
              <h5 className="faqpre-head">FAQ Question</h5>
            </div>

            <div className="accordion" id="accordionPanelsStayOpenExample">
              {FAQs.slice(0, visibleFAQs).map((item, index) => (
                <div
                  className={`accordion-item ${expandedIndex === index ? "active" : ""}`}
                  key={index}
                >
                  <h3 className="accordion-header">
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
                  </h3>
                  <div
                    id={`faq-collapse-${index}`}
                    className={`accordion-collapse collapse ${expandedIndex === index ? "show" : ""}`}
                  >
                    <div className={`accordion-body ${expandedIndex === index ? "show" : ""}`}>
                      {item.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {visibleFAQs < FAQs.length && (
              <button className="btn-show--more mt-3" onClick={showMoreFAQs}>
                Show More
              </button>
            )}
            &nbsp;&nbsp;
            {visibleFAQs > 2 && (
              <button className="btn-hide--more mt-3" onClick={hideFAQs}>
                Hide
              </button>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default FAQHome;
