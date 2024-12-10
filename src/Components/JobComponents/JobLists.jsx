import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DOMpurify from "dompurify";
import { MdFavorite, MdFavoriteBorder, MdOutlineLocationOn } from "react-icons/md";
import choose1 from "../../Assets/Img/icons/choose-1.png";
import choose2 from "../../Assets/Img/icons/choose-2.png";
import choose3 from "../../Assets/Img/icons/choose-3.png";
import choose4 from "../../Assets/Img/icons/choose-4.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import nodatawithtext from "../../Assets/Img/icons/nodatawithtext.png";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { formateDate, formatUrl, showErrorAlert } from "../../globalConstant";
import { FaRegBookmark, FaBookmark, FaSortAmountUpAlt } from "react-icons/fa";
import Instance from "../../AxiosConfig";
import { useDispatch } from "react-redux";
import { addLike, removeLike, addToSaved, removeFromSaved } from "../../features/jobPageSlice";

export const JobList = ({ jobsData, sortJobData, loading }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedJob, setSelectedJob] = useState(null);
  const [activeTab, setActiveTab] = useState("Info");
  const numberFormat = new Intl.NumberFormat();
  const [isLogin, setIsLogin] = useState(false);
  const [expandedJobMobile, setExpandedJobMobile] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const loggedInUserInfo = JSON.parse(localStorage.getItem("loggedInUserInfo"));

  const validateToken = async () => {
    try {
      const response = await Instance.get("/validateToken", {
        headers: {
          Authorization: `Bearer ${loggedInUserInfo?.token}`,
        },
      });
      if (response.status === 200 && response?.data?.role === "JOBSEEKER") {
        setIsLogin(true);
      }
    } catch (error) {
      // No token present means login is required
    }
  };

  useEffect(() => {
    validateToken();
  }, []);

  const handleLikeJob = async (job, isLiked) => {
    try {
      const response = await Instance.patch(`/likeJob/${job._id}`, {}, {
        headers: {
          Authorization: `Bearer ${loggedInUserInfo?.token}`,
        },
      });
      if (response.status === 200) {
        if (isLiked) {
          dispatch(addLike({ jobId: job?._id, userId: loggedInUserInfo?.userId }));
        } else {
          dispatch(removeLike({ jobId: job?._id, userId: loggedInUserInfo?.userId }));
        }
      }
    } catch (error) {
      console.error(error);
      showErrorAlert('Failed to like job');
    }
  };

  const handleSaveJob = async (job, isSaved) => {
    try {
      const response = await Instance.patch(`/saveJob/${job._id}`, {}, {
        headers: {
          Authorization: `Bearer ${loggedInUserInfo?.token}`,
        },
      });
      if (response.status === 200) {
        if (isSaved) {
          dispatch(addToSaved({ jobId: job?._id, userId: loggedInUserInfo?.userId }));
        } else {
          dispatch(removeFromSaved({ jobId: job?._id, userId: loggedInUserInfo?.userId }));
        }
      }
    } catch (error) {
      console.error(error);
      showErrorAlert('Failed to save job');
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    setSelectedJob(jobsData[0]);
  }, [jobsData]);

  const handleJobClick = (job) => {
    setSelectedJob(job);
    if (isMobile) {
      setExpandedJobMobile(expandedJobMobile === job ? null : job);
    }
  };

  const services = [
    { title: "Proven Track Record", icon: choose1 },
    { title: "Industry Expertise", icon: choose2 },
    { title: "Personalized Approach", icon: choose3 },
    { title: "Dedication to Your Success", icon: choose4 },
  ];

  const setEqualHeight = () => {
    // const jobHeight = jobRef.current ? jobRef.current.offsetHeight : 0;
    // const appHeight = appRef.current ? appRef.current.offsetHeight : 0;
    // const maxHeight = Math.max(jobHeight, appHeight);
    // setAppHeight(appHeight);
    // setHeight(maxHeight);
  };

  useEffect(() => {
    setEqualHeight();
    window.addEventListener("resize", setEqualHeight);
    return () => {
      window.removeEventListener("resize", setEqualHeight);
    };
  }, []);

  useEffect(() => {
    setEqualHeight();
  });

  function getRelativeTime(dateTime) {
    const postedDate = new Date(dateTime);
    const now = new Date();
    const diff = now - postedDate;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);

    if (months > 0) {
      return `${months} month${months > 1 ? "s" : ""} ago`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    }
  }

  const totalAmount = (a, b, c, d) => {
    return (a ? a : 0) + (b ? b : 0) + (c ? c * 7 : 0) + (d ? d * 7 : 0);
  };

  const renderJobDetails = (job) => (
    <>
      <div className="job-description-title">
        <div className="d-flex mt-3 job-icons">
          <h1 style={{ color: "black" }}>$</h1>
          <h1 style={{ whiteSpace: "nowrap", color: "black" }}>
            {job?.weeklyEarnings ||
              job?.travelPerDiems ||
              job?.mealsPay ||
              job?.housingPay
              ? numberFormat.format(
                totalAmount(
                  job?.weeklyEarnings,
                  job?.travelPerDiems,
                  job?.mealsPay,
                  job?.housingPay
                )
              ) + "/wk"
              : "N/A"}
          </h1>
        </div>
        <h1 style={{ padding: "15px 0px", fontWeight: "600" }}>{job.title}</h1>
        <div className="d-flex gap-3 align-items-center justify-content-between job_applybutton_heart">
          <div>
            <button
              className="btn-apply-jobs"
              onClick={() => {
                const location = formatUrl(job.state);
                const title = formatUrl(job.title);
                navigate(`/jobs/${location}/${title}/${job._id}`);
              }}
            >
              Apply Now
            </button>
          </div>
        </div>
        <ul className="job_details_menu_list">
          {[
            "Info",
            "SalaryRange",
            "Job Description",
            "Benefits",
            "License",
            "Certification",
            "Immunization",
            "WhyUs",
          ].map((tab) => (
            <li key={tab} className={activeTab === tab ? "active" : ""}>
              <a href={`#${tab}`} onClick={() => handleTabClick(tab)}>
                {tab}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="job-description-body">
        <div className="job-details-body">
          <h1 id="Info" className={activeTab === "Info" ? "active" : ""}>
            Info
          </h1>
          <div className="d-flex align-items-center justify-content-start gap-3 mt-3">
            <div className="details_list">
              <h3>Shift/Type</h3>
              <h4>
                {selectedJob?.shiftType
                  ? selectedJob.shiftType + " Shift"
                  : "N/A"}
                {selectedJob?.shiftHours ? ", " + selectedJob.shiftHours : ""}
              </h4>
            </div>
            <div className="details_list">
              <h3>Start date</h3>
              <h4>
                {selectedJob?.jobStartDate
                  ? formateDate(selectedJob?.jobStartDate)
                  : "N/A"}
              </h4>
            </div>
            <div className="details_list">
              <h3>Duration</h3>
              <h4>
                {selectedJob?.duration
                  ? selectedJob?.duration + " Weeks"
                  : "N/A"}
              </h4>
            </div>
            <div className="details_list">
              <h3>Open position</h3>
              <h4>{selectedJob?.vacancies ? selectedJob?.vacancies : "N/A"}</h4>
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
                {selectedJob?.weeklyEarnings
                  ? "$" +
                  numberFormat.format(selectedJob?.weeklyEarnings) +
                  "/wk"
                  : "N/A"}
              </h3>
            </li>
            <li>
              <h3>Travel per Diems</h3>
              <h3>
                {selectedJob?.travelPerDiems
                  ? "$" +
                  numberFormat.format(selectedJob?.travelPerDiems) +
                  "/wk"
                  : "N/A"}
              </h3>
            </li>
            <li>
              <h4 style={{ marginLeft: "15px" }}>Meals</h4>
              <h4>
                {selectedJob?.mealsPay
                  ? "$" +
                  selectedJob?.mealsPay +
                  "x7 days = $" +
                  numberFormat.format(selectedJob?.mealsPay * 7)
                  : "N/A"}
              </h4>
            </li>
            <li>
              <h4 style={{ marginLeft: "15px" }}>Housing</h4>
              <h4>
                {selectedJob?.housingPay
                  ? "$" +
                  selectedJob?.housingPay +
                  "x7 days = $" +
                  numberFormat.format(selectedJob?.housingPay * 7)
                  : "N/A"}
              </h4>
            </li>
            <li className="range-total" style={{ padding: "10px 10px" }}>
              <h3>Total Weekly payout</h3>
              <h3>
                $
                {selectedJob?.weeklyEarnings ||
                  selectedJob?.travelPerDiems ||
                  selectedJob?.mealsPay ||
                  selectedJob?.housingPay
                  ? numberFormat.format(
                    totalAmount(
                      selectedJob?.weeklyEarnings,
                      selectedJob?.travelPerDiems,
                      selectedJob?.mealsPay,
                      selectedJob?.housingPay
                    )
                  )
                  : 0}
              </h3>
            </li>
          </ol>
        </div>

        <div className="job-details-body">
          <h1
            id="Job Description"
            className={activeTab === "Job Description" ? "active" : ""}
          >
            Job Description
          </h1>
          <div className="d-flex flex-column align-items-start justify-content-start gap-4 ">
            <div className="col-lg-12">
              {/* <h1>Job Requirements</h1> */}
              <div
                className="bold-container"
                dangerouslySetInnerHTML={{
                  __html: DOMpurify.sanitize(selectedJob.jobDesc),
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
            {selectedJob?.jobBenefits?.map((item, index) => {
              return (
                <li key={index} className={index}>
                  {item}
                </li>
              );
            })}
            {selectedJob?.jobBenefits?.length === 0 && <p>N/A</p>}
          </ul>
        </div>
        <div className="job-details-body">
          <h2 id="License" className={activeTab === "License" ? "active" : ""}>
            License
          </h2>
          <ul className="benefit_list">
            {selectedJob?.license?.map((item, index) => {
              return (
                <li key={index} className={index}>
                  {item}
                </li>
              );
            })}
            {selectedJob?.license?.length === 0 && <p>N/A</p>}
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
            {selectedJob?.certification?.map((item, index) => {
              return (
                <li key={index} className={index}>
                  {item || "N/A"}
                </li>
              );
            })}
            {(!selectedJob?.certification ||
              selectedJob?.certification?.length === 0) && <p>N/A</p>}
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
            {selectedJob?.immunization?.map((item, index) => {
              return (
                <li key={index} className={index}>
                  {item || "N/A"}
                </li>
              );
            })}
            {(!selectedJob?.immunization ||
              selectedJob?.immunization?.length === 0) && <p>N/A</p>}
          </ul>
        </div>

        <div className="job-details-body">
          <h2 id="WhyUs" className={activeTab === "WhyUs" ? "active" : ""}>
            Why Us?
          </h2>
          <p style={{ color: "gray" }}>
            At Bilkins, we stand as your trusted partner in career progression.
            With a proven track record and unwavering commitment, we prioritize
            your success. Our personalized approach, industry expertise, and
            dedication to your journey set us apart. Choose Bilkins for a
            collaborative experience that propels you toward professional
            excellence and opens doors to a world of opportunities.
          </p>
          <div className="row mt-4">
            {services.map((service, index) => (
              <div key={index} className="col-lg-6 mt-2">
                <div className="choose-card-service">
                  <div className="d-flex align-items-center">
                    <div className="choose-icons">
                      <img src={service.icon} alt={`choose${index + 1}`} />
                    </div>
                    <div className="choose-title-content">
                      <span>{service.title}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <div className="job--page">
        {loading && (
          <div className="loader-container">
            <Spin
              indicator={<LoadingOutlined spin />}
              size="large"
              className="custom-loader"
            />
          </div>
        )}
        {!loading && (
          <div className="row text-center custom_joblist_container">
            <div className="col-lg-4 custom_joblist_container">
              {jobsData?.length > 0 && (
                <div className="joblist_header">
                  <span>{jobsData?.length} results</span>
                  <div className="d-flex gap-4">
                    <h1 onClick={sortJobData}>
                      <FaSortAmountUpAlt style={{ fontSize: "12px" }} /> Sort
                    </h1>
                  </div>
                </div>
              )}
              {(!jobsData || jobsData?.length === 0) && (
                <div className="job-description-right">
                  <div className="no-data-container">
                    <img
                      className="no-data-with-text-img"
                      src={nodatawithtext}
                      alt="No Data found"
                    />
                  </div>
                </div>
              )}
              {jobsData?.length !== 0 &&
                jobsData?.map((job, index) => (
                  <React.Fragment key={index}>
                    <div
                      className={`left-job-card ${selectedJob === job ? "active" : ""
                        }`}
                      onClick={() => handleJobClick(job)}
                    >
                      <h3>{job?.jobCategory}</h3>
                      <div className="heart_icon">
                        {getRelativeTime(job?.jobPostedDate)}
                      </div>
                      <div className="d-flex  mt-3 job-icons">
                        <p style={{ whiteSpace: "nowrap", color: "black" }}>
                          <span style={{ color: "black", fontSize: "18px" }}>
                            $
                          </span>
                          {job?.weeklyEarnings ||
                            job?.travelPerDiems ||
                            job?.mealsPay ||
                            job?.housingPay
                            ? numberFormat.format(
                              totalAmount(
                                job?.weeklyEarnings,
                                job?.travelPerDiems,
                                job?.mealsPay,
                                job?.housingPay
                              )
                            ) + "/wk"
                            : "N/A"}
                        </p>
                      </div>
                      <h4>{job?.title}</h4>
                      <h3>{`${job?.shiftType ? job.shiftType + " Shift" : "N/A"
                        } ${job?.shiftHours ? ", " + job.shiftHours : ""}`}</h3>
                      <div className="d-flex align-items-center justify-content-between job-suit-lines">
                        <div className="line-job-suit"></div>
                      </div>
                      <div className="d-flex justify-content-between">
                        <h2>
                          <MdOutlineLocationOn />{" "}
                          {job?.cities?.length > 0
                            ? job?.cities?.join(", ")
                            : ""}
                          {job?.stateCode && job?.cities?.length > 0 ? "," : ""}
                          {job?.stateCode ? job?.stateCode : ""}
                        </h2>
                        {isLogin && <div className="d-flex align-items-center">
                          <button
                            className="job-save-like-icons"
                          >
                            {job?.likedBy?.includes(loggedInUserInfo?.userId) ? (
                              <MdFavorite onClick={() => handleLikeJob(job, false)} />
                            ) : (
                              <MdFavoriteBorder onClick={() => handleLikeJob(job, true)} />
                            )}
                          </button>
                          <button
                            className="job-save-like-icons"
                          >
                            {job?.savedBy?.includes(loggedInUserInfo?.userId) ? (
                              <FaBookmark onClick={() => handleSaveJob(job, false)} />
                            ) : (
                              <FaRegBookmark onClick={() => handleSaveJob(job, true)} />
                            )}
                          </button>
                        </div>}
                      </div>
                    </div>
                    {isMobile &&
                      expandedJobMobile === job &&
                      renderJobDetails(job)}
                  </React.Fragment>
                ))}
            </div>
            {!isMobile && (
              <div
                className="col-lg-8 custom_joblist_container"
                id="desktopView"
              >
                <div className="job-description-right">
                  {!selectedJob && (
                    <p className="no-selected-jobs-p">No Selected Job</p>
                  )}
                  {selectedJob && renderJobDetails(selectedJob)}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};
