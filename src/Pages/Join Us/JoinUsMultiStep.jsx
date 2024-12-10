import React, { useState, useMemo, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import Select from 'react-select';
import Instance from '../../AxiosConfig';
import { FaTrash } from "react-icons/fa6";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import moment from 'moment/moment';
import { useNavigate } from 'react-router-dom';
import { Spin, DatePicker } from 'antd';
import dayjs from 'dayjs';
import { showErrorAlert, showSuccessAlert, createUniqueS3FilenameWithDate, handleFileUpload } from '../../globalConstant';

const MultiStepForm = () => {
    const [appId, setAppId] = useState(null);
    const [alreadyApplicant, setAlreadyApplicant] = useState(false)
    const [step, setStep] = useState(1);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [category, setCategory] = useState(null);
    const [speciality, setSpeciality] = useState(null);
    const [certifications, setCertifications] = useState([]);
    const [stateLicenses, setStateLicenses] = useState([]);
    const [state, setSelectedState] = useState(null);
    const [resume, setResume] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const [educations, setEducation] = useState([{
        schoolName: "",
        schoolType: null,
        schoolCity: "",
        schoolState: null,
        degreeDiploma: "",
        graduateDate: null
    }]);
    const [additionalCertifications, setAdditionalCertifications] = useState([{
        certificateURL: "",
        expirationDate: null
    }]);
    const [licenses, setLicenses] = useState([{
        state: null,
        issuedDate: null,
        expirationDate: null
    }]);
    const [experiences, setExperiences] = useState([{
        speciality: "",
        yearOFExperience: ""
    }]);
    const [prevEmployements, setPrevEmployment] = useState([{
        facility: "",
        department: "",
        supervisiorName: "",
        startDate: null,
        endDate: null,
        city: "",
        state: null,
        hours: ""
    }]);

    const fetchApplicantsByEmail = async () => {
        try {
            const response = await Instance('/getApplicationByEmail', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response?.status === 200) {
                if (response?.data?.application) {
                    setAlreadyApplicant(true)
                    setAppId(response?.data?.application?._id);
                    const appData = response?.data?.application?.basicInfo;
                    let newData = { ...appData };
                    newData['dateOfBirth'] = moment(appData?.dateOfBirth).format('YYYY-MM-DD');
                    newData['criminalBackgroundCheck'] = response?.data?.application?.criminalBackgroundCheck?.toString();
                    newData['actionLimitaions'] = response?.data?.application?.actionLimitaions?.toString();
                    newData['drugScreen'] = response?.data?.application?.drugScreen?.toString();
                    newData['termsConditionAgreed'] = response?.data?.application?.termsConditionAgreed;
                    setFormData(newData);

                    setCategory(appData?.category ? { value: appData?.category, label: appData?.category } : null);
                    setSpeciality(appData?.speciality ? { value: appData?.speciality, label: appData?.speciality } : null);
                    setStateLicenses(appData?.stateLicenses?.length > 0 ? appData?.stateLicenses.map((item) => ({ value: item, label: item })) : []);
                    setCertifications(appData?.certifications?.length > 0 ? appData?.certifications.map((item) => ({ value: item, label: item })) : []);
                    setEducation(response?.data?.application?.educations);
                    setAdditionalCertifications(response?.data?.application?.certifications);
                    setLicenses(response?.data?.application?.licences);
                    setExperiences(response?.data?.application?.experiences);
                    setPrevEmployment(response?.data?.application?.prevEmployements);
                } else {
                    setAlreadyApplicant(false);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        // fetchApplicantsByEmail();
    }, [])

    const ResetForm = () => {
        setStep(1);
        // setFormData({});
        // setCategory(null);
        // setSpeciality(null);
        // setCertifications([]);
        // setStateLicenses([]);
        // setSelectedState(null);
        // setResume(null);
        // setEducation([{
        //     schoolName: "",
        //     schoolType: null,
        //     schoolCity: "",
        //     schoolState: null,
        //     degreeDiploma: "",
        //     graduateDate: ""
        // }]);
        // setAdditionalCertifications([{
        //     certificateURL: "",
        //     expirationDate: ""
        // }]);
        // setLicenses([{
        //     state: null,
        //     issuedDate: "",
        //     expirationDate: ""
        // }]);
        // setExperiences([{
        //     speciality: "",
        //     yearOFExperience: ""
        // }]);
        // setPrevEmployment([{
        //     facility: "",
        //     department: "",
        //     supervisiorName: "",
        //     startDate: "",
        //     endDate: "",
        //     city: "",
        //     state: null,
        //     hours: ""
        // }]);
    }

    const specialityOptions = useMemo(() => {
        if (!category) return [];
        setSpeciality(null);
        const specialitiesMap = {
            Cardiopulmonary: ["Anesthesia Technician", "Certified Respiratory Therapist - CRT", "Dietitian", "EEG Technician", "EKG Technician", "Perfusionist", "Polysomnographer/Sleep Tech", "Registered Respiratory Therapist - RRT"],
            "Cath Lab": ["Cath Lab Pre/Post RN", "Cath Lab RN", "Cath Lab Tech", "EP RN", "EP Tech", "IR RN", "IR Tech"],
            "Home Health": ["Home Health LPN", "Home Health RN", "Hospice", "LPN", "Hospice", "RN"],
            Laboratory: ["CLS Blood Bank", "CLS Generalist", "CLS Microbiology", "Cytotechnologist", "HT/HTL General", "HT/HTL Grossing", "HT/HTL Mohs", "Lab Assistant", "Laboratory Director", "Laboratory Manager", "Laboratory Supervisor", "MLT Blood Bank", "MLT Generalist", "MLT Microbiology", "MT/MLS Blood Bank", "MT/MLS Generalist", "MT/MLS Microbiology", "Pathologist Assistant", "Phlebotomy General"],
            "Long Term Care": ["Clinic LPN", "CNA", "LPN", "LTC RN", "MDS Coordinator", "Medical Assistant", "Medication Aide"],
            Nursing: ["Behavioral Health RN", "Case Manager RN", "CVICU RN", "CVOR RN", "CVOR Tech", "Dialysis", "Dialysis Tech", "Endo RN", "ER RN", "First Assist RN", "First Assist Tech", "GI/Endoscopy Tech", "House Supervisor", "ICU RN", "Infection Prevention RN", "Infusion RN", "L&D RN", "LTAC", "Med/Tele RN",
                "Neuro RN", "NICU RN", "Nurse Educator", "Nurse Manager", "OB Tech", "Oncology RN", "Operating Room RN", "Ortho RN", "PACU RN", "Peds ER RN", "Peds OR RN", "Peds RN", "PICU RN", "Postpartum RN", "Pre/Post Op RN", "Rehab RN", "Stepdown RN", "Sterile Processor"],
            Radiology: ["CT Tech", "Diagnostic Radiology RN", "Director of Radiology", "Dosimetrist", "Mammography Tech", "Medical Physicist", "MRI Tech", "Nuclear Medicine Tech", "Rad Tech", "Radiation Therapist", "Radiology Manager", "Ultrasound Echo", "Ultrasound Echo/Vascular", "Ultrasound Gen/Vasc", "Ultrasound High Risk", "Ultrasound Vascular"],
            Theraphy: ["COTA", "Occupational Therapist - OT", "Physical Therapist - PT", "PTA", "Speech Language Pathologist - SLP"]
        };
        let options = specialitiesMap[category?.label]?.map((item) => ({
            label: item,
            value: item
        }));
        return options || [];
    }, [category]);

    const certificationOptions = [
        { value: 'ARRT', label: 'ARRT' },
        { value: 'RCIS', label: 'RCIS' },
        { value: 'FLOURO', label: 'FLOURO' }
    ];

    const stateLicenceOptions = [
        { value: 'CompactLicence', label: 'Compact Licence' },
        { value: 'Alabama', label: 'Alabama' },
        { value: 'Alaska', label: 'Alaska' },
        { value: 'Arizona', label: 'Arizona' },
        { value: 'Arkansas', label: 'Arkansas' },
        { value: 'California', label: 'California' },
        { value: 'Colorado', label: 'Colorado' },
        { value: 'Connecticut', label: 'Connecticut' },
        { value: 'DC', label: 'DC' },
        { value: 'Delaware', label: 'Delaware' },
        { value: 'Florida', label: 'Florida' },
        { value: 'Georgia', label: 'Georgia' },
        { value: 'Hawaii', label: 'Hawaii' },
        { value: 'Idaho', label: 'Idaho' },
        { value: 'Ilinois', label: 'Illinois' },
        { value: 'Indiana', label: 'Indiana' },
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
        { value: 'NewJersey', label: 'New Jersey' },
        { value: 'NewMexico', label: 'New Mexico' },
        { value: 'NewYork', label: 'New York' },
        { value: 'NorthCarolina', label: 'North Carolina' },
        { value: 'NorthDakota', label: 'North Dakota' },
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
        { value: 'WestVirginia', label: 'West Virginia' },
        { value: 'Wisconsin', label: 'Wisconsin' },
        { value: 'Wyoming', label: 'Wyoming' }
    ];

    const categoryOptions = [
        { label: "Cardiopulmonary", value: "Cardiopulmonary" },
        { label: "Cath Lab", value: "Cath Lab" },
        { label: "Home Health", value: "Home Health" },
        { label: "Laboratory", value: "Laboratory" },
        { label: "Long Term Care", value: "Long Term Care" },
        { label: "Nursing", value: "Nursing" },
        { label: "Theraphy", value: "Theraphy" },
        { label: "Radiology", value: "Radiology" }
    ];

    const schoolTypeOptions = [
        { label: "College", value: "College" },
        { label: "Trade School", value: "Trade School" },
        { label: "Other", value: "Other" }
    ];

    const handleChange = (e) => {
        if (e.target.name === 'termsConditionAgreed') {
            setFormData(values => ({ ...values, [e.target.name]: e.target.checked }));
            return;
        }
        setFormData(values => ({ ...values, [e.target.name]: e.target.value }))
    }

    const handleResumeSelect = (e) => {
        setResume(e.target.files[0]);
    }

    const isFormValid = (no) => {
        if (no === 1) {
            if (!formData?.firstName || formData?.firstName?.trim() === '') {
                showErrorAlert("FirstName required");
                return false;
            }
            if (!formData?.lastName || formData?.lastName?.trim() === '') {
                showErrorAlert("LastName required");
                return false;
            }
            if (!formData?.dateOfBirth) {
                showErrorAlert("DOB required");
                return false;
            }
            if (!category || category?.value?.trim() === '') {
                showErrorAlert("Category required");
                return false;
            }
            if (!speciality || speciality?.value?.trim() === '') {
                showErrorAlert("speciality required");
                return false;
            }
            if (!formData?.city || formData?.city?.trim() === '') {
                showErrorAlert("city required");
                return false;
            }
            if (!formData?.zipCode || formData?.zipCode?.trim() === '') {
                showErrorAlert("ZipCode required");
                return false;
            }
            if (!formData?.mobileNumber || formData?.mobileNumber?.length < 6) {
                showErrorAlert('Mobile Number reauired');
                return false;
            } else if (!validatePhoneNumber(formData?.mobileNumber)) {
                showErrorAlert("Please enter valid Mobile Number");
                return false;
            }
            if (!formData?.email || formData?.email?.trim() === '') {
                showErrorAlert('Email required');
                return false;
            } else if (!emailRegex.test(formData?.email)) {
                showErrorAlert("Please enter valid email");
                return false;
            }
            if (!resume) {
                showErrorAlert("Resume required");
                return false;
            }
            return true
        } else if (no === 2) {
            if (educations.length > 0) {
                const hasError = educations.some((item, index) => {
                    if (!item?.schoolName || item?.schoolName?.trim() === '') {
                        showErrorAlert(`School Name is required in ${index + 1} education detail`);
                        return true;
                    }
                    if (!item?.schoolType || item?.schoolType?.value?.trim() === '') {
                        showErrorAlert(`School Type is required in ${index + 1} education detail`);
                        return true;
                    }
                    if (!item?.schoolCity || item?.schoolCity?.trim() === '') {
                        showErrorAlert(`School City is required in ${index + 1} education detail`);
                        return true;
                    }
                    if (!item?.schoolState || item?.schoolState?.value?.trim() === '') {
                        showErrorAlert(`School state is required in ${index + 1} education detail`);
                        return true;
                    }
                    if (!item?.degreeDiploma || item?.degreeDiploma?.trim() === '') {
                        showErrorAlert(`Degree/Diploma is required in ${index + 1} education detail`);
                        return true;
                    }
                    if (!item?.graduateDate) {
                        showErrorAlert(`Graduate Date is required in ${index + 1} education detail`);
                        return true;
                    }
                    return false;
                });
                if (hasError) {
                    return false;
                }
            }
            return true;
        } else if (no === 3) {
            if (additionalCertifications.length > 0) {
                const hasError = additionalCertifications.some((item, index) => {
                    if (!item?.certificateURL || item?.certificateURL?.trim() === '') {

                        showErrorAlert(`Certificate URL is required in ${index + 1} certificate detail`);
                        return true;
                    }
                    if (!item?.expirationDate) {
                        showErrorAlert(`Expiration Date is required in ${index + 1} certificate detail`);
                        return true;
                    }
                    return false;
                });

                if (hasError) {
                    return false;
                }
            }
            return true;
        } else if (no === 4) {
            if (licenses.length > 0) {
                const hasError = licenses.some((item, index) => {
                    if (!item?.state || item?.state?.value?.trim() === '') {
                        showErrorAlert(`State is required in ${index + 1} Licenses detail`);
                        return true;
                    }
                    if (!item?.issuedDate) {
                        showErrorAlert(`Issued Date is required in ${index + 1} Licenses detail`);
                        return true;
                    }
                    if (!item?.expirationDate) {
                        showErrorAlert(`Expiration Date is required in ${index + 1} Licenses detail`);
                        return true;
                    }
                    return false;
                });

                if (hasError) {
                    return false;
                }
            }
            return true;
        } else if (no === 5) {
            if (experiences.length > 0) {
                const hasError = experiences.some((item, index) => {
                    if (!item?.speciality || item?.speciality?.trim() === '') {
                        showErrorAlert(`Speciality is required in ${index + 1} Experiences detail`);
                        return true;
                    }
                    if (!item?.yearOFExperience || item?.yearOFExperience?.trim() === '') {
                        showErrorAlert(`Year OF Experience is required in ${index + 1} Experiences detail`);
                        return true;

                    }
                    return false;
                });

                if (hasError) {
                    return false;
                }
            }
            if (formData?.drugScreen !== "true" && formData?.drugScreen !== "false") {
                showErrorAlert('Please answer the Drug Screen question');
                return false;
            }
            if (formData?.criminalBackgroundCheck !== "true" && formData?.criminalBackgroundCheck !== "false") {
                showErrorAlert('Please answer the Criminal Background Check question');
                return false;
            }
            if (formData?.actionLimitaions !== "true" && formData?.actionLimitaions !== "false") {
                showErrorAlert('Please answer the Action Limitaions question');
                return false;
            }
            if (formData?.actionLimitaions === "true") {
                if (!formData?.limitationDescription || formData?.limitationDescription?.length < 10) {
                    showErrorAlert('Please write the Description atleast 10 length of char');
                    return false;
                }
            }
            return true;
        } else {
            if (prevEmployements.length > 0) {
                const hasError = prevEmployements.some((item, index) => {
                    if (!item?.facility || item?.facility?.trim() === '') {
                        showErrorAlert(`Facility is required in ${index + 1} Previous Employements detail`);
                        return true;
                    }
                    if (!item?.department || item?.department?.trim() === '') {
                        showErrorAlert(`Department is required in ${index + 1} Previous Employements detail`);
                        return true;
                    }
                    if (!item?.supervisiorName || item?.supervisiorName?.trim() === '') {
                        showErrorAlert(`Supervisior Name is required in ${index + 1} Previous Employements detail`);
                        return true;
                    }
                    if (!item?.startDate) {
                        showErrorAlert(`Start Date is required in ${index + 1} Previous Employements detail`);
                        return true;
                    }
                    if (!item?.endDate) {
                        showErrorAlert(`End Date is required in ${index + 1} Previous Employements detail`);
                        return true;
                    }
                    if (!item?.city || item?.city?.trim() === '') {
                        showErrorAlert(`City is required in ${index + 1} Previous Employements detail`);
                        return true;
                    }
                    if (!item?.state || item?.state?.value?.trim() === '') {
                        showErrorAlert(`State is required in ${index + 1} Previous Employements detail`);
                        return true;
                    }
                    if (!item?.hours || item?.hours?.trim() === '') {
                        showErrorAlert(`Hours is required in ${index + 1} Previous Employements detail`);
                        return true;

                    }
                    return false;
                });

                if (hasError) {
                    return false;
                }
            }

            if (!formData?.termsConditionAgreed) {
                showErrorAlert('Please accept terms & condition before sumbit');
                return false;
            }
            return true;
        }
    }

    const handleNext = (e) => {
        e.preventDefault();
        if (!isFormValid(step)) return;
        setStep(step + 1);
    };

    const handlePrevious = (e) => {
        e.preventDefault();
        setStep(step - 1);
    };

    const handleAddEducation = (e) => {
        e.preventDefault();
        try {
            let prevData = educations;
            let newData = [...prevData, {
                schoolName: "",
                schoolType: null,
                schoolCity: "",
                schoolState: null,
                degreeDiploma: "",
                graduateDate: null
            }];
            setEducation(newData);
        } catch (error) {
            console.error(error);
        }
    }

    const handleEducationFieldChange = (e, fieldName, index) => {
        try {
            let newData = [...educations];
            if (fieldName === 'schoolType' || fieldName === 'schoolState' || fieldName === 'graduateDate') {
                newData[index][fieldName] = e;
            } else {
                newData[index][fieldName] = e.target.value;
            }
            setEducation(newData);
        } catch (error) {
            console.error(error);
        }
    }

    const handleAddCertification = (e) => {
        e.preventDefault();
        try {
            let prevData = additionalCertifications;
            let newData = [...prevData, {
                certificateURL: "",
                expirationDate: null
            }];
            setAdditionalCertifications(newData);
        } catch (error) {
            console.error(error);
        }
    }

    const handleCertificationFieldChange = (e, fieldName, index) => {
        try {
            let newData = [...additionalCertifications];
            if (fieldName === 'expirationDate') {
                newData[index][fieldName] = e;
            } else newData[index][fieldName] = e.target.value;
            setAdditionalCertifications(newData);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddLicence = (e) => {
        e.preventDefault();
        try {
            let prevData = licenses;
            let newData = [...prevData, {
                state: null,
                issuedDate: null,
                expirationDate: null
            }];
            setLicenses(newData);
        } catch (error) {
            console.error(error);
        }
    }

    const handleLicenseFieldChange = (e, fieldName, index) => {
        try {
            let newData = [...licenses];
            if (fieldName === 'state' || fieldName === 'issuedDate' || fieldName === 'expirationDate') {
                newData[index][fieldName] = e;
            } else {
                newData[index][fieldName] = e.target.value;
            }
            setLicenses(newData);
        } catch (error) {
            console.error(error);
        }
    }

    const handleAddExperience = (e) => {
        e.preventDefault();
        try {
            let newData = [...experiences, {
                speciality: "",
                yearOFExperience: ""
            }];
            setExperiences(newData);
        } catch (error) {
            console.error(error);
        }
    }

    const handleExperienceFieldChange = (e, fieldName, index) => {
        try {
            let newData = [...experiences];
            newData[index][fieldName] = e.target.value;
            setExperiences(newData);
        } catch (error) {
            console.error(error);
        }
    }

    const handleAddPrevEmployment = (e) => {
        e.preventDefault();
        try {
            let newData = [...prevEmployements, {
                facility: "",
                department: "",
                supervisiorName: "",
                startDate: null,
                endDate: null,
                city: "",
                state: null,
                hours: ""
            }];
            setPrevEmployment(newData);
        } catch (error) {
            console.error(error);
        }
    }


    const handlePrevEmploymentFieldChange = (e, fieldName, index) => {
        try {
            let newData = [...prevEmployements];
            if (fieldName === 'state' || fieldName === 'startDate' || fieldName === 'endDate') {
                newData[index][fieldName] = e;
            } else {
                newData[index][fieldName] = e.target.value;
            }
            setPrevEmployment(newData);
        } catch (error) {
            console.error(error);
        }
    }

    const validatePhoneNumber = (value) => {
        const phoneNumber = parsePhoneNumberFromString(value);
        if (phoneNumber && phoneNumber.isValid()) {
            return true;
        } else {
            return false;
        }
    };

    const handleFormSubmit = async (event) => {
        try {
            event.preventDefault();
            if (!isFormValid()) return;

            setIsLoading(true);

            let fileName = (resume) ? createUniqueS3FilenameWithDate(resume?.name) : null;
            if (fileName) {
                let res = await handleFileUpload(resume, fileName, resume?.type);
                if (!res) {
                    showErrorAlert('Failed to upload resume');
                    return;
                }

                let response = await Instance.post('/addNewMedia', {
                    content: fileName,
                    contentType: resume.type,
                    originalName: resume?.name,
                    contentDescription: `Resume is uploaded by ${formData.firstName} ${formData.lastName} and email is ${formData?.email}`,
                    uploadedFrom: 'Full Application'
                }, {});
            }

            let body = {
                jobId: null,
                basicInfo: {
                    firstName: formData?.firstName,
                    middleName: formData?.middleName,
                    lastName: formData?.lastName,
                    mobileNumber: formData?.mobileNumber,
                    email: formData?.email,
                    dateOfBirth: formData?.dateOfBirth,
                    category: category?.value || '',
                    speciality: speciality?.value || '',
                    certifications: certifications?.map(item => item.value) || [],
                    stateLicenses: stateLicenses?.map(item => item.value) || [],
                    mailingAddress: formData?.mailingAddress,
                    city: formData?.city,
                    state: state?.value,
                    zipCode: formData?.zipCode,
                    alternateMobileNumber: formData?.alternateMobileNumber,
                    bestTimeToCall: formData?.bestTimeToCall,
                    resume: fileName,
                    referredBy: formData?.referredBy
                },

                educations: educations?.map(item => ({
                    ...item,
                    schoolType: item?.schoolType?.value ? item?.schoolType?.value : item?.schoolType,
                    schoolState: item?.schoolState?.value ? item?.schoolState?.value : item?.schoolState
                })),

                certifications: additionalCertifications,

                licences: licenses?.map(item => ({
                    ...item,
                    state: item?.state?.value ? item?.state?.value : item?.state
                })),

                experiences: experiences,

                drugScreen: formData?.drugScreen,
                criminalBackgroundCheck: formData?.criminalBackgroundCheck,
                actionLimitaions: formData?.actionLimitaions,
                limitationDescription: formData?.limitationDescription,

                prevEmployements: prevEmployements?.map(item => ({
                    ...item,
                    state: item?.state?.value ? item?.state?.value : item?.state
                })),

                termsConditionAgreed: formData?.termsConditionAgreed,
                sourcePage: "Join Full Application"
            };

            const response = await (alreadyApplicant
                ? Instance.put(`/editApplication/${appId}`, body, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                : Instance.post('/addApplication', body, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
            );
            // const response = await Instance.post('/addApplication', body, {});
            if (response.status === 201 || 200) {
                showSuccessAlert(response?.data?.message);
                ResetForm();
                navigate(`/search-jobs?jobtitle=&location=&longitude=&latitude=&radius=&regionCategory=`);
            }
        } catch (error) {
            showErrorAlert("An error occured");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const getHeading = () => {
        switch (step) {
            case 1:
                return 'Personal Details';
            case 2:
                return 'Education Details';
            case 3:
                return 'Certifications';
            case 4:
                return 'Licenses';
            case 5:
                return 'Pre-Employment Screening';
            case 6:
                return 'Past Employment';
        }
    }


    return (
        <>
            {isLoading && <div className="keyword-loader">
                <Spin size="large" className="custom-loader" />
            </div>
            }
            <Form onSubmit={handleFormSubmit}>
                <h2 style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '20px' }}>{getHeading()}</h2>
                {step === 1 && (
                    <div className="row g-3 mt-2" controlid="formStep1">
                        {/* <h3>Full Application</h3> */}
                        <div className="col-md-6">
                            <label htmlFor="inputfirstName" className="form-label">Legal First name*</label>
                            <input type="text" className="form-control" required id="inputfirstName"
                                placeholder='Enter First Name'
                                value={formData?.firstName}
                                name='firstName'
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputmiddleName" className="form-label">Legal Middle name</label>
                            <input type="text" className="form-control" id="inputmiddleName"
                                placeholder='Enter Middle Name'
                                value={formData?.middleName}
                                name='middleName'
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputlastName" className="form-label">Legal Last name*</label>
                            <input type="text" className="form-control" required id="inputlastName"
                                placeholder='Enter Last Name'
                                value={formData?.lastName}
                                name='lastName'
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputBirthday" className="form-label">Birthday*</label>
                            <DatePicker
                                onChange={(date) => {
                                    setFormData(values => ({ ...values, ['dateOfBirth']: date }))
                                }}
                                value={formData?.dateOfBirth || null}
                                className="expiration-date-picker form-control"
                                style={{ width: '100%' }}
                                placeholder="Date of Birth"
                                format={'MM/DD/YYYY'}
                                maxDate={dayjs(new Date())}
                            />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="inputCategory" className="form-label">
                                Category*
                            </label>
                            <Select
                                placeholder="Select Category"
                                id="inputCategory"
                                options={categoryOptions}
                                value={category}
                                onChange={(e) => setCategory(e)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputSpeciality" className="form-label">
                                Speciality*
                            </label>
                            <Select
                                placeholder="Select Speciality"
                                id="inputSpeciality"
                                isDisabled={!category}
                                options={specialityOptions}
                                value={speciality}
                                onChange={(e) => setSpeciality(e)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputcertification" className="form-label">Select Certifications</label>
                            <Select
                                placeholder="Select Certifications"
                                isMulti
                                options={certificationOptions}
                                value={certifications}
                                onChange={(e) => setCertifications(e)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputState" className="form-label">State Licences</label>
                            <Select
                                placeholder="Select Licenses"
                                isMulti
                                options={stateLicenceOptions}
                                value={stateLicenses}
                                onChange={(e) => setStateLicenses(e)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputmailAddress" className="form-label">Mailing Address</label>
                            <input type="text" className="form-control" id="inputmailAddress"
                                placeholder='Enter Mailing Address'
                                value={formData?.mailingAddress}
                                name='mailingAddress'
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputcity" className="form-label">City*</label>
                            <input type="text" className="form-control" id="inputcity"
                                placeholder='Enter City'
                                value={formData?.city}
                                name='city'
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="inputZip" className="form-label">State</label>
                            <Select
                                placeholder="Select State"
                                options={stateLicenceOptions}
                                value={state}
                                onChange={(e) => setSelectedState(e)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputcity" className="form-label">Zip*</label>
                            <input type="text" className="form-control" id="inputcity"
                                placeholder='Enter ZipCode'
                                value={formData?.zipCode}
                                name='zipCode'
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputPhone" className="form-label">Mobile Phone*</label>
                            <PhoneInput
                                defaultCountry="us"
                                value={formData?.mobileNumber}
                                onChange={(phone) => {
                                    setFormData(values => ({ ...values, ["mobileNumber"]: phone }))
                                }}
                                inputStyle={{ width: '100%' }}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputAlternativePhone" className="form-label">Alternative Mobile Phone</label>
                            <PhoneInput
                                defaultCountry="us"
                                value={formData?.alternateMobileNumber}
                                onChange={(phone) => {
                                    setFormData(values => ({ ...values, ["alternateMobileNumber"]: phone }))
                                }}
                                inputStyle={{ width: '100%' }}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputtimetocall" className="form-label">Best Time To Call</label>
                            <input type="text" className="form-control" id="inputtimetocall"
                                placeholder='Enter Call Time'
                                value={formData?.bestTimeToCall}
                                name='bestTimeToCall'
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputEmail" className="form-label">Email*</label>
                            <input type="email" className="form-control" id="inputEmail"
                                placeholder='Enter Email'
                                value={formData?.email}
                                name='email'
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputrefferedBy" className="form-label">Reffered By</label>
                            <input type="text" className="form-control" id="inputrefferedBy"
                                placeholder='Referred By'
                                value={formData?.referredBy}
                                name='referredBy'
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputResume" className="form-label"
                                placeholder='Enter Mobile Number'
                            >Upload Your Resume *</label>
                            <div className='resume-container'>
                                <div className='resume-btn-form'>
                                    Choose File
                                    <input type="file" className="form-control mb-2" style={{ opacity: 0 }} id="inputResume" onChange={handleResumeSelect} />
                                </div>

                                {resume && <p>{resume.name}</p>}
                            </div>
                            <p style={{ fontSize: "12px" }}>Accepted file types include Word document (.doc, .docx), a PDF created from a text file (not scanned in as an image), or a plain .txt, .rtf, .html, or .odt file.</p>
                        </div>
                        <div className="d-flex justify-content-end"> {/* Align button to the right */}
                            <button variant="primary" className="btn-sign-up" onClick={handleNext}>
                                Next
                            </button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="row g-3 mt-2" controlid="formStep2">
                        {/* <h3>Schools</h3> */}
                        {educations.map((item, index) => (
                            <>
                                <div className="col-md-6">
                                    <label htmlFor="inputSchoolName" className="form-label">School name*</label>
                                    <input type="text" className="form-control" id="inputSchoolName"
                                        placeholder='Enter School Name'
                                        name='schoolName'
                                        value={item?.schoolName}
                                        onChange={(e) => handleEducationFieldChange(e, 'schoolName', index)}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="inputSchoolType" className="form-label">School Type*</label>
                                    <Select
                                        placeholder='Select School Type'
                                        options={schoolTypeOptions}
                                        value={item?.schoolType}
                                        onChange={(e) => handleEducationFieldChange(e, 'schoolType', index)}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="inputSchoolcity" className="form-label">City*</label>
                                    <input type="text" className="form-control" id="inputSchoolcity"
                                        placeholder='Enter City'
                                        name='schoolCity'
                                        value={item?.schoolCity}
                                        onChange={(e) => handleEducationFieldChange(e, 'schoolCity', index)}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="inputSchoolState" className="form-label">State*</label>
                                    <Select
                                        placeholder='Select State'
                                        options={stateLicenceOptions}
                                        value={item?.schoolState}
                                        onChange={(e) => handleEducationFieldChange(e, 'schoolState', index)}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="inputDegree" className="form-label">Degree/Diploma*</label>
                                    <input type="text" className="form-control" id="inputDegree"
                                        placeholder='Enter Degree/Diploma'
                                        name='degreeDiploma'
                                        value={item?.degreeDiploma}
                                        onChange={(e) => handleEducationFieldChange(e, 'degreeDiploma', index)} />
                                </div>
                                <div className="col-md-6 mb-4">
                                    <label htmlFor="inputdateGraduated" className="form-label">Date Graduated*</label>
                                    <DatePicker
                                        onChange={(date) => {
                                            handleEducationFieldChange(date, 'graduateDate', index);
                                        }}
                                        value={item?.graduateDate || null}
                                        className="expiration-date-picker form-control"
                                        style={{ width: '100%' }}
                                        placeholder="Enter Graduation Date"
                                        format={'MM/DD/YYYY'}
                                    />
                                </div>
                                <div>
                                    <FaTrash onClick={() => {
                                        let prevEdu = educations.filter((_, i) => i !== index);
                                        setEducation(prevEdu);
                                    }} />
                                </div>
                            </>
                        ))}

                        <div className="d-flex justify-content-between">
                            <button variant="secondary" className='btn-add-more' onClick={handleAddEducation}>
                                Add More
                            </button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="row g-3 mt-2" controlid="formStep3">
                        {/* <h3>Certifications</h3> */}
                        {additionalCertifications.map((item, index) => (<>
                            <div className="col-md-6">
                                <label htmlFor="inputCertficate1" className="form-label">Certificate Url*</label>
                                <input type="text" className="form-control" id="inputCertficate1"
                                    placeholder='Enter Certificate Url'
                                    name="certificateURL"
                                    value={item?.certificateURL}
                                    onChange={(e) => handleCertificationFieldChange(e, "certificateURL", index)}
                                />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="inputlicenceExpiry1" className="form-label">Expiration Date*</label>
                                <DatePicker
                                    onChange={(e) => handleCertificationFieldChange(e, "expirationDate", index)}
                                    value={item?.expirationDate || null}
                                    className="expiration-date-picker form-control"
                                    style={{ width: '100%' }}
                                    placeholder="Enter Expiration Date"
                                    format={'MM/DD/YYYY'}
                                />
                            </div>
                            <div>
                                <FaTrash onClick={() => {
                                    let prevEdu = additionalCertifications.filter((_, i) => i !== index);
                                    setAdditionalCertifications(prevEdu);
                                }} />
                            </div>
                        </>
                        ))}

                        <div className="d-flex justify-content-between">
                            <button variant="secondary" className='btn-add-more' onClick={handleAddCertification}>
                                Add More
                            </button>
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="row g-3 mt-2" controlid="formStep3">
                        {/* <h3>Licences</h3> */}
                        {licenses.map((item, index) => (
                            <>
                                <div className="col-md-4">
                                    <label htmlFor="inputLicenceState" className="form-label">State*</label>
                                    <Select
                                        placeholder='Select State'
                                        options={stateLicenceOptions}
                                        value={item?.state}
                                        onChange={(e) => handleLicenseFieldChange(e, "state", index)}
                                    />
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="inputlicenceExpiry1" className="form-label">Issued Date*</label>
                                    <DatePicker
                                        onChange={(e) => handleLicenseFieldChange(e, "issuedDate", index)}
                                        value={item?.issuedDate || null}
                                        className="expiration-date-picker form-control"
                                        style={{ width: '100%' }}
                                        placeholder="Enter Issued Date"
                                        format={'MM/DD/YYYY'}
                                    />
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="inputlicenceExpiry1" className="form-label">Expiration Date*</label>
                                    <DatePicker
                                        onChange={(e) => handleLicenseFieldChange(e, "expirationDate", index)}
                                        value={item?.expirationDate || null}
                                        className="expiration-date-picker form-control"
                                        style={{ width: '100%' }}
                                        placeholder="Enter Expiration Date"
                                        format={'MM/DD/YYYY'}
                                    />
                                </div>


                                <div>
                                    <FaTrash onClick={() => {
                                        let prevEdu = licenses.filter((_, i) => i !== index);
                                        setLicenses(prevEdu);
                                    }} />
                                </div>
                            </>
                        ))}

                        <div className="d-flex justify-content-between">
                            <button variant="secondary" className='btn-add-more' onClick={handleAddLicence}>
                                Add More
                            </button>
                        </div>

                    </div>
                )}

                {step === 5 && (
                    <div className="row g-3 mt-2" controlid="formStep3">
                        {/* <h3>Pre-Employment Screening</h3> */}
                        {experiences.map((item, index) => (
                            <>
                                <div className="col-md-6 ">
                                    <label htmlFor="inputSpeciality1" className="form-label">Speciality*</label>
                                    <input type="text" className="form-control" id="inputSpeciality1"
                                        placeholder='Enter Speciality'
                                        name="speciality"
                                        value={item?.speciality}
                                        onChange={(e) => handleExperienceFieldChange(e, "speciality", index)} />
                                </div>

                                <div className="col-md-6 ">
                                    <label htmlFor="inputExperience1" className="form-label">Years Of Experience*</label>
                                    <input type="text" className="form-control" id="inputExperience1"
                                        placeholder='Enter Years of Experience'
                                        name="yearOFExperience"
                                        value={item?.yearOFExperience}
                                        onChange={(e) => handleExperienceFieldChange(e, "yearOFExperience", index)} />
                                </div>
                                <div>
                                    <FaTrash onClick={() => {
                                        let prevEdu = experiences.filter((_, i) => i !== index);
                                        setExperiences(prevEdu);
                                    }} />
                                </div>
                            </>
                        ))}
                        <div className="d-flex justify-content-between">
                            <button variant="secondary" className='btn-add-more' onClick={handleAddExperience}>
                                Add More
                            </button>
                        </div>

                        <div className="col-md-6" style={{ marginRight: "4rem" }}>
                            <label htmlFor="drugScreen" className="form-label">Are you willing to submit to a drug screen?*</label>
                        </div>
                        <div className="col-md-2">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="drugScreen" id="inputDrugScreenYes1" value={true} checked={formData?.drugScreen === 'true'} onChange={handleChange} />
                                <label className="form-check-label" htmlFor="inputDrugScreenYes1">Yes</label>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="drugScreen" id="inputDrugScreenNo1" value={false} checked={formData?.drugScreen === 'false'} onChange={handleChange} />
                                <label className="form-check-label" htmlFor="inputDrugScreenNo1">No</label>
                            </div>
                        </div>
                        <div className="col-md-6" style={{ marginRight: "4rem" }}>
                            <label htmlFor="inputBackgroundCheck" className="form-label">Are you willing to submit to a criminal background check?*</label>
                        </div>
                        <div className="col-md-2">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="criminalBackgroundCheck" id="inputBackgroundCheckYes" value={true} checked={formData?.criminalBackgroundCheck === 'true'} onChange={handleChange} />
                                <label className="form-check-label" htmlFor="inputBackgroundCheckYes">Yes</label>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="criminalBackgroundCheck" id="inputBackgroundCheckNo" value={false} checked={formData?.criminalBackgroundCheck === 'false'} onChange={handleChange} />
                                <label className="form-check-label" htmlFor="inputBackgroundCheckNo">No</label>
                            </div>
                        </div>
                        <div className="col-md-6 " style={{ marginRight: "4rem" }}>
                            <label htmlFor="inputLimitations" className="form-label">Do you have any limitations that would restrict you from performing essential functions in the position for which you are applying?*</label>
                        </div>
                        <div className="col-md-2">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="actionLimitaions" id="inputLimitationsYes" value={true} checked={formData?.actionLimitaions === 'true'} onChange={handleChange} />
                                <label className="form-check-label" htmlFor="inputLimitationsYes">Yes</label>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="actionLimitaions" id="inputLimitationsNo" value={false} checked={formData?.actionLimitaions === 'false'} onChange={handleChange} />
                                <label className="form-check-label" htmlFor="inputLimitationsNo">No</label>
                            </div>
                        </div>
                        <div className="col-md-12 mb-4">
                            <label htmlFor="inputSpeciality1" className="form-label">If YES, please provide a detailed explanation.</label>
                            <textarea className="form-control" id="inputSpeciality1" rows="4" name='limitationDescription' value={formData?.limitationDescription} onChange={handleChange}></textarea>
                        </div>
                    </div>
                )}
                {step === 6 && (
                    <div className="row g-3 mt-2" controlid="formStep3">
                        {/* <h3>Past Employment</h3> */}
                        {prevEmployements.map((item, index) => (
                            <>
                                <div className="col-md-6 ">
                                    <label htmlFor="inputFacility1" className="form-label">Facility*</label>
                                    <input type="text" className="form-control" id="inputFacility1"
                                        placeholder='Enter Facility'
                                        name="facility"
                                        value={item?.facility}
                                        onChange={(e) => handlePrevEmploymentFieldChange(e, "facility", index)} />
                                </div>

                                <div className="col-md-6 ">
                                    <label htmlFor="inputDepartment1" className="form-label">Department*</label>
                                    <input type="text" className="form-control" id="inputDepartment1"
                                        placeholder='Enter Department'
                                        name="department"
                                        value={item?.department}
                                        onChange={(e) => handlePrevEmploymentFieldChange(e, "department", index)} />
                                </div>
                                <div className="col-md-6 ">
                                    <label htmlFor="inputSupervisor1" className="form-label">Supervisor's Name*</label>
                                    <input type="text" className="form-control" id="inputSupervisor1"
                                        placeholder="Enter Supervisor's Name"
                                        name="supervisiorName"
                                        value={item?.supervisiorName}
                                        onChange={(e) => handlePrevEmploymentFieldChange(e, "supervisiorName", index)} />
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="inputStartDate1" className="form-label">Start Date*</label>
                                    <DatePicker
                                        onChange={(e) => handlePrevEmploymentFieldChange(e, "startDate", index)}
                                        value={item?.startDate || null}
                                        className="expiration-date-picker form-control"
                                        style={{ width: '100%' }}
                                        placeholder="Enter Start Date"
                                        format={'MM/DD/YYYY'}
                                    />
                                </div>


                                <div className="col-md-6">
                                    <label htmlFor="inputEndDate1" className="form-label">End Date*</label>
                                    <DatePicker
                                        onChange={(e) => handlePrevEmploymentFieldChange(e, "endDate", index)}
                                        value={item?.endDate || null}
                                        className="expiration-date-picker form-control"
                                        style={{ width: '100%' }}
                                        placeholder="Enter End Date"
                                        format={'MM/DD/YYYY'}
                                    />
                                </div>

                                <div className="col-md-6  ">
                                    <label htmlFor="inputCity1" className="form-label">City*</label>
                                    <input type="text" className="form-control" id="inputCity1"
                                        placeholder='Enter City'
                                        name="city"
                                        value={item?.city}
                                        onChange={(e) => handlePrevEmploymentFieldChange(e, "city", index)} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="inputState1" className="form-label">State*</label>
                                    <Select
                                        placeholder="Select State"
                                        options={stateLicenceOptions}
                                        value={item?.state}
                                        onChange={(e) => handlePrevEmploymentFieldChange(e, 'state', index)}
                                    />
                                </div>
                                <div className="col-md-6 mb-4 ">
                                    <label htmlFor="inputHours1" className="form-label">Hours*</label>
                                    <input type="text" className="form-control" id="inputHours1"
                                        placeholder='Enter Hours'
                                        name="hours"
                                        value={item?.hours}
                                        onChange={(e) => handlePrevEmploymentFieldChange(e, "hours", index)} />
                                </div>
                                <div>
                                    <FaTrash onClick={() => {
                                        let prevEdu = prevEmployements.filter((_, i) => i !== index);
                                        setPrevEmployment(prevEdu);
                                    }} />
                                </div>
                            </>
                        ))}

                        <div className="d-flex justify-content-between">
                            <button variant="secondary" className='btn-add-more' onClick={handleAddPrevEmployment}>
                                Add More
                            </button>
                        </div>

                        <div className='col-md-12'>
                            <p style={{ fontSize: "12px" }}>I certify that all statements made in this application are true to the best of my knowledge. I understand that all falsification or misleading information given in my application may result in the termination of my employment with Fusion Medical Staffing. Furthermore, I understand that my professional conduct and clinical performance is directly related to my ability to be placed on assignments for Fusion Medical Staffing and that I will adhere to all expectations set forth in the employee handbook. I authorization Fusion Medical Staffing to verify the information I have provided, to contact references, and to conduct a criminal background check concerning my qualifications and past employment record. I understand that nothing contained in this application is intended to create an employment contract, either verbal or written, with Fusion Medical Staffing or its clients. Furthermore, I understand that in the event of my employment, it is "at will" and Fusion Medical Staffing or I may terminate my employment at any time with or without notice and with or without case.</p>
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="inputTerms" className="form-label">Terms*</label>
                        </div>
                        <div className="col-md-6 mb-4">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="inputTerms" name='termsConditionAgreed' value={formData?.termsConditionAgreed} checked={formData?.termsConditionAgreed} onChange={handleChange} />
                                <label className="form-check-label" htmlFor="inputTerms">I agree to the terms</label>
                            </div>
                        </div>
                    </div>

                )}

                {step > 1 && (
                    <div className="d-flex justify-content-between">
                        <button variant="secondary" className='btn-log-in' onClick={handlePrevious}>
                            Previous
                        </button>
                        {step < 6 ? (
                            <button variant="primary" type='submit' className="btn-sign-up" onClick={handleNext}>
                                Next
                            </button>
                        ) : (
                            <button variant="primary" className="btn-sign-up" type="submit">
                                {alreadyApplicant ? 'Update' : 'Submit'}
                            </button>
                        )}
                    </div>
                )}

            </Form>
        </>
    );
};

export default MultiStepForm;