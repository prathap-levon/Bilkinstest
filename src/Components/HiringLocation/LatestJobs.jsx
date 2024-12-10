import React from 'react'
import { Container, Row, Col } from "react-bootstrap";
import user1 from "../../Assets/Img/user/user-1.png";
const jobs = [
    {
        title: "Radiology Tech",
        part: "Part Time",
        full: "Full Time",
        salary: "40K$ - 60K$",
        postedTime: "1 Hour Ago",
        image: user1,
        hospital: "Apollo Hospital",
        numberOfPeople: "1200 - 1300",
        numOfJobs: 20,
    },
    {
        title: "Radiology Tech",
        part: "Part Time",
        full: "Full Time",
        salary: "40K$ - 60K$",
        postedTime: "1 Hour Ago",
        image: user1,
        hospital: "Apollo Hospital",
        numberOfPeople: "1200 - 1300",
        numOfJobs: 20,
    },
    {
        title: "Radiology Tech",
        part: "Part Time",
        full: "Full Time",
        salary: "40K$ - 60K$",
        postedTime: "1 Hour Ago",
        image: user1,
        hospital: "Apollo Hospital",
        numberOfPeople: "1200 - 1300",
        numOfJobs: 20,
    },
    {
        title: "Radiology Tech",
        part: "Part Time",
        full: "Full Time",
        salary: "40K$ - 60K$",
        postedTime: "1 Hour Ago",
        image: user1,
        hospital: "Apollo Hospital",
        numberOfPeople: "1200 - 1300",
        numOfJobs: 20,
    },
    {
        title: "Radiology Tech",
        part: "Part Time",
        full: "Full Time",
        salary: "40K$ - 60K$",
        postedTime: "1 Hour Ago",
        image: user1,
        hospital: "Apollo Hospital",
        numberOfPeople: "1200 - 1300",
        numOfJobs: 20,
    },
    {
        title: "Radiology Tech",
        part: "Part Time",
        full: "Full Time",
        salary: "40K$ - 60K$",
        postedTime: "1 Hour Ago",
        image: user1,
        hospital: "Apollo Hospital",
        numberOfPeople: "1200 - 1300",
        numOfJobs: 20,
    },

];
const LatestJobs = () => {
    return (
        <Container className='latestJobs-container'>
            <Row>
                <div className='LatestJobs-head'>
                    <div >
                        <h1>
                            Explore Your Next Career Move
                        </h1>
                        <p>
                            Discover the newest and most sought-after job opportunities with us!
                        </p>
                    </div>
                    <div className='flex'>
                        <p style={{ color: '#ce1b28' }}>show all jobs
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_209_5699)">
                                    <path d="M20.3644 12.7064C20.5519 12.5188 20.6572 12.2645 20.6572 11.9994C20.6572 11.7342 20.5519 11.4799 20.3644 11.2924L14.7074 5.63537C14.6152 5.53986 14.5048 5.46367 14.3828 5.41126C14.2608 5.35886 14.1296 5.33127 13.9968 5.33012C13.8641 5.32896 13.7324 5.35426 13.6095 5.40454C13.4866 5.45483 13.3749 5.52908 13.281 5.62297C13.1872 5.71686 13.1129 5.82852 13.0626 5.95141C13.0123 6.07431 12.987 6.20599 12.9882 6.33877C12.9893 6.47155 13.0169 6.60277 13.0693 6.72477C13.1217 6.84677 13.1979 6.95712 13.2934 7.04937L17.2434 10.9994H4.00044C3.73522 10.9994 3.48087 11.1047 3.29333 11.2923C3.1058 11.4798 3.00044 11.7341 3.00044 11.9994C3.00044 12.2646 3.1058 12.5189 3.29333 12.7065C3.48087 12.894 3.73522 12.9994 4.00044 12.9994H17.2434L13.2934 16.9494C13.1113 17.138 13.0105 17.3906 13.0128 17.6528C13.015 17.915 13.1202 18.1658 13.3056 18.3512C13.491 18.5366 13.7418 18.6418 14.004 18.644C14.2662 18.6463 14.5188 18.5455 14.7074 18.3634L20.3644 12.7064Z" fill="#CE1B28" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_209_5699">
                                        <rect width="24" height="24" fill="white" transform="matrix(0 1 -1 0 24 0)" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </p>
                    </div>
                </div>
            </Row>
            <Row>
                {jobs.map((job, index) => (
                    <Col key={index} xs={12} sm={6} md={6} lg={6} xl={6} className=" mt-4">
                        <div className="latest-job-suit">
                            <div className="d-flex align-items-center justify-content-between mt-4">
                                <div className='d-flex align-items-center'>
                                    <div className="home-profile-photo">
                                        <img src={job.image} alt="user" />
                                    </div>
                                    <div className="home-content-hospital">
                                        <h6>{job.hospital}</h6>
                                        <h5>{job.numberOfPeople}</h5>
                                    </div>

                                </div>

                                <div className="home-button-hospital">
                                    <button>{job.numOfJobs} Jobs</button>
                                </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-between job-suit-lines mt-2">
                                <div className="latest-line-job-suit"></div>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
                                <div>
                                    <h4>{job.title}</h4>
                                    <div className="d-flex align-content-center">
                                        <div className="btn-part-full-time">
                                            <button>{job.part}</button>
                                        </div>
                                        <div className="btn-part-full-time">
                                            <button>{job.full}</button>
                                        </div>
                                    </div>
                                </div>
                                <p>{job.salary}</p>
                                {/* <span>{job.postedTime}</span> */}
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}
export default LatestJobs;