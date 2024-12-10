import React, { useState, useEffect } from "react";
import { Checkbox, Form, Slider, Select } from "antd";
import {
  ExperienceLevelOptions,
  JobCategoryOptions,
  JobTypeOptions,
  ShiftTypeOptions,
} from "./constant";
import { GetCountries, GetState, GetCity } from "react-country-state-city";
import Instance from "../../../AxiosConfig";
import { showErrorAlert, showSuccessAlert } from "../../../globalConstant";
import Loader from "../../../Loader";

export const JobPreferences = () => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const loggedInUserInfo = JSON.parse(localStorage.getItem("loggedInUserInfo"));

  const fetchJobPreferences = async () => {
    try {
      setIsLoading(true);
      const response = await Instance.get(`/getJobPreferencesOfUser/${loggedInUserInfo?.userId}`, {
        headers: {
          Authorization: `Bearer ${loggedInUserInfo?.token}`,
        },
      }
      );
      if (response.status === 200) {
        setFormData(response.data.jobPreferences);
        form.setFieldsValue({...response.data.jobPreferences, payRate: [response.data.jobPreferences.minPayRate, response.data.jobPreferences.maxPayRate]});
      }
    } catch (error) {
      console.error(error);
      showErrorAlert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobPreferences();
  }, []);

  useEffect(() => {
    const fetchCountries = async () => {
      let states = await GetState(233);
      let options = states?.map((item) => ({
        label: item?.name,
        value: item?.id,
      }));
      setStateOptions(options);
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      if (!formData.state) {
        setCityOptions([]);
        return;
      }
      const cities = await GetCity(233, formData.state);
      const options = cities?.map((item) => ({
        label: item?.name,
        value: item?.name,
      }));
      setCityOptions(options);
    };
    fetchCities();
  }, [formData.state]);

  const handleFormSubmit = async () => {
    try {
      setIsLoading(true);
      let state = await GetState(233);
      state = state?.find((item) => item?.id === formData?.state);
      formData.state = state?.name;
      const response = await Instance.put(`/updateJobPrerferencesOfUser/${loggedInUserInfo?.userId}`, formData, {
        headers: {
          Authorization: `Bearer ${loggedInUserInfo?.token}`,
        },
      });
      if (response.status === 200) {
        showSuccessAlert("Job Preferences Updated");
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
          <h4>Job Preferences</h4>
          <h5>
            Bilkins provides tailored job recommendations based on your profile
            preferences. Updating these will refine your ideal career suggestions.
          </h5>
        </div>
        <Form layout="vertical" form={form} onFinish={handleFormSubmit}>
          <div className="job-preferences-settings">
            <div className="d-flex justify-content-between">
              <div>
                <h4>Travel Nursing</h4>
                <p>Edit your preferences for Travel nursing job.</p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 my-2">
                <Form.Item name="jobCategory" label="Job Category">
                  <Select
                    placeholder="Job Category"
                    className="job-preference-form-select"
                    options={JobCategoryOptions}
                    mode="multiple"
                    onChange={(e) => setFormData(prev => ({ ...prev, jobCategory: e }))}
                  />
                </Form.Item>
              </div>
              <div className="col-lg-6 my-2">
                <Form.Item name="jobType" label="Job Type">
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Job Type"
                    className="job-preference-form-select"
                    options={JobTypeOptions}
                    mode="multiple"
                    value={formData.jobType}
                    onChange={(e) => setFormData(prev => ({ ...prev, jobType: e }))}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 my-2">
                <Form.Item name="shiftType" label="Shift Type">
                  <Select
                    placeholder="Shift Type"
                    className="job-preference-form-select"
                    options={ShiftTypeOptions}
                    mode="multiple"
                    value={formData.shiftType}
                    onChange={(e) => setFormData(prev => ({ ...prev, shiftType: e }))}
                  />
                </Form.Item>
              </div>
              <div className="col-lg-6 my-2">
                <Form.Item name="experienceLevel" label="Experience Level">
                  <Select
                    placeholder="Experience Level"
                    className="job-preference-form-select"
                    options={ExperienceLevelOptions}
                    mode="multiple" j
                    onChange={(e) => setFormData(prev => ({ ...prev, experienceLevel: e }))}
                    value={formData.experienceLevel}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 ">
                <Form.Item label="State" name="state">
                  <Select
                    placeholder="Select State"
                    className="job-preference-form-select"
                    options={stateOptions}
                    value={formData.state}
                    onChange={(e) => setFormData(prev => ({ ...prev, state: e }))}
                  />
                </Form.Item>
              </div>
              <div className="col-lg-6 ">
                <Form.Item label="City" name="cities">
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Select City"
                    className="job-preference-form-select"
                    value={formData.cities}
                    onChange={(e) => setFormData(prev => ({ ...prev, cities: e }))}
                    options={cityOptions}
                    mode="multiple"
                    disabled={!formData.state}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <Form.Item label="Pay Rate" name="payRate">
                  <Slider
                    range={{
                      draggableTrack: true,
                    }}
                    min={0}
                    max={10000000}
                    className="job-preference-slider"
                    onChange={(e) => setFormData(prev => ({ ...prev, minPayRate: e[0], maxPayRate: e[1] }))}
                  />
                </Form.Item>
              </div>
            </div>

          </div>
          <div className="d-flex justify-content-start mt-4">
            <button className="jobseeker-basic-button" type="submit">Save</button>
          </div>
        </Form>
      </div>
    </>
  );
};
