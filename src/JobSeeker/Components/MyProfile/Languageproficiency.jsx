import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, Checkbox, } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetail } from "../../../features/profileSlice";
import Instance from "../../../AxiosConfig";
import Loader from "../../../Loader";
import { showErrorAlert, showSuccessAlert } from "../../../globalConstant";

const fluencyOption = [
  { value: "Native", label: "Native" },
  { value: "Fluent", label: "Fluent" },
  { value: "Good", label: "Good" },
  { value: "Basic", label: "Basic" },
];

export const LanguageProficiency = ({ onCancel }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userDetail = useSelector((state) => state.profile.userDetail);
  const loggedInUserInfo = JSON.parse(localStorage.getItem("loggedInUserInfo"));

  useEffect(() => {
    if (!userDetail) return;
    let lngData = [];
    for (let i = 0; i < userDetail?.languages?.length; i++) {
      lngData.push({
        key: i + 1,
        ...userDetail?.languages[i],
      });
    }
    setFormData(lngData);
  }, [userDetail]);

  useEffect(() => {
    if (formData) {
      form.setFieldsValue({
        language: formData.reduce((acc, lng) => {
          acc[lng.key] = lng;
          return acc;
        }, {}),
      });
    }
  }, [formData, form]);

  const handleRemoveLanguage = (key) => {
    setFormData(formData.filter((lng) => lng.key !== key));
  };

  const handleFormSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await Instance.put(`/editUserProfileDetail/${loggedInUserInfo?.userId}`, { languages: formData }, {
        headers: {
          Authorization: `Bearer ${loggedInUserInfo?.token}`,
        },
      });
      if (response.status === 200) {
        dispatch(setUserDetail(response?.data?.userDetail));
        showSuccessAlert('Language updated successfully');
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
          <Form form={form} onFinish={handleFormSubmit} layout="vertical">
            <h4>Language proficiency</h4>
            <p>
              Strengthen your resume by letting recruiters know you can
              communicate in multiple languages
            </p>
            {formData?.map((language, index) => (
              <div key={index} className="language-section mb-4">
                <div className="row">
                  <div className="col-lg-6">
                    <Form.Item
                      label="Language"
                      name={["language", language.key, "language"]}
                      className="add-profile-form"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your University!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Your Language" value={language.language} onChange={(e) => {
                        let data = [...formData]; data[index].language = e.target.value; setFormData(data);
                      }} />
                    </Form.Item>
                  </div>
                  <div className="col-lg-6">
                    <Form.Item
                      label="Fluency"
                      name={["language", language.key, "fluency"]}
                      className="add-profile-form"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your University!",
                        },
                      ]}
                    >
                      <Select placeholder="Select Fluency" options={fluencyOption} value={language.fluency} onChange={(value) => { let data = [...formData]; data[index].fluency = value; setFormData(data); }} />
                    </Form.Item>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-3">
                    <Checkbox checked={language.isRead} onChange={(e) => { let data = [...formData]; data[index].isRead = e.target.checked; setFormData(data); }}>Read</Checkbox>
                  </div>
                  <div className="col-lg-3">
                    <Checkbox checked={language.isWrite} onChange={(e) => { let data = [...formData]; data[index].isWrite = e.target.checked; setFormData(data); }}>Write</Checkbox>
                  </div>
                  <div className="col-lg-3">
                    <Checkbox checked={language.isSpeak} onChange={(e) => { let data = [...formData]; data[index].isSpeak = e.target.checked; setFormData(data); }}>Speak</Checkbox>
                  </div>
                  <div className="col-lg-3">
                    {formData.length >= 1 && (
                      <button
                        className="add-profile-education"
                        onClick={() => handleRemoveLanguage(language.key)}
                        danger
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div>
              <button type="button" className="add-profile-education" onClick={() => {
                let data = [...formData]; data.push({ key: formData.length + 1 }); setFormData(data);
              }}>
                Add Another language
              </button>
            </div>
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
