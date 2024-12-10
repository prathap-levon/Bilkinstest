import React,{useState} from 'react'
import { JobPreferences } from './JobPreferences';
import { SearchStatus } from './SearchStatus';
import { Account } from './Account';
import { Notification } from './Notification';

export const SettingsOverview = () => {
    const [selectedOption, setSelectedOption] = useState("jobPreferences");

    const renderContent = () => {
      switch (selectedOption) {
        case "jobPreferences":
          return <JobPreferences />;
        // case "searchStatus":
        //   return <SearchStatus />;
        case "account":
          return <Account />;
        case "notification":
          return <Notification />;
        default:
          return <JobPreferences />;
      }
    };
  return (
    <div className='jobseeker-settings-section'>
        <div className='container'>
            <div className='row'>
                <div className='jobseeker-settings-banner'>
                    <h3>Settings</h3>
                    <h5>Lets you easily control the communication you receive through Bilkins, change your associated email or mobile number, deactivate your
                         Bilkins account and manage the job recommendations by specifying your desired career profile.</h5>
                </div>
            </div>
            <div className='row mt-4'>
            <div className="col-lg-3">
            <div className="jobseeker-settings-options">
              <div
                className={`jobseeker-settings-items ${selectedOption === "jobPreferences" ? "jobseeker-active" : ""}`}
                onClick={() => setSelectedOption("jobPreferences")}
              >
               Job Preferences
              </div>
              {/* <div
                className={`jobseeker-settings-items mt-3 ${selectedOption === "searchStatus" ? "jobseeker-active" : ""}`}
                onClick={() => setSelectedOption("searchStatus")}
              >
                Search Status
              </div> */}
              <div
                className={`jobseeker-settings-items mt-3 ${selectedOption === "account" ? "jobseeker-active" : ""}`}
                onClick={() => setSelectedOption("account")}
              >
                Account
              </div>
              <div
                className={`jobseeker-settings-items mt-3 ${selectedOption === "notification" ? "jobseeker-active" : ""}`}
                onClick={() => setSelectedOption("notification")}
              >
                Notification
              </div>
            </div>
          </div>
          <div className="col-lg-9">
            {renderContent()}
          </div>
            </div>
        </div>
    </div>
  )
}
