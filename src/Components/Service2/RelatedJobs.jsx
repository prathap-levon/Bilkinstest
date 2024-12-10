import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import ServiceIcon from "../../Assets/Img/user/user-1.png";
import user from "../../Assets/Img/icons/users.png";


const jobs = [
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
];
const RelatedJobs = () => {
  return (
    <Container className="latestJobs-container">
      <Row>
        <div className="LatestJobs-head">
          <h1>Related jobs</h1>
        </div>
      </Row>
      <Row className="my-5">
        {jobs.map((job, index) => (
          <Col key={job.id} lg={6} className="mb-4">
            <Card className="cardserviceBody shadow">
              <Card.Body>
                <Row>
                  <Col lg={6} className="justify-content-start">
                    <div className="img-with-Text">
                      <div>
                        <img src={job.proIcon} alt="..." />
                      </div>
                      <div className="user-data-section">
                        <h5>{job.hospitalName}</h5>
                        <div className="img-with-Text">
                          <img
                            className="users-icons"
                            src={job.userIcon}
                            alt=""
                          />
                          <p>{job.iconText}</p>
                        </div>
                      </div>
                    </div>
                    <div className="line-cards-jobs" />
                    <Card.Title>
                      <strong>{job.jobTitle}</strong>
                    </Card.Title>
                    <div className="d-flex mt-4">
                      <button className="oval-button mr-2">
                        {job.fullType}
                      </button>

                      <button className="oval-button mr-2">
                        {job.partType}
                      </button>
                    </div>
                  </Col>
                  <Col lg={6} className="text-end">
                    <button className="ovalright-button">
                      {job.numJobs} Jobs
                    </button>
                    <h2 className="right-head">{job.salary}</h2>
                    <p className="right-subhead">{job.jobDate}</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
export default RelatedJobs;
