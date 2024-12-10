import React, { useState, useEffect, useMemo } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { useLocation, useSearchParams } from "react-router-dom";
import Instance from "../../AxiosConfig";
import Select from "react-select";
import { Slider } from "antd";
import { FaFilter } from "react-icons/fa";
import { Modal, Button, DatePicker, Anchor } from "antd";

const { Link } = Anchor;

const jobcategoryOptions = [
  { value: "Allied Jobs", label: "Allied Jobs" },
  { value: "Nursing Jobs", label: "Nursing Jobs" },
];

const jobTypeOptions = [
  { value: "Part Time", label: "Part Time" },
  { value: "Full Time", label: "Full Time" },
  { value: 'Travel Contact', label: 'Travel Contact' },
  { value: 'Per Diem', label: 'Per Diem' },
  { value: "Internship", label: "Internship" },
  { value: "Contract", label: "Contract" },
];

const shiftOptions = [
  { value: "Day", label: "Day Shift" },
  { value: "Mid", label: "Mid Shift" },
  { value: "Evening", label: "Evening Shift" },
  { value: "Night", label: "Night Shift" },
  { value: "Rotating", label: "Rotating" },
];

const shiftHoursOptions = [
  { value: "5x8", label: "5x8" },
  { value: "4x10", label: "4x10" },
  { value: "4x12", label: "4x12" },
  { value: "3x12", label: "3x12" }
];

const experienceOptions = [
  { value: "Entry Level", label: "Entry Level" },
  { value: "Mid Level", label: "Mid Level" },
  { value: "Seniority", label: "Seniority" },
];

const MilesOption = [
  { value: 1, label: "0 miles" },
  { value: 5, label: "5 miles" },
  { value: 10, label: "10 miles" },
  { value: 15, label: "15 miles" },
  { value: 20, label: "20 miles" },
  { value: 25, label: "25 miles" },
  { value: 30, label: "30 miles" },
  { value: 35, label: "35 miles" },
  { value: 50, label: "50 miles" },
  // { value: 100, label: "100 miles" },
  // { value: 200, label: "200 miles" },
];

