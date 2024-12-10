import React, { useEffect, useState,useRef } from "react";
import profile from "../../Assets/Images/profile.png";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { IoBagOutline, IoLocationOutline } from "react-icons/io5";
import { IoLogoYoutube } from "react-icons/io";
import {  GoXCircleFill } from "react-icons/go";
import { Table, Upload } from "antd";
import { FiPhoneCall } from "react-icons/fi";
import { SlCalender } from "react-icons/sl";
import { CiMail, CiGlobe } from "react-icons/ci";
import { RiSettings6Line } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { FaLinkedin, FaFacebookSquare, FaCheckCircle } from "react-icons/fa";
import { FaSquareTwitter } from "react-icons/fa6";
import { AddBasicDetails } from "./AddBasicDetails";
import AddSkills from "./AddSkills";
import { AddEmployment } from "./AddEmployment";
import { AddEducation } from "./AddEducation";
import ProfileSummary from "./ProfileSummary";
import { AddCertification } from "./AddCertification";
import SocialMedia from "./SocialMedia";
import { LanguageProficiency } from "./Languageproficiency";
import AddExperienceModal from "./AddExperienceModal";
import { setProfile, setUserDetail } from "../../../features/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import Instance from "../../../AxiosConfig";
import { createUniqueS3FilenameWithDate, formateDate, handleFileUpload, showErrorAlert, showSuccessAlert } from "../../../globalConstant";
import Loader from "../../../Loader";
import { TbEdit } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { PiHandCoins } from "react-icons/pi";

export const ProfileOverview = () => {
  const dispatch = useDispatch();
  const [resume, setResume] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisibility, setModalVisibility] = useState({});
  const profileDetail = useSelector((state) => state.profile.profile);
  const userDetail = useSelector((state) => state.profile.userDetail);
  const [selectedOption, setSelectedOption] = useState("profile-section");
  const loggedInUserInfo = JSON.parse(localStorage.getItem("loggedInUserInfo"));
  const fileInputRef = useRef(null);
