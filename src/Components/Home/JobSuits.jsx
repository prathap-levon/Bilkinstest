import React, { useEffect, useRef, useState } from "react";
import Animate from "../Animation/Animate";
import dollar from "../../Assets/Img/icons/dollar-sign.png";
import clock from "../../Assets/Img/icons/clock.png";
import locationn from "../../Assets/Img/icons/map-pin.png";
import user from "../../Assets/Img/icons/users-red.png";
import Instance from "../../AxiosConfig";
import { useNavigate } from "react-router-dom";
import NodataImg from "../../Assets/Img/icons/nodatafound.png"
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { formatUrl } from "../../globalConstant";
const JobSuits = () => {
  const marqueeRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const navigate = useNavigate();
  const [topJobs, setTopJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const numberFormat = new Intl.NumberFormat();

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

  const fetchJobs = async () => {
    try {
      const url = '/getTopJobs';
      const response = await Instance.get(url);
      if (response.status === 200) {
        let data = response?.data?.jobs;
        data = data.filter((item) => item.jobStatus === 'Open');
        if (data) {
          setLoading(false);
          setTopJobs(data);
          console.log(response.data,"asdf")
        }
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleJobLink = (link) => {
    navigate(link);
  };

  const totalAmount = (a, b, c, d) => {
    return (a ? a : 0) + (b ? b : 0) + (c ? c * 7 : 0) + (d ? d * 7 : 0)
  }

  return (
    <>
      <div className="home-job-suit-section">
        <Animate>
          <h3>Discover Most Relevant Jobs Tailored for You</h3>
          <h4>Discover and Apply to Flexible Nursing and Allied Health Jobs Anytime, Anywhere.</h4>
        </Animate>
        <center>
          <div className="main-outer-section">
            {loading &&
              <div>
                <Spin indicator={<LoadingOutlined spin />} size="large" className="custom-loader" />
              </div>}
            {topJobs.length > 0 && <div className="all-cards-marquee"></div>}
            <div
              className="home-marquee-section"
              ref={marqueeRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {topJobs.length === 0 && loading === false && <p className="no-data-found">No data found <img className="no-data-img" src={NodataImg} alt="" /></p>}
              {topJobs.map((job, index) => (
                <div className="card-job-suit" key={index}>
                  <h4>{job?.title ? job?.title : 'NA'}</h4>
                  <div className="d-flex align-items-center" id="btn--part--full">
                    <div className="btn-part-full-time">
                      <button>{job?.jobType?.length > 0 ? job?.jobType?.join(' || ') : 'N/A'}</button>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between job-suit-lines">
                    <div className="line-job-suit"></div>
                  </div>
                  <div className="d-flex mt-4 job-icons">
                    <img
                      src={dollar}
                      alt="dollar"
                    /> &nbsp;&nbsp;
                    <p>{(job?.weeklyEarnings || job?.travelPerDiems || job?.mealsPay || job?.housingPay) ? ''+numberFormat.format(totalAmount(job?.weeklyEarnings, job?.travelPerDiems, job?.mealsPay, job?.housingPay)) + '/wk' : 'N/A'}</p>
                  </div>
                  <div className="d-flex gap-2 mt-3 job-icons">
                    <img src={clock} alt="dollar" />
                    <p>{job?.shiftType ? job.shiftType + ' Shift' : 'N/A'}{job?.shiftHours ? ", " + job.shiftHours : ''}</p>
                  </div>
                  <div className="d-flex gap-2 mt-3 job-icons">
                    <img src={user} alt="user" />
                    <p>{job?.vacancies ? job?.vacancies + ' Vacancies' : 'N/A'}</p>
                  </div>
                  <div className="d-flex gap-2 mt-3 job-icons">
                    <img src={locationn} alt="location" />
                    <p>
                      {job?.cities?.length > 0 ? job?.cities?.join(', ') : ''}{job?.stateCode && job?.cities?.length > 0 ? ", " : ""}{job?.stateCode ? job?.stateCode : ''}{job?.stateCode && job?.pinCode ? ", " : ""}{job?.pinCode ? job?.pinCode : ''}
                    </p>
                  </div>

                  <div className="d-flex justify-content-between mt-4 apply-job-button">
                    <button
                    
                      onClick={() =>{
                        const location = formatUrl(job.state);
                        const title = formatUrl(job.title);
                         navigate( `/jobs/${location}/${title}/${job._id}`, { state: { jobId: job?._id } })}}
                      className="home-about-us-btn"
                    >
                      Apply Now
                    </button>
                    {/* <h6>{job?.postedTime}</h6> */}
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

export default JobSuits;
