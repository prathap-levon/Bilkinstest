import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, DatePicker, Radio } from "antd";
import { PhoneInput } from "react-international-phone";
import { useSelector, useDispatch } from 'react-redux';
import { setProfile } from "../../../features/profileSlice";
import Loader from "../../../Loader";
import dayjs from "dayjs";
import Instance from "../../../AxiosConfig";
import { GetState, GetCity } from "react-country-state-city";
import { showErrorAlert, showSuccessAlert } from "../../../globalConstant";

export const AddBasicDetails = ({ onCancel }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [cityOptions, setCityOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const profileData = useSelector((state) => state.profile.profile);
  const loggedInUserInfo = JSON.parse(localStorage.getItem("loggedInUserInfo"));

  useEffect(() => {
    if (!profileData) return;
    setFormData(profileData);
    form.setFieldsValue({
      ...profileData,
      dateOfBirth: dayjs(profileData?.dateOfBirth),
    })
  }, [profileData]);


  useEffect(() => {
    const fetchStates = async () => {
      const states = await GetState(233);
      const options = states?.map((item) => ({
        label: item?.name,
        value: item?.id,
      }));
      setStateOptions(options);
    };
    fetchStates();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      if (!formData?.state) {
        setCityOptions([]);
        return;
      }
      const cities = await GetCity(233, formData?.state);
      const options = cities?.map((item) => ({
        label: item?.name,
        value: item?.name,
      }));
      setCityOptions(options);
    };
    fetchCities();
  }, [formData?.state]);

  const handleFormSubmit = async () => {
    try {
      setIsLoading(true);
      let state  = await GetState(233);
      state = state?.find((item) => item?.id === formData?.state);
      formData.state = state?.name;
      formData.stateCode = state?.state_code;
      const response = await Instance.put(`/editUserBasicDetail/${loggedInUserInfo?.userId}`, formData, {
        headers: {
          Authorization: `Bearer ${loggedInUserInfo?.token}`,
        },
      });
      if (response.status === 200) {
        dispatch(setProfile(response?.data?.user));
        showSuccessAlert('Profile updated successfully');
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
      <Modal
        title="Basic Details"
        visible={true}
        onCancel={handleCloseModal}
        footer={null}
        width={800}
      >
        <div className="edit-profile-form">
          <Form form={form} onFinish={handleFormSubmit} layout="vertical">
            <div className="row">
              <div className="col-lg-6">
                <Form.Item
                  label="First Name"
                  name="firstName"
                  className="add-profile-form"
                  rules={[
                    { required: true, message: "Please enter your first name!" },
                  ]}
                >
                  <Input placeholder="Enter First Name" value={formData?.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
                </Form.Item>
              </div>
              <div className="col-lg-6">
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  className="add-profile-form"
                  rules={[
                    { required: true, message: "Please enter your last name!" },
                  ]}
                >
                  <Input placeholder="Enter Last Name" value={formData?.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
                </Form.Item>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-6">
                <Form.Item
                  label="Email Address"
                  name="email"
                  className="add-profile-form"
                  rules={[{ required: true, message: "Please enter your email!" }]}
                >
                  {/* <p>We will send relevant jobs and updates to this email</p> */}
                  <Input placeholder="Enter Your Email" value={formData?.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </Form.Item>
              </div>
              <div className="col-md-6 ">
                <label
                  htmlFor="inputPhone"
                  className="form-label"
                  style={{
                    display: "flex",
                    marginBottom: "0",
                  }}
                >
                  <span
                    style={{
                      color: "#ff4d4f",
                      marginRight: "4px",
                      marginBottom: "8px",
                    }}
                  >
                    *
                  </span>{" "}
                  Mobile Number
                </label>
                {/* <p>Recruiters will contact you on this number</p> */}
                <PhoneInput
                  defaultCountry="us"
                  inputStyle={{
                    width: "100%",
                  }}
                  value={formData?.mobileNumber}
                  onChange={(value) => setFormData({ ...formData, mobileNumber: value })}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-lg-6">
                {/* <p>Select your gender for a personalized experience</p> */}
                <Form.Item
                  label="Gender"
                  name="gender"
                  className="add-profile-form"
                  rules={[
                    { required: true, message: "Please select your gender!" },
                  ]}
                >
                  <Radio.Group
                    value={formData?.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  >
                    <Radio value="MALE" checked={formData?.gender === "MALE"} name="gender">Male</Radio>
                    <Radio value="FEMALE" checked={formData?.gender === "FEMALE"} name="gender">Female</Radio>
                    <Radio value="OTHER" checked={formData?.gender === "OTHER"} name="gender">Other</Radio>
                  </Radio.Group>
                </Form.Item>
              </div>

              <div className="col-lg-6">
                <Form.Item
                  label="Date of Birth"
                  name="dateOfBirth"
                  className="add-profile-form"
                  rules={[
                    {
                      required: true,
                      message: "Please select your date of birth!",
                    },
                  ]}
                >
                  <DatePicker style={{ width: "100%" }} value={dayjs(formData?.dob)} onChange={(e) => setFormData({ ...formData, dateOfBirth: e })} />
                </Form.Item>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-6">
                <Form.Item
                  label="State"
                  name="state"
                  className="add-profile-form"
                  rules={[
                    { required: true, message: "Please enter your current state!" },
                  ]}
                >
                  <Select placeholder="Select State" options={stateOptions} onChange={(e) => setFormData({ ...formData, state: e })} />
                </Form.Item>
              </div>
              <div className="col-lg-6">
                <Form.Item
                  label="City"
                  name="city"
                  className="add-profile-form"
                  rules={[
                    { required: true, message: "Please enter your current city!" },
                  ]}
                >
                  <Select placeholder="Select City" options={cityOptions} onChange={(e) => setFormData({ ...formData, city: e })} disabled={cityOptions?.length === 0} />
                </Form.Item>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-6">
                <Form.Item
                  label="ZipCode"
                  name="zipCode"
                  className="add-profile-form"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your zipcode!",
                    },
                  ]}
                >
                  <Input placeholder="Enter Your Zipcode" value={formData?.zipCode} onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })} />
                </Form.Item>
              </div>
              <div className="col-lg-6">
                <Form.Item
                  label="Street"
                  name="street"
                  className="add-profile-form"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your street!",
                    },
                  ]}
                >
                  <Input placeholder="Enter Your Street" value={formData?.street} onChange={(e) => setFormData({ ...formData, street: e.target.value })} />
                </Form.Item>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-6">
                {/* <p>Choose your Martial status</p> */}
                <Form.Item
                  label="Marital Status"
                  name="maritalStatus"
                  className="add-profile-form"
                  rules={[
                    { required: true, message: "Please select your Marital status!" },
                  ]}
                >
                  <Radio.Group value={formData?.maritalStatus} onChange={(e) => {
                    setFormData({ ...formData, maritalStatus: e.target.value })
                  }
                  }>
                    <Radio checked={formData?.maritalStatus === "UNMARRIED"} value="UNMARRIED" name="maritalStatus">Unmarried</Radio>
                    <Radio checked={formData?.maritalStatus === "MARRIED"} value="MARRIED" name="maritalStatus">Married</Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
              <div className="col-lg-6">
                <Form.Item
                  label="Discipline"
                  name="discipline"
                  className="add-profile-form"
                >
                  <Select placeholder="Select Discipline" options={[]} onChange={(e) => setFormData({ ...formData, discipline: e })} />
                </Form.Item>
              </div>
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