const customStyles = {
  control: (provided) => ({
    ...provided,
    border: "none",
    boxShadow: "none",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "gray",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
};

export const JobSearchComp = ({
  selectedFilters,
  handleSearch,
  handleFilterChange,
  handleRemoveFilter,
  handleApplyFilter,
}) => {
  const [searchParams] = useSearchParams();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchedJob, setSearchedJob] = useState("");
  const [searchedLocation, setSearchedLocation] = useState("");
  const [showLocationSuggestion, setShowLocationSuggestion] = useState(false);
  const [showJobSuggestion, setShowJobSuggestion] = useState(false);
  const [locations, setLocations] = useState([]);
  const [jobTitles, setJobTitles] = useState([]);
  const [miles, setMiles] = useState(MilesOption[5]);
  const { state } = useLocation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (state?.selectedLocation) {
      setSelectedLocation(state?.selectedLocation);
    }

    if (searchParams?.get("jobtitle")) {
      setSearchedJob(searchParams.get("jobtitle"));
    }

    if (searchParams?.get("location")) {
      setSearchedLocation(searchParams.get("location"));
    }

    let selectedRadius = MilesOption?.find(
      (item) => item.value === searchParams?.get("radius")
    );
    if (selectedRadius) {
      setMiles(selectedRadius);
    }
  }, []);

  const fetchJobSuggestions = async () => {
    try {
      const response = await Instance.get("/getSearchSuggestionJobs");
      if (response.status === 200) {
        let data = response?.data?.jobSuggestions;
        if (data) setJobTitles(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchJobSuggestions();
  }, []);

  const normalizeString = (str) => str.replace(/\s+/g, "").toLowerCase();

  const jobSuggestion = useMemo(() => {
    if (searchedJob.trim() === "") {
      return [];
    }
    const normalizedKeyword = normalizeString(searchedJob);
    return jobTitles.filter((term) =>
      normalizeString(term).includes(normalizedKeyword)
    );
  }, [searchedJob]);

  const fetchLocationsSuggestion = async () => {
    try {
      if (searchedLocation?.trim() === "") return [];
      const response = await Instance.get(
        `/getSearchSuggestionLocation?searchedPlace=${searchedLocation}`
      );
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
  }, [searchedLocation]);

  const handleJobSearchChange = (event) => {
    setSearchedJob(event.target.value);
    if (event.target.value === "") {
      setShowJobSuggestion(false);
    } else setShowJobSuggestion(true);
    setShowLocationSuggestion(false);
  };

  const handleLocationSearchChange = (event) => {
    setSearchedLocation(event.target.value);
    setSelectedLocation(null);
    if (event.target.value === "") {
      setShowLocationSuggestion(false);
    } else setShowLocationSuggestion(true);
    setShowJobSuggestion(false);
  };

  const handleKeyDown = async (event) => {
    try {
      if (event.key === 'Enter') {
        await handleSearchButtonClick();
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleSearchButtonClick = async () => {
    try {
      setShowJobSuggestion(false);
      setShowLocationSuggestion(false);
      handleSearch(
        searchedJob?.trim(),
        searchedLocation?.trim(),
        selectedLocation?.Place?.Geometry?.Point[0],
        selectedLocation?.Place?.Geometry?.Point[1],
        miles?.value,
        selectedLocation?.Place?.Categories?.[0]
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="job-page-search-container">
      <div className="row">
        <div className="col-12">
          <div className="search_page_header">
            <div className="search_page_Title">
              <h1>Search your</h1>
              <h1 style={{ color: "#ce1b28" }}>Dream Job!</h1>
            </div>
            <div className="search-header-vertical-line"></div>
            <div className="search-section-display-job-page">
              <div className="jobsearch_page_container">
                <div className="search-input-container">
                  <FaSearch className="search-icon" />
                  <input
                    type="search"
                    className="search-input"
                    placeholder="Job title or Specialities"
                    value={searchedJob}
                    onChange={handleJobSearchChange}
                    onKeyDown={handleKeyDown}
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
                    onKeyDown={handleKeyDown}
                    placeholder="City, State or zip code"
                  />
                </div>
                <div className="vertical-line"></div>
                <div className="search-input-container">
                  <Select
                    className="job-search-mile-selector"
                    styles={customStyles}
                    placeholder="Miles"
                    options={MilesOption}
                    value={miles}
                    onChange={(e) => setMiles(e)}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </div>
              <button
                className="jobsearch_page_button"
                onClick={handleSearchButtonClick}
              >
                <FaSearch />
              </button>
            </div>
            {showJobSuggestion && (
              <div className="predicted-search-card">
                {jobSuggestion?.length > 0 && (
                  <ul>
                    {jobSuggestion?.map((item, index) => (
                      <li
                        className="predicted-search-link"
                        key={index}
                        onClick={() => {
                          setSearchedJob(item);
                          setShowJobSuggestion(false);
                        }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {showLocationSuggestion && (
              <div className="predicted-search-card-city">
                {locations?.length > 0 && (
                  <ul>
                    {locations?.map((item, index) => (
                      <li
                        className="predicted-search-link"
                        key={index}
                        onClick={() => {
                          setSelectedLocation(item);
                          setShowLocationSuggestion(false);
                          setSearchedLocation(item?.Place?.Label);
                        }}
                      >
                        <FaMapMarkerAlt className="location-icon" />{" "}
                        {item?.Place?.Label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            <div className="job_page_filter">
              <button
                className="search_job_page_filter_button"
                onClick={() => {
                  setIsModalVisible(true);
                }}
              >
                <FaFilter style={{ fontSize: "12px" }} /> Filters
              </button>
            </div>
            <div className="mobile-res-filter">
              <button
                className="search_job_page_filter_button"
                onClick={() => {
                  setIsModalVisible(true);
                }}
              >
                <FaFilter style={{ fontSize: "12px" }} /> Filters
              </button>
            </div>
            <Modal
              width={700}
              title="Filter"
              open={isModalVisible}
              onOk={() => setIsModalVisible(false)}
              onCancel={() => setIsModalVisible(false)}
              footer={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Button
                    className="clear_button"
                    key="cancel"
                    onClick={() => {
                      handleRemoveFilter();
                      setIsModalVisible(false);
                    }}
                  >
                    Clear All
                  </Button>
                  <Button
                    key="submit"
                    type="primary"
                    className="apply_filter_button"
                    onClick={() => {
                      setIsModalVisible(false);
                      handleApplyFilter();
                    }}
                  >
                    Apply Filters
                  </Button>
                </div>
              }
            >
              <Anchor>
                <Link href="#jobCategory" title="Job Category" />
                <Link href="#jobType" title="Job Type" />
                <Link href="#payRate" title="Pay Rate" />
                <Link href="#shiftType" title="Shift Type" />
                <Link href="#experience" title="Experience Level" />
                <Link href="#jobPostedDate" title="Job Posted Date" />
              </Anchor>
              <div className="filter_body">
                <div id="jobCategory" className="filter_section_body">
                  <h1>Job Category</h1>
                  <Select
                    mode="multiple"
                    placeholder="Job Category"
                    options={jobcategoryOptions}
                    onChange={(e) => handleFilterChange("jobCategory", e)}
                    value={selectedFilters?.jobCategory || null}
                    style={{ width: '100%' }}
                    maxMenuHeight={120}
                    isMulti
                  />
                </div>
                <div id="jobType" className="filter_section_body">
                  <h1>Job Type</h1>
                  <Select
                    mode="multiple"
                    style={{ width: "100%" }}
                    placeholder="Job Type"
                    options={jobTypeOptions}
                    onChange={(e) => handleFilterChange("jobType", e)}
                    value={selectedFilters?.jobType || null}
                    maxMenuHeight={120}
                    isMulti
                  />
                </div>
                <div id="payRate" className="filter_section_body">
                  <h1>Pay Rate</h1>
                  <Slider
                    min={0}
                    max={50000}
                    onChange={(e) => handleFilterChange("payRate", e)}
                    value={selectedFilters?.payRate}
                  />
                  <div>
                    {selectedFilters?.payRate
                      ? `$ ${selectedFilters?.payRate}/wk`
                      : "$ 0/wk"}
                  </div>
                </div>
                <div id="shiftType" className="filter_section_body">
                  <h1>Shift Type</h1>
                  <Select
                    mode="multiple"
                    placeholder="Shift Type"
                    options={shiftOptions}
                    onChange={(e) => handleFilterChange("shiftType", e)}
                    value={selectedFilters?.shiftType || null}
                    style={{ width: '100%' }}
                    menuPlacement="bottom"
                    maxMenuHeight={120}
                    isMulti
                  />
                </div>
                <div id="shiftType" className="filter_section_body">
                  <h1>Shift Hours</h1>
                  <Select
                    mode="multiple"
                    placeholder="Shift Hours"
                    options={shiftHoursOptions}
                    onChange={(e) => handleFilterChange("shiftHours", e)}
                    value={selectedFilters?.shiftHours || null}
                    style={{ width: '100%' }}
                    menuPlacement="bottom"
                    maxMenuHeight={120}
                    isMulti
                  />
                </div>
                <div id="experience" className="filter_section_body">
                  <h1>Experience Level</h1>
                  <Select
                    mode="multiple"
                    placeholder="Experience"
                    options={experienceOptions}
                    onChange={(e) => handleFilterChange("experience", e)}
                    value={selectedFilters?.experience || null}
                    style={{ width: '100%' }}
                    menuPlacement="bottom"
                    maxMenuHeight={120}
                    isMulti
                  />
                </div>
                <div id="jobPostedDate" className="filter_section_body">
                  <h1>Job Posted Date</h1>
                  <DatePicker
                    onChange={(date) => handleFilterChange("jobPostedDate", date)}
                    value={selectedFilters?.jobPostedDate || null}
                    className="expiration-date-picker"
                    style={{ width: '100%' }}
                    placeholder="Job Posted Date"
                    format={'MM/DD/YYYY'}
                  />
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};
