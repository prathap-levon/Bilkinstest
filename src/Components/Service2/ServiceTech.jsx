import React, { useState } from "react";
import ServiceIcon from "../../Assets/Img/user/user-1.png";
import {
  Col,
  Container,
  Row,
  Card,
  Button,
  Carousel,
  Pagination,
} from "react-bootstrap";
import { IoIosCloseCircle } from "react-icons/io";
import filter from "../../Assets/Img/icons/filter.png";
import user from "../../Assets/Img/icons/users.png";
const searchData = [
  {
    id: 1,
    hospitalName: "Apollo Hospital",
    proIcon: ServiceIcon,
    iconText: "1000-2000",
    jobTitle: "Ultra sound Tech",
    userIcon: user,
    fullType: "Full Time",
    partType: "Part Time",
    numJobs: 10,
    salary: "$50K - $90K",
    jobDate: "50 Mins Ago",
  },
  {
    id: 2,
    hospitalName: "Kokilaben Hostipal",
    proIcon: ServiceIcon,
    iconText: "1200-1400",
    jobTitle: "Gynologist",
    userIcon: user,
    fullType: "Full Time",
    partType: "Part Time",
    numJobs: 5,
    salary: "$30K - $50K",
    jobDate: "2 Hours Ago",
  },
  {
    id: 3,
    hospitalName: "Fortis Hospital",
    proIcon: ServiceIcon,
    iconText: "1000-2000",
    jobTitle: "Sr Surgoen",
    userIcon: user,
    fullType: "Full Time",
    partType: "Part Time",
    numJobs: 10,
    salary: "$50K - $90K",
    jobDate: "3 Days Ago",
  },
  {
    id: 4,
    hospitalName: "Sriram College",
    proIcon: ServiceIcon,
    iconText: "1200-1400",
    jobTitle: "Gynologist Lecturar",
    userIcon: user,
    fullType: "Full Time",
    partType: "Part Time",
    numJobs: 5,
    salary: "$30K - $40K",
    jobDate: "1 Hours Ago",
  },

  {
    id: 5,
    hospitalName: "Apollo Hospital",
    proIcon: ServiceIcon,
    iconText: "1000-2000",
    jobTitle: "Ultra sound Tech",
    userIcon: user,
    fullType: "Full Time",
    partType: "Part Time",
    numJobs: 10,
    salary: "$50K - $90K",
    jobDate: "50 Mins Ago",
  },
  {
    id: 6,
    hospitalName: "Kokilaben Hostipal",
    proIcon: ServiceIcon,
    iconText: "1200-1400",
    jobTitle: "Gynologist",
    userIcon: user,
    fullType: "Full Time",
    partType: "Part Time",
    numJobs: 5,
    salary: "$30K - $50K",
    jobDate: "2 Hours Ago",
  },
  {
    id: 7,
    hospitalName: "Fortis Hospital",
    proIcon: ServiceIcon,
    iconText: "1000-2000",
    jobTitle: "Sr Surgoen",
    userIcon: user,
    fullType: "Full Time",
    partType: "Part Time",
    numJobs: 10,
    salary: "$50K - $90K",
    jobDate: "3 Days Ago",
  },
  {
    id: 8,
    hospitalName: "Sriram College",
    proIcon: ServiceIcon,
    iconText: "1200-1400",
    jobTitle: "Gynologist Lecturar",
    userIcon: user,
    fullType: "Full Time",
    partType: "Part Time",
    numJobs: 5,
    salary: "$30K - $40K",
    jobDate: "1 Hours Ago",
  },
  {
    id: 9,
    hospitalName: "Apollo Hospital",
    proIcon: ServiceIcon,
    iconText: "1000-2000",
    jobTitle: "Ultra sound Tech",
    userIcon: user,
    fullType: "Full Time",
    partType: "Part Time",
    numJobs: 10,
    salary: "$50K - $90K",
    jobDate: "50 Mins Ago",
  },
  {
    id: 10,
    hospitalName: "Kokilaben Hostipal",
    proIcon: ServiceIcon,
    iconText: "1200-1400",
    jobTitle: "Gynologist",
    userIcon: user,
    fullType: "Full Time",
    partType: "Part Time",
    numJobs: 5,
    salary: "$30K - $50K",
    jobDate: "2 Hours Ago",
  },
  {
    id: 11,
    hospitalName: "Fortis Hospital",
    proIcon: ServiceIcon,
    iconText: "1000-2000",
    jobTitle: "Sr Surgoen",
    userIcon: user,
    fullType: "Full Time",
    partType: "Part Time",
    numJobs: 10,
    salary: "$50K - $90K",
    jobDate: "3 Days Ago",
  },
  {
    id: 12,
    hospitalName: "Sriram College",
    proIcon: ServiceIcon,
    iconText: "1200-1400",
    jobTitle: "Gynologist Lecturar",
    userIcon: user,
    fullType: "Full Time",
    partType: "Part Time",
    numJobs: 5,
    salary: "$30K - $40K",
    jobDate: "1 Hours Ago",
  },
  {
    id: 13,
    hospitalName: "Apollo Hospital",
    proIcon: ServiceIcon,
    iconText: "1000-2000",
    jobTitle: "Ultra sound Tech",
    userIcon: user,
    fullType: "Full Time",
    partType: "Part Time",
    numJobs: 10,
    salary: "$50K - $90K",
    jobDate: "50 Mins Ago",
  },
  {
    id: 14,
    hospitalName: "Kokilaben Hostipal",
    proIcon: ServiceIcon,
    iconText: "1200-1400",
    jobTitle: "Gynologist",
    userIcon: user,
    fullType: "Full Time",
    partType: "Part Time",
    numJobs: 5,
    salary: "$30K - $50K",
    jobDate: "2 Hours Ago",
  },
  {
    id: 15,
    hospitalName: "Fortis Hospital",
    proIcon: ServiceIcon,
    iconText: "1000-2000",
    jobTitle: "Sr Surgoen",
    userIcon: user,
    fullType: "Full Time",
    partType: "Part Time",
    numJobs: 10,
    salary: "$50K - $90K",
    jobDate: "3 Days Ago",
  },
  {
    id: 16,
    hospitalName: "Sriram College",
    proIcon: ServiceIcon,
    iconText: "1200-1400",
    jobTitle: "Gynologist Lecturar",
    userIcon: user,
    fullType: "Full Time",
    partType: "Part Time",
    numJobs: 5,
    salary: "$30K - $40K",
    jobDate: "1 Hours Ago",
  },
];

