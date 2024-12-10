import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Tag } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setUserDetail } from "../../../features/profileSlice";
import Instance from "../../../AxiosConfig";
import Loader from "../../../Loader";
import { showErrorAlert, showSuccessAlert } from "../../../globalConstant";



const AddSkills = ({ onCancel }) => {
  const dispatch = useDispatch();
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const userDetail = useSelector((state) => state.profile.userDetail);
  const loggedInUserInfo = JSON.parse(localStorage.getItem("loggedInUserInfo"));
  const [suggestedSkills] = useState(["Surgical Assistance", "IV Insertion", "Vital Signs Monitoring", "Phlebotomy", "Medical Coding", "Clinical Assessment", "Health Education", "EHR (Electronic Health Record) Management"]);

  useEffect(() => {
    if (!userDetail) return;
    setSkills(userDetail.skills);
  }, [userDetail]);

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (inputValue && !skills.includes(inputValue)) {
      console.log(inputValue);
      setSkills([...skills, inputValue]);
      setInputValue("");
    }
  };

  const handleAddSuggestedSkill = (e, skill) => {
    e.preventDefault();
    if (!skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
  };

  const handleRemoveSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleFormSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await Instance.put(`/editUserProfileDetail/${loggedInUserInfo?.userId}`, { skills: skills }, {
        headers: {
          Authorization: `Bearer ${loggedInUserInfo?.token}`,
        },
      });
      if (response.status === 200) {
        dispatch(setUserDetail(response?.data?.userDetail));
        showSuccessAlert('Skills updated successfully');
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
    setInputValue("");
    onCancel();
  };

  return (
    <>
      {isLoading && <Loader />}
      <Modal visible={true} onCancel={handleCloseModal} footer={null} width={800}>
        <div className="add-skills-form">
          <Form layout="vertical" onFinish={handleFormSubmit}>
            <h4>Key Skills</h4>
            <p>
              Add skills that best define your expertise, for e.g, Health
              Education, Wound Care
            </p>
            <div className="mb-4">
              <h5>Skills</h5>
              {skills?.map((skill) => (
                <Tag
                  key={skill}
                  closable
                  onClose={() => handleRemoveSkill(skill)}
                  style={{ margin: "4px" }}
                  className="my-skills-tag"
                >
                  {skill}
                </Tag>
              ))}
            </div>
            <Form.Item>
              <Input
                placeholder="Type to add a new skill and press Enter"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onPressEnter={handleAddSkill}
              />
            </Form.Item>
            <h5>Alternatively, choose from the suggested skill sets to present your expertise more effectively</h5>
            <div className="mt-2" style={{ "cursor": "pointer" }}>
              {suggestedSkills?.map((skill) => (
                <Tag
                  key={skill}
                  onClick={(e) => handleAddSuggestedSkill(e, skill)}
                  className="my-skills-tag"
                >
                  + {skill}
                </Tag>
              ))}
            </div>
            <div className="d-flex justify-content-end mt-4 gap-4">
              <button type="default" className="profile-discard-button" onClick={handleCloseModal} style={{ marginRight: 8 }}>
                Discard
              </button>
              <button type="primary" className="profile-save-button" htmlType="submit">
                Save
              </button>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default AddSkills;
