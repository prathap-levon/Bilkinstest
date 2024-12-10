import React from "react";
import user1 from "../../Assets/Img/user/user-1.png";
import location from "../../Assets/Img/icons/location.png";
import calender from "../../Assets/Img/icons/calendar.png";
import Animate from "../Animation/Animate";
import { Link } from "react-router-dom";

const LocationCard = ({ hospitalName, locationName, position, dayAgo }) => {
  return (
    <div className="col-lg-4 mt-4">
      <div className="card-location-card">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <div className="home-profile-photo">
              <img src={user1} alt="user" />
            </div>
            <div className="home-content-hospital mx-2">
              <b>{hospitalName}</b>
            </div>
          </div>

          {/* <div className="home-button-location">
            <button>Save</button>
          </div> */}
        </div>
        <hr />
        <div className="location-address">
          <div className="icons-locations">
            <img src={location} alt="location" />
          </div>
          <div className="titles-locations">
            <h3>{locationName}</h3>
            <p>{position}</p>
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-between mt-4">
          <div className="home-content-hospital">
            <div className="d-flex align-items-center">
              <img src={calender} alt="calender" /> &nbsp;&nbsp; <b>{dayAgo}</b>
            </div>
          </div>
          <div className="home-button-hospital">
            <button>
              <Link to="/service-details" className="button-link">Apply Now</Link>
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SearchLocation = () => {
  const locations = [
    {
      hospitalName: "Appollo Hospital",
      locationName: "Florida",
      position: "Physical Therapist",
      dayAgo: "5 days Ago",
    },
    {
      hospitalName: "Appollo Hospital",
      locationName: "Florida",
      position: "Physical Therapist",
      dayAgo: "5 days Ago",
    },
    {
      hospitalName: "Appollo Hospital",
      locationName: "Florida",
      position: "Physical Therapist",
      dayAgo: "5 days Ago",
    },
    {
      hospitalName: "Appollo Hospital",
      locationName: "Florida",
      position: "Physical Therapist",
      dayAgo: "5 days Ago",
    },
    {
      hospitalName: "Appollo Hospital",
      locationName: "Florida",
      position: "Physical Therapist",
      dayAgo: "5 days Ago",
    },
    {
      hospitalName: "Appollo Hospital",
      locationName: "Florida",
      position: "Physical Therapist",
      dayAgo: "5 days Ago",
    },
  ];

  return (
    <>
      <div className="home-search-location">
        <div className="container">
          <div className="title-search-location">
            <Animate>
              <h3>Search by locations</h3>
            </Animate>
          </div>
          <div className="row mt-5">
            {locations.map((location, index) => (
              <LocationCard
                key={index}
                hospitalName={location.hospitalName}
                locationName={location.locationName}
                position={location.position}
                dayAgo={location.dayAgo}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchLocation;
