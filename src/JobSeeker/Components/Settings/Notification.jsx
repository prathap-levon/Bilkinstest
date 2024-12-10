import React, { useState } from "react";
import { Form, Checkbox } from "antd";
import { PhoneInput } from "react-international-phone";
import Loader from "../../../Loader";
import Instance from "../../../AxiosConfig";
import { showErrorAlert, showSuccessAlert } from "../../../globalConstant";

export const Notification = () => {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const loggedInUserInfo = JSON.parse(localStorage.getItem("loggedInUserInfo"));

  const fetchUserNotificationPreferences = async () => {
    try {
      setIsLoading(true);
      const response = await Instance.get(`/getNotificationPreferencesOfUser/${loggedInUserInfo?.userId}`, {
        headers: {
          Authorization: `Bearer ${loggedInUserInfo?.token}`,
        },
      });
      if (response.status === 200) {
        console.log(response?.data?.notificationPreferences);
        setFormData(response?.data?.notificationPreferences);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useState(() => {
    fetchUserNotificationPreferences();
  }, []);

  const handleFormSubmit = async () => {
    try {
      setIsLoading(true);
      console.log(formData);
      const response = await Instance.put(`/updateNotificationPreferencesOfUser/${loggedInUserInfo?.userId}`, formData, {
        headers: {
          Authorization: `Bearer ${loggedInUserInfo?.token}`,
        },
      });
      if (response.status === 200) {
        showSuccessAlert("Notification Preferences Updated");
      }
    } catch (error) {
      console.error(error);
      showErrorAlert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="job-preferences-section">
        <div>
          <h4>Notification</h4>
          <h5>
            Get notified what's happening right now. you can turn off at any time
          </h5>
        </div>
        <div className="job-preferences-settings">
          <Form layout="vertical">
            <div className="row">
              <div className="col-lg-6">
                <h4>Email Notification</h4>
                <p>
                  Substance can send you email notifications for any now direct
                  messages
                </p>
              </div>
              <div className="col-lg-6">
                <Form.Item>
                  <Checkbox checked={formData?.accountActivity} className="notification-setting-checkbox" onChange={(e) => setFormData({ ...formData, accountActivity: e.target.checked })}>
                    <strong>Account Activity</strong>
                    <div >
                      Change made to my account
                      <br />
                      <small>
                        For your security, You cannot disable account email
                        notifications.
                      </small>
                    </div>
                  </Checkbox>
                </Form.Item>

                <Form.Item>
                  <Checkbox checked={formData?.productAndUpdates} className="notification-setting-checkbox" onChange={(e) => setFormData({ ...formData, productAndUpdates: e.target.checked })}>
                    <strong>Product & Updates</strong>
                    <div >
                      Notify me about new features and updates to the Bilkins
                      health experience.
                    </div>
                  </Checkbox>
                </Form.Item>

                <Form.Item >
                  <Checkbox checked={formData?.applicationsUpdates} className="notification-setting-checkbox" onChange={(e) => setFormData({ ...formData, applicationsUpdates: e.target.checked })}>
                    <strong>Application Updates</strong>
                    <div>
                      Notify me about changes to my application status,
                      credentials, and references.
                    </div>
                  </Checkbox>
                </Form.Item>

                <Form.Item>
                  <Checkbox checked={formData?.jobAlerts} className="notification-setting-checkbox" onChange={(e) => setFormData({ ...formData, jobAlerts: e.target.checked })}>
                    <strong>Recommendations</strong>
                    <div >
                      Notify me about jobs that match my qualifications and
                      preferences.
                    </div>
                  </Checkbox>
                </Form.Item>
              </div>
            </div>
            <hr></hr>
            <div className="row">
              <div className="col-lg-6">
                <h4>Text Notification</h4>
                <p>To receive the text notifications about your applications, offers and employment, please enroll by adding your phone number. </p>
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

                  </span>{" "}
                  Mobile No
                </label>
                <PhoneInput
                  defaultCountry="us"
                  inputStyle={{
                    width: "100%",
                  }}
                  value={formData?.mobileNumberForSMS}
                  onChange={(e) => setFormData({ ...formData, mobileNumberForSMS: e })}
                />
                <p>I understand the Bilkins periodically send texts and that standard message rate apply.</p>
                <Checkbox className="notification-setting-checkbox" onChange={(e) => setFormData({ ...formData, smsApplicationUpdates: e.target.checked })}>Please also text me urgent updates about the jobs that i qualify for and other information about Bilkins services.</Checkbox>
              </div>
            </div>
          </Form>
        </div>
        <div className="d-flex justify-content-start mt-4">
          <button className="jobseeker-basic-button" type="submit" onClick={handleFormSubmit}>Save</button>
        </div>
      </div>
    </>
  );
};
