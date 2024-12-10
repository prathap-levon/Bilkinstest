import React, { useEffect, useState } from 'react';
import JobDetailComp from '../../Components/JobComponents/JobDetailComp';
import WhyChooseUs from '../../Components/Home/WhyChooseUs';
import JobSuits from '../../Components/Home/JobSuits';
import Instance from '../../AxiosConfig';
import { useParams } from 'react-router-dom';

const JobDetail = () => {
  const { id } = useParams();
  const [jobData, setJobData] = useState(null);

  const fetchJobDetail = async () => {
    try {
      const response = await Instance.get(`/getJobById/${id}`);
      if (response.status === 200) {
        console.log("response",response)
        setJobData(response?.data?.job);
      }
    } catch (error) {
      console.error(error);
      console.log("e",error.response)
    }
  }

  useEffect(() => {
    fetchJobDetail();
  }, [id]);


  return (
    <div className="container-xxl">
      <JobDetailComp jobData={jobData} />
      <WhyChooseUs />
      <JobSuits />
      <div className='div-margin'></div>
    </div>
  )
}

export default JobDetail;