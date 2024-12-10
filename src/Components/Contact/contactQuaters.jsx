import React from "react";
import ContactIcon4 from "../../Assets/Img/other-logos/contact-icon-4.png";
import arrow from "../../Assets/Img/icons/right-arrows.png";
import Animate from "../Animation/Animate";

const ContactQuaters = () => {
    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-12 text-center">
                    <div className="title-location-card">
                        <Animate>
                            <h1>Headquarters</h1>
                        </Animate>

                        <p>Other Location</p>
                    </div>
                </div>

                <div className="card-headquarter-section">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="card-headquarter">
                                <div className="d-flex">
                                    <div className="icons-headquarter">
                                        <img src={ContactIcon4} alt="" />
                                    </div>
                                    <div className="content-headquarter">
                                        <h3>CANADA</h3>
                                        <h6>2010 Winston Park Drive Suite 200 Oakville Ontario L6H 5R7</h6>
                                    </div>

                                    <div className="arrow-headquarter">
                                        <img src={arrow} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="card-headquarter">
                                <div className="d-flex">
                                    <div className="icons-headquarter">
                                        <img src={ContactIcon4} alt="" />
                                    </div>
                                    <div className="content-headquarter">
                                        <h3>INDIA</h3>
                                        <h6>S3 2nd Floor Empire Square Building Road No: 36 Beside Jubliee Checkpost Metro Station Jubliee Hills HYD 500033</h6>
                                    </div>

                                    <div className="arrow-headquarter">
                                        <img src={arrow} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactQuaters;
