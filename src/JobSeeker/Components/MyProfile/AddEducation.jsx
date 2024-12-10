import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, DatePicker, Radio } from "antd";
import { MdDeleteOutline } from "react-icons/md";
import Instance from "../../../AxiosConfig";
import Loader from "../../../Loader";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetail } from "../../../features/profileSlice";
import { showErrorAlert, showSuccessAlert } from "../../../globalConstant";
import dayjs from "dayjs";

const degreeOption = [{
  label: "High School",
  value: "High School"
}, {
  label: "Diploma",
  value: "Diploma"
}, {
  label: "Bachelor",
  value: "Bachelor"
}, {
  label: "Master",
  value: "Master"
}, {
  label: "PhD",
  value: "PhD"
}, {
  label: "Other",
  value: "Other"
}];

const specializationOptions = [
  { value: "Computer Science", label: "Computer Science" },
  { value: "Softaware Engineering", label: "Software Engineering" }];

const gradeSystemOption = [
  { value: "CGPA(5.0", label: "CGPA(5.0" },
  { value: "CGPA(10.0)", label: "CGPA(10.0)" },
  { value: "Percentage", label: "Percentage" }
]

export const AddEducation = ({ onCancel }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userDetail = useSelector((state) => state.profile.userDetail);
  const loggedInUserInfo = JSON.parse(localStorage.getItem("loggedInUserInfo"));

  useEffect(() => {
    if (!userDetail) return;
    let edData = [];
    for (let i = 0; i < userDetail?.education?.length; i++) {
      edData.push({
        key: i + 1,
        ...userDetail?.education[i],
        startDate: userDetail?.education[i]?.startDate ? dayjs(userDetail?.education[i]?.startDate) : null,
        endDate: userDetail?.education[i]?.endDate ? dayjs(userDetail?.education[i]?.endDate) : null
      });
    }
    setFormData(edData);
  }, [userDetail]);

  useEffect(() => {
    if (formData) {
      form.setFieldsValue({
        education: formData.reduce((acc, edu) => {
          acc[edu.key] = edu;
          return acc;
        }, {}),
      });
    }
  }, [formData, form]);

  const handleRemoveEducation = (key) => {
    setFormData(formData.filter((cert) => cert.key !== key));
  };

  const handleFormSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await Instance.put(`/editUserProfileDetail/${loggedInUserInfo?.userId}`, { education: formData }, {
        headers: {
          Authorization: `Bearer ${loggedInUserInfo?.token}`,
        },
      });
      if (response.status === 200) {
        dispatch(setUserDetail(response?.data?.userDetail));
        showSuccessAlert('Education updated successfully');
        handleCloseModal();
      }
    } catch (error) {
      console.error(error);
      showErrorAlert('An error occured');
    } finally {
      setIsLoading(false);
    }
  }

  const handleCloseModal = () => {
    setFormData([]);
    onCancel();
  };

  return (
    <>
      {isLoading && <Loader />}
      <Modal visible={true} onCancel={handleCloseModal} footer={null} width={800}>
        <div className="edit-employement-form">
          <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
            <h4>Education </h4>
            <p>
              Details like course, university, and more, help recruiters identify your educational background
            </p>
            {formData?.map((education, index) => (
              <div key={index} className="education-section">
                <div className="d-flex justify-content-between ">
                  <h5>Employment {index + 1}</h5>
                  {formData.length >= 1 && (
                    <h6 className="icon-red" onClick={() => handleRemoveEducation(education.key)}>
                      <MdDeleteOutline /> Delete
                    </h6>
                  )}
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <Form.Item
                      label="University/Institute"
                      name={["education", education.key, "universityName"]}
                      className="add-profile-form"
                      rules={[
                        { required: true, message: "Please enter your University!" },
                      ]}
                    >
                      <Input placeholder="Enter Your University/Institute" value={education?.university} onChange={(e) => { let data = [...formData]; data[index].universityName = e.target.value; setFormData(data); }} />
                    </Form.Item>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <Form.Item
                      label="Degree"
                      name={["education", education.key, "degree"]}
                      className="add-profile-form"
                      rules={[
                        { required: true, message: "Please enter your Degree!" },
                      ]}
                    >
                      <Select placeholder="Select Degree" value={education?.degree} onChange={(e) => { let data = [...formData]; data[index].degree = e; setFormData(data); }} options={degreeOption} />
                    </Form.Item>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <Form.Item
                      label="Field of Study"
                      name={["education", education.key, "fieldOfStudy"]}
                      className="add-profile-form"
                      rules={[
                        { required: true, message: "Please enter your Field of Study!" },
                      ]}
                    >
                      <Select placeholder="Field of Study" value={education?.fieldOfStudy} onChange={(e) => { let data = [...formData]; data[index].fieldOfStudy = e; setFormData(data); }} options={specializationOptions} />
                    </Form.Item>
                  </div>
                </div>
                <h4 style={{ fontSize: "16px" }}>Course Duration</h4>
                <div className="row">
                  <div className="col-lg-6">
                    <Form.Item
                      name={["education", education.key, "startDate"]}
                      className="add-profile-form"
                      rules={[
                        {
                          required: true,
                          message: "Please enter start date!",
                        },
                      ]}
                    >
                      <DatePicker style={{ width: "100%" }} placeholder="Select Start Date" value={education?.startDate} onChange={(e) => { let data = [...formData]; data[index].startDate = e; setFormData(data); }} />
                    </Form.Item>
                  </div>
                  <div className="col-lg-6">
                    <Form.Item
                      name={["education", education.key, "endDate"]}
                      className="add-profile-form"
                      rules={[
                        {
                          required: true,
                          message: "Please enter end date!",
                        },
                      ]}
                    >
                      <DatePicker style={{ width: "100%" }} placeholder="Select End Date" value={education?.endDate} onChange={(e) => { let data = [...formData]; data[index].endDate = e; setFormData(data); }} />
                    </Form.Item>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <Form.Item
                      label="Course Type"
                      name={["education", education.key, "courseType"]}
                      className="add-profile-form"
                      rules={[
                        { required: true, message: "Please select your course type!" },
                      ]}
                    >
                      <Radio.Group value={education?.courseType} onChange={(e) => { let data = [...formData]; data[index].courseType = e.target.value; setFormData(data); }}>
                        <Radio value="Part-Time" checked={education?.courseType === "Part-Time"}>Part Time</Radio>
                        <Radio value="Full-Time" checked={education?.courseType === "Full-Time"}>Full Time</Radio>
                        <Radio value="Distance-Learning" checked={education?.courseType === "Distance-Learning"}>Distance Learning | Corrspondence</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <Form.Item
                      label="Grading System"
                      name={["education", education.key, "gradingSystem"]}
                      className="add-profile-form"
                      rules={[
                        { required: true, message: "Please select your Grading System!" },
                      ]}
                    >
                      <Select placeholder="Select Grade System" value={education?.gradingSystem} onChange={(e) => { let data = [...formData]; data[index].gradingSystem = e; setFormData(data); }} options={gradeSystemOption} />
                    </Form.Item>
                  </div>
                  <div className="col-lg-6">
                    <Form.Item
                      label="Enter Grade"
                      name={["education", education.key, "grade"]}
                      className="add-profile-form"
                      rules={[
                        { required: true, message: "Please enter your Grade!" },
                      ]}
                    >
                      <Input placeholder="Enter Your Grade" value={education?.grade} onChange={(e) => { let data = [...formData]; data[index].grade = e.target.value; setFormData(data); }} />
                    </Form.Item>
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              className="add-profile-education mt-4"
              onClick={() => {
                let data = [...formData];
                data.push({ key: Date.now(), universityName: "", degree: "", fieldOfStudy: "", startingYear: "", endingYear: "", courseType: "", gradingSystem: "", grade: "" });
                setFormData(data);
              }}
            >
              Add  Education
            </button>
            <div className="d-flex justify-content-end mt-4 gap-4">
              <button
                type="default"
                className="profile-discard-button"
                onClick={handleCloseModal}
                style={{ marginRight: 8 }}
              >
                Discard
              </button>
              <button
                type="primary"
                className="profile-save-button"
                htmlType="submit"
              >
                Save
              </button>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};
