import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
import rightArrow from "../../Assets/Img/icons/right-arrow.png";
import hero1 from "../../Assets/Img/hero/hero-2 (1).webp";
import Animate from "../Animation/Animate";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import Instance from "../../AxiosConfig";
import Select from 'react-select';

const MilesOption = [
  { value: 1, label: '0 miles' },
  { value: 5, label: '5 miles' },
  { value: 10, label: '10 miles' },
  { value: 15, label: '15 miles' },
  { value: 20, label: '20 miles' },
  { value: 25, label: '25 miles' },
  { value: 30, label: '30 miles' },
  { value: 35, label: '35 miles' },
  { value: 50, label: '50 miles' }
]

const HeroHome = () => {
  const navigate = useNavigate();
  const [searchedJob, setSearchedJob] = useState("");
  const [searchedLocation, setSearchedLocation] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showLocationSuggestion, setShowLocationSuggestion] = useState(false);
  const [showJobSuggestion, setShowJobSuggestion] = useState(false);
  const [jobTitles, setJobTitles] = useState([]);
  const [hashTags, setHashTags] = useState([]);
  const [locations, setLocations] = useState([]);
  const [miles, setMiles] = useState(MilesOption[5]);

  const fetchTopJobTitle = async () => {
    try {
      const response = await Instance.get('/getTopJobs');
      if (response.status === 200) {
        let topJobs = response?.data?.jobs;
        topJobs = topJobs?.filter((item) => item?.jobStatus === 'Open');
        let uniqueJobTitle = [...new Set(topJobs.map(job => job?.title.trim()))]
        uniqueJobTitle = uniqueJobTitle.slice(0, 5);
        setHashTags(uniqueJobTitle)
      }
    } catch (error) {
      console.error(error)
    }
  }

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
    fetchTopJobTitle();
    fetchJobSuggestions();
  }, []);

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
      navigate(`/search-jobs?jobtitle=${encodeURIComponent(searchedJob?.trim())}&location=${encodeURIComponent(searchedLocation?.trim())}&longitude=${encodeURIComponent(selectedLocation?.Place?.Geometry?.Point[0] || 0)}&latitude=${encodeURIComponent(selectedLocation?.Place?.Geometry?.Point[1] || 0)}&radius=${miles?.value}&regionCategory=${encodeURIComponent(selectedLocation?.Place?.Categories?.[0] || '')}`, { state: { selectedLocation } });
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
    <div className="home-hero-section">
      <div className="row align-items-center">
        <div className="col-lg-7">
          <div className="home-hero-content">
            <Animate>
              <h3>Discover Your Perfect Healthcare Role</h3>
            </Animate>
            <p>
              Links to quality of professionals to improved patient care
            </p>
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
                    // style={{ width: "100px"}}
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

            {showJobSuggestion && (
              <div className="Homepredicted-search-card">
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
              <div className="Homepredicted-search-card-city" >
                {locations?.length > 0 &&
                  <ul>
                    {locations?.map((item, index) => (
                      <li className="predicted-search-link" key={index} onClick={() => {
                        setSelectedLocation(item); setSearchedLocation(item?.Place?.Label); setShowLocationSuggestion(false);
                      }}><FaMapMarkerAlt className="location-icon" /> {item?.Place?.Label}</li>
                    ))}
                  </ul>
                }
              </div>
            )}

            <div className="latest-search">
              {hashTags.map((item, index) => (
                <div key={index} className="search-history-card">
                  <Link to={`/search-jobs?jobtitle=${encodeURIComponent(item)}&location=`} style={{ "textDecoration": "none", "color": "black" }}>{item}</Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="home-hero-slider">
            <div className="slides-hero-image">
              <img src={hero1} alt="..." />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroHome;