const navigate=useNavigate();
const handleFileChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml'];

    if (!allowedTypes.includes(file.type)) {
      return { valid: false, message: 'Only JPG, JPEG, PNG, WEBP, and SVG images are allowed.' };
    }

    const maxSizeInMB = 2;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      return { valid: false, message: 'File size should be less than 2MB.' };
    }

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result); 
      };
      reader.readAsDataURL(file);
      setProfileImage(file); 
    }
  };
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setSelectedOption(sectionId);
  };
  const columns = [
    {
      title: 'Languages',
      dataIndex: 'language',
      key: 'language',
    },
    {
      title: 'Proficiency',
      dataIndex: 'fluency',
      key: 'fluency',
    },
    {
      title: 'Read',
      dataIndex: 'isRead',
      key: 'read',
      render: (isRead) => 
        isRead ? (
          <FaCheckCircle style={{ color: "var(--success-color)" }} />
        ) : (
          <GoXCircleFill  style={{ color: "var(--maroon-color)" }} />
        ),
    },
    {
      title: 'Write',
      dataIndex: 'isWrite',
      key: 'write',
      render: (isWrite) => 
        isWrite ? (
          <FaCheckCircle style={{ color: "var(--success-color)" }} />
        ) : (
          <GoXCircleFill  style={{ color: "var(--maroon-color)" }} />
        ),
    },
    {
      title: 'Speak',
      dataIndex: 'isSpeak',
      key: 'speak',
      render: (isSpeak) => 
        isSpeak ? (
          <FaCheckCircle style={{ color: "var(--success-color)" }} />
        ) : (
          <GoXCircleFill style={{ color: "var(--maroon-color)" }} />
        ),
   
    },
  ];

  const beforeUpload = (file) => {
    const isValidType =
      file.type === "application/pdf" ||
      file.type === "application/msword" ||
      file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"; // doc, docx, and pdf

    const isSingleFile = file.size / 1024 / 1024 <= 5; // Allow up to 5MB
    return isValidType && isSingleFile;
  };

  const customRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const fetchProfileDetails = async () => {
    try {
      setIsLoading(true);
      const response = await Instance.get(`/getUserById/${loggedInUserInfo?.userId}`, {
        headers: {
          Authorization: `Bearer ${loggedInUserInfo?.token}`,
        },
      });
      if (response.status === 200) {
        dispatch(setProfile(response?.data?.user));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserDetails = async () => {
    try {
      setIsLoading(true);
      const response = await Instance.get(`/getUserProfile/${loggedInUserInfo?.userId}`, {
        headers: {
          Authorization: `Bearer ${loggedInUserInfo?.token}`,
        },
      });
      if (response.status === 200) {
        console.log(response.data)
        dispatch(setUserDetail(response?.data?.profile));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchProfileDetails();
  }, []);

  const handleModalClose = () => {
    setModalVisibility({});
  };

  const stringDate = (date) => {
    return new Date(date).toLocaleDateString('en-Us', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const getDuration = (startDate, endDate = new Date()) => {
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);

    const totalMonths = (date2.getFullYear() - date1.getFullYear()) * 12 + (date2.getMonth() - date1.getMonth()) + 1; // Include current month
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''}${months > 0 ? ` and ${months} month${months > 1 ? 's' : ''}` : ''}`;
    } else {
      return `${months} month${months > 1 ? 's' : ''}`;
    }
  };

  const handleResumeUpload = async () => {
    try {
      if (!resume) return;
      setIsLoading(true);
      const fileName = createUniqueS3FilenameWithDate(resume?.name);
      const file = await handleFileUpload(resume?.originFileObj, fileName, resume?.type);
      const response = await Instance.put(`/editUserProfileDetail/${loggedInUserInfo?.userId}`, {
        resume: {
          resumeName: resume?.name,
          resumeURL: file,
          uploadedDate: new Date()
        }
      }, {
        headers: {
          Authorization: `Bearer ${loggedInUserInfo?.token}`,
        },
      });
      if (response.status === 200) {
        showSuccessAlert('Resume uploaded successfully');
        setResume(null);
        dispatch(setUserDetail(response?.data?.userDetail));
      }
    } catch (error) {
      console.error(error);
      showErrorAlert('Failed to upload resume');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading && <Loader />}
      <div className="profile-overview-section">
        <div className="container">
          <div className="row mt-4">
            <div className="profile-basic-details d-block  d-lg-flex d-xl-flex gap-2 align-items-center">
            <div className="profile-icon-section">
            <img src={previewImage || profile} alt="Profile" className="profile-image" />
                <button
                  type="button"
                  className="edit-icon-button"
                  onClick={handleEditClick}
                >
                  <TbEdit className="edit-icon" />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </div>
              <div className="mt-4 mt-lg-0 mt-xl-0">
                <h3>
                  {`${profileDetail?.firstName} ${profileDetail?.lastName}`} &nbsp; <MdOutlineModeEditOutline onClick={() => setModalVisibility({ ...modalVisibility, showProfileModal: true })} />
                </h3>
                <div className="d-flex gap-4">
                  <div>
                    <h5>
                      <IoLocationOutline /> {`${profileDetail?.city || ''}${profileDetail?.city && ', '}${profileDetail?.stateCode || ''} ${(profileDetail?.stateCode || profileDetail?.city) && ', '} ${profileDetail?.zipCode || ''}`}
                      {!profileDetail?.city && !profileDetail?.stateCode && !profileDetail?.zipCode && 'N/A'}
                    </h5>
                    <h5>
                      <IoBagOutline /> {profileDetail?.maritalStatus === 'MARRIED' ? 'Married' : profileDetail?.maritalStatus === 'UNMARRIED' ? 'Unmarried' : 'N/A'}
                    </h5>
                    <h5>
                      <CgProfile /> {profileDetail?.gender === 'MALE' ? 'Male' : profileDetail?.gender === 'FEMALE' ? 'Female' : profileDetail?.gender === 'OTHER' ? 'Other' : 'N/A'}
                    </h5>
                  </div>
                  <div className="profile-vertical-line"></div>
                  <div>
                    <h5>
                      <CiMail /> {profileDetail?.email}
                    </h5>
                    <h5>
                      <FiPhoneCall /> {profileDetail?.mobileNumber || 'N/A'}
                    </h5>
                    <h5>
                      <SlCalender /> {profileDetail?.dateOfBirth ? formateDate(profileDetail?.dateOfBirth) : 'N/A'}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-lg-4">
              <div className="profile-settings-options">
                <div
                  className={`profile-settings-items ${selectedOption === "profile-section" ? "profile-active" : ""
                    }`}
                  onClick={() => scrollToSection("profile-section")}
                >
                  <CgProfile /> Personal Information
                </div>
                <div
                  className={`profile-settings-items mt-3 ${selectedOption === "education-section" ? "profile-active" : ""
                    }`}
                  onClick={() => scrollToSection("education-section")}
                >
                  <IoBagOutline /> Experience And Education
                </div>
                <div
                  className={`profile-settings-items mt-3 ${selectedOption === "social-media-section" ? "profile-active" : ""
                    }`}
                  onClick={() => scrollToSection("social-media-section")}
                >
                  <CiGlobe /> Social Media
                </div>
                <div
                  className={`profile-settings-items mt-3 ${selectedOption === "language-section" ? "profile-active" : ""
                    }`}
                  onClick={() => scrollToSection("language-section")}
                >
                  <RiSettings6Line /> Language setting
                </div>
                <div
                  className={`profile-settings-items mt-3 ${selectedOption === "language-section" ? "profile-active" : ""
                    }`}
                  onClick={() => navigate('/user/payroll')}
                >
                  <PiHandCoins /> Pay Roll
                </div>
              </div>
            </div>
            <div className="col-lg-8 mt-4 mt-lg-0 mt-xl-0">
              <div className="row">
                <div id="profile-section" className="profile-basic-details">
                  <h4>Resume</h4>
                  <div className="d-flex justify-content-between">
                    <div>
                      <h5>{userDetail?.resume?.resumeName || 'N/A'}</h5>
                      {userDetail?.resume?.resumeName && <span>Uploaded on {formateDate(userDetail?.resume?.uploadedDate)}</span>}
                    </div>
                    {/* <div className="d-flex gap-2">
                      <div className="icon-wrapper bg-danger bg-opacity-10 p-2 rounded-circle ">
                        <IoCloudDownloadOutline
                          className="text-danger"
                          size={24}
                        />
                      </div>
                      <div className="icon-wrapper bg-danger bg-opacity-10 p-2 rounded-circle ">
                        <AiOutlineDelete className="text-danger" size={24} />
                      </div>
                    </div> */}
                  </div>
                  <div className="mt-4">
                    <Upload.Dragger
                      name="resume"
                      accept=".pdf,.doc,.docx"
                      beforeUpload={beforeUpload}
                      className="resume-upload-dragger"
                      action="#"
                      customRequest={customRequest}
                      fileList={resume ? [resume] : []}
                      onChange={({ fileList }) => {
                        if (fileList.length > 1) {
                          showErrorAlert("You cannot add multiple resume");
                          return;
                        }
                        setResume(fileList[0]);
                      }}
                    >
                      <button className="resume-upload-drag-icon" type="button">
                        Upload Resume
                      </button>
                      <p className="ant-upload-hint">
                        Supported Formats: doc, pdf, upto 5 MB
                      </p>
                    </Upload.Dragger>
                    <button type="button" disabled={!resume} className="btn btn-danger mt-3" onClick={handleResumeUpload}>Save</button>
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div id="profile-section" className="profile-basic-details">
                  <h4>Experience <MdOutlineModeEditOutline onClick={() => setModalVisibility({ ...modalVisibility, showExperienceModal: true })} /></h4>
                  <h5>
                    {userDetail?.totalExperience?.years >= 0 ? `${userDetail?.totalExperience?.years} Years ` : ''}
                    {userDetail?.totalExperience?.months >= 0 ? `${userDetail?.totalExperience?.months} Months` : ''}
                    {userDetail?.totalExperience?.years === undefined && userDetail?.totalExperience?.months === undefined ? 'N/A' : ''}
                  </h5>
                  <h4>Availability To Join</h4>
                  <h5>
                    <SlCalender /> {userDetail?.availableToJoinIn || 'N/A'}
                  </h5>
                </div>
              </div>
              <div className="row mt-4">
                <div className="profile-basic-details">
                  <h4>
                    Skill you have <MdOutlineModeEditOutline onClick={() => setModalVisibility({ ...modalVisibility, showSkillsModal: true })} />
                  </h4>
                  <div className="d-flex gap-2">
                    {userDetail?.skills?.map((skill, index) => (
                      <p className="profile-skills" key={index}>{skill}</p>
                    ))}
                    {userDetail?.skills?.length === 0 && <p >No skills added</p>}
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="profile-basic-details">
                  <div className="d-flex justify-content-between">
                    <h4>Employment</h4>
                    <h4 className="profile-add-details-heading" onClick={() => setModalVisibility({ ...modalVisibility, showEmploymentModal: true })}>
                       <MdOutlineModeEditOutline />
                    </h4>
                  </div>
                  {userDetail?.employmentHistory?.map((employment, index) => (
                    <div className="mb-4">
                      <h5 style={{ color: "var(--text-color)" }}>
                        {employment?.jobTitle}
                      </h5>
                      <h5>{employment?.companyName}</h5>
                      <h5>{employment?.employmentType} | {stringDate(employment?.joiningDate)} to {employment?.isCurrentEmployment ? 'Present' : stringDate(employment?.leavingDate)} </h5>
                      <h5>{getDuration(employment?.joiningDate, employment?.leavingDate)}</h5>
                    </div>
                  ))}
                </div>
              </div>
              <div className="row mt-4">
                <div id="education-section" className="profile-basic-details">
                  <div className="d-flex justify-content-between">
                    <h4>Education</h4>
                    <h4 className="profile-add-details-heading " onClick={() => setModalVisibility({ ...modalVisibility, showEducationModal: true })}>
                    <MdOutlineModeEditOutline />
                    </h4>
                  </div>
                  {userDetail?.education?.map((education, index) => (
                    <div className="mb-4">
                      <h5 style={{ color: "var(--text-color)" }}>
                        {education?.degree}
                      </h5>
                      <h5>{education?.fieldOfStudy}</h5>
                      <h5>{education?.instituteName}</h5>
                      <h5>{stringDate(education?.startDate)} to {stringDate(education?.endDate)} </h5>
                      <h5>{getDuration(education?.startDate, education?.endDate)}</h5>
                    </div>
                  ))}
                </div>
              </div>
              <div className="row mt-4">
                <div className="profile-basic-details">
                  <h4>
                    Profile Summary <MdOutlineModeEditOutline onClick={() => setModalVisibility({ ...modalVisibility, showProfileSummaryModal: true })} />
                  </h4>
                  <h5>
                    {userDetail?.profileSummary || 'N/A'}
                  </h5>
                </div>
              </div>
              <div className="row mt-4">
                <div className="profile-basic-details">
                  <div className="d-flex justify-content-between">
                    <h4>Certification</h4>
                    <h4 className="profile-add-details-heading" onClick={() => setModalVisibility({ ...modalVisibility, showCertificationModal: true })}>
                    <MdOutlineModeEditOutline />
                    </h4>
                  </div>
                  {userDetail?.certifications?.map((certification, index) => (

                    <div className="mb-4">
                      <h5 style={{color:"var(--text-color)"}}>{certification?.certificateName}</h5>
                      <h5>{certification?.certificateId}</h5>
                      <a href="#" style={{color:"var(--text-semi-color)"}}>{certification?.certificateURL}</a>
                      <h5>{stringDate(certification?.issuedDate)}- {certification?.expirationDate ? stringDate(certification.expirationDate) : "N/A"}</h5>
                     
                    </div>
                    
                  ))}
                  
                </div>
              </div>
              <div className="row mt-4">
                <div id="social-media-section" className="profile-basic-details">
                  <h4>
                    Social Media <MdOutlineModeEditOutline onClick={() => setModalVisibility({ ...modalVisibility, showSocialMediaModal: true })} />
                  </h4>
                  <div className="social-media-grid mt-4">
                    <div className="social-media-item">
                      <FaLinkedin style={{ color: "#0b86ca" }} size={24} />{" "}
                      <a href={userDetail?.socialMedia?.linkedIn || 'https://www.linkedin.com'} target="_blank">
                        {" "}
                        {userDetail?.socialMedia?.linkedIn || 'N/A'}
                      </a>
                    </div >
                    <div className="social-media-item ">
                      <FaFacebookSquare style={{ color: "#0b86ca" }} size={24} />
                      <a href={userDetail?.socialMedia?.facebook || 'https://www.facebook.com'} target="_blank">
                        {" "}
                        {userDetail?.socialMedia?.facebook || 'N/A'}
                      </a>
                    </div>
                    <div className="social-media-item ">
                      <FaSquareTwitter style={{ color: "#54acee" }} size={24} />
                      <a href={userDetail?.socialMedia?.twitter || 'https://www.twitter.com'} target="_blank">
                        {" "}
                        {userDetail?.socialMedia?.twitter || 'N/A'}
                      </a>
                    </div>
                    <div className="social-media-item">
                      <IoLogoYoutube style={{ color: "#f44336" }} size={24} />
                      <a href={userDetail?.socialMedia?.youtube || 'https://www.youtube.com'} target="_blank">
                        {" "}
                        {userDetail?.socialMedia?.youtube || 'N/A'}
                      </a>
                    </div>
                  </div>
                  
                </div>
              </div>
              <div className="row mt-4">
                <div id="language-section" className="profile-basic-details">

                  <div className="d-flex justify-content-between" style={{ borderBottom: "1px solid var(--border-color)" }}>
                    <h4>Language</h4>
                    <h4 className="profile-add-details-heading" onClick={() => setModalVisibility({ ...modalVisibility, showLanguageModal: true })}>
                      <MdOutlineModeEditOutline/>
                    </h4>
                  </div>
                  <Table columns={columns}  dataSource={userDetail?.languages || []} pagination={false} className="profile-languages-table"/>

                </div>
              </div>
              {modalVisibility?.showProfileModal && <AddBasicDetails onCancel={handleModalClose} />}
              {modalVisibility?.showExperienceModal && <AddExperienceModal onCancel={handleModalClose} />}
              {modalVisibility?.showSkillsModal && <AddSkills onCancel={handleModalClose} />}
              {modalVisibility?.showEmploymentModal && <AddEmployment onCancel={handleModalClose} />}
              {modalVisibility?.showEducationModal && <AddEducation onCancel={handleModalClose} />}
              {modalVisibility?.showProfileSummaryModal && <ProfileSummary onCancel={handleModalClose} />}
              {modalVisibility?.showCertificationModal && <AddCertification onCancel={handleModalClose} />}
              {modalVisibility?.showSocialMediaModal && <SocialMedia onCancel={handleModalClose} />}
              {modalVisibility?.showLanguageModal && <LanguageProficiency onCancel={handleModalClose} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
