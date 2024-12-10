import React, { useState, useEffect } from "react";
import { Modal, Form, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import Instance from "../../../AxiosConfig";
import Loader from "../../../Loader";
import { showErrorAlert, showSuccessAlert } from "../../../globalConstant";
import { setUserDetail } from "../../../features/profileSlice";

const AddExperienceModal = ({ onCancel }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const userDetail = useSelector((state) => state.profile.userDetail);
  const loggedInUserInfo = JSON.parse(localStorage.getItem("loggedInUserInfo"));

  useEffect(() => {
    if (!userDetail) return;
    setFormData({
      totalExperience: {
        years: userDetail?.totalExperience?.years,
        months: userDetail?.totalExperience?.months,
      },
      availableToJoinIn: userDetail?.availableToJoinIn,
    });
    form.setFieldsValue(userDetail);
  }, [userDetail]);

  const handleFormSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await Instance.put(`/editUserProfileDetail/${loggedInUserInfo?.userId}`, { ...formData }, {
        headers: {
          Authorization: `Bearer ${loggedInUserInfo?.token}`,
        },
      });
      if (response.status === 200) {
        dispatch(setUserDetail(response?.data?.userDetail));
        showSuccessAlert('Experience updated successfully');
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
    setFormData({});
    form.resetFields();
    onCancel();
  };


  return (
    <>
      {isLoading && <Loader />}
      <Modal visible={true} onCancel={handleCloseModal} footer={null} width={800}>
        <div className="add-skills-form">
          <Form layout="vertical" form={form} onFinish={handleFormSubmit}>
            <h4>Experience and Expected Joining Date</h4>
            <div className="row">
              <p>Total Work Experience</p>
              <div className="col-lg-6">
                <Form.Item className="add-profile-form" name={["totalExperience", "years"]}>
                  <Input
                    placeholder="Enter your experience in years"
                    type="number"
                    value={formData?.totalExperience?.years}
                    onChange={(e) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        totalExperience: {
                          ...prevData?.totalExperience,
                          years: e.target.value,
                        },
                      }));
                    }}
                  />
                </Form.Item>
              </div>
              <div className="col-lg-6">
                <Form.Item className="add-profile-form" name={["totalExperience", "months"]}>
                  <Input
                    placeholder="Enter your experience in months"
                    type="number"
                    value={formData?.totalExperience?.months}
                    onChange={(e) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        totalExperience: {
                          ...prevData?.totalExperience,
                          months: e.target.value,
                        },
                      }));
                    }}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="row">
              <p>Availability To Join e.g.(30 days, Immediately)</p>
              <div className="col-lg-6">
                <Form.Item
                  className="add-profile-form"
                  name={"availableToJoinIn"}
                >
                  <Input placeholder="Available to join" style={{ width: "100%" }} value={formData?.availableToJoinIn} onChange={(e) => { setFormData({ ...formData, availableToJoinIn: e.target.value }) }} />
                </Form.Item>
              </div>
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

export default AddExperienceModal;
