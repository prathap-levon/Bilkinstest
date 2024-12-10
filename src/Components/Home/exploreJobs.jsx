import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import RightArrow from "../../Assets/Img/icons/arrow-right.png";
import image1 from "../../Assets/Img/hero/locationImage1.png";
import dollar from "../../Assets/Img/icons/dollar-sign.png";
import clock from "../../Assets/Img/icons/clock.png";
import location from "../../Assets/Img/icons/map-pin.png";
import user from "../../Assets/Img/icons/users-red.png";
import image3 from "../../Assets/Img/hero/locationImage3.png";
import Instance from "../../AxiosConfig";

export const ExploreJobs = () => {
  const [alliedJob, setAlliedJob] = useState();
  const [nursingJob, setNursingJob] = useState();
  const numberFormat = new Intl.NumberFormat();



  const fetchAlliedJobs = async () => {
    try {
      const response = await Instance.get("/getAllAlliedJobs", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response?.status === 200) {
        setAlliedJob(response?.data?.jobs[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchNursingJobs = async () => {
    try {
      const response = await Instance.get("/getAllNursingJobs", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response?.status === 200) {
        setNursingJob(response?.data?.jobs[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAlliedJobs();
    fetchNursingJobs();
  }, []);

  const totalAmount = (a, b, c, d) => {
    return (a ? a : 0) + (b ? b : 0) + (c ? c * 7 : 0) + (d ? d * 7 : 0);
  };

  return (
    <div>
      <Container fluid className="exploreJobs-container">
        <h2 className="explore-jobs-main-head">
          Explore Bilkins Job Openings{" "}
        </h2>
        <div className="d-flex justify-content-center gap-3 explorejobFlex">
          <div className="exploreJobs-left">
            <div className="exploreJobs-left-text">
              <div className="d-flex justify-content-between explore-job-header">
                <h2>Travel Nursing Jobs</h2>
                <div id="justify-start">
                  <span>
                    <a
                      href={`/search-jobs?jobtitle=${encodeURIComponent(
                        "Nursing Jobs"
                      )}&location=`}
                    >
                      Search Nursing Jobs
                      <img
                        style={{ marginLeft: "8px" }}
                        src={RightArrow}
                        alt=""
                      />
                    </a>
                  </span>
                </div>
              </div>

              <div className="explore-line-job-suit-1"></div>
            </div>
            <div className="d-flex gap-3 mt-4 explore-job-divs">
              <div className="bg-white explore-line-div-left">
                <img src={image1} alt="" />
                <div className="explore-left-details">
                  <div className="d-flex justify-content-between  ">
                    <h2>
                      {nursingJob?.cities
                        ? nursingJob?.cities.join(", ")
                        : "N/A"}
                    </h2>
                    {/* <img src={rightArrow} alt="" /> */}
                  </div>
                  <h4>
                    {nursingJob?.cities ? nursingJob?.cities.join(", ") : ""}
                    {nursingJob?.cities?.length > 0 ? ", " : ""}
                    {nursingJob?.state ? nursingJob?.state : "N/A"}
                  </h4>
                </div>
              </div>
              <div className="bg-white explore-job-suit-right">
                <div className="explore-job-suit">
                  <h4>{nursingJob?.title ? nursingJob?.title : "N/A"}</h4>
                  <div className="d-flex align-content-center">
                    <div className="btn-part-full-time">
                      <button>
                        {nursingJob?.jobType?.length > 0
                          ? nursingJob?.jobType?.join(" || ")
                          : "N/A"}
                      </button>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between job-suit-lines">
                    <div className="line-job-suit"></div>
                  </div>
                  <div className="d-flex gap-2 mt-4 job-icons">
                    <img src={dollar} alt="dollar" />
                    <p style={{ whiteSpace: "nowrap" }}>
                      {nursingJob?.weeklyEarnings || nursingJob?.travelPerDiems || nursingJob?.mealsPay || nursingJob?.housingPay ? numberFormat.format(totalAmount(nursingJob?.weeklyEarnings, nursingJob?.travelPerDiems, nursingJob?.mealsPay, nursingJob?.housingPay)) + "/wk" : "N/A"}
                    </p>
                  </div>
                  <div className="d-flex gap-2 mt-3 job-icons">
                    <img src={clock} alt="dollar" />
                    <p style={{ whiteSpace: "nowrap" }}>
                    {nursingJob?.shiftType ? nursingJob.shiftType + ' Shift' : 'N/A'}{nursingJob?.shiftHours ? ", " + nursingJob.shiftHours : ''}
                    </p>
                  </div>
                  <div className="d-flex gap-2 mt-3 job-icons">
                    <img src={user} alt="dollar" />
                    <p style={{ whiteSpace: "nowrap" }}>
                      {nursingJob?.vacancies
                        ? nursingJob?.vacancies + " Vacancies"
                        : "N/A"}
                    </p>
                  </div>
                  <div className="d-flex gap-2 mt-3 job-icons">
                    <img src={location} alt="dollar" />
                    <p style={{ whiteSpace: "nowrap" }}>
                      {nursingJob?.cities?.length > 0
                        ? nursingJob?.cities?.join(", ")
                        : ""}
                      {nursingJob?.stateCode && nursingJob?.cities?.length > 0
                        ? ", "
                        : ""}
                      {nursingJob?.stateCode ? nursingJob?.stateCode : ""}
                      {nursingJob?.stateCode && nursingJob?.pinCode ? ", " : ""}
                      {nursingJob?.pinCode ? nursingJob?.pinCode : ""}
                      {!nursingJob?.cities?.length && !nursingJob?.stateCode && !nursingJob?.pinCode ? 'N/A' : ''}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="exploreJobs-right">
            <div className="exploreJobs-left-text">
              <div className="d-flex justify-content-between explore-job-header">
                <h2>Travel Allied Jobs</h2>
                <div
                  className="d-flex justify-content-end gap-2"
                  id="justify-start"
                >
                  <span>
                    <a
                      href={`/search-jobs?jobtitle=${encodeURIComponent(
                        "Allied Jobs"
                      )}&location=`}
                    >
                      Search Allied Jobs
                      <img
                        style={{ marginLeft: "8px" }}
                        src={RightArrow}
                        alt=""
                      />
                    </a>
                  </span>
                </div>
              </div>
              <div className="explore-line-job-suit "></div>
            </div>
            <div className="d-flex gap-4 mt-4 explore-job-divs">
              <div className="bg-white explore-line-div-left">
                <img src={image3} alt="" />
                <div className="explore-left-details">
                  <div className="d-flex justify-content-between  ">
                    <h2>
                      {alliedJob?.cities ? alliedJob?.cities.join(", ") : "N/A"}
                    </h2>
                    {/* <img src={rightArrow} alt="" /> */}
                  </div>
                  <h4>
                    {alliedJob?.cities ? alliedJob?.cities.join(", ") : ""}
                    {alliedJob?.cities?.length > 0 ? ", " : ""}
                    {alliedJob?.state ? alliedJob?.state : "N/A"}
                  </h4>
                </div>
              </div>
              <div className="bg-white explore-job-suit-right">
                <div className="explore-job-suit">
                  <h4>{alliedJob?.title ? alliedJob?.title : "N/A"}</h4>
                  <div className="d-flex align-content-center">
                    <div className="btn-part-full-time">
                      <button>
                        {alliedJob?.jobType?.length > 0
                          ? alliedJob?.jobType?.join(" || ")
                          : "N/A"}
                      </button>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between job-suit-lines">
                    <div className="line-job-suit"></div>
                  </div>
                  <div className="d-flex gap-2 mt-4 job-icons">
                    <img src={dollar} alt="dollar" />
                    <p style={{ whiteSpace: "nowrap" }}>
                      {alliedJob?.weeklyEarnings || alliedJob?.travelPerDiems || alliedJob?.mealsPay || alliedJob?.housingPay ? numberFormat.format(totalAmount(alliedJob?.weeklyEarnings, alliedJob?.travelPerDiems, alliedJob?.mealsPay, alliedJob?.housingPay)) + "/wk" : "N/A"}
                    </p>
                  </div>
                  <div className="d-flex gap-2 mt-3 job-icons">
                    <img src={clock} alt="dollar" />
                    <p style={{ whiteSpace: "nowrap" }}>
                      {alliedJob?.shiftType ? alliedJob.shiftType + ' Shift' : 'N/A'}{alliedJob?.shiftHours ? ", " + alliedJob.shiftHours : ''}
                    </p>
                  </div>
                  <div className="d-flex gap-2 mt-3 job-icons">
                    <img src={user} alt="dollar" />
                    <p style={{ whiteSpace: "nowrap" }}>
                      {alliedJob?.vacancies
                        ? alliedJob?.vacancies + " Vacancies"
                        : "N/A"}
                    </p>
                  </div>
                  <div className="d-flex gap-2 mt-3 job-icons">
                    <img src={location} alt="dollar" />
                    <p style={{ whiteSpace: "nowrap" }}>
                      {alliedJob?.cities?.length > 0
                        ? alliedJob?.cities?.join(", ")
                        : ""}
                      {alliedJob?.stateCode && alliedJob?.cities?.length > 0
                        ? ", "
                        : ""}
                      {alliedJob?.stateCode ? alliedJob?.stateCode : ""}
                      {alliedJob?.stateCode && alliedJob?.pinCode ? ", " : ""}
                      {alliedJob?.pinCode ? alliedJob?.pinCode : ""}
                      {!alliedJob?.cities?.length && !alliedJob?.stateCode && !alliedJob?.pinCode ? 'N/A' : ''}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
