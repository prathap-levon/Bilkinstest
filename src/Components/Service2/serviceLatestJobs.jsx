import React, { useRef, useState } from "react";
import Animate from "../Animation/Animate";
import { Link } from "react-router-dom";
import dollar from "../../Assets/Img/icons/dollar-sign.png";
import clock from "../../Assets/Img/icons/clock.png";
import location from "../../Assets/Img/icons/map-pin.png";
import user from "../../Assets/Img/icons/users-red.png"

const jobs = [
  {
    title: "Physical Therapist",
    part: "Nursing Jobs",
    
    salary: "20K-30K",
    postedTime: "1 Hour Ago",
    image: dollar,
    image1: clock,
    days: "Days 5x8",
    image2:user,
    openings:"2/Current Openings",
    image3:location,
    location:"New York"

  },
  {
    title: "Physical Therapist",
    part: "Nursing Jobs",
    full: "Full Time",
    salary: "20K-30K",
    postedTime: "1 Hour Ago",
    image: dollar,
    image1:clock,
    days: "Days 5x8",
    image2:user,
    openings:"2/Current Openings",
    image3:location,
    location:"New York"
  },
  {
    title: "Physical Therapist",
    part: "Nursing Jobs",
    full: "Full Time",
    salary: "20K-30K",
    postedTime: "1 Hour Ago",
    image: dollar,
    image1:clock,
    days: "Days 5x8",
    image2:user,
    openings:"2/Current Openings",
    image3:location,
    location:"New York"
  },
  {
    title: "Physical Therapist",
    part: "Nursing Jobs",
    full: "Full Time",
    salary: "20K-30K",
    postedTime: "1 Hour Ago",
    image: dollar,
    image1:clock,
    days: "Days 5x8",
    image2:user,
    openings:"2/Current Openings",
    image3:location,
    location:"New York"
  },
  {
    title: "Physical Therapist",
    part: "Nursing Jobs",
    full: "Full Time",
    salary: "20K-30K",
    postedTime: "1 Hour Ago",
    image: dollar,
    image1:clock,
    days: "Days 5x8",
    image2:user,
    openings:"2/Current Openings",
    image3:location,
    location:"New York"
  },
  {
    title: "Physical Therapist",
    part: "Nursing Jobs",
    full: "Full Time",
    salary: "20K-30K",
    postedTime: "1 Hour Ago",
    image: dollar,
    image1:clock,
    days: "Days 5x8",
    image2:user,
    openings:"2/Current Openings",
    image3:location,
    location:"New York"
  },
  {
    title: "Physical Therapist",
    part: "Nursing Jobs",
    full: "Full Time",
    salary: "20K-30K",
    postedTime: "1 Hour Ago",
    image: dollar,
    image1:clock,
    days: "Days 5x8",
    image2:user,
    openings:"2/Current Openings",
    image3:location,
    location:"New York"
  },
  {
    title: "Physical Therapist",
    part: "Nursing Jobs",
    full: "Full Time",
    salary: "20K-30K",
    postedTime: "1 Hour Ago",
    image: dollar,
    image1:clock,
    days: "Days 5x8",
    image2:user,
    openings:"2/Current Openings",
    image3:location,
    location:"New York"
  },
  {
    title: "Physical Therapist",
    part: "Nursing Jobs",
    full: "Full Time",
    salary: "20K-30K",
    postedTime: "1 Hour Ago",
    image: dollar,
    image1:clock,
    days: "Days 5x8",
    image2:user,
    openings:"2/Current Openings",
    image3:location,
    location:"New York"
  },
];

 const ServiceLatestJobs = () => {
    const marqueeRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
  
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
  
    return (
      <>
        <div className="home-job-suit-section mt-4">
          <Animate>
            <h3>Latest Jobs</h3>
            
          </Animate>
          <center>
            <div className="service-latest-job-section">
              <div className="service-all-cards-marquee"></div>
              <div
                className="home-marquee-section"
                ref={marqueeRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                {jobs.map((job, index) => (
                  <Link to="/service-details" key={index}>
                  <div className="card-job-suit" key={index}>
                    <h4>{job.title}</h4>
                    <div className="d-flex align-content-center">
                      <div className="btn-part-full-time">
                        <button>{job.part}</button>
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between job-suit-lines">
                      <div className="line-job-suit"></div>
                     
                    </div>
                    <div className="d-flex gap-4 mt-4 job-icons">
                      <img src={job.image} alt="dollar"/>
                    <p>{job.salary}</p>
                    </div>
                    <div className="d-flex gap-4 mt-3 job-icons">
                      <img src={job.image1} alt="dollar"/>
                    <p>{job.days}</p>
                    </div>
                    <div className="d-flex gap-4 mt-3 job-icons">
                      <img src={job.image2} alt="dollar"/>
                    <p>{job.openings}</p>
                    </div>
                    <div className="d-flex gap-4 mt-3 job-icons">
                      <img src={job.image3} alt="dollar"/>
                    <p>{job.location}</p>
                    </div>
                    <div className="d-flex justify-content-between mt-4 apply-job-button">
                      <button className="home-about-us-btn ">
                        Apply Now
                      </button>
                      <h6>{job.postedTime}</h6>
                    </div>
                  </div>
                  </Link>
                ))}
              </div>
            </div>
          </center>
        </div>
      </>
    );
}
export default ServiceLatestJobs;
