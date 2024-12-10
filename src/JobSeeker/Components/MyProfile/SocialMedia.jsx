import React, { useState, useEffect } from "react";
import { Modal, Form, Input } from "antd";
import { FaLinkedin, FaFacebookSquare } from "react-icons/fa";
import { FaSquareTwitter } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import Instance from "../../../AxiosConfig";
import Loader from "../../../Loader";
import { setUserDetail } from "../../../features/profileSlice";
import { showErrorAlert, showSuccessAlert } from "../../../globalConstant";

const SocialMedia = ({ onCancel }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const userDetail = useSelector((state) => state.profile.userDetail);
  const loggedInUserInfo = JSON.parse(localStorage.getItem("loggedInUserInfo"));

  useEffect(() => {
    if (!userDetail) return;
    let data = {
      linkedIn: userDetail?.socialMedia?.linkedIn,
      facebook: userDetail?.socialMedia?.facebook,
      twitter: userDetail?.socialMedia?.twitter,
      youtube: userDetail?.socialMedia?.youtube,
    }
    setFormData({ ...data });
    form.setFieldsValue({ ...data })
  }, [userDetail]);

  const handleFormSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await Instance.put(`/editUserProfileDetail/${loggedInUserInfo?.userId}`, {socialMedia: formData}, {
        headers: {
          Authorization: `Bearer ${loggedInUserInfo?.token}`,
        },
      });
      if (response.status === 200) {
        dispatch(setUserDetail(response?.data?.userDetail));
        showSuccessAlert('Social media updated successfully');
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
          <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
            <h4>Social Media</h4>
            <p>Add your social media links</p>
            <div className="row">
              <div className="col-lg-6">
                <div className="d-flex gap-4  align-items-center">
                  <FaLinkedin style={{ color: "#0b86ca" }} size={30} />
                  <Form.Item
                    name="linkedIn"
                    className="profile-social-media-form"
                    style={{ width: "100%" }}
                    rules={[
                      {
                        type: "url",
                        message: "Please enter a valid Linkedin URL!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter your linkedin profile" value={formData?.linkedIn} onChange={(e) => { setFormData({ ...formData, linkedIn: e.target.value }) }} />
                  </Form.Item>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="d-flex gap-4  align-items-center">
                  <FaFacebookSquare style={{ color: "#0b86ca" }} size={30} />
                  <Form.Item
                    name="facebook"
                    className="profile-social-media-form"
                    style={{ width: "100%" }}
                    rules={[
                      {
                        type: "url",
                        message: "Please enter a valid Facebook URL!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter your facebook profile" value={formData?.facebook} onChange={(e) => { setFormData({ ...formData, facebook: e.target.value }) }} />
                  </Form.Item>
                </div>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-lg-6">
                <div className="d-flex gap-4  align-items-center">
                  <FaSquareTwitter style={{ color: "#54acee" }} size={30} />
                  <Form.Item
                    name="twitter"
                    className="profile-social-media-form"
                    style={{ width: "100%" }}
                    rules={[
                      {
                        type: "url",
                        message: "Please enter a valid Twitter URL!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter your twitter profile" value={formData?.twitter} onChange={(e) => { setFormData({ ...formData, twitter: e.target.value }) }} />
                  </Form.Item>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="d-flex gap-4  align-items-center">
                  <IoLogoYoutube style={{ color: "#f44336" }} size={30} />
                  <Form.Item
                    name="youtube"
                    className="profile-social-media-form"
                    style={{ width: "100%" }}
                    rules={[
                      {
                        type: "url",
                        message: "Please enter a valid YouTube URL!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter your youtube profile" value={formData?.youtube} onChange={(e) => { setFormData({ ...formData, youtube: e.target.value }) }} />
                  </Form.Item>
                </div>
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

export default SocialMedia;
