import { Checkbox, Form, Input } from "antd";
import React from "react";

export const SearchStatus = () => {
  return (
    <div className="container">
      <div className="job-preferences-settings">
        <Form layout="vertical">
          <div>
            <h4>Search Status </h4>
            <p>
              Are you actively looking for a job to start soon (within 1-3
              months) or just browsing to see what's available? when are you
              available to start?{" "}
            </p>
          </div>
          <div>
            <h4>What's your current job search status?</h4>
            <div className="mt-2">
              <Checkbox>
                Actively Looking -You are actively looking for your next
                assignment or your current assignment about end
              </Checkbox>
            </div>
            <div className="mt-2">
              <Checkbox>
                Start Search -You are in the beginning stages of search or you
                are available more than 30 days in the future.
              </Checkbox>
            </div>
            <div className="mt-2">
              <Checkbox>
                Just Browsing -You are not actively looking for new work and
                don't plan to apply for a job any time soon.{" "}
              </Checkbox>
            </div>
          </div>
        </Form>
      </div>
      <div className="d-flex justify-content-start mt-4">
        <button className="jobseeker-basic-button">Save</button>
      </div>
    </div>
  );
};
