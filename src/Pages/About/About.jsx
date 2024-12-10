import React from "react";
import { Helmet } from "react-helmet";
import HeroBanner from "../../Components/About/HeroBanner";
import Mission from "../../Components/About/mission";
import Expert from "../../Components/About/expert";
import Timeline from "../../Components/About/aboutTimeline";
import AboutSupport from "../../Components/About/aboutSupport";
import Facilities from "../../Components/About/facilities";
import AboutBanner from "../../Components/About/aboutBanner";

const About = () => {
  return (
    <>
      <Helmet>
        <title>Bilkins About us | Top Healthcare Job Placement Services & Recruitment Agency in the USA</title>
        <meta name="description" content="Bilkins is a leading healthcare job placement service provider in the USA, offering expert recruitment for nurses, therapists, and lab technologists." />
        <meta name="keywords" content="Healthcare Job Placement Services, Top Healthcare Recruitment Agency, Healthcare Career Opportunities Provider, Healthcare Staffing Solutions USA, Healthcare Employment Services, Healthcare Job Recruitment Experts, Leading Healthcare Jobs Agency, Healthcare Career Placement Experts, Professional Healthcare Job Providers, Healthcare Talent Acquisition USA, Healthcare Workforce Solutions, Healthcare Job Matching Services, Healthcare Career Development Agency, Healthcare Job Recruitment Specialists, Healthcare Employment Agency USA" />
      </Helmet>
     <div className="container-xxl">
     <AboutBanner />
      <HeroBanner />
      <div className="aboutBanner">
        <Mission />
      </div>
      <Expert />
      <Timeline />
      <AboutSupport />
      <Facilities />
     </div>
    </>
  );
};

export default About;
