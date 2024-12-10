import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Checkbox, DatePicker } from "antd";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetail } from "../../../features/profileSlice";
import { showErrorAlert, showSuccessAlert } from "../../../globalConstant";
import dayjs from "dayjs";
import Loader from "../../../Loader";
import Instance from "../../../AxiosConfig";

export const AddCertification = ({ onCancel }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userDetail = useSelector((state) => state.profile.userDetail);
  const loggedInUserInfo = JSON.parse(localStorage.getItem("loggedInUserInfo"));

  useEffect(() => {
    if (!userDetail) return;
    let certData = [];
    for (let i = 0; i < userDetail?.certifications?.length; i++) {
      certData.push({
        key: i + 1,
        ...userDetail?.certifications[i],
        issuedDate: userDetail?.certifications[i]?.issuedDate ? dayjs(userDetail?.certifications[i]?.issuedDate) : null,
        expirationDate: userDetail?.certifications[i]?.expirationDate ? dayjs(userDetail?.certifications[i]?.expirationDate) : null
      });
    }
    setFormData(certData);
  }, [userDetail]);

  useEffect(() => {
    if (formData) {
      form.setFieldsValue({
        certification: formData.reduce((acc, certification) => {
          acc[certification.key] = certification;
          return acc;
        }, {}),
      });
    }
  }, [formData, form]);

  const handleRemoveCertification = (key) => {
    setFormData(formData.filter((cert) => cert.key !== key));
  };

  const handleFormSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await Instance.put(`/editUserProfileDetail/${loggedInUserInfo?.userId}`, { certifications: formData }, {
        headers: {
          Authorization: `Bearer ${loggedInUserInfo?.token}`,
        },
      });
      if (response.status === 200) {
        dispatch(setUserDetail(response?.data?.userDetail));
        showSuccessAlert('Certification updated successfully');
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
            <h4>Certifications</h4>
            <p>Add details of Certifications you have achieved/completed</p>
            {formData?.map((cert, index) => (
              <div key={index}>
                <div className="d-flex justify-content-between align-items-center">
                <h5>Certification - {index + 1}</h5>
                {formData.length >= 1 && (
                  <button
                    type="danger"
                    onClick={() => handleRemoveCertification(cert.key)}
                    className=" delete-certification-button "
                  >
                    <MdDeleteOutline className="icon-red" /> Delete
                  </button>
                )}
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <Form.Item
                      label={`Certification Name`}
                      name={["certification", cert.key, "certificateName"]}
                      className="add-profile-form"
                      rules={[
                        {
                          required: true,
                          message: "Please enter certificate name!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Certificate Name" value={cert?.certificateName} onChange={(e)=> { let data = [...formData]; data[index].certificateName = e.target.value; setFormData(data); }}/>
                    </Form.Item>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <Form.Item
                      label={`Certificate ID`}
                      name={["certification", cert.key, "certificateId"]}
                      className="add-profile-form"
                    >
                      <Input placeholder="Enter Certificate ID" value={cert?.certificateId} onChange={(e)=> { let data = [...formData]; data[index].certificateId = e.target.value; setFormData(data); }} />
                    </Form.Item>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <Form.Item
                      label={`Certification URL`}
                      name={["certification", cert.key, "certificateURL"]}
                      className="add-profile-form"
                      rules={[
                        {
                          required: true,
                          message: "Please enter certificate url!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Certificate URL" value={cert?.certificateURL} onChange={(e)=> { let data = [...formData]; data[index].certificateURL = e.target.value; setFormData(data); }} />
                    </Form.Item>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <Form.Item
                      name={["certification", cert.key, "issuedDate"]}
                      className="add-profile-form"
                      label="Issued Date"
                      rules={[
                        {
                          required: true,
                          message: "Please select Issued date!",
                        },
                      ]}
                    >
                      <DatePicker
                        style={{ width: "100%" }}
                        placeholder="Select Issued Date"
                        value={cert?.issuedDate}
                        onChange={(e)=> { let data = [...formData]; data[index].issuedDate = e; setFormData(data); }} 
                      />
                    </Form.Item>
                  </div>
                  {!cert.doesNotExpire && (
                    <div className="col-lg-6">
                      <Form.Item
                        name={["certification", cert.key, "expirationDate"]}
                        className="add-profile-form"
                        label="Expiration Date"
                        rules={[
                          {
                            required: !cert.doesNotExpire,
                            message: "Please select expiry date!",
                          },
                        ]}
                      >
                        <DatePicker
                          style={{ width: "100%" }}
                          placeholder="Select Expiry Date"
                          value={cert?.expirationDate}
                          onChange={(e)=> { let data = [...formData]; data[index].expirationDate = e; setFormData(data); }}
                        />
                      </Form.Item>
                    </div>
                  )}
                </div>
                <div>
                  <Checkbox
                    checked={cert.doesNotExpire}
                    onChange={(e) =>
                      setFormData([
                        ...formData.slice(0, index),
                        {
                          ...formData[index],
                          doesNotExpire: e.target.checked,
                        },
                        ...formData.slice(index + 1),
                      ])
                    }
                  >
                    This certification does not expire
                  </Checkbox>
                </div>
               
                <hr />
              </div>
            ))}
            <button
              type="button"
              className="add-profile-education mt-4"
              onClick={()=>{
                setFormData([
                  ...formData,
                  {
                    key: formData.length + 1,
                    doesNotExpire: true,
                  },
                ]);
              }}
            >
              Add another Certification
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
