import React, { useEffect, useRef, useState } from "react";
// import { BsPeople } from "react-icons/bs";

import Animate from "../Animation/Animate";
import dollar from "../../Assets/Img/icons/dollar-sign.png";
import clock from "../../Assets/Img/icons/clock.png";
import locationn from "../../Assets/Img/icons/map-pin.png";
import user from "../../Assets/Img/icons/users-red.png";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import Instance from "../../AxiosConfig";


const SearchedJobs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const marqueeRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const navigate = useNavigate();

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - marqueeRef.current.offsetLeft);
    setScrollLeft(marqueeRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - marqueeRef.current.offsetLeft;
    const walk = (x - startX) * 3;
    marqueeRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleJobLink = (link) => {
    navigate(link);
  };

  const fetchSearchResults = async () => {
    try {
      const searchString = searchParams.get('searchString');
      const location = searchParams.get('location');
      const url = `/searchJob?searchString=${encodeURIComponent(searchString)}&location=${encodeURIComponent(location)}`;
      const response = await Instance.get(url);
      if (response.status === 200) {
        setJobs(response.data.jobs);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchSearchResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, []);

  return (
    <>
      <div className="home-job-suit-section search-job-section">
        <Animate>
          <h3>Discover Most Relevant Jobs Tailored for You</h3>
          <h4>Discover and Apply to Flexible Nursing and Allied Health Jobs Anytime, Anywhere.</h4>
        </Animate>
        <center>
          <div className="main-outer-section">
            <div className="all-cards-marquee"></div>
            <div
              className="home-marquee-section"
              ref={marqueeRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {jobs.length === 0 && <p>No data found</p>}
              {jobs.map((job, index) => (
                <div className="card-job-suit" key={index}>
                  <h4>{job.title}</h4>
                  <div className="d-flex align-content-center">
                    <div className="btn-part-full-time">
                      <button>{job.jobRole}</button>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between job-suit-lines">
                    <div className="line-job-suit"></div>
                  </div>
                  <div className="d-flex gap-4 mt-4 job-icons">
                    <img src={dollar} alt="dollar" />
                    <p>{`${job.minSalary} - ${job.maxSalary} ${job.salaryType || ""}`}</p>
                  </div>
                  <div className="d-flex gap-4 mt-3 job-icons">
                    <img src={clock} alt="dollar" />
                    <p>{job.days}</p>
                  </div>
                  <div className="d-flex gap-4 mt-3 job-icons">
                    <img src={user} alt="user" />
                    <p>{job.vacancies} Vacancies</p>
                  </div>
                  <div className="d-flex gap-4 mt-3 job-icons">
                    <img src={locationn} alt="location" />
                    <p>{`${job.city}, ${job.country}`}</p>
                  </div>

                  <div className="d-flex justify-content-between mt-4 apply-job-button">
                    <button
                      onClick={() => handleJobLink(job.link)}
                      className="home-about-us-btn"
                    >
                      Apply Now
                    </button>
                    <h6>{job.postedTime}</h6>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </center>
      </div>
    </>
  );
};

export default SearchedJobs;