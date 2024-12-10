import React, { useState, useRef, useMemo, useEffect } from "react";
import { Menu, Dropdown, Pagination, Input, Modal, Select, Button, Form, Slider, DatePicker } from "antd";
import { SlLocationPin } from "react-icons/sl";
import { MdEdit } from "react-icons/md";
import { IoEllipsisVertical } from "react-icons/io5";
import { LuFilter } from "react-icons/lu";
import image1 from "../../Assets/Images/favouritejob.png"
import { GrAnnounce } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import Instance from "../../../AxiosConfig";
import Loader from "../../../Loader";
import { SearchOutlined } from "@ant-design/icons";
import { JobCategoryOptions, JobTypeOptions, ShiftTypeOptions, ExperienceLevelOptions } from "../../../globalConstant";

function getRelativeTime(dateTime) {
  const postedDate = new Date(dateTime);
  const now = new Date();
  const diff = now - postedDate;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);

  if (months > 0) {
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  }
}


export const JobAlertList = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [jobsData, setJobsData] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filterParameters, setFilterParameters] = useState({});
  const [isAscendingSort, setIsAcendingSort] = useState(true);
  const loggedInUserInfo = JSON.parse(localStorage.getItem("loggedInUserInfo"));
  const pageSize = 9;
  const [currentPage, setCurrentPage] = useState(1);

  const jobCategoryRef = useRef(null);
  const jobTypeRef = useRef(null);
  const payRateRef = useRef(null);
  const shiftTypeRef = useRef(null);
  const experienceLevelRef = useRef(null);
  const jobPostedDateRef = useRef(null);

  const scrollToField = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const paginatedJobs = useMemo(() => {
    if (searchText?.trim() === '') { return dataSource?.slice((currentPage - 1) * pageSize, currentPage * pageSize); }
    const filteredJobs = dataSource?.filter((job) => { return `${job?.title}${job?.jobCategory}${job?.shiftType}`?.toLowerCase().includes(searchText?.toLowerCase()); });
    return filteredJobs.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  }, [searchText, dataSource, currentPage]);

  const startEntry = useMemo(() => Math.min(paginatedJobs.length, (currentPage - 1) * pageSize + 1), [paginatedJobs]);
  const endEntry = useMemo(() => Math.min(currentPage * pageSize, paginatedJobs.length), [paginatedJobs]);

  const fetchJobAlerts = async (req, res) => {
    try {
      setIsLoading(true);
      const response = await Instance.get(`/getJobAlertsOfUser/${loggedInUserInfo?.userId}`, {
        headers: {
          Authorization: `Bearer ${loggedInUserInfo?.token}`,
        }
      });
      if (response?.status === 200) {
        setJobsData(response?.data?.jobs);
        setDataSource(response?.data?.jobs);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobAlerts();
  }, []);

  const handleSorting = () => {
    try {
      let sortedData;
      if (isAscendingSort) {
        sortedData = [...dataSource]?.sort((a, b) => new Date(b.jobPostedDate) - new Date(a.jobPostedDate));
      } else {
        sortedData = [...dataSource]?.sort((a, b) => new Date(a.jobPostedDate) - new Date(b.jobPostedDate));
      }
      setDataSource(sortedData);
      setIsAcendingSort(!isAscendingSort);
    } catch (error) {
      console.error(error);
    }
  }

  const handleApplyFilters = () => {
    try {
      setIsLoading(true);
      let filteredJobs = jobsData;
      if (filterParameters?.jobCategory && filterParameters?.jobCategory?.length > 0) {
        filteredJobs = filteredJobs?.filter((job) => filterParameters?.jobCategory?.includes(job?.jobCategory));
      }
      if (filterParameters?.jobType && filterParameters?.jobType?.length > 0) {
        filteredJobs = filteredJobs?.filter((job) =>
          filterParameters?.jobType?.some(type => job?.jobType?.includes(type))
        );
      }
      if (filterParameters?.payRate) {
        filteredJobs = filteredJobs?.filter((job) => job?.weeklyEarnings <= filterParameters?.payRate);
      }
      if (filterParameters?.shiftType && filterParameters?.shiftType?.length > 0) {
        filteredJobs = filteredJobs?.filter((job) => filterParameters?.shiftType?.includes(job?.shiftType));
      }
      if (filterParameters?.experienceLevel) {
        switch (filterParameters?.experienceLevel) {
          case "Entry Level": filteredJobs?.filter((job) => job?.experience >= 0 && job?.experience <= 2);
            break;
          case "Mid-Level": filteredJobs?.filter((job) => job?.experience >= 3 && job?.experience <= 5);
            break;
          case "Senior Level": filteredJobs?.filter((job) => job?.experience >= 6 && job?.experience <= 10);
            break;
        }
        filteredJobs = filteredJobs?.filter((job) => filterParameters?.experienceLevel?.includes(job?.experienceLevel));
      }
      if (filterParameters?.jobPostedDate) {
        filteredJobs = filteredJobs?.filter((job) => new Date(job?.jobPostedDate) <= new Date(filterParameters?.jobPostedDate));
      }
      setDataSource(filteredJobs);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setIsModalVisible(false);
    }
  }

  const handleModalClose = () => {
    form.resetFields();
    setFilterParameters({});
    setIsModalVisible(false);
    setDataSource(jobsData);
  }

  return (
    <>
      {isLoading && <Loader />}
      <div className="job-alert-list-section">
        <div className="container">
          <div className="row">
            <div className="d-flex justify-content-end gap-4">
              <Input
                placeholder="Search..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="search-input-table"
                prefix={<SearchOutlined />}
              />
              <button className="jobseeker-basic-button" onClick={() => setIsModalVisible(true)}>
                <LuFilter /> Filter
              </button>
              <button className="jobseeker-basic-button" onClick={handleSorting}>
                Sort
              </button>
            </div>
          </div>

          <div className="row mt-4">
            {dataSource?.length > 0 ? (
              dataSource?.map((job) => (
                <div className="col-lg-4 my-2" key={job.id}>
                  <div className="favourite-job-card " onClick={() => navigate('/user/job-overview')}>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <p style={{ marginBottom: "0" }}>{job.rate}</p>
                      <div className="d-flex gap-2">
                        <span className="favourite-job-button">{job.time}</span>
                        <Dropdown
                          overlay={
                            <Menu>
                              <Menu.Item>
                                <MdEdit /> Remove
                              </Menu.Item>
                            </Menu>
                          }
                          trigger={["click"]}
                        >
                          <IoEllipsisVertical
                            size={20}
                            style={{ cursor: "pointer" }}
                          />
                        </Dropdown>
                      </div>
                    </div>
                    <div className="d-flex gap-2">
                      <h3>{job.salary}</h3>
                      <div className="favourite-vertical-line"></div>
                      <h5>
                        {job.duration.split(" ")[0]} <br />{" "}
                        {job.duration.split(" ")[1]}
                      </h5>
                    </div>
                    <h5 className="mt-3">{job.position}</h5>
                    <p>{job.details}</p>
                    <div className="favourite-text-underline my-2"></div>
                    <div className="d-flex justify-content-between">
                      <h4>
                        <SlLocationPin className="icon-red" /> &nbsp;{" "}
                        {job.location}
                      </h4>
                      <GrAnnounce size={20} color="var(--maroon-color)" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-favourites-job-div d-flex justify-content-center align-items-center flex-column">
                <img src={image1} alt="" />
                <h3>Nothing here Yet !</h3>
                <p>You haven’t saved any jobs yet. When you do, they’ll be waiting for you here.<br /> In the meantime, you can enable 1-click apply by filling out application details.</p>
                <button className="jobseeker-basic-button">Find a Job</button>
              </div>
            )}
          </div>
          {dataSource?.length > 0 && (
            <div className="d-flex justify-content-between mt-4 pagination-div">
              <h5>
                Showing {startEntry} to {endEntry} of {dataSource?.length} entries
              </h5>
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={dataSource?.length}
                onChange={(page) => setCurrentPage(page)}
                showSizeChanger={false}
              />
            </div>
          )}
        </div>
      </div>
      <Modal
        title="Filter"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        className="filter-modal"
        footer={null}
      >
        <div className="filter-tabs">
          <Button onClick={() => scrollToField(jobCategoryRef)}>
            Job Category
          </Button>
          <Button onClick={() => scrollToField(jobTypeRef)}>Job Type</Button>
          <Button onClick={() => scrollToField(payRateRef)}>Pay Rate</Button>
          <Button onClick={() => scrollToField(shiftTypeRef)}>
            Shift Type
          </Button>
          <Button onClick={() => scrollToField(experienceLevelRef)}>
            Experience Level
          </Button>
          <Button onClick={() => scrollToField(jobPostedDateRef)}>
            Job Posted Date
          </Button>
        </div>

        <div className="filter-form mt-4">
          <Form layout="vertical " className="filter-form" form={form}>
            <div className="col-md-12" ref={jobCategoryRef}>
              <Form.Item
                label="Job Category"
                name={"jobCategory"}
              >
                <Select placeholder="Select Job Category" options={JobCategoryOptions} onChange={(e) => setFilterParameters({ ...filterParameters, jobCategory: e })} mode="multiple" />
              </Form.Item>
            </div>
            <div className="col-md-12" ref={jobTypeRef}>
              <Form.Item
                label="Job Type"
                name={"jobType"}
              >
                <Select placeholder="Select Job Type" options={JobTypeOptions} onChange={(e) => setFilterParameters({ ...filterParameters, jobType: e })} mode="multiple" />
              </Form.Item>
            </div>
            <div className="col-md-12" ref={payRateRef}>
              <Form.Item
                label="Pay Rate"
                name={"payRate"}
              >
                <Slider
                  min={0}
                  max={5000}
                  style={{ margin: "0 10px" }}
                  className="filter-slider"
                  onChange={(e) => setFilterParameters({ ...filterParameters, payRate: e })}
                />
              </Form.Item>
            </div>
            <div className="col-md-12" ref={shiftTypeRef}>
              <Form.Item
                label="Shift Type"
                name={"shiftType"}
              >
                <Select placeholder="Select Shift Type" options={ShiftTypeOptions} mode="multiple" onChange={(e) => setFilterParameters({ ...filterParameters, shiftType: e })} />
              </Form.Item>
            </div>
            <div className="col-md-12" ref={experienceLevelRef}>
              <Form.Item
                label="Experience Level"
                name={"experienceLevel"}
              >
                <Select placeholder="Select Experience Level" options={ExperienceLevelOptions} onChange={(e) => setFilterParameters({ ...filterParameters, experienceLevel: e })} />
              </Form.Item>
            </div>
            <div className="col-md-12" ref={jobPostedDateRef}>
              <Form.Item
                label="Job Posted Date"
                name={"jobPostedDate"}
              >
                <DatePicker
                  placeholder="Select Date"
                  format="DD/MM/YYYY"
                  className="form-control"
                  onChange={(e) => setFilterParameters({ ...filterParameters, jobPostedDate: e })}
                />
              </Form.Item>
            </div>
          </Form>
        </div>

        <div className="modal-actions d-flex justify-content-between">
          <button onClick={handleModalClose} className="cancel-btn" type="button">
            Clear All
          </button>
          <button className="create-btn" onClick={handleApplyFilters} type="button">
            Apply Filters
          </button>
        </div>
      </Modal></>
  );
};
