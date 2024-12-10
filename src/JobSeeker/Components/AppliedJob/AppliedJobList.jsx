import React, { useState } from "react";
import { LuFilter } from "react-icons/lu";
import hospital from "../../Assets/Images/hospital.png";
import { IoLocationOutline, IoClose } from "react-icons/io5";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { Popover, Steps } from "antd";
import image2 from "../../Assets/Images/applied-job-banner.png";
import { Joblist } from "./Joblist";
const customDot = (dot, { status, index }) => (
  <Popover
    content={
      <span>
        step {index} status: {status}
      </span>
    }
  >
    {dot}
  </Popover>
);
export const AppliedJobList = () => {
 
  const [activeTab, setActiveTab] = useState('Submitted');
  const [likedCards, setLikedCards] = useState({});
  const [showStatusCard, setShowStatusCard] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleCloseStatusCard = () => {
    setShowStatusCard(false);
  };

  const renderTasks = () => {
    switch (activeTab) {
      case 'Draft':
        return <Joblist />;
      case 'Archive':
        return <Joblist />;
     
      case 'Submitted':
        return <Joblist />;
     
      default:
        return null;
    }
  };

  return (
    <div className="jobseeker-applied-job-section">
      <div className="container">
        {/* <div className="row">
          <div className="d-flex justify-content-end gap-4">
            <button className="jobseeker-basic-button">Expertise</button>
            <button className="jobseeker-basic-button">Regions</button>
            <button className="jobseeker-basic-button">Schedule</button>
            <button className="jobseeker-basic-button">
              <LuFilter /> Filter
            </button>
          </div>
        </div> */}
        <div className="row create-job-banner">
          <div className="col-lg-9 create-job-heading">
            <h3>Welcome to Bilkins Careers</h3>
            <div className="create-job-underline"></div>
            <p>
            Bilkins Careers wants to help you find the perfect job. We’ll help you apply more quickly, get personalized recommendations, and provide you with tips and information to help you in your search.

            </p>
          </div>
          <div className="col-lg-3">
            <img src={image2} className="create-job-image" alt="" />
          </div>
        </div>

        <div className="row mt-4">
        <div className="tab-group">
          {['Submitted','Draft', 'Archive'].map((tab) => (
            <button
              key={tab}
              className={`tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="col-lg-12">{renderTasks()}</div>
      </div>

        
        
        
        
        
        {showStatusCard && (
          <>
            <div
              className="applied-job-overlay"
              onClick={handleCloseStatusCard}
            ></div>
            <div
              className={`applied-job-view-status-card ${
                showStatusCard ? "show" : ""
              }`}
            >
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4>Job Status</h4>
                <button
                  onClick={handleCloseStatusCard}
                  className="applied-job-close-button"
                >
                  <IoClose />
                </button>
              </div>
              <img src={hospital} alt={selectedJob.name} />
              <h2>{selectedJob.name}</h2>
              <h6>{selectedJob.role}</h6>
              <p>{selectedJob.schedule}</p>
              <p>
                <span>
                  <IoLocationOutline />
                </span>{" "}
                {selectedJob.location}
              </p>
              <div className="job-seeker-horizontal-line my-2"></div>
              <div className="mt-4 applied-job-status-steps">
                <Steps
                  className="job-applied-steps"
                  current={1}
                  progressDot={customDot}
                  items={[
                    { title: "Applied" },
                    { title: "Screened" },
                    { title: "Interview" },
                    { title: "Offer" },
                  ]}
                />
                <div className="mt-4">
                  <h5>Job Description</h5>
                  <p>{selectedJob.jobDescription}</p>
                  <h5>Requirements</h5>
                  <p>{selectedJob.requirement}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
