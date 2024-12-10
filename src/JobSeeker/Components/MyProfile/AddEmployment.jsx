import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, DatePicker, Radio } from "antd";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Instance from "../../../AxiosConfig";
import Loader from "../../../Loader";
import { setUserDetail } from "../../../features/profileSlice";
import { showErrorAlert, showSuccessAlert } from "../../../globalConstant";
import dayjs from "dayjs";

const JobTypeOptions = [
  { value: "Part Time", label: "Part Time" },
  { value: "Full Time", label: "Full Time" },
  { value: 'Travel Contact', label: 'Travel Contact' },
  { value: 'Per Diem', label: 'Per Diem' },
  { value: "Internship", label: "Internship" },
  { value: "Contract", label: "Contract" }
];

export const AddEmployment = ({ onCancel }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userDetail = useSelector((state) => state.profile.userDetail);
  const loggedInUserInfo = JSON.parse(localStorage.getItem("loggedInUserInfo"));

  useEffect(() => {
    if (!userDetail) return;
    let empData = [];
    for (let i = 0; i < userDetail?.employmentHistory?.length; i++) {
      empData.push({
        key: i + 1,
        ...userDetail?.employmentHistory[i],
        joiningDate: userDetail?.employmentHistory[i]?.joiningDate ? dayjs(userDetail?.employmentHistory[i]?.joiningDate) : null,
        leavingDate: userDetail?.employmentHistory[i]?.leavingDate ? dayjs(userDetail?.employmentHistory[i]?.leavingDate) : null
      });
    }
    setFormData(empData);
  }, [userDetail]);

  useEffect(() => {
    if (formData) {
      form.setFieldsValue({
        employment: formData.reduce((acc, employment) => {
          acc[employment.key] = employment;
          return acc;
        }, {}),
      });
    }
  }, [formData, form]);

  const handleRemoveEmployment = (key) => {
    setFormData(formData.filter((employment) => employment.key !== key));
  };

  const handleFormSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await Instance.put(`/editUserProfileDetail/${loggedInUserInfo?.userId}`, { employmentHistory: formData }, {
        headers: {
          Authorization: `Bearer ${loggedInUserInfo?.token}`,
        },
      });
      if (response.status === 200) {
        dispatch(setUserDetail(response?.data?.userDetail));
        showSuccessAlert('Employment updated successfully');
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
        <div className="edit-employment-form">
          <Form form={form} onFinish={handleFormSubmit} layout="vertical">
            <h4>Employment</h4>
            <p>Details like job title, company name, etc, help employers understand your work.</p>
            {formData?.map((employment, index) => (
              <div key={index}>
                <div className="d-flex justify-content-between ">
                  <h5>Employment - {index + 1}</h5>
                  <h6 className="icon-red" onClick={() => handleRemoveEmployment(employment.key)}>
                    <MdDeleteOutline /> Delete
                  </h6>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <Form.Item
                      label="Is this your current employment?"
                      name={["employment", employment.key, "isCurrentEmployment"]} // Unique name per employment
                      className="add-profile-form"
                      rules={[
                        {
                          required: true,
                          message: "Please select your work status!",
                        },
                      ]}
                    >
                      <Radio.Group value={employment.isCurrentEmployment} onChange={(e) => {
                        let data = [...formData];
                        data[index].isCurrentEmployment = e.target.value;
                        setFormData(data);
                      }}>
                        <Radio value={true} checked={employment?.isCurrentEmployment}>Yes</Radio>
                        <Radio value={false} checked={!employment?.isCurrentEmployment}>No</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                  <div className="col-lg-6">
                    <Form.Item
                      label="Employment Type"
                      name={["employment", employment.key, "employmentType"]}
                      className="add-profile-form"
                      rules={[
                        {
                          required: true,
                          message: "Please select your employment type!",
                        },
                      ]}
                    >
                      <Select placeholder="Select Employment Type" options={JobTypeOptions} value={employment?.employmentType} onChange={(e) => { let data = [...formData]; data[index].employmentType = e; setFormData(data); }} />
                    </Form.Item>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <Form.Item
                      label="Employer Name"
                      name={["employment", employment.key, "companyName"]}
                      className="add-profile-form"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your Job title!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter your Job title" value={employment?.companyName} onChange={(e) => { let data = [...formData]; data[index].companyName = e.target.value; setFormData(data); }} />
                    </Form.Item>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <Form.Item
                      label="Job Title"
                      name={["employment", employment.key, "jobTitle"]}
                      className="add-profile-form"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your Job title!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter your Job title" value={employment?.jobTitle} onChange={(e) => { let data = [...formData]; data[index].jobTitle = e.target.value; setFormData(data); }} />
                    </Form.Item>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6">
                    <Form.Item
                      label="Joining date"
                      name={["employment", employment.key, "joiningDate"]}
                      className="add-profile-form"
                      rules={[
                        {
                          required: true,
                          message: "Please enter joining date!",
                        },
                      ]}
                    >
                      <DatePicker style={{ width: "100%" }} value={employment?.joiningDate} onChange={(e) => { let data = [...formData]; data[index].joiningDate = e; setFormData(data); }} />
                    </Form.Item>
                  </div>

                  {!employment?.isCurrentEmployment && <div className="col-lg-6">
                    <Form.Item
                      label="Leaving date"
                      name={["employment", employment.key, "leavingDate"]}
                      className="add-profile-form"
                      rules={[
                        {
                          required: true,
                          message: "Please enter leaving date!",
                        },
                      ]}
                    >
                      <DatePicker style={{ width: "100%" }} value={employment?.leavingDate} onChange={(e) => { let data = [...formData]; data[index].leavingDate = e; setFormData(data); }} />
                    </Form.Item>
                  </div>}

                  {employment?.isCurrentEmployment === true && <div className="col-lg-6">
                    <Form.Item
                      label="Current Salary"
                      name={["employment", employment.key, "currentSalary"]}
                      className="add-profile-form"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your current salary!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Your current salary" value={employment?.currentSalary} onChange={(e) => { let data = [...formData]; data[index].currentSalary = e.target.value; setFormData(data); }} />
                    </Form.Item>
                  </div>}
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <Form.Item
                      label="Role Description"
                      name={["employment", employment.key, "roleDescription"]}
                      className="add-profile-form"
                    >
                      <Input.TextArea placeholder="Enter Your Role Description" rows={4} autoSize value={employment?.roleDescription} onChange={(e) => { let data = [...formData]; data[index].roleDescription = e.target.value; setFormData(data); }} />
                    </Form.Item>
                  </div>
                </div>

                <div className="row">
                  {employment?.isCurrentEmployment === true &&
                    <div className="col-lg-12">
                      <Form.Item
                        label="Notice Period"
                        name={["employment", employment.key, "noticePeriod"]}
                        className="add-profile-form"
                        rules={[
                          {
                            required: true,
                            message: "Please enter notice period!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter Your Notice Period In days" value={employment?.noticePeriod} onChange={(e) => { let data = [...formData]; data[index].noticePeriod = e.target.value; setFormData(data); }} />
                      </Form.Item>
                    </div>
                  }
                </div>
              </div>
            ))}

            <button
              type="button"
              className="add-profile-education mt-4"
              onClick={() => setFormData([...formData, { key: formData.length + 1 }])}
            >
              Add another Employment
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
                htmltype="submit"
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
