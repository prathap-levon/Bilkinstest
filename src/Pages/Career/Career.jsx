import React from "react";
import CareerBanner from "../../Components/Career/careerBanner";
import CareerForm from "../../Components/Career/careerForm";
import CareerOverview from "../../Components/Career/careerOverview";
import { ClienteleNew } from "../../Components/Home/clienteleNew";
import ReferEarn from "../../Components/Career/ReferEarn";
import { CareerPageBanner } from "../../Components/Career/careerPageBanner";
import { Helmet } from "react-helmet";


const Career = () => {
  return (
    <>
      <Helmet>
        <title>Bilkins Career | Top Healthcare Job Placement Services & Recruitment Agency in the USA</title>
        <meta name="description" content="Bilkins is a leading healthcare job placement service provider in the USA, offering expert recruitment for nurses, therapists, and lab technologists." />
        <meta name="keywords" content="Healthcare Job Placement Services, Top Healthcare Recruitment Agency, Healthcare Career Opportunities Provider, Healthcare Staffing Solutions USA, Healthcare Employment Services, Healthcare Job Recruitment Experts, Leading Healthcare Jobs Agency, Healthcare Career Placement Experts, Professional Healthcare Job Providers, Healthcare Talent Acquisition USA, Healthcare Workforce Solutions, Healthcare Job Matching Services, Healthcare Career Development Agency, Healthcare Job Recruitment Specialists, Healthcare Employment Agency USA" />
      </Helmet>
      <div className="container-xxl">
      <CareerPageBanner />
      <CareerBanner />
      <CareerForm />
      <CareerOverview />
      <ClienteleNew />
      <ReferEarn />

      </div>
    </>
  );
};

export default Career;
