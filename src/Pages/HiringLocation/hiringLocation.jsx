import React from "react";
import HiringBanner from "../../Components/HiringLocation/HiringBanner";
import WorkingChart from "../../Components/HiringLocation/workingChart";
import HiringFacilities from "../../Components/HiringLocation/hiringFacilities";
import HiringForm from "../../Components/HiringLocation/hiringForm";
import { Helmet } from "react-helmet";


const Hiringlocation = () => {
  return (
    <>
      <Helmet>
        <title>Bilkins Location- Services Provided Areas</title>
        <meta name="description" content="Bilkins connects top healthcare professionals with exceptional job opportunities in USA, Virginia, New York, Georgia" />
        <meta name="keywords" content="Helathcare jobs services in USA, Virginia, New York, Georgia, Kansas, New Jersey, North Carolina, Washington, Delaware, Califorina, New Mexico, Kerville, Olathe, Rhoad Island, Pennsylvania, Tennesse, Alabama, Vermont, New Hampshire, Maine, Massachusetts, Connecticut, Colorado, Olathe, Great Bend" />
      </Helmet>
      <div className="container-xxl">
      <HiringBanner />
      <WorkingChart />
      <HiringFacilities />
      <HiringForm />
      </div>
    </>
  );
};

export default Hiringlocation;
