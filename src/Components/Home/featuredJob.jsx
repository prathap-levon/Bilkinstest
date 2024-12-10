import React, { useState, useRef, useEffect, useMemo } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import image1 from "../../Assets/Img/hero/loc-1.png";
import image2 from "../../Assets/Img/hero/loc-2.png";
import image3 from "../../Assets/Img/hero/loc-3.png";
import image4 from "../../Assets/Img/hero/loc-4.png";
import image5 from "../../Assets/Img/hero/loc-5.png";
import image6 from "../../Assets/Img/hero/loc-6.png";
import dollar from "../../Assets/Img/icons/dollar-sign.png";
import locationicon from "../../Assets/Img/icons/map-pin.png";
import telescope from "../../Assets/Img/icons/telescope.png";
import user from "../../Assets/Img/icons/users-red.png";
import { useNavigate } from "react-router-dom";
import Animate from "../Animation/Animate";
import { Container } from "react-bootstrap";
import Instance from "../../AxiosConfig";


const FeaturedJob = () => {
  const [index, setIndex] = useState(0);
  const sliderRef = useRef();
  const [allJobs, setAllJobs] = useState([]);
  const numberFormat = new Intl.NumberFormat();

  const fetchAllJobs = async () => {
    try {
      const response = await Instance.get("/getAllJobs", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response?.status === 200) {
        setAllJobs(response?.data?.jobs);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllJobs();
  }, []);

  const filterJobsByState = (state) => {
    return allJobs.filter((job) => job.state === state);
  };

  const jobLocations = [
    { state: "Massachusetts", image: image1 },
    { state: "Virginia", image: image2 },
    { state: "Illinois", image: image3 },
    { state: "Maryland", image: image4 },
    { state: "Rhode Island", image: image5 },
    { state: "New York", image: image6 },
  ];

  const clients = jobLocations.map((location) => {
    const jobs = filterJobsByState(location.state);
    const maxEarnings = jobs.length
      ? Math.max(...jobs.map((job) => job.weeklyEarnings || 0))
      : 0;
    return {
      image: location.image,
      location: location.location,
      dollar: dollar,
      user: user,
      locationName: location.state,
      dollarAmount: `Upto $${numberFormat.format(maxEarnings)}`,
      totalJobs: `Total jobs-${jobs.length}`,
    };
  });

  useEffect(() => {
    sliderRef.current.slickGoTo(index);
  }, [index]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const navigate = useNavigate();

  const handleHiring = (locationName) => {
    navigate(`/location?location=${locationName}`);
  };

  return (
    <Container fluid className="clientele-container">
      <div className="clientLeft">
        <Animate>
          <h1>Featured Job Locations</h1>
        </Animate>
        <p>Explore Prime Locations: Discover Opportunities Near You</p>
      </div>
      <div className="slider-wrapper slider-wrapper-featured">
        <Slider {...settings} ref={sliderRef}>
          {clients.map((client, idx) => (
            <div key={idx} className="job-location-card">
              <div className="featured-job-location">
                <img src={client.image} alt={`Profile ${idx + 1}`} />
              </div>
              <div>
                <div className="d-flex gap-3 job-location-icons mt-2">
                  <img src={locationicon} alt="" />
                  <h4>{client.locationName}</h4>
                </div>
                <div className="d-flex gap-3 job-location-icons mt-2">
                  <img src={dollar} alt="" />
                  <h4>{client.dollarAmount}</h4>
                </div>
                <div className="d-flex gap-3 job-location-icons mt-2">
                  <img src={user} alt="" />
                  <h4>{client.totalJobs}</h4>
                </div>
                <button
                  className="d-flex gap-3 explore-button mt-2"
                  onClick={() => {
                    handleHiring(client.locationName);
                  }}
                >
                  <img src={telescope} alt="" />
                  Explore Locations
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </Container>
  );
};

export default FeaturedJob;
