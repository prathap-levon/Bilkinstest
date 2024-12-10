import React, { useState, useRef, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import phonecall from "../../Assets/Img/icons/ph_phone-call-bold.png";
import Animate from "../../Components/Animation/Animate";
import { useNavigate, useParams } from "react-router-dom";
import FAQHome from "../../Components/Home/FAQHome";
import insta from "../../Assets/Img/icons/insta.png";
import facebook from "../../Assets/Img/icons/facebook.png";
import twitter from "../../Assets/Img/icons/twitte.png";
import mail from "../../Assets/Img/icons/mailicon.png";
import Instance from "../../AxiosConfig";
import DOMpurify from "dompurify";
import { PhoneInput } from "react-international-phone";
import Select from "react-select";
import { MdCloudUpload } from "react-icons/md";
import { DatePicker, Spin } from "antd";
import "react-international-phone/style.css";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { showErrorAlert, showSuccessAlert, createUniqueS3FilenameWithDate, handleFileUpload } from "../../globalConstant";
import { REACT_APP_FRONTEND_URL_WEBSITE } from "../../globalConstant";
import servicebanner from '../../Assets/Img/bg/servicebanner.png';
import moment from 'moment';
import dayjs from "dayjs";

const PostDetail = () => {
  const fileInputRef = useRef(null);
  const [postData, setPostData] = useState({});
  const { postUrl } = useParams();
  const navigate = useNavigate();
  const [bgImageURL, setBGImageURL] = useState("");
  const [uploadCvFlag, setUploadCvFlag] = useState(false);
  const [formData, setFormData] = useState({ contactInPeriod: "1 month" });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [isLoading, setIsLoading] = useState(false);
  const [resume, setResume] = useState({
    file: null,
    fileName: "",
    type: ""
  });

  const readyRangeOptions = [
    { label: "1 month", value: "1 month" },
    { label: "3 months", value: "3 months" },
    { label: "6 months", value: "6 months" },
    { label: "9 months", value: "9 months" },
    { label: "1 year", value: "1 year" },
  ];

  const positionOptions = [
    { value: "Part Time", label: "Part Time" },
    { value: "Full Time", label: "Full Time" },
    { value: 'Travel Contact', label: 'Travel Contact' },
    { value: 'Per Diem', label: 'Per Diem' },
    { value: "Internship", label: "Internship" },
    { value: "Contract", label: "Contract" },
  ];

  const YOEOptions = [
    { label: "Fresher", value: "Fresher" },
    { label: "0-3 years", value: "0-3 years" },
    { label: "4-7 years", value: "4-7 years" },
    { label: "8-15 years", value: "8-15 years" },
    { label: "16-20 years", value: "16-20 years" },
    { label: "21-29 years", value: "21-29 years" },
    { label: "30+ years", value: "30+ years" },
  ];

  const handleFieldChange = (e, fieldName) => {
    try {
      if (fieldName === "mobileNumber") {
        setFormData((preData) => ({
          ...preData,
          [fieldName]: e,
        }));
      } else if (
        fieldName === "readyToApply" ||
        fieldName === "recruiterReachOut" ||
        fieldName === "notReadyNow" ||
        fieldName === "termsAndCondition"
      ) {
        setFormData((preData) => ({
          ...preData,
          [fieldName]: e.target.checked,
        }));
      } else if (
        fieldName === "positionType" ||
        fieldName === "yearsOfExperience" ||
        fieldName === "contactInPeriod"
      ) {
        setFormData((preData) => ({
          ...preData,
          [fieldName]: e?.value,
        }));
      } else {
        setFormData((preData) => ({
          ...preData,
          [fieldName]: e?.target?.value,
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPostData = async () => {
    try {
      setIsLoading(true);
      const response = await Instance.get(`/getPostByUrl/${postUrl}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        setPostData(response?.data?.post);
        setFormData((prevData) => ({
          ...prevData,
          ["postId"]: response?.data?.post?._id,
        }));
        if (response?.data?.post?.bGImageURL?.trim()) {
          setBGImageURL(`https://bilkins-bucket.s3.amazonaws.com/${response?.data?.post?.bGImageURL}`);
        }
      }
    } catch (error) {
      console.error(error);
      navigate("/page/not-found");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPostData();
  }, []);

  const validatePhoneNumber = (value) => {
    const phoneNumber = parsePhoneNumberFromString(value);
    if (phoneNumber && phoneNumber.isValid()) {
      return true;
    } else {
      return false;
    }
  };

  const isFormValid = () => {
    if (!formData?.firstName || formData?.firstName?.trim() === "") {
      showErrorAlert("First name required");
      return false;
    }
    if (!formData?.lastName || formData?.lastName?.trim() === "") {
      showErrorAlert("Last name required");
      return false;
    }

    if (!formData?.mobileNumber || formData?.mobileNumber?.length < 6) {
      showErrorAlert("Mobile Number required");
      return false;
    } else if (!validatePhoneNumber(formData?.mobileNumber)) {
      showErrorAlert("Please enter valid Mobile Number");
      return false;
    }

    if (!formData?.email || formData?.email?.trim() === "") {
      showErrorAlert("Email required");
      return false;
    } else if (!emailRegex.test(formData?.email)) {
      showErrorAlert("Please enter valid email");
      return false;
    }

    if (!formData?.positionType || formData?.positionType?.trim() === "") {
      showErrorAlert("Position Type required");
      return false;
    }
    if (!formData?.yearsOfExperience || formData?.yearsOfExperience?.trim() === "") {
      showErrorAlert("Years Of Experience required");
      return false;
    }
    if (
      !formData?.readyToApply &&
      !formData?.recruiterReachOut &&
      !formData?.notReadyNow
    ) {
      showErrorAlert(`Please select any one of the field from User Application Specification`);
      return false;
    }
    if (
      formData?.recruiterReachOut &&
      !formData?.recruiterReachOutDateAndTime
    ) {
      showErrorAlert("Date/Time required");
      return false;
    }
    if (
      formData?.notReadyNow &&
      !formData?.contactInPeriod?.trim()
    ) {
      showErrorAlert("Contact-In period required");
      return false;
    }
    if (uploadCvFlag && !resume) {
      showErrorAlert("Resume required");
      return false;
    }
    if (!formData?.termsAndCondition) {
      showErrorAlert("Plese accept the terms and conditions");
      return false;
    }
    return true;
  };



  const handleButtonClick = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const handleContactLink = () => {
    navigate("/contact");
  };

  const handleSubmit = async () => {
    try {
      if (!isFormValid()) return;
      setIsLoading(true);
      let payload = { ...formData };
      let fileName = resume?.file ? createUniqueS3FilenameWithDate(resume?.fileName) : null;
      if (fileName) {
        let res = await handleFileUpload(resume.file, fileName, resume.type);
        if (!res) {
          showErrorAlert("Failed to upload resume");
          return;
        }

        let response = await Instance.post(
          "/addNewMedia",
          {
            content: fileName,
            contentType: resume.type,
            originalName: resume?.fileName,
            contentDescription: `Resume is uploaded by ${formData?.firstName || "N/A"} ${formData?.lastName || ""} and email is ${formData?.email}`,
            uploadedFrom: "Post Details",
          },
          {}
        );
      }
      payload.postUrl = postUrl;
      payload.resume = fileName;

      const response = await Instance.post("/addGeneralApplicant", payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      if (response.status === 201) {
        showSuccessAlert("Form Submitted Successfully!");
        setFormData({ contactInPeriod: "1 month" });
        setUploadCvFlag(false);
        setResume({
          file: null,
          fileName: "",
          type: ""
        });
      }
    } catch (error) {
      console.error(error);
      showErrorAlert(error?.response?.data?.message || "Failed to submit form");
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = (platform, postURL) => {
    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postURL)}&quote=${encodeURIComponent("Read this post")}`;
        break;
      case 'x':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(postURL)}&text=${encodeURIComponent("Read this post")}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(postURL)}&title=${encodeURIComponent(postData?.title)}&summary=${encodeURIComponent("Read this post")}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent(`Check out this job: ${postData?.title}`)}&body=${encodeURIComponent(postURL)}`;
        break;
      default:
        return;
    }
    window.open(shareUrl, '_blank');
  };

  const disabledDateTime = (current) => {
    const currentMoment = moment();
    if (current && current.isSame(currentMoment, 'day')) {
      return {
        disabledHours: () => [...Array(24).keys()].filter(hour => hour < currentMoment.hour()),
        disabledMinutes: (selectedHour) => {
          if (selectedHour === currentMoment.hour()) {
            return [...Array(60).keys()].filter(minute => minute < currentMoment.minute());
          }
          return [];
        },
        disabledSeconds: (selectedHour, selectedMinute) => {
          if (selectedHour === currentMoment.hour() && selectedMinute === currentMoment.minute()) {
            return [...Array(60).keys()].filter(second => second < currentMoment.second());
          }
          return [];
        }
      };
    }
    return {};
  };
  


  return (
    <>
      {isLoading && <div className="keyword-loader">
        <Spin size="large" className="custom-loader" />
      </div>
      }
      <div>
        <Container
          fluid
          className="postPagebanner-container"
          style={{ backgroundImage: (bgImageURL) ? `url(${bgImageURL})` : `url(${servicebanner})` }}
        >
          <Row>
            <div className="service-banner-right">
              <div className="serviceBaner-text text-center">
                <Animate>
                  <h1>{postData?.title}</h1>
                </Animate>
                <div className="d-flex justify-content-center mt-4">
                  <button
                    className="home-about-us-btn-1"
                    onClick={() => navigate("/join-us/quick-application")}
                  >
                    Join Us
                  </button>
                  <button
                    className="service-about-btn ml-3"
                    onClick={handleContactLink}
                  >
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          </Row>
        </Container>
        <Container fluid className="servicepage-Process-container-1">
          <Row>
            <Col md={8}>
              <div className="service-page-process-text-1">
                <div className="d-flex flex-column align-items-start justify-content-start gap-4 ">
                  <div
                    className="bold-container"
                    dangerouslySetInnerHTML={{
                      __html: DOMpurify.sanitize(postData?.postDescription),
                    }}
                  />
                </div>
              </div>
            </Col>
            <Col md={4} className="service-page-right mt-4">
              <div className="service-job-details">
                <div className="d-flex post-page-hiring  ">
                  <h3>Job Categories</h3>
                </div>
                <div className="d-flex flex-column">
                  <button className="post-page-apply-button">
                    <a href={`/search-jobs?jobtitle=${encodeURIComponent("Nursing Jobs")}&location=`} style={{ color: 'white', textDecoration: 'none', fontSize: '18px' }}>
                      Nursing Jobs
                      <svg
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width="24"
                          height="24"
                          transform="translate(0.859375)"
                          fill="#CE1B28"
                        />
                        <path
                          d="M5.85938 12H19.8594"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12.8594 5L19.8594 12L12.8594 19"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </a>
                  </button>
                  <button className="post-page-apply-button">
                    <a href={`/search-jobs?jobtitle=${encodeURIComponent("Allied Jobs")}&location=`} style={{ color: 'white', textDecoration: 'none', fontSize: '18px' }}>
                      Allied Jobs
                      <svg
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width="24"
                          height="24"
                          transform="translate(0.859375)"
                          fill="#CE1B28"
                        />
                        <path
                          d="M5.85938 12H19.8594"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12.8594 5L19.8594 12L12.8594 19"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </a>
                  </button>
                </div>
              </div>
              <div className="post-detail-form">
                <h3 className="postForm-Title">Fill Form</h3>
                <div className="row mt-2">
                  <div className="col-lg-6">
                    <label htmlFor="inputfirstName" className="form-label">
                      First Name*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputfirstName"
                      name="firstName"
                      placeholder="Enter First Name"
                      value={formData?.firstName || ""}
                      onChange={(e) => {
                        handleFieldChange(e, "firstName");
                      }}
                      required
                    />
                  </div>
                  <div className="col-lg-6">
                    <label htmlFor="lastName" className="form-label">
                      Last Name*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      name="lastName"
                      placeholder="Enter Last Name"
                      value={formData?.lastName || ""}
                      onChange={(e) => {
                        handleFieldChange(e, "lastName");
                      }}
                      required
                    />
                  </div>
                </div>

                <div className="mt-2">
                  <div className="col-12 mt-2">
                    <label htmlFor="mobileNumber" className="form-label">
                      Mobile No.*
                    </label>
                    <PhoneInput
                      defaultCountry="us"
                      value={formData?.mobileNumber}
                      onChange={(phone) => {
                        setFormData((values) => ({
                          ...values,
                          ["mobileNumber"]: phone,
                        }));
                      }}
                      inputStyle={{
                        width: "100%",
                      }}
                    />
                  </div>
                  <div className="col-12 mt-2">
                    <label htmlFor="email" className="form-label">
                      Email*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Enter Email"
                      value={formData?.email || ""}
                      onChange={(e) => {
                        handleFieldChange(e, "email");
                      }}
                      required
                    />
                  </div>
                </div>

                <div className="mt-2">
                  <div className="col-12 mt-2">
                    <label htmlFor="facilityOfInterest" className="form-label">
                      Facility of Interest
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="facilityOfInterest"
                      name="facilityOfInterest"
                      placeholder="Enter Facility of Interest"
                      value={formData?.facilityOfInterest || ""}
                      onChange={(e) => {
                        handleFieldChange(e, "facilityOfInterest");
                      }}
                    />
                  </div>
                  <div className="col-12 mt-2">
                    <label htmlFor="Speciality" className="form-label">
                      Speciality
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="Speciality"
                      name="Speciality"
                      placeholder="Enter Speciality"
                      value={formData?.speciality || ""}
                      onChange={(e) => {
                        handleFieldChange(e, "speciality");
                      }}
                    />
                  </div>
                </div>

                <div className="mt-2">
                  <div className="col-12 mt-2">
                    <label htmlFor="positionType" className="form-label">
                      Position Type*
                    </label>
                    <Select
                      id="positionType"
                      placeholder="Select"
                      options={positionOptions}
                      value={
                        formData?.positionType
                          ? {
                            value: formData?.positionType,
                            label: formData?.positionType,
                          }
                          : null
                      }
                      onChange={(e) => {
                        handleFieldChange(e, "positionType");
                      }}
                    />
                  </div>
                  <div className="col-12 mt-2">
                    <label htmlFor="yearsOfExperience" className="form-label">
                      Years of Exp*
                    </label>
                    <Select
                      id="yearsOfExperience"
                      placeholder="Experience"
                      options={YOEOptions}
                      value={
                        formData?.yearsOfExperience
                          ? {
                            value: formData?.yearsOfExperience,
                            label: formData?.yearsOfExperience,
                          }
                          : null
                      }
                      onChange={(e) => {
                        handleFieldChange(e, "yearsOfExperience");
                      }}
                    />
                  </div>
                </div>

                <h3 className="mt-4 post-form-upload-cv">
                User Application Specification*
                </h3>

                <div className="d-flex justify-content-start align-item-center mt-1 post-form-checklist-content red-checkbox">
                  <input
                    type="checkbox"
                    checked={formData?.readyToApply}
                    onChange={(e) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        ["recruiterReachOut"]: false,
                        ["notReadyNow"]: false,
                      }));
                      handleFieldChange(e, "readyToApply");
                    }}
                  />
                  <h4>Ready to apply</h4>
                </div>

                <div className="d-flex justify-content-start align-item-center mt-2 post-form-checklist-content red-checkbox">
                  <input
                    type="checkbox"
                    checked={formData?.recruiterReachOut}
                    onChange={(e) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        ["readyToApply"]: false,
                        ["notReadyNow"]: false,
                      }));
                      handleFieldChange(e, "recruiterReachOut");
                    }}
                  />
                  <h4>Please have a recruiter reach out to me on:</h4>
                </div>

                <div className="d-flex justify-content-start align-item-center mt-2 post-form-checklist-content red-checkbox">
                  <input
                    type="checkbox"
                    checked={formData?.notReadyNow}
                    onChange={(e) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        ["readyToApply"]: false,
                        ["recruiterReachOut"]: false,
                      }));
                      handleFieldChange(e, "notReadyNow");
                    }}
                  />
                  <h4>I’m not ready now. Please contact me in:</h4>
                </div>
                {formData?.recruiterReachOut && (
                  <div className="col-12 mt-2 d-flex justify-content-center align-item-center">
                    <div className="col-12 d-flex flex-column">
                      <label htmlFor="recruiterReachOutDateAndTime" className="form-label">
                        Date/Time *
                      </label>
                      <DatePicker
                        showTime
                        disabledTime={disabledDateTime}
                        minDate={dayjs(new Date(Date.now()))}
                        onChange={(e) => {
                          setFormData((preData) => ({
                            ...preData,
                            ["recruiterReachOutDateAndTime"]: e,
                          }));
                        }}
                        format={'MM/DD/YYYY hh:mm A'}
                      />
                    </div>
                  </div>
                )}
                {formData?.notReadyNow && (
                  <div className="col-12 mt-2 d-flex justify-content-center align-item-center">
                    <div className="col-12 d-flex flex-column">
                      <Select
                        id="contactInPeriod"
                        placeholder="Contact Range"
                        options={readyRangeOptions}
                        styles={{ color: "black" }}
                        value={
                          formData?.contactInPeriod
                            ? {
                              value: formData?.contactInPeriod,
                              label: formData?.contactInPeriod,
                            }
                            : null
                        }
                        onChange={(e) => {
                          handleFieldChange(e, "contactInPeriod");
                        }}
                      />
                    </div>
                  </div>
                )}

                <h3 className="mt-4 post-form-upload-cv">
                  Upload CV? (Optional)
                </h3>

                <div className="d-flex justify-content-start align-item-center mt-2 post-form-checklist-content red-checkbox">
                  <input
                    type="checkbox"
                    checked={uploadCvFlag}
                    onChange={() => {
                      setUploadCvFlag(!uploadCvFlag);
                    }}
                  />
                  <h4>Yes</h4>
                </div>

                {uploadCvFlag && (
                  <div className="d-flex flex-column justify-content-center align-item-center mt-2">
                    
                    <div className="d-flex justify-content-center align-item-center">
                      <div className="upload-file-dummy-content">
                        {resume?.file ? (
                          <>
                            <MdCloudUpload />
                            <h5>Selected File: {resume?.fileName}</h5>
                          </>
                        ) : (
                          <>
                            <MdCloudUpload />
                            <h5>Click or drag a file to this area to upload.</h5>
                          </>
                        )}
                      </div>
                      <input
                        type="file"
                        className="post-form-file-selector"
                        onChange={(e) => {
                          setResume({
                            file: e?.target?.files[0],
                            fileName: e?.target?.files[0]?.name,
                            type: e?.target?.files[0]?.type,
                          })
                        }}
                      />
                    </div>
                  </div>
                )}

                <div className="d-flex justify-content-start align-item-center mt-2 post-form-checklist-content red-checkbox">
                  <input
                    type="checkbox"
                    checked={formData?.termsAndCondition}
                    onChange={(e) => {
                      handleFieldChange(e, "termsAndCondition");
                    }}
                  />
                  <h4>I agree to the Terms of Service and Privacy Policy.</h4>
                </div>

                <div className="d-flex justify-content-center align-item-center mt-4">
                  <button className="post-form-submit-btn" onClick={handleSubmit}>
                    LET'S CONNECT
                  </button>
                </div>
              </div>
              <div className="servicePage-socialmedia">
                <Animate>
                  <h3>Share This Post:</h3>
                </Animate>
                <div className="d-flex align-items-center justify-content-evenly">
                  <button className="copylinks-button" onClick={() => handleShare('linkedin', `${REACT_APP_FRONTEND_URL_WEBSITE}/${postUrl}`)}>
                    <img src={insta} alt=".." />
                  </button>
                  <button className="copylinks-button" onClick={() => handleShare('facebook', `${REACT_APP_FRONTEND_URL_WEBSITE}/${postUrl}`)}>
                    <img src={facebook} alt=".." />
                  </button>
                  <button className="copylinks-button" onClick={() => handleShare('x', `${REACT_APP_FRONTEND_URL_WEBSITE}/${postUrl}`)}>
                    <img src={twitter} alt=".." />
                  </button>
                  <button className="copylinks-button" onClick={() => handleShare('email', `${REACT_APP_FRONTEND_URL_WEBSITE}/${postUrl}`)}>
                    <img src={mail} alt=".." />
                  </button>
                </div>
              </div>

              <div className="serviceCall">
                <img src={phonecall} alt=".." />
                <h3>Feel Free To give us A Call</h3>
                <p>We are available 24X7</p>
                <a
                  href="tel:+918660048488"
                  target="_blank"
                  rel="noreferrer"
                  className="submit-button"
                >
                  +1-703-349-1777
                </a>
              </div>
            </Col>
          </Row>
        </Container>
        <FAQHome FAQs={postData?.FAQs} />
      </div>
    </>
  );
};

export default PostDetail;
