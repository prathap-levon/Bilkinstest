import React from "react";
import footerlogo from "../Assets/Img/logos/logo.png";
import footer1 from "../Assets/Img/other-logos/footer-icon-1.png";
import footer2 from "../Assets/Img/other-logos/footer-icon-2.png";
import footer3 from "../Assets/Img/other-logos/footer-icon-3.png";
import footer5 from "../Assets/Img/other-logos/footer-icon-5.png";
import call from "../Assets/Img/icons/call.png";
import fax from "../Assets/Img/icons/fax.png";
import mail from "../Assets/Img/icons/mail.png";
import fb from "../Assets/Img/icons/fb.png";
import x from "../Assets/Img/icons/x.png";
import linkedin from "../Assets/Img/icons/linkedin.png";
import location from "../Assets/Img/icons/location-footer.png";
import instagram from "../Assets/Img/icons/instagram.png";
import top from "../Assets/Img/icons/top-call.png";
import { Link } from "react-router-dom";
import Animate from "../Components/Animation/Animate";

const Footer = () => {
  return (
    <div className="">
      <div className="top-footer">
        <div className="footer-black-card">
          <div className="top-footer-content">
            <div className="d-flex">

              <div className="content-top-header">
                <Animate>
                  <h2>Make a Call</h2>
                  <div className="d-flex gap-2">
                    <div className="icons-top-header">
                      <img src={top} alt="top" />
                    </div>
                    <p>+1-703-349-1777</p>
                  </div>

                </Animate>
              </div>
            </div>
          </div>

          <div className="footer-top-logo">
            <Animate>
              <img src={footerlogo} alt="" />
            </Animate>
          </div>

          <div className="top-footer-content">
            <div className="d-flex">

              <div className="content-top-header">
                <Animate>
                  <h3>Email</h3>
                  <div className="d-flex gap-2">
                    <p>info@bilkins.com</p>
                    <div className="icons-top-header">
                      <img src={mail} alt="" style={{ marginTop: '6px' }} />
                    </div>

                  </div>

                </Animate>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-section">
        <div className="row">
          <div className="col-lg-3 borderright">
            <div className="about-footer">
              <h3>About Us</h3>
              <p>
                Bilkins excels in end-to-end recruitment, seamlessly identifying top talent, and precisely placing the right candidates to meet client needs. Our comprehensive approach ensures ongoing support and satisfaction for both clients and candidates.
              </p>


            </div>
          </div>
          <div className="col-lg-7 borderright">
            <div className="row">
              <div className="col-lg-3 borderright">
                <div className="quick-links-footer ">
                  <h3>Quick Access</h3>
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/about">About Us</Link>
                    </li>
                    <li>
                      <Link to="/location">Locations</Link>
                    </li>
                    <li>
                      <Link to="/career">Careers</Link>
                    </li>
                    <li>
                      <Link to="/contact">Contact Us</Link>
                    </li>
                    <li>
                      <Link to="/disclaimer">Disclaimer</Link>
                    </li>
                    <li>
                      <Link to="/terms-and-conditions">Terms And Conditions</Link>
                    </li>
                    <li>
                      <Link to="/privacy-policy">Privacy Policy </Link>
                    </li>
                    <li>
                      <Link to="/unsubscribe-form">Unsubscribe </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4 borderright">
                <div className="quick-links-footer">
                  <h3>Supported Causes & Affiliations</h3>
                  <ul>
                    <li>
                      <img src={footer3} alt="" />
                    </li>

                    <li>
                      <img src={footer5} alt="" />
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4 ">
                <div className="quick-links-footer ">
                  <h3>Let's Connect</h3>
                  <ul>
                    <li>
                      <div className="d-flex">
                        <div className="icons-footer">
                          <img src={call} alt="" />
                        </div>
                        <div className="icons-link-footer">
                          <Link to="/">+1-703-349-1777</Link>
                        </div>
                      </div>
                    </li>

                    <li>
                      <div className="d-flex">
                        <div className="icons-footer">
                          <img src={fax} alt="" />
                        </div>
                        <div className="icons-link-footer">
                          <Link to="/">+1-571-520-0318</Link>
                        </div>
                      </div>
                    </li>

                    <li>
                      <div className="d-flex">
                        <div className="icons-footer">
                          <img src={mail} alt="" />
                        </div>
                        <div className="icons-link-footer">
                          <Link to="/">info@bilkins.com</Link>
                        </div>
                      </div>
                    </li>

                    <li>
                      <div className="d-flex">
                        <div className="icons-footer">
                          <img src={location} alt="" />
                        </div>
                        <div className="icons-link-footer">
                          <Link to="/">
                            {/* Visit Us: 44031 Pipeline Plaza STE 300 Ashburn VA 20147 USA */}
                            <table>
                              <tr>
                                <td style={{ textWrap: 'nowrap', display: 'flex', justifyContent: 'start' }}>Visit Us:</td>
                                <td>44031 Pipeline Plaza STE 300 Ashburn VA 20147 USA</td>
                              </tr>
                            </table>
                          </Link>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-2">
            <div className="about-footer">
              <h3>Social Media</h3>
            </div>

            <div className="d-flex align-items-center">
              <a href="https://www.facebook.com/bilkins" target="__blank">
                <div className="social-icons-footer">
                  <img src={fb} alt="" />
                </div>
              </a>
              <a href="https://x.com/BilkinsInc" target="__blank">
                <div className="social-icons-footer">
                  <img src={x} alt="" />
                </div></a>
              <a href="https://www.linkedin.com/company/bilkinsinc/" target="__blank">
                <div className="social-icons-footer">
                  <img src={linkedin} alt="" />
                </div>
              </a>
              <a href="https://www.instagram.com/bilkinsinc/" target="__blank">
                <div className="social-icons-footer">
                  <img src={instagram} alt="" />
                </div>
              </a>
            </div>
            <div className="about-footer">
              <p>Download the app by clicking the link below </p>

              <div className="d-flex flex-column">
                <div className="google-icons-footer">
                  <img src={footer1} alt="footer1" />{" "}
                </div>
                <div className="apple-icons-footer">
                  <img src={footer2} alt="footer2" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="bottom-footer">
        <div className="d-flex align-items-center justify-content-between">
          <div className="copyright-msg">
            <span>
              Copyright 2024 Bilkins – All Rights Reserved By Bilkins INC
            </span>
          </div>

          <div className="powered-msg">
            <span>
              Powered By{" "}
              <a href="https://www.levontechno.com" rel="noreferrer" target="_blank">
                Levon Techno
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
