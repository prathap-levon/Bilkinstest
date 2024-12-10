import React from "react";
import { Helmet } from "react-helmet";
import HeroHome from "../../Components/Home/HeroHome";
// import AboutBilkinsInc from "../../Components/Home/AboutBilkinsInc";
import JobSuits from "../../Components/Home/JobSuits";
import OptionsJobSuits from "../../Components/Home/OptionsJobSuits";
import ReferEarn from "../../Components/Career/ReferEarn";
import { Achievements } from "../../Components/Home/Achievements";
import FeaturedJob from "../../Components/Home/featuredJob";
import { ExploreJobs } from "../../Components/Home/exploreJobs";
import { HowItWorksNew } from "../../Components/Home/howItWorksNew";
import { ClienteleNew } from "../../Components/Home/clienteleNew";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Bilkins | Leading Healthcare Career Jobs Provider in the USA</title>
        <meta name="description" content="Bilkins is a top healthcare career jobs provider in the USA, specialising in connecting professionals with roles in nursing, therapy, and lab technology across Virginia." />
        <meta name="keywords" content="Healthcare Job Placement Services, Top Healthcare Recruitment Agency, Healthcare Career Opportunities Provider, Healthcare Staffing Solutions USA, Healthcare Employment Services, Healthcare Job Recruitment Experts, Leading Healthcare Jobs Agency, Healthcare Career Placement Experts, Professional Healthcare Job Providers, Healthcare Talent Acquisition USA, Healthcare Workforce Solutions, Healthcare Job Matching Services, Healthcare Career Development Agency, Healthcare Job Recruitment Specialists, Healthcare Employment Agency USA" />
      </Helmet>
      <div className="container-xxl">
      <HeroHome />
      <JobSuits />
      <Achievements/>
      <OptionsJobSuits />
      <FeaturedJob/>
      <ExploreJobs/>
      {/* <AboutBilkinsInc /> */}
      <HowItWorksNew/>
      <ClienteleNew/>
      <ReferEarn/>
      </div>
    </>
  );
};

export default Home;
