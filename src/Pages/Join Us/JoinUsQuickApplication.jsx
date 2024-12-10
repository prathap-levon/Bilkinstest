import React, { useEffect, useMemo, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import Select from "react-select";
import Instance from "../../AxiosConfig";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { FaArrowLeft } from "react-icons/fa6";
import { createUniqueS3FilenameWithDate, handleFileUpload, showErrorAlert, showSuccessAlert } from "../../globalConstant";
import { Spin } from "antd";

export const JoinUsQuickApplication = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [resume, setResume] = useState(null);
  const [category, setCategory] = useState(null);
  const [speciality, setSpeciality] = useState(null);
  const [stateLicenses, setStateLicenses] = useState([]);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [alreadyApplicant, setAlreadyApplicant] = useState(false);
  const [appId, setAppId] = useState(null);

  const fetchApplicantsByEmail = async () => {
    try {
      const response = await Instance("/getApplicationByEmail", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response?.status === 200) {
        if (response?.data?.application) {
          setAlreadyApplicant(true);
          setAppId(response?.data?.application?._id);
          const appData = response?.data?.application?.basicInfo;
          setFormData(appData);
          setCategory(
            appData?.category
              ? { value: appData?.category, label: appData?.category }
              : null
          );
          setSpeciality(
            appData?.speciality
              ? { value: appData?.speciality, label: appData?.speciality }
              : null
          );
          setStateLicenses(
            appData?.stateLicenses?.length > 0
              ? appData?.stateLicenses.map((item) => ({
                value: item,
                label: item,
              }))
              : []
          );
        } else {
          setAlreadyApplicant(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // fetchApplicantsByEmail();
  }, []);

  const specialityOptions = useMemo(() => {
    if (!category) return [];
    setSpeciality(null);
    const specialitiesMap = {
      Cardiopulmonary: [
        "Anesthesia Technician",
        "Certified Respiratory Therapist - CRT",
        "Dietitian",
        "EEG Technician",
        "EKG Technician",
        "Perfusionist",
        "Polysomnographer/Sleep Tech",
        "Registered Respiratory Therapist - RRT",
      ],
      "Cath Lab": [
        "Cath Lab Pre/Post RN",
        "Cath Lab RN",
        "Cath Lab Tech",
        "EP RN",
        "EP Tech",
        "IR RN",
        "IR Tech",
      ],
      "Home Health": [
        "Home Health LPN",
        "Home Health RN",
        "Hospice",
        "LPN",
        "Hospice",
        "RN",
      ],
      Laboratory: [
        "CLS Blood Bank",
        "CLS Generalist",
        "CLS Microbiology",
        "Cytotechnologist",
        "HT/HTL General",
        "HT/HTL Grossing",
        "HT/HTL Mohs",
        "Lab Assistant",
        "Laboratory Director",
        "Laboratory Manager",
        "Laboratory Supervisor",
        "MLT Blood Bank",
        "MLT Generalist",
        "MLT Microbiology",
        "MT/MLS Blood Bank",
        "MT/MLS Generalist",
        "MT/MLS Microbiology",
        "Pathologist Assistant",
        "Phlebotomy General",
      ],
      "Long Term Care": [
        "Clinic LPN",
        "CNA",
        "LPN",
        "LTC RN",
        "MDS Coordinator",
        "Medical Assistant",
        "Medication Aide",
      ],
      Nursing: [
        "Behavioral Health RN",
        "Case Manager RN",
        "CVICU RN",
        "CVOR RN",
        "CVOR Tech",
        "Dialysis",
        "Dialysis Tech",
        "Endo RN",
        "ER RN",
        "First Assist RN",
        "First Assist Tech",
        "GI/Endoscopy Tech",
        "House Supervisor",
        "ICU RN",
        "Infection Prevention RN",
        "Infusion RN",
        "L&D RN",
        "LTAC",
        "Med/Tele RN",
        "Neuro RN",
        "NICU RN",
        "Nurse Educator",
        "Nurse Manager",
        "OB Tech",
        "Oncology RN",
        "Operating Room RN",
        "Ortho RN",
        "PACU RN",
        "Peds ER RN",
        "Peds OR RN",
        "Peds RN",
        "PICU RN",
        "Postpartum RN",
        "Pre/Post Op RN",
        "Rehab RN",
        "Stepdown RN",
        "Sterile Processor",
      ],
      Radiology: [
        "CT Tech",
        "Diagnostic Radiology RN",
        "Director of Radiology",
        "Dosimetrist",
        "Mammography Tech",
        "Medical Physicist",
        "MRI Tech",
        "Nuclear Medicine Tech",
        "Rad Tech",
        "Radiation Therapist",
        "Radiology Manager",
        "Ultrasound Echo",
        "Ultrasound Echo/Vascular",
        "Ultrasound Gen/Vasc",
        "Ultrasound High Risk",
        "Ultrasound Vascular",
      ],
      Theraphy: [
        "COTA",
        "Occupational Therapist - OT",
        "Physical Therapist - PT",
        "PTA",
        "Speech Language Pathologist - SLP",
      ],
    };
    let options = specialitiesMap[category?.label]?.map((item) => ({
      label: item,
      value: item,
    }));
    return options || [];
  }, [category]);

  const StateLicenceOptions = [
    { value: "CompactLicence", label: "Compact Licence" },
    { value: "Alabama", label: "Alabama" },
    { value: "Alaska", label: "Alaska" },
    { value: "Arizona", label: "Arizona" },
    { value: "Arkansas", label: "Arkansas" },
    { value: "California", label: "California" },
    { value: "Colorado", label: "Colorado" },
    { value: "Connecticut", label: "Connecticut" },
    { value: "DC", label: "DC" },
    { value: "Delaware", label: "Delaware" },
    { value: "Florida", label: "Florida" },
    { value: "Georgia", label: "Georgia" },
    { value: "Hawaii", label: "Hawaii" },
    { value: "Idaho", label: "Idaho" },
    { value: "Ilinois", label: "Illinois" },
    { value: "Indiana", label: "Indiana" },
    { value: "Iowa", label: "Iowa" },
    { value: "Kansas", label: "Kansas" },
    { value: "Kentucky", label: "Kentucky" },
    { value: "Louisiana", label: "Louisiana" },
    { value: "Maine", label: "Maine" },
    { value: "Maryland", label: "Maryland" },
    { value: "Massachusetts", label: "Massachusetts" },
    { value: "Michigan", label: "Michigan" },
    { value: "Minnesota", label: "Minnesota" },
    { value: "Mississippi", label: "Mississippi" },
    { value: "Missouri", label: "Missouri" },
    { value: "Montana", label: "Montana" },
    { value: "Nebraska", label: "Nebraska" },
    { value: "Nevada", label: "Nevada" },
    { value: "NewHampshire", label: "New Hampshire" },
    { value: "NewJersey", label: "New Jersey" },
    { value: "NewMexico", label: "New Mexico" },
    { value: "NewYork", label: "New York" },
    { value: "NorthCarolina", label: "North Carolina" },
    { value: "NorthDakota", label: "North Dakota" },
    { value: "Ohio", label: "Ohio" },
    { value: "Oklahoma", label: "Oklahoma" },
    { value: "Oregon", label: "Oregon" },
    { value: "Pennsylvania", label: "Pennsylvania" },
    { value: "RhodeIsland", label: "Rhode Island" },
    { value: "SouthCarolina", label: "South Carolina" },
    { value: "SouthDakota", label: "South Dakota" },
    { value: "Tennessee", label: "Tennessee" },
    { value: "Texas", label: "Texas" },
    { value: "Utah", label: "Utah" },
    { value: "Vermont", label: "Vermont" },
    { value: "Virginia", label: "Virginia" },
    { value: "Washington", label: "Washington" },
    { value: "WestVirginia", label: "West Virginia" },
    { value: "Wisconsin", label: "Wisconsin" },
    { value: "Wyoming", label: "Wyoming" },
  ];

  const categoryOptions = [
    { label: "Cardiopulmonary", value: "Cardiopulmonary" },
    { label: "Cath Lab", value: "Cath Lab" },
    { label: "Home Health", value: "Home Health" },
    { label: "Laboratory", value: "Laboratory" },
    { label: "Long Term Care", value: "Long Term Care" },
    { label: "Nursing", value: "Nursing" },
    { label: "Theraphy", value: "Theraphy" },
    { label: "Radiology", value: "Radiology" },
  ];

  const handleResumeSelect = (e) => {
    setResume(e.target.files[0]);
  };

  const handleChange = (e) => {
    setFormData((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

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
      showErrorAlert("First name is required");
      return false;
    }
    if (!formData?.lastName || formData?.lastName?.trim() === "") {
      showErrorAlert("Last name is required");
      return false;
    }

    if (!formData?.email || formData?.email?.trim() === "") {
      showErrorAlert("Email is required");
      return false;
    } else if (!emailRegex.test(formData?.email)) {
      showErrorAlert("Please enter valid email");
      return false;
    }

    if (!formData?.mobileNumber || formData?.mobileNumber?.length < 6) {
      showErrorAlert("Mobile number is required");
      return false;
    } else if (!validatePhoneNumber(formData?.mobileNumber)) {
      showErrorAlert("Please enter valid mobile number");
      return false;
    }

    if (!category || category?.value?.trim() === "") {
      showErrorAlert("Category is required");
      return false;
    }

    if (!speciality || speciality?.value?.trim() === "") {
      showErrorAlert("Speciality is required");
      return false;
    }

    if (!resume) {
      showErrorAlert("Please upload your resume");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (!isFormValid()) return;
      setIsLoading(true);
      let fileName = resume
        ? createUniqueS3FilenameWithDate(resume?.name)
        : null;
      if (fileName) {
        let res = await handleFileUpload(resume, fileName, resume?.type);
        if (!res) {
          showErrorAlert("Failed to upload resume");
          return;
        }

        let response = await Instance.post(
          "/addNewMedia",
          {
            content: fileName,
            contentType: resume.type,
            originalName: resume?.name,
            contentDescription: `Resume is uploaded by ${formData?.firstName} ${formData?.lastName} and email is ${formData?.email}`,
            uploadedFrom: "Quick Application",
          },
          {}
        );
      }

      if (!validatePhoneNumber(formData?.mobileNumber)) {
        showErrorAlert("Enter valid phone number");
        return;
      }

      let body = {
        jobId: null,
        basicInfo: {
          firstName: formData?.firstName,
          lastName: formData?.lastName,
          email: formData?.email,
          mobileNumber: formData?.mobileNumber,
          referredBy: formData?.referredBy,
          category: category?.value || "",
          speciality: speciality?.value || "",
          stateLicenses: stateLicenses?.map((item) => item.value) || [],
          resume: fileName,
        },
        sourcePage: "Join Quick Application",
      };
      const response = await (alreadyApplicant
        ? Instance.put(`/editApplication/${appId}`, body, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        : Instance.post("/addApplication", body, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }));
      if (response.status === 201) {
        showSuccessAlert('Form submitted successfully!');
        resetForm();
        navigate(`/search-jobs?jobtitle=&location=&longitude=&latitude=&radius=&regionCategory=`);
      }
    } catch (error) {
      console.error(error);
      showErrorAlert(error?.resetForm?.data?.message || "An error occured");
    } finally{
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({});
    setCategory(null);
    setSpeciality(null);
    setStateLicenses([]);
    setResume(null);
  };

  return (
    <>
      {isLoading && <div className="keyword-loader">
        <Spin size="large" className="custom-loader" />
      </div>
      }
      <div>
        {/* <JoinusBanner/> */}
        <Container className="apply-job-now">
          <Row>
            <Col md={12} className="apply-job-left">
              <button
                onClick={() => {
                  navigate("/");
                }}
                className="back-button"
              >
                <FaArrowLeft />&nbsp;
                Back To Home
              </button>
              <div className="d-flex gap-4 justify-content-center">
                <button
                  onClick={() => navigate("/join-us/quick-application")}
                  className="btn-sign-up"
                >
                  Quick Appliction
                </button>

                <button
                  onClick={() => navigate("/join-us/full-application")}
                  className="btn-log-in"
                >
                  Full Application
                </button>
              </div>
            </Col>
            <Col md={12} className="apply-job-right-col">
              <h3>Quick Application</h3>
              <form className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="inputfirstName" className="form-label">
                    Legal First name*
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputfirstName"
                    name="firstName"
                    placeholder="Enter First Name"
                    value={formData?.firstName || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputlastName" className="form-label">
                    Legal Last name*
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputlastName"
                    name="lastName"
                    placeholder="Enter Last Name"
                    value={formData?.lastName || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="inputemail" className="form-label">
                    Email*
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="inputemail"
                    name="email"
                    placeholder="Enter Email Id"
                    value={formData?.email || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="inputPhone" className="form-label">
                    Mobile Phone*
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
                {/* <div className="col-6">
                                <label htmlFor="inputPhone" className="form-label">
                                    Mobile Phone*
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputAddress2"
                                    name="mobileNumber"
                                    placeholder="Enter Mobile Number"
                                    value={formData?.mobileNumber || ""}
                                    onChange={handleChange}
                                    required
                                />
                            </div> */}
                <div className="col-md-6">
                  <label htmlFor="inputCategory" className="form-label">
                    Category*
                  </label>
                  <Select
                    id="inputCategory"
                    options={categoryOptions}
                    // value={formData?.category ? {value:formData?.category,label:formData?.category}: category}
                    value={category}
                    onChange={(e) => setCategory(e)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputSpeciality" className="form-label">
                    Speciality*
                  </label>
                  <Select
                    id="inputSpeciality"
                    isDisabled={!category}
                    options={specialityOptions}
                    // value={formData?.speciality ? {value:formData?.speciality,label:formData?.speciality} : speciality}
                    value={speciality}
                    onChange={(e) => setSpeciality(e)}
                  />
                </div>

                <div className="col-md-12">
                  <label htmlFor="inputState" className="form-label">
                    State Licenses
                  </label>
                  <Select
                    isMulti={true}
                    options={StateLicenceOptions}
                    // value={formData?.stateLicenses ? (formData?.stateLicenses.map(((item) => ({value:item,label:item})))) : stateLicenses}
                    value={stateLicenses}
                    onChange={(e) => setStateLicenses(e)}
                  />
                </div>
                <div className="col-md-12">
                  <label htmlFor="inputReffered" className="form-label">
                    Referred by
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputReffered"
                    name="referredBy"
                    value={formData?.referredBy || ""}
                    placeholder="Reffered By"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-12">
                  <label htmlFor="inputResume" className="form-label">
                    Upload Your Resume*
                  </label>
                  <div className="resume-container">
                    <div className="resume-btn-form">
                      Choose File
                      <input
                        type="file"
                        className="form-control mb-2"
                        style={{ opacity: 0 }}
                        id="inputResume"
                        onChange={handleResumeSelect}
                      />
                    </div>

                    {resume && <p>{resume.name}</p>}
                  </div>
                  <p style={{ fontSize: "12px", color: "#555" }}>
                    Accepted file types include Word document (.doc, .docx), a PDF
                    created from a text file (not scanned in as an image), or a
                    plain .txt, .rtf, .html, or .odt file.
                  </p>
                </div>

                <div className="col-12 d-flex justify-content-end">
                  <button className="btn-log-in" onClick={handleSubmit}>
                    {alreadyApplicant
                      ? "Update Application"
                      : "Submit Application"}
                  </button>
                </div>
              </form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
