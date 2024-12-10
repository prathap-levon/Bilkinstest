import React, { useEffect, useState, useMemo } from "react";
import { Container, Row, Col, Pagination } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import dollar from "../../Assets/Img/icons/dollar-sign.png";
import clock from "../../Assets/Img/icons/clock.png";
import location from "../../Assets/Img/icons/map-pin.png";
import user from "../../Assets/Img/icons/users-red.png"
import Instance from "../../AxiosConfig";
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
import Select from 'react-select';
import rightArrow from "../../Assets/Img/icons/right-arrow.png";

const MilesOption = [
  { value: 5000, label: '0 miles' },
  { value: 5 * 1609.34, label: '5 miles' },
  { value: 10 * 1609.34, label: '10 miles' },
  { value: 15 * 1609.34, label: '15 miles' },
  { value: 20 * 1609.34, label: '20 miles' },
  { value: 25 * 1609.34, label: '25 miles' },
  { value: 30 * 1609.34, label: '30 miles' },
  { value: 35 * 1609.34, label: '35 miles' },
  { value: 50 * 1609.34, label: '50 miles' },
]

const SearchService = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState(1);
  const [allJobs, setAllJobs] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const itemsPerPage = 6;
  const [searchedJob, setSearchedJob] = useState("");
  const [searchedLocation, setSearchedLocation] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showLocationSuggestion, setShowLocationSuggestion] = useState(false);
  const [showJobSuggestion, setShowJobSuggestion] = useState(false);
  const [miles, setMiles] = useState(MilesOption[5]);
  const [locations, setLocations] = useState([]);
  const [jobTitles, setJobTitles] = useState([]);




  const fetchJobs = async () => {
    try {
      const url = "/getAllJobs";
      const response = await Instance.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
        }
      });
      if (response.status === 200) {
        let joblist = response.data.jobs;
        joblist = joblist.filter((item) => (item?.jobStatus === "Open"));
        setAllJobs(joblist)
        setSearchResults(joblist)
      }
    } catch (error) {
      const msg = error.response.data.message;
      if (msg) {
        alert(msg)
      }
      console.error(error)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  const handlePageClick = (page) => {
    setActivePage(page);
  };


  const totalPages = Math.ceil(searchResults.length / itemsPerPage);

  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, searchResults.length);

  const currentPageResults = searchResults.slice(startIndex, endIndex);

  const fetchJobSuggestions = async () => {
    try {
      const response = await Instance.get('/getSearchSuggestionJobs');
      if (response.status === 200) {
        let data = response?.data?.jobSuggestions;
        if (data) setJobTitles(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchJobSuggestions();
  }, [searchedJob])

  const fetchLocationsSuggestion = async () => {
    try {
      if (searchedLocation?.trim() === '') return [];
      const response = await Instance.get(`/getSearchSuggestionLocation?searchedPlace=${searchedLocation}`);
      if (response.status === 200) {
        let data = response?.data?.locations;
        setLocations(data);
      }
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchLocationsSuggestion();
  }, [searchedLocation])

  const normalizeString = (str) => str.replace(/\s+/g, '').toLowerCase();

  const jobSuggestion = useMemo(() => {
    if (searchedJob.trim() === '') {
      return [];
    }
    const normalizedKeyword = normalizeString(searchedJob);
    return jobTitles.filter(term => normalizeString(term).includes(normalizedKeyword));
  }, [searchedJob]);

  const handleJobSearchChange = (event) => {
    setSearchedJob(event.target.value);
    if (event.target.value === '') {
      setShowJobSuggestion(false);
    } else setShowJobSuggestion(true);
    setShowLocationSuggestion(false);
  };

  const handleLocationSearchChange = (event) => {
    setSearchedLocation(event.target.value);
    setSelectedLocation(null);
    if (event.target.value === '') {
      setShowLocationSuggestion(false);
    } else setShowLocationSuggestion(true);
    setShowJobSuggestion(false);
  };

  const handleSearchButtonClick = async () => {
    try {
      navigate(`/search-jobs?jobtitle=${encodeURIComponent(searchedJob?.trim())}&location=${encodeURIComponent(searchedLocation?.trim())}&longitude=${encodeURIComponent(selectedLocation?.Place?.Geometry?.Point[0] || 0)}&latitude=${encodeURIComponent(selectedLocation?.Place?.Geometry?.Point[1] || 0)}&radius=${miles?.value}&regionCategory=${encodeURIComponent(selectedLocation?.Place?.Categories?.[0])}`, { state: { selectedLocation } });
    } catch (error) {
      console.error(error);
    }
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: 'none',
      boxShadow: 'none',
      width: "120px"
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: 'gray',
    }),
    indicatorSeparator: () => ({
      display: 'none',
      color: 'gray'
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'gray',

    }),
  };

  return (
    <div className="service-bg">
      <div className="staff_service_search_bar">
        <div className="search-section-display">
          <div className="search-container">
            <div className="search-input-container">
              <FaSearch className="search-icon" />
              <input
                type="search"
                className="search-input"
                placeholder="Job title or keywords"
                value={searchedJob}
                onChange={handleJobSearchChange}
              />
            </div>
            <div className="vertical-line"></div>
            <div className="search-input-container">
              <FaMapMarkerAlt className="location-icon" />
              <input
                type="search"
                className="search-input"
                value={searchedLocation}
                onChange={handleLocationSearchChange}
                placeholder="City, State or zip code"
              />
            </div>
            <div className="vertical-line"></div>
            <div className="search-input-container">
              <Select
                styles={customStyles}
                placeholder="Miles"
                options={MilesOption}
                value={miles}
                onChange={(e) => setMiles(e)}
              />
            </div>

          </div>
          <button
            className="search-button"
            onClick={handleSearchButtonClick}
          >
            <img src={rightArrow} alt="right-arrow" onClick={handleSearchButtonClick} />
          </button>
        </div>
      </div>

      {showJobSuggestion && (
        <div className="predicted-search-card">
          {jobSuggestion.length > 0 &&
            <ul>
              {jobSuggestion.map((item, index) => (
                <li className="predicted-search-link" key={index} onClick={() => {
                  setSearchedJob(item); setShowJobSuggestion(false);
                }}>{item}</li>
              ))}
            </ul>}
        </div>
      )}
      {showLocationSuggestion && (
        <div className="predicted-search-card" >
          {locations?.length > 0 &&
            <ul className="ml-250">
              {locations?.map((item, index) => (
                <li className="predicted-search-link" key={index} onClick={() => {
                  setSelectedLocation(item); setSearchedLocation(item?.Place?.Label); setShowLocationSuggestion(false);
                }}><FaMapMarkerAlt className="location-icon" /> {item?.Place?.Label}</li>
              ))}
            </ul>
          }
        </div>
      )}


      <div className="service-search">
        <Container>
          {currentPageResults.length === 0 ? (
            <div className="no-data-found">No data found</div>
          ) : (
            <div>
              {currentPageResults.map((result, index) => (
                <div key={index} className="job-search-map">
                  <Link to="/apply-now/quick-application">
                    <div className="card-job-suits">
                      <h4>{result?.title}</h4>
                      <div className="d-flex align-content-center">
                        <div className="btn-part-full-time">
                          <button>{result?.jobType?.length > 0 ? result?.jobType?.join(' || ') : 'N/A'}</button>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between job-suit-lines">
                        <div className="line-job-suit"></div>
                      </div>
                      <div className="d-flex gap-4 mt-4 job-icons">
                        <img src={dollar} alt="dollar" />
                        <p style={{ whiteSpace: "nowrap" }}>{result?.minSalary ? '$ ' + result?.minSalary : ''} {result?.minSalary && result?.maxSalary ? ' - ' : ''}{result?.maxSalary ? '$ ' + result?.maxSalary : ''}{!result?.minSalary && !result?.maxSalary ? 'N/A' : ''} {(result?.minSalary && result?.payBasis) || (result?.maxSalary && result?.payBasis) ? result?.payBasis : ''}</p>
                      </div>
                      <div className="d-flex gap-4 mt-3 job-icons">
                        <img src={clock} alt="clock" />
                        <p style={{ whiteSpace: "nowrap" }}>{result?.shiftType ? result.shiftType + ' Shift' : 'N/A'}{result?.shiftHours ? ", " + result.shiftHours : ''}</p>
                      </div>
                      <div className="d-flex gap-4 mt-3 job-icons">
                        <img src={user} alt="user" />
                        <p style={{ whiteSpace: "nowrap" }}>{result?.vacancies ? result?.vacancies + ' Vacancies' : 'N/A'}</p>
                      </div>
                      <div className="d-flex gap-4 mt-3 job-icons">
                        <img src={location} alt="location" />
                        <p style={{ whiteSpace: "nowrap" }}>{result?.cities?.length > 0 ? result?.cities?.join(', ') : 'N/A'}, {result?.state ? result?.state : ''}{result?.pinCode ? ', ' + result?.pinCode : ''}</p>
                      </div>
                      <div className="d-flex justify-content-between mt-4 apply-job-button">
                        <button className="home-about-us-btn">Apply Now</button>
                        <h6>{result.postedTime}</h6>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
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
        </Container>
      </div>
    </div>
  );
};

export default SearchService;
