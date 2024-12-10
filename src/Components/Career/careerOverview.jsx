import React, { useRef, useState } from "react";
import user1 from "../../Assets/Img/hero/overviewIcon1.png";
import user2 from "../../Assets/Img/hero/overviewIcon2.png";
import user3 from "../../Assets/Img/hero/overviewIcon3.png";
import user4 from "../../Assets/Img/hero/overviewIcon4.png";
import Animate from "../Animation/Animate";


const jobs = [
  {
    image: user1,
    heading: "Vacation",
    description:
      "You will accrue two weeks of vacation per year at the rate of 6.67 hours per month from your date of hire.",
  },
  {
    image: user2,
    heading: "Holidays ",
    description:
      "Bilkins offers 8 paid holidays: New Year's, Memorial Day, July 4th, Labor Day, Thanksgiving, Day after Thanksgiving, Christmas Eve, and Christmas Day.",
  },
  {
    image: user3,
    heading: "Short Term Disability",
    description:
      "Plan indemnifies 60% of weekly salary up to $1,000. Benefits start day 1 for accidents, day 8 for sickness. Includes health and dental coverage.",
  },
  {
    image: user4,
    heading: "Payroll / checks",
    description: "Payroll processed bi-weekly. Efficient and timely payments.",
  },
  {
    image: user1,
    heading: "Vacation",
    description:
      "You will accrue two weeks of vacation per year at the rate of 6.67 hours per month from your date of hire.",
  },
  {
    image: user2,
    heading: "Holidays ",
    description:
      "Bilkins offers 8 paid holidays: New Year's, Memorial Day, July 4th, Labor Day, Thanksgiving, Day after Thanksgiving, Christmas Eve, and Christmas Day.",
  },
  {
    image: user3,
    heading: "Short Term Disability",
    description:
      "Plan indemnifies 60% of weekly salary up to $1,000. Benefits start day 1 for accidents, day 8 for sickness. Includes health and dental coverage.",
  },
  {
    image: user4,
    heading: "Payroll / checks",
    description: "Payroll processed bi-weekly. Efficient and timely payments.",
  },
  {
    image: user2,
    heading: "Holidays ",
    description:
      "Bilkins offers 8 paid holidays: New Year's, Memorial Day, July 4th, Labor Day, Thanksgiving, Day after Thanksgiving, Christmas Eve, and Christmas Day.",
  },
];
const CareerOverview = () => {
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
    <div className="career-overview container-fluid">
      <div className="Career-overview-head">
        <Animate>
          <h1>Overview</h1>
        </Animate>
      </div>
      <div className="overview-outer-section">
        <div
          className="overview-marquee-section"
          ref={marqueeRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {jobs.map((job, index) => (
            <div className="card-overview-suit" key={index}>
              <div className="d-flex justify-content-center">
                <img src={job.image} alt="user" />
              </div>

              <div className="d-flex align-items-center justify-content-center mt-4">
                <div className="overview-content-heading">
                  <h3>{job.heading}</h3>
                  <p>{job.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default CareerOverview;
