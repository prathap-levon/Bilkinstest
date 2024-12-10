import React from "react";
import ContactIcon1 from "../../Assets/Img/other-logos/contact-icon-1.png";
import ContactIcon2 from "../../Assets/Img/other-logos/contact-icon-2.png";
import ContactIcon3 from "../../Assets/Img/other-logos/contact-icon-3.png";
import Animate from "../Animation/Animate";
const ContactCertificate = () => {
  return (
    <>
      <div className="certification-section">
        <div className="certificateHead">
          <Animate>
            <h1>Certificates</h1>
          </Animate>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <div className="cardContactBody">
              <img src={ContactIcon1} alt="Certificate 1" />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="cardContactBody">
              <img src={ContactIcon2} alt="Certificate 2" />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="cardContactBody">
              <img src={ContactIcon3} alt="Certificate 3" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactCertificate;