const ServiceTech = () => {
  const [activePage, setActivePage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState(searchData);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const itemsPerPage = 6;

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handlePageClick = (page) => {
    setActivePage(page);
  };

  const performSearch = () => {
    if (searchInput.trim() === "") {
      setSearchResults(searchData);
      return;
    }

    const filteredResults = searchData.filter(
      (result) =>
        result.hospitalName.toLowerCase().includes(searchInput.toLowerCase()) ||
        result.jobTitle.toLowerCase().includes(searchInput.toLowerCase())
    );

    setSearchResults(filteredResults.length > 0 ? filteredResults : searchData);
    setActivePage(1);
  };

  const handleFilterButtonClick = () => {
    setShowFilterPanel(!showFilterPanel);
  };

  const applyFilter = (filterOption) => {
    let filteredResults = [...searchData];

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

  return (
    <>
      <Container fluid className="Service-left-side">
        <div className="service-search-bg-section" >
          <Row>
            <Col lg={4}>
              <input
                type="text"
                placeholder="Search by: Job title, Position, Keyword..."
                className="searchservice-input"
                value={searchInput}
                onChange={handleSearchInputChange}
              />
            </Col>
            <Col lg={4}>
              <div className="location-input-container">
                <input
                  type="text"
                  placeholder="City, state or zip code"
                  className="locationservice-input"
                />
                <div className="map-icon"></div>
              </div>
            </Col>
            <Col lg={2}>
              <Button
                className="w-100 search-button-filter"
                onClick={handleFilterButtonClick}
              >
                <img className="filter-buttom-icon" src={filter} alt="" />
                Filters
              </Button>
              {showFilterPanel && (
                <div className="filter-options">
                  <div className="d-flex align-items-center justify-content-between">
                    <h3>Filter By</h3>
                    <div
                      className="icons-close-popup"
                      onClick={handleCloseFilterPanel}
                    >
                      <IoIosCloseCircle
                        style={{ fontSize: "24px", cursor: "pointer" }}
                      />
                    </div>
                  </div>
                  <hr />
                  <Button onClick={() => applyFilter("latest")}>Latest</Button>
                  <Button onClick={() => applyFilter("active")}>Active</Button>
                  <Button onClick={() => applyFilter("last_10_days")}>
                    Last 10 Days
                  </Button>
                  <Button onClick={() => applyFilter("last_Month")}>
                    Last Month
                  </Button>
                </div>
              )}
            </Col>
            <Col lg={2} className="p-0">
              <Button
                className="w-100 search-button-job"
                onClick={performSearch}
              >
                Find Job
              </Button>
            </Col>
          </Row>
        </div>
        <div className="service-search ">
          <Container>
            <Row>
              <Col>
                <Carousel>
                  <Carousel.Item>
                    <Row className="mt-3">
                      {currentPageResults.length === 0 ? (
                        <div className="no-data-found">No data found</div>
                      ) : (
                        currentPageResults.map((result) => (
                          <Col key={result.id} lg={6} className="mb-4">
                            <Card className="cardserviceBody shadow">
                              <Card.Body>
                                <Row>
                                  <Col lg={6} className="justify-content-start">
                                    <div className="img-with-Text">
                                      <div>
                                        <img src={result.proIcon} alt="..." />
                                      </div>
                                      <div className="user-data-section">
                                        <h5>{result.hospitalName}</h5>
                                        <div className="img-with-Text">
                                          <img
                                            className="users-icons"
                                            src={result.userIcon}
                                            alt=""
                                          />
                                          <p>{result.iconText}</p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="line-cards-jobs" />
                                    <Card.Title>
                                      <strong>{result.jobTitle}</strong>
                                    </Card.Title>
                                    <div className="d-flex mt-4">
                                      <button className="oval-button mr-2">
                                        {result.fullType}
                                      </button>

                                      <button className="oval-button mr-2">
                                        {result.partType}
                                      </button>
                                    </div>
                                  </Col>
                                  <Col lg={6} className="text-end">
                                    <button className="ovalright-button">
                                      {result.numJobs} Jobs
                                    </button>
                                    <h2 className="right-head">
                                      {result.salary}
                                    </h2>
                                    <p className="right-subhead">
                                      {result.jobDate}
                                    </p>
                                  </Col>
                                </Row>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))
                      )}
                    </Row>
                  </Carousel.Item>
                </Carousel>
              </Col>
            </Row>
            {searchResults.length > itemsPerPage && (
              <Row className="my-4">
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
                        className={`pagination-item ${
                          index + 1 === activePage ? "active" : ""
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
      
      </Container>
    </>
  );
};
export default ServiceTech;
