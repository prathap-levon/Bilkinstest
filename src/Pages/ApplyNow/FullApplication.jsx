import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import MultiStepForm from "../../Components/MultiStepForm/LinearStepper";
import Instance from "../../AxiosConfig";
import { FaArrowLeft } from "react-icons/fa6";
import { Modal } from "antd";

export const FullApplication = ({ open1, handleCancel1 }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jobData, setJobData] = useState(null);

  const fetchJobDetail = async () => {
    try {
      const response = await Instance.get(`/getJobById/${id}`);
      if (response.status === 200) {
        setJobData(response?.data?.job);
      } else {
        navigate(-1);
      }
    } catch (error) {
      console.error(error);
      navigate(-1);
    }
  };

  useEffect(() => {
    async function fetchData() {
      await fetchJobDetail();
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!id) navigate(-1);
  }, []);

  const handlequickLink = () => {
    navigate(`/apply-now/quick-application/${id}`);
  };
  const handlefullLink = () => {
    navigate(`/apply-now/full-application/${id}`);
  };
  return (
    <div>
      <>
        <Modal
          open={open1}
          onCancel={handleCancel1}
          footer={null}
          width={800}
        >
        <Container className="apply-job-now">
          <h1 className="apply-job-main-head">{jobData?.title}</h1>
          <Row>
            <Col md={12} className="apply-job-right-col">
              <MultiStepForm jobData={jobData} />
            </Col>
          </Row>
        </Container>
        </Modal>
      </>
    </div>
  );
};
