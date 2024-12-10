import React, { useState,useEffect } from 'react';
import { IoLocationOutline } from 'react-icons/io5';
import hospital from "../../Assets/Images/hospital.png";
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { SlCalender } from "react-icons/sl";
import Instance from '../../../AxiosConfig';
import { Tag } from 'antd';
export const Joblist = () => {
  // const jobData = [
  //   {
  //     id: 1,
  //     name: "CK Hospital",
  //     category: "Registered Nurse - Operating Room",
  //     schedule: "Days 5x8-10 weeks",
  //     location: "Los Gatos, CA, USA",
  //     jobDescription: "Clean, test-driven, maintainable code. Work closely with project teams.",
  //     requirement: "Innovative, secure, and scalable features for clients on Shopify.",
  //     status: "Submitted",
  //   },
  //   {
  //     id: 2,
  //     name: "RN - Registered Nurse",
  //     category: "Nursing jobs",
  //     schedule: "Nights 3x12-6 weeks",
  //     location: "Austin, TX, USA",
  //     jobDescription: "Care for pediatric patients in night shifts, maintaining standards.",
  //     requirement: "Experience with pediatric care, compassion, and attention to detail.",
  //     status: "Draft",
  //   },
  //   {
  //     id: 3,
  //     name: "General Hospital",
  //     category: "ER Nurse",
  //     schedule: "Days 4x10-8 weeks",
  //     location: "Chicago, IL, USA",
  //     jobDescription: "Handle emergency room tasks, quick response, and patient care.",
  //     requirement: "Experience in emergency room settings with quick decision-making skills.",
  //     status: "Archive",
  //   }
  // ];
  

  const [likedCards, setLikedCards] = useState({});
  const loggedInUserInfo = JSON.parse(localStorage.getItem("loggedInUserInfo"));
  const [isLoading, setIsLoading] = useState(false);
  const [jobData, setJobData] = useState([]); 

  const handleLike = (id) => {
    setLikedCards((prevLiked) => ({
      ...prevLiked,
      [id]: !prevLiked[id],
    }));
  };
  const fetchApplications = async () => {
    try {
      setIsLoading(true);
      const response = await Instance.get(`/getApplicationByUser/${loggedInUserInfo?.userId}`, {
        headers: {
          Authorization: `Bearer ${loggedInUserInfo?.token}`,
        },
      });
      if (response?.status === 200) {
        console.log("response",response);
        setJobData(response.data.applications);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="job-list-container">
       <div className='row'>
        
          {jobData?.length > 0 ? (
           jobData.map((application) => (
              <div key={application._id} className="col-lg-6 mb-3">
                <div className="applied-job-list-card p-3">
                  <div className='d-flex justify-content-between'>
                    <div>
                      <h3>{application?.jobId?.jobCategory}</h3>
                      <h5>{application?.jobId?.title}</h5>
                    </div>
                    
                  </div>
                  <hr />
                  <Tag>{application.status}</Tag>
                  <div className="d-flex justify-content-between mt-3">
                    <p>Applied {application.appliedDate ? `${application.appliedDate} days ago` : 'N/A'}</p>
                    <button className="applied-job-view-status-button">View Application</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No jobs found.</p>
          )}
      </div>
    </div>
  );
};
