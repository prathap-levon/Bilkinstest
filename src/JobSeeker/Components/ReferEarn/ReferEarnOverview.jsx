import { Form, Input } from "antd";
import React from "react";
import { FaFacebookSquare, FaWhatsappSquare, FaLinkedin } from "react-icons/fa";
import { FaSquareTwitter } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
export const ReferEarnOverview = () => {
    const navigate=useNavigate();
  return (
    <div className="jobseeker-refer-earn-section">
      <div className="container">
        <div className="row">
          <div className="jobseeker-refer-earn-banner">
            <div className="col-lg-5" style={{ padding: "35px 20px" }}>
              <h4>Bilkins Referral Program</h4>
              <h5>Refer a traveler and you can each earn up to $100</h5>
              <br />
              <p>
                Invite a friend to register with us through your unique referral
                link.
              </p>
              <p>
                Once your friend registers, applies for a job, and has their
                first packet successfully submitted, you each get $100. That's a
                win, win!
              </p>
              <p>
                After your friend completes their first assignment, you each get
                an additional $500.
              </p>
              <a href="#">Referral Program Terms and Conditions</a>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="jobseeker-refer-earn-details">
            <h4>Share your link with friends!</h4>
            <div className="d-flex gap-2">
              <a href="#">
                https://www.Bilkins.com/in/en/p/alex-desk-black-brown-90473556
              </a>
              <button className="jobseeker-basic-button">Copy</button>
            </div>
            <div className="d-flex gap-5 mt-4">
              <button className="jobseeker-refer-social-media">
                <FaFacebookSquare style={{ color: "#1976D2" }} size={32} />
                <p>Facebook</p>
              </button>
              <button
                className="jobseeker-refer-social-media"
                style={{ backgroundColor: "#c0e9fc" }}
              >
                <FaSquareTwitter style={{ color: "#54ACEE" }} size={32} />
                <p>Twitter</p>
              </button>
              <button
                className="jobseeker-refer-social-media"
                style={{ backgroundColor: "#cff0d3" }}
              >
                <FaWhatsappSquare style={{ color: "#47db52" }} size={32} />
                <p>WhatsApp</p>
              </button>
              <button
                className="jobseeker-refer-social-media"
                style={{ backgroundColor: "#c9edfd" }}
              >
                <FaLinkedin style={{ color: "#1976D2" }} size={32} />
                <p>LinkedIn</p>
              </button>
            </div>
          </div>
          <div className="mt-5 jobseeker-refer-earn-details">
            <h4 style={{marginBottom:"0px"}}>Refer a friend</h4>
            <p>We will send them a nice invitation on your behalf.</p>
            <Form>
              <div className="row">
                <div className="col-lg-2">
                  <Form.Item name="firstName" className="add-profile-form">
                    <Input placeholder="First Name" />
                  </Form.Item>
                </div>

                <div className="col-lg-2">
                  <Form.Item name="lastName" className="add-profile-form">
                    <Input placeholder="Last Name" />
                  </Form.Item>
                </div>
                <div className="col-lg-3">
                  <Form.Item name="lastName" className="add-profile-form">
                    <Input placeholder="Email" />
                  </Form.Item>
                </div>
                <div className="col-lg-3">
                  <button className="jobseeker-send-invitation">Send Invitation</button>
                </div>
              </div>
            </Form>
            <button className="add-profile-education" onClick={()=>navigate('/user/referal-status')}>Check Referral Status</button>
          </div>
          <div className="jobseeker-bonus-terms">
            <h4>Bonus Terms and Eligibility</h4>
            <ul >
                <li>
               <strong>Referral Bonus Terms and Eligibility</strong><br/>
                Outlines conditions for earning bonuses through successful referrals.
            </li>
            <li>
                <strong>Referral Completed Assignment” Bonus Terms and Eligibility</strong><br/>
                Details conditions for earning bonuses when a referred individual completes their first assignment
            </li>
            <li>
                <strong>Referred Bonus Terms and Eligibility</strong><br/>
               Specifies conditions for bonuses when individuals are successfully referred.
            </li>
            <li>
                <strong>Referred Completed Assignment Bonus Terms and Eligibility</strong><br/>
                Outlines terms and eligibility for bonuses when a referred individual completes their initial assignment. The referral section encourages engagement
                and growth within the Bilkins community while providing tangible benefits to both referrers and new members.
            </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
