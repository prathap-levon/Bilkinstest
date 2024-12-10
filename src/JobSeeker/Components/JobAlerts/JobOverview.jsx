import React, { useState } from "react";
import { Avatar } from "antd";
import { SlLocationPin } from "react-icons/sl";
import { MdEdit, MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { IoEllipsisVertical } from "react-icons/io5";
import { LuFilter } from "react-icons/lu";
import image1 from "../../Assets/Images/hospital.png";
import { GrAnnounce } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import image2 from "../../Assets/Images/job-overview.png";
const jobData = [
  {
    id: 1,
    rate: "Above avg,rate",
    time: "5 mins ago",
    salary: "$4567",
    duration: "Per Week",
    position: "Registered Nurse-Operating Room",
    details: "Days, 58 weeks Dominican Hospital",
    location: "Santa Cruz, CA",
  },
  {
    id: 2,
    rate: "Competitive rate",
    time: "10 mins ago",
    salary: "$3890",
    duration: "Per Month",
    position: "Cardiac Technician",
    details: "Nights, 60 hours St. John's Hospital",
    location: "San Francisco, CA",
  },
  {
    id: 3,
    rate: "Excellent rate",
    time: "15 mins ago",
    salary: "$5100",
    duration: "Per Week",
    position: "Pediatric Nurse",
    details: "Evenings, 45 weeks City Children's Hospital",
    location: "Los Angeles, CA",
  },
  {
    id: 4,
    rate: "Above avg,rate",
    time: "5 mins ago",
    salary: "$4567",
    duration: "Per Week",
    position: "Registered Nurse-Operating Room",
    details: "Days, 58 weeks Dominican Hospital",
    location: "Santa Cruz, CA",
  },
  {
    id: 5,
    rate: "Competitive rate",
    time: "10 mins ago",
    salary: "$3890",
    duration: "Per Month",
    position: "Cardiac Technician",
    details: "Nights, 60 hours St. John's Hospital",
    location: "San Francisco, CA",
  },
  {
    id: 6,
    rate: "Excellent rate",
    time: "15 mins ago",
    salary: "$5100",
    duration: "Per Week",
    position: "Pediatric Nurse",
    details: "Evenings, 45 weeks City Children's Hospital",
    location: "Los Angeles, CA",
  },
];
export const JobOverview = () => {
  const [likedCards, setLikedCards] = useState({});
  const [activeTab, setActiveTab] = useState("Info");
  const handleTabClick = (tab, event) => {
    // Prevent default behavior
    event.preventDefault();
    setActiveTab(tab);
    const targetElement = document.getElementById(tab);

    if (targetElement) {
      const headerOffset = 130; 
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleLikeClick = (jobId) => {
    setLikedCards((prevLikedCards) => ({
      ...prevLikedCards,
      [jobId]: !prevLikedCards[jobId],
    }));
  };

  return (
    <div className="job-alert-list-section">
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-end gap-4">
            <button className="jobseeker-basic-button">Expertise</button>
            <button className="jobseeker-basic-button">Regions</button>
            <button className="jobseeker-basic-button">Schedule</button>
            <button className="jobseeker-basic-button">
              <LuFilter /> Filter
            </button>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-lg-4">
            <div>
              <p>Jobs in california,USA</p>
              <div className="job-overview-joblist">
                {jobData.map((job) => (
                  <div className="col-lg-12 my-2" key={job.id}>
                    <div className="favourite-job-card ">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <p style={{ marginBottom: "0" }}>{job.rate}</p>
                        <div className="d-flex gap-2">
                          <span className="favourite-job-button">
                            {job.time}
                          </span>
                        </div>
                      </div>
                      <div className="d-flex gap-2">
                        <h3>{job.salary}</h3>
                        <div className="favourite-vertical-line"></div>
                        <h5>
                          {job.duration.split(" ")[0]} <br />
                          {job.duration.split(" ")[1]}
                        </h5>
                      </div>
                      <h5 className="mt-3">{job.position}</h5>
                      <p>{job.details}</p>
                      <div className="favourite-text-underline my-2"></div>
                      <div className="d-flex justify-content-between">
                        <h4>
                          <SlLocationPin className="icon-red" /> &nbsp;
                          {job.location}
                        </h4>
                        <GrAnnounce size={20} color="var(--maroon-color)" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="job-overview-right-card">
              <div className="job-overview-right-banner">
                <img src={image2} alt="" />
              </div>
              <div>
                <Avatar
                  className="job-overview-hospital-image"
                  size={80}
                  src={image1}
                />
              </div>
              <div className="d-flex justify-content-between">
                <div className="mt-5">
                  <h5 className="mt-3">Registered Nurse - Operating Room</h5>
                  <p>Aspen Valley Hospital</p>
                  <p>
                    <SlLocationPin className="icon-red" /> &nbsp;Aspen,
                    California, Alaska
                  </p>
                </div>
                <div className="mt-3">
                  <p>
                    <span
                      style={{
                        fontWeight: "700",
                        color: "var(--text-color)",
                        fontSize: "16px",
                      }}
                    >
                      $3.720
                    </span>{" "}
                    &nbsp;Per week
                  </p>
                  <div className="d-flex gap-2 mt-3">
                    <button className="applied-job-view-status-button">
                      Apply Now
                    </button>
                    <button
                      className={`applied-job-like-button d-flex align-items-center ${
                        likedCards[jobData[0]?.id] ? "liked" : ""
                      }`}
                      onClick={() => handleLikeClick(jobData[0]?.id)}
                    >
                      {likedCards[jobData[0]?.id] ? (
                        <MdFavorite size={30} />
                      ) : (
                        <MdFavoriteBorder size={30} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <div className="job-overview-page-text">
                <div style={{ position: "sticky", top: "60px" }}>
                  <div className="">
                    <ul className="job-overview-details-menu">
                      {[
                        "Details",
                        "Facility",
                        "Your Paycheck",
                        "Getting The Job",
                        "Location",
                        "Why Bilkins",
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
                <div className="job-overview-description-body">
                  <div className="job-overview-details-body">
                    <h1
                      id="Details"
                      className={activeTab === "Info" ? "active" : ""}
                    >
                      Details
                    </h1>
                    <div className="d-flex align-items-center justify-content-start gap-3 mt-3">
                      <div className="job-overview-details-list">
                        <h3>Shift/Type</h3>
                        <h4>
                         
                        </h4>
                      </div>
                      <div className="job-overview-details-list">
                        <h3>Start date</h3>
                        <h4>
                          
                        </h4>
                      </div>
                      <div className="job-overview-details-list">
                        <h3>Duration</h3>
                        <h4>
                         
                        </h4>
                      </div>
                      <div className="job-overview-details-list">
                        <h3>Open position</h3>
                        <h4>
                          
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="job-overview-details-body">
                    <h2
                      id="Facility"
                      className={activeTab === "Facility" ? "active" : ""}
                    >
                      Facility
                    </h2>
                
                  </div>
                  <div className="job-overview-details-body">
                    <h2
                      id="Your Paycheck"
                      className={
                        activeTab === "Your Paycheck" ? "active" : ""
                      }
                    >
                      Your Paycheck
                    </h2>
                    
                  
                  </div>
                  <div className="job-overview-details-body">
                    <h2
                      id="Getting The Job"
                      className={activeTab === "Getting The Job" ? "active" : ""}
                    >
                      Benefits
                    </h2>
                   
                  </div>
                  <div className="job-overview-details-body">
                    <h2
                      id="Location"
                      className={activeTab === "Location" ? "active" : ""}
                    >
                      Location
                    </h2>
                   
                  </div>
                  <div className="job-overview-details-body">
                    <h2
                      id="Why Bilkins"
                      className={activeTab === "Why Bilkins?" ? "active" : ""}
                    >
                      Why Bilkins?
                    </h2>
                    
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
