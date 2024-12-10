import React, { useEffect, useState } from "react";
import { Col, Row, Pagination } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import hiringBanner from "../../Assets/Img/hero/hiringBanner.png";
import Animate from "../Animation/Animate";
import dollar from "../../Assets/Img/icons/dollar-sign.png";
import clock from "../../Assets/Img/icons/clock.png";
import locationsymbol from "../../Assets/Img/icons/map-pin.png";
import user from "../../Assets/Img/icons/users-red.png";
import Instance from "../../AxiosConfig";
import { formatUrl, showErrorAlert } from "../../globalConstant";
import NodataImg from "../../Assets/Img/icons/nodatafound.png";

const HiringBanner = () => {
  const [queryParams] = useSearchParams();
  const location = queryParams.get("location")?.trim() || "";
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [allJobs, setAllJobs] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const itemsPerPage = 6;
  const numberFormat = new Intl.NumberFormat();

  const fetchAllJobs = async () => {
    try {
      const url = "/getAllJobs";
      const response = await Instance.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });

      if (response.status === 200) {
        let joblist = response?.data?.jobs;
        joblist = joblist.filter((item) => item?.jobStatus === "Open");
        if (location?.trim() !== "") {
          joblist = joblist.filter((item) => item?.state === location);
        }
        setAllJobs(joblist);
        setSearchResults(joblist);
      }
    } catch (error) {
      showErrorAlert(error?.response?.data?.message || "An error occured");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllJobs();
  }, [location]);

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchLocationChange = (e) => {
    setSearchLocation(e.target.value);
  };

  const handlePageClick = (page) => {
    setActivePage(page);
  };

  const performSearch = async () => {
    try {
      if (searchInput.trim() === "" && searchLocation.trim() === "") {
        setSearchResults(allJobs);
        return;
      }

      const payload = {
        jobTitle: searchInput,
        location: searchLocation,
      };

      const url = "/searchJob";
      const response = await Instance.get(url, payload);
      if (response.status === 200) {
        let searchjobs = response.data.jobs;
        setSearchResults(searchjobs);
      }
    } catch (error) {
      const msg = error.response.data.message;
      if (msg) {
        alert(msg);
      }
      console.error(error);
    }
  };

  const handleFilterButtonClick = () => {
    setShowFilterPanel(!showFilterPanel);
  };

  const applyFilter = (filterOption) => {
    let filteredResults = [...allJobs];

    switch (filterOption) {
      case "latest":
        filteredResults.sort(
          (a, b) => new Date(b.jobDate) - new Date(a.jobDate)
        );
        break;
      case "active":
        filteredResults = filteredResults.filter(
          (result) => result.numJobs > 0
        );
        break;
      case "last_10_days":
        filteredResults = filteredResults.filter((result) => {
          const jobDate = new Date(result.jobDate);
          const today = new Date();
          const diffTime = Math.abs(today - jobDate);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return diffDays <= 10;
        });
        break;
      case "last_Month":
        filteredResults = filteredResults.filter((result) => {
          const jobDate = new Date(result.jobDate);
          const today = new Date();
          const diffTime = Math.abs(today - jobDate);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          const diffMonths = Math.ceil(diffDays / 30);
          return diffMonths <= 1;
        });
        break;
      default:
        break;
    }

    setSearchResults(filteredResults);
    setShowFilterPanel(false);
    setActivePage(1);
  };

  const handleCloseFilterPanel = () => {
    setShowFilterPanel(false);
  };

  const totalPages = Math.ceil(searchResults.length / itemsPerPage);

  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, searchResults.length);

  const currentPageResults = searchResults.slice(startIndex, endIndex);

  const totalAmount = (a, b, c, d) => {
    return (a ? a : 0) + (b ? b : 0) + (c ? c * 7 : 0) + (d ? d * 7 : 0);
  };

  return (
    <div className="hiringBanner-container container-fluid">
      <div className="service-background"></div>
      <Row>
        <Col md={6} className="hiringBannerLeft">
          <Animate>
            <h1>Hiring Hotspots</h1>
          </Animate>

          <h3>Dive Into Our Hiring Hotspots</h3>
          <p>
            we offer opportunities for career growth and development wherever
            you are. Whether you're based in the heart of a metropolis or
            nestled in a picturesque countryside, Bilkins provides a supportive
            and inclusive work environment where your skills and contributions
            are valued.
          </p>
        </Col>
        <Col md={6} className="hiring-banner-right">
          <div>
            <img
              src={hiringBanner}
              className="img-fluid hiring-banner-img"
              alt="hiringBanner"
            />
          </div>
        </Col>
      </Row>

      <div className="service-search ">
        <div className="container">
          <Row className="mt-3">
            <div className="LatestJobs-head hiring-jobs-head">
              <div>
                <Animate>
                  <h1>Explore Your Next Career Move</h1>
                </Animate>

                <p style={{ color: "#000", paddingBottom: "2rem" }}>
                  Discover the newest and most sought-after job opportunities
                  with us! From dynamic roles <br /> in various industries to
                  remote work options, explore positions that align with your
                  skills and aspirations.
                </p>
              </div>
            </div>
            {currentPageResults.length === 0 ? (
              <div className="no-data-found">
                No data found{" "}
                <img className="no-data-img" src={NodataImg} alt="" />
              </div>
            ) : (
              <div className="hiring-job-search-content row">
                {currentPageResults.map((result, index) => (
                  <div key={index} className="job-search-map col-lg-4">
                    <div className="card-job-suits">
                      <h4>{result?.title}</h4>
                      <div className="d-flex align-content-center">
                        <div className="btn-part-full-time">
                          <button>
                            {result?.jobType?.length > 0
                              ? result?.jobType?.join(" || ")
                              : "N/A"}
                          </button>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between job-suit-lines">
                        <div className="line-job-suit"></div>
                      </div>
                      <div className="d-flex gap-4 mt-4 job-icons">
                        <img src={dollar} alt="dollar" />
                        <p style={{ whiteSpace: "nowrap" }}>
                          {result?.weeklyEarnings || result?.travelPerDiems || result?.mealsPay || result?.housingPay ? numberFormat.format(totalAmount(result?.weeklyEarnings, result?.travelPerDiems, result?.mealsPay, result?.housingPay)) + "/wk" : "N/A"}
                        </p>
                      </div>
                      <div className="d-flex gap-4 mt-3 job-icons">
                        <img src={clock} alt="clock" />
                        <p style={{ whiteSpace: "nowrap" }}>
                          {result?.shiftType ? result.shiftType + ' Shift' : 'N/A'}{result?.shiftHours ? ", " + result.shiftHours : ''}
                        </p>
                      </div>
                      <div className="d-flex gap-4 mt-3 job-icons">
                        <img src={user} alt="user" />
                        <p style={{ whiteSpace: "nowrap" }}>
                          {result?.vacancies
                            ? result?.vacancies + " Vacancies"
                            : "N/A"}
                        </p>
                      </div>
                      <div className="d-flex gap-4 mt-3 job-icons">
                        <img src={locationsymbol} alt="location" />
                        <p style={{ whiteSpace: "nowrap" }}>
                          {result?.cities?.length > 0
                            ? result?.cities?.join(", ")
                            : ""}
                          {result?.stateCode && result?.cities?.length > 0
                            ? ", "
                            : ""}
                          {result?.stateCode ? result?.stateCode : ""}
                          {result?.stateCode && result?.pinCode ? ", " : ""}
                          {result?.pinCode ? result?.pinCode : ""}
                        </p>
                      </div>
                      <div className="d-flex justify-content-between mt-4 apply-job-button">
                        <button
                          className="home-about-us-btn"
                          onClick={() => {
                            // navigate(`/job-detail/${result._id}`, {
                            //   state: { jobId: result?._id },
                            // });
                            const location = formatUrl(result.state);
                            const title = formatUrl(result.title);
                            navigate( `/jobs/${location}/${title}/${result?._id}`, { state: { jobId: result?._id } })
                          }}
                        >
                          Apply Now
                        </button>
                        <h6>{result.postedTime}</h6>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Row>

          {searchResults.length > itemsPerPage && (
            <Row className="position-relative z-2">
              <Col>
                <Pagination className="justify-content-center">
                  <Pagination.Prev
                    onClick={() => handlePageClick(activePage - 1)}
                    disabled={activePage === 1}
                  />
                  {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item
                      key={index}
                      active={index + 1 === activePage}
                      onClick={() => handlePageClick(index + 1)}
                      className={`pagination-item ${index + 1 === activePage ? "active" : ""
                        }`}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    onClick={() => handlePageClick(activePage + 1)}
                    disabled={activePage === totalPages}
                  />
                </Pagination>
              </Col>
            </Row>
          )}
        </div>
      </div>
    </div>
  );
};

export default HiringBanner;
