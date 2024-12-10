import React, { useState, useEffect } from "react";
import { Modal, Form, Input} from "antd";
import Instance from "../../../AxiosConfig";
import Loader from "../../../Loader";
import { useSelector, useDispatch } from "react-redux";
import { setUserDetail } from "../../../features/profileSlice";
import { showSuccessAlert, showErrorAlert } from "../../../globalConstant";

const { TextArea } = Input;

const ProfileSummary = ({ onCancel }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [profileSummary, setProfileSummary] = useState('');
  const userDetail = useSelector((state) => state.profile.userDetail);
  const loggedInUserInfo = JSON.parse(localStorage.getItem('loggedInUserInfo'));

  useEffect(() => {
    if (!userDetail) return;
    setProfileSummary(userDetail?.profileSummary);
  }, [userDetail]);

  const handleFormSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await Instance.put(`/editUserProfileDetail/${loggedInUserInfo?.userId}`, { profileSummary }, {
        headers: {
          Authorization: `Bearer ${loggedInUserInfo?.token}`,
        },
      });
      if (response.status === 200) {
        dispatch(setUserDetail(response?.data?.userDetail));
        showSuccessAlert('Profile summary updated successfully');
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
    setProfileSummary('');
    onCancel();
  };

  return (
    <>
    {isLoading && <Loader />}
      <Modal visible={true} onCancel={handleCloseModal} footer={null} width={800}>
        <div className="add-skills-form">
          <Form layout="vertical" onFinish={handleFormSubmit}>
            <h4>Profile Summary</h4>
            <p>
              Provide recruiters with a concise summary of your career
              highlights, significant achievements, and professional aspirations
              to offer a clear understanding of your profile.
            </p>
            <div className="row">
              <div className="col-lg-12">
                <Form.Item>
                  <TextArea rows={4}
                    placeholder="Add a detail profile summary"
                    value={profileSummary}
                    onChange={(e) => setProfileSummary(e.target.value)}
                  />
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

export default ProfileSummary;
