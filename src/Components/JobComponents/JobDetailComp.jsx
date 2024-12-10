import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import insta from "../../Assets/Img/icons/insta.png";
import facebook from "../../Assets/Img/icons/facebook.png";
import twitter from "../../Assets/Img/icons/twitte.png";
import mail from "../../Assets/Img/icons/mailicon.png";
import phonecall from "../../Assets/Img/icons/ph_phone-call-bold.png";
import Animate from "../Animation/Animate";
import { useNavigate } from "react-router-dom";
import DOMpurify from "dompurify";
import { FaChevronLeft } from "react-icons/fa6";
import {
  formateDate,
  REACT_APP_FRONTEND_URL_WEBSITE,
} from "../../globalConstant";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";
import { QuickApplication } from "../../Pages/ApplyNow/QuickApplication";
import { FullApplication } from "../../Pages/ApplyNow/FullApplication";
const JobDetailComp = ({ jobData }) => {
  console.log('Job Data:', jobData);
  const [isQuickApplicationOpen, setIsQuickApplicationOpen] = useState(false);
  const showQuickApplicationModal = () => setIsQuickApplicationOpen(true);
  const handleQuickApplicationCancel = () => setIsQuickApplicationOpen(false);

  const[isFullApplicationOpen,setIsFullApplicationOpen]=useState(false)
  const showFullApplicationModal=()=>setIsFullApplicationOpen(true);
  const handleFullApplicationCancel=()=>setIsFullApplicationOpen(false)
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Info");
  const numberFormat = new Intl.NumberFormat();

  const handleTabClick = (tab, event) => {
    // Prevent default behavior
    event.preventDefault();
    setActiveTab(tab);
    const targetElement = document.getElementById(tab);

    if (targetElement) {
      // Calculate the offset position
      const headerOffset = 130; // Adjust this value to your header height
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      // Scroll to the calculated position
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };
  const [likedJobs, setLikedJobs] = useState({});
  const [savedJobs, setSavedJobs] = useState({});

  const handleLikeClick = (jobId) => {
    setLikedJobs((prevLikedJobs) => ({
      ...prevLikedJobs,
      [jobId]: !prevLikedJobs[jobId],
    }));
  };

  const handleSaveClick = (jobId) => {
    setSavedJobs((prevSavedJobs) => ({
      ...prevSavedJobs,
      [jobId]: !prevSavedJobs[jobId],
    }));
  };

  const handleShare = (platform, jobUrl) => {
    let shareUrl = "";
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          jobUrl
        )}&quote=${encodeURIComponent("Apply to this job")}`;
        break;
      case "x":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          jobUrl
        )}&text=${encodeURIComponent("Apply to this job")}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
          jobUrl
        )}&title=${encodeURIComponent(
          jobData?.title
        )}&summary=${encodeURIComponent("Apply to this job")}`;
        break;
      case "email":
        shareUrl = `mailto:?subject=${encodeURIComponent(
          `Check out this job: ${jobData?.title}`
        )}&body=${encodeURIComponent(jobUrl)}`;
        break;
      default:
        return;
    }
    window.open(shareUrl, "_blank");
  };

  const totalAmount = (a, b, c, d) => {
    return (a ? a : 0) + (b ? b : 0) + (c ? c * 7 : 0) + (d ? d * 7 : 0);
  };
  
  return (
    <div>
      <Container fluid className="servicepage-Process-container">
        <Row className="col-lg-11">
          <Col md={4} className="service-page-right service--page--right mt-4 ">
            <button
              className="All-search-btn"
              onClick={() => {
                navigate(
                  `/search-jobs?jobtitle=&location=&longitude=&latitude=&radius=&regionCategory`
                );
              }}
            >
              <FaChevronLeft />
              All Search Results
            </button>
            <div className="job-detail-left-card">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h4 style={{ fontWeight: "500" }}>
                    $
                    {jobData?.weeklyEarnings ||
                    jobData?.travelPerDiems ||
                    jobData?.mealsPay ||
                    jobData?.housingPay
                      ? numberFormat.format(
                          totalAmount(
                            jobData?.weeklyEarnings,
                            jobData?.travelPerDiems,
                            jobData?.mealsPay,
                            jobData?.housingPay
                          )
                        ) + "/wk"
                      : "N/A"}
                  </h4>
                  <h5 style={{ fontWeight: "600" }}>{jobData?.title}</h5>
                </div>
                {/* <div className="d-flex align-items-center">
                  <button
                    onClick={() => handleLikeClick(jobData?._id)}
                    className="job-save-like-icons"
                  >
                    {likedJobs[jobData?._id] ? (
                      <MdFavorite />
                    ) : (
                      <MdFavoriteBorder />
                    )}
                  </button>
                  <button
                    onClick={() => handleSaveClick(jobData?._id)}
                    className="job-save-like-icons"
                  >
                    {savedJobs[jobData?._id] ? (
                      <FaBookmark />
                    ) : (
                      <FaRegBookmark />
                    )}
                  </button>
                </div> */}
              </div>
              
              <button onClick={showQuickApplicationModal}>
                Quick Application
              </button>
              <button onClick={showFullApplicationModal}>Full Application</button>
            </div>
            <div className="servicePage-socialmedia">
              <Animate>
                <h1>Share This Job:</h1>
              </Animate>
              <div className="d-flex justify-content-evenly align-items-center">
                <button
                  className="copylinks-button"
                  onClick={() =>
                    handleShare(
                      "linkedin",
                      `${REACT_APP_FRONTEND_URL_WEBSITE}/job-detail/${jobData?._id}`
                    )
                  }
                >
                  <img src={insta} alt=".." />
                </button>
                <button
                  className="copylinks-button"
                  onClick={() =>
                    handleShare(
                      "facebook",
                      `${REACT_APP_FRONTEND_URL_WEBSITE}/job-detail/${jobData?._id}`
                    )
                  }
                >
                  <img src={facebook} alt=".." />
                </button>
                <button
                  className="copylinks-button"
                  onClick={() =>
                    handleShare(
                      "x",
                      `${REACT_APP_FRONTEND_URL_WEBSITE}/job-detail/${jobData?._id}`
                    )
                  }
                >
                  <img src={twitter} alt=".." />
                </button>
                <button
                  className="copylinks-button"
                  onClick={() =>
                    handleShare(
                      "email",
                      `${REACT_APP_FRONTEND_URL_WEBSITE}/job-detail/${jobData?._id}`
                    )
                  }
                >
                  <img src={mail} alt=".." />
                </button>
              </div>
            </div>
            <div className="serviceCall">
              <img src={phonecall} alt=".." />
              <h3>Feel Free To give us A Call</h3>
              <p>We are available 24X7</p>
              <button className="submit-button">+1-703-349-1777</button>
            </div>
          </Col>

          <Col md={8}>
            <div className="service-page-process-text">
              <div style={{ position: "sticky", top: "60px" }}>
                <div className="job-description-title job_details_com_menu_list">
                  <ul className="job_details_menu_list">
                    {[
                      "Info",
                      "SalaryRange",
                      "Job Description",
                      "Benefits",
                      "License",
                      "Certification",
                      "Immunization",
                    ].map((tab) => (
                      <li
                        key={tab}
                        className={activeTab === tab ? "active" : ""}
                      >
                        <a
                          href={`#${tab}`}
                          onClick={(event) => handleTabClick(tab, event)}
                        >
                          {tab}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="job-description-body">
                <div className="job-details-body">
                  <h1
                    id="Info"
                    className={activeTab === "Info" ? "active" : ""}
                  >
                    Info
                  </h1>
                  <div className="d-flex align-items-center justify-content-start gap-3 mt-3">
                    <div className="details_list">
                      <h3>Shift/Type</h3>
                      <h4>
                        {jobData?.shiftType
                          ? jobData.shiftType + " Shift"
                          : "N/A"}
                        {jobData?.shiftHours ? ", " + jobData.shiftHours : ""}
                      </h4>
                    </div>
                    <div className="details_list">
                      <h3>Start date</h3>
                      <h4>
                        {jobData?.jobStartDate
                          ? formateDate(jobData?.jobStartDate)
                          : "N/A"}
                      </h4>
                    </div>
                    <div className="details_list">
                      <h3>Duration</h3>
                      <h4>
                        {jobData?.duration
                          ? jobData?.duration + " Weeks"
                          : "N/A"}
                      </h4>
                    </div>
                    <div className="details_list">
                      <h3>Open position</h3>
                      <h4>{jobData?.vacancies ? jobData?.vacancies : "N/A"}</h4>
                    </div>
                  </div>
                </div>

                <div className="job-details-body">
                  <h2
                    id="SalaryRange"
                    className={activeTab === "SalaryRange" ? "active" : ""}
                  >
                    Salary Range
                  </h2>
                  <ol className="your_range_content">
                    <li
                      style={{
                        borderBottom: "1px solid rgb(212,212,212)",
                        padding: "10px 10px",
                      }}
                    >
                      <h3>Weekly Earnings</h3>
                      <h3>
                        {jobData?.weeklyEarnings
                          ? "$" +
                            numberFormat.format(jobData?.weeklyEarnings) +
                            "/wk"
                          : "N/A"}
                      </h3>
                    </li>
                    <li>
                      <h3>Travel per Diems</h3>
                      <h3>
                        {jobData?.travelPerDiems
                          ? "$" +
                            numberFormat.format(jobData?.travelPerDiems) +
                            "/wk"
                          : "N/A"}
                      </h3>
                    </li>
                    <li>
                      <h4 style={{ marginLeft: "15px" }}>Meals</h4>
                      <h4>
                        {jobData?.mealsPay
                          ? "$" +
                            jobData?.mealsPay +
                            "x7 days = $" +
                            numberFormat.format(jobData?.mealsPay * 7)
                          : "N/A"}
                      </h4>
                    </li>
                    <li>
                      <h4 style={{ marginLeft: "15px" }}>Housing</h4>
                      <h4>
                        {jobData?.housingPay
                          ? "$" +
                            jobData?.housingPay +
                            "x7 days = $" +
                            numberFormat.format(jobData?.housingPay * 7)
                          : "N/A"}
                      </h4>
                    </li>
                    <li
                      className="range-total"
                      style={{ padding: "10px 10px" }}
                    >
                      <h3>Total Weekly payout</h3>
                      <h3>
                        $
                        {jobData?.weeklyEarnings ||
                        jobData?.travelPerDiems ||
                        jobData?.mealsPay ||
                        jobData?.housingPay
                          ? numberFormat.format(
                              totalAmount(
                                jobData?.weeklyEarnings,
                                jobData?.travelPerDiems,
                                jobData?.mealsPay,
                                jobData?.housingPay
                              )
                            )
                          : 0}
                      </h3>
                    </li>
                  </ol>
                </div>
                <div className="job-details-body">
                  <h2
                    id="Job Description"
                    className={activeTab === "Job Description" ? "active" : ""}
                  >
                    Job Description
                  </h2>
                  <div className="d-flex flex-column align-items-start justify-content-start gap-4 ">
                    <div className="col-lg-12">
                      {/* <h1>Job Requirements</h1> */}
                      <div
                        className="bold-container"
                        dangerouslySetInnerHTML={{
                          __html: DOMpurify.sanitize(jobData?.jobDesc),
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="job-details-body">
                  <h2
                    id="Benefits"
                    className={activeTab === "Benefits" ? "active" : ""}
                  >
                    Benefits
                  </h2>
                  <ul className="benefit_list">
                    {jobData?.jobBenefits?.map((item, index) => {
                      return (
                        <li key={index} className={index}>
                          {item}
                        </li>
                      );
                    })}
                    {jobData?.jobBenefits?.length === 0 && <p>N/A</p>}
                  </ul>
                </div>
                <div className="job-details-body">
                  <h2
                    id="License"
                    className={activeTab === "License" ? "active" : ""}
                  >
                    License
                  </h2>
                  <ul className="benefit_list">
                    {jobData?.license?.map((item, index) => {
                      return (
                        <li key={index} className={index}>
                          {item}
                        </li>
                      );
                    })}
                    {jobData?.license?.length === 0 && <p>N/A</p>}
                  </ul>
                </div>
                <div className="job-details-body">
                  <h2
                    id="Certification"
                    className={activeTab === "Certification" ? "active" : ""}
                  >
                    Certification
                  </h2>
                  <ul className="benefit_list">
                    {jobData?.certification?.map((item, index) => {
                      return (
                        <li key={index} className={index}>
                          {item || "N/A"}
                        </li>
                      );
                    })}
                    {(!jobData?.certification ||
                      jobData?.certification?.length === 0) && <p>N/A</p>}
                  </ul>
                </div>
                <div className="job-details-body">
                  <h2
                    id="Immunization"
                    className={activeTab === "Immunization" ? "active" : ""}
                  >
                    Immunization
                  </h2>
                  <ul className="benefit_list">
                    {jobData?.immunization?.map((item, index) => {
                      return (
                        <li key={index} className={index}>
                          {item || "N/A"}
                        </li>
                      );
                    })}
                    {(!jobData?.immunization ||
                      jobData?.immunization?.length === 0) && <p>N/A</p>}
                  </ul>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <QuickApplication
        open={isQuickApplicationOpen}
        handleCancel={handleQuickApplicationCancel}
      />
      <FullApplication
        open1={isFullApplicationOpen}
        handleCancel1={handleFullApplicationCancel}
      />
    </div>
  );
};
export default JobDetailComp;
