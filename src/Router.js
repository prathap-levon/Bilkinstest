import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./Pages/Home/Home";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import About from "./Pages/About/About";
import Service from "./Pages/Service/Service";
import Career from "./Pages/Career/Career";
import ContactPage from "./Pages/Contact/contactForm.jsx";
import Hiringlocation from "./Pages/HiringLocation/hiringLocation";
import ScrollToTop from "./Components/ScrollTop/ScrollTop";
import { GridLoader } from "react-spinners";
import { FullApplication } from "./Pages/ApplyNow/FullApplication.jsx";
import { QuickApplication } from "./Pages/ApplyNow/QuickApplication.jsx";
import { JoinUsQuickApplication } from "./Pages/Join Us/JoinUsQuickApplication.jsx";
import { JoinUsFullApplication } from "./Pages/Join Us/JoinUsFullApplication.jsx";
import SignUp from "./Pages/Auth/signup.jsx";
import { SignIn } from "./Pages/Auth/signin.jsx";
import PostDetail from "./Pages/PostDetails/PostDetail.jsx";
import { JobPages } from "./Pages/JobPages/JobPage.jsx";
import JobDetail from "./Pages/JobPages/JobDetail";
import Error404 from "./Components/404Error/Error404.jsx";
import Refer from "./Pages/Refer/Refer.jsx";
import ForgotPassword from "./Pages/Auth/ForgotPassword.jsx";
import ResetPassword from "./Pages/Auth/ResetPassword.jsx";
import WeeklyPay from "./Pages/BenefitsPay/WeeklyPay.jsx";
import SickLeave from "./Pages/BenefitsPay/SickLeave.jsx";
import Holiday from "./Pages/BenefitsPay/Holiday.jsx";
import ShortTerm from "./Pages/BenefitsPay/ShortTerm.jsx";
import Travel from "./Pages/BenefitsPay/Travel.jsx";
import Referal from "./Pages/BenefitsPay/Referal.jsx";
import Housing from "./Pages/BenefitsPay/Housing.jsx";
import Education from "./Pages/BenefitsPay/Education.jsx";
import Employees from "./Pages/BenefitsPay/Employees.jsx";
import { Signup } from "./JobSeeker/Components/Auth/Signup.jsx";
import { ForgetPassword } from "./JobSeeker/Components/Auth/ForgotPassword.jsx";
import { OtpPage } from "./JobSeeker/Components/Auth/Otp.jsx";
import { CreatePassword } from "./JobSeeker/Components/Auth/CreatePassword.jsx";
import { Login } from "./JobSeeker/Components/Auth/Login.jsx";
import DashboardPage from "./JobSeeker/Pages/Dashboard/DashboardPage.jsx";
import AppliedJobPage from "./JobSeeker/Pages/AppliedJob/AppliedJobPage.jsx";
import FavouriteJobPage from "./JobSeeker/Pages/FavouriteJob/FavouriteJobPage.jsx";
import JobAlertsPage from "./JobSeeker/Pages/JobAlerts/JobAlertsPage.jsx";

import ProtectUser from "./JobSeeker/Components/Auth/ProtectUser.jsx";

import JobOverviewPage from "./JobSeeker/Pages/JobAlerts/JobOverviewPage.jsx";

import SavedJobsPage from "./JobSeeker/Pages/SavedJobs/SavedJobsPage.jsx";
import ProfilePage from "./JobSeeker/Pages/MyProfile/ProfilePage.jsx";
import SettingsPage from "./JobSeeker/Pages/Settings/SettingsPage.jsx";
import HelpSupportPage from "./JobSeeker/Pages/HelpSupport/HelpSupportPage.jsx";
import MessagePage from "./JobSeeker/Pages/Message/MessagePage.jsx";
import ReferEarnPage from "./JobSeeker/Pages/ReferEarn/ReferEarnPage.jsx";
import ReferEarnStatusPage from "./JobSeeker/Pages/ReferEarn/ReferEarnStatusPage.jsx";
import PayrollPage from "./JobSeeker/Pages/MyProfile/PayrollPage.jsx";
import NotificationPage from "./JobSeeker/Pages/Notifiactions/NotificationPage.jsx";
import { Disclaimer } from "./Pages/PrivacyPolicy/Disclaimer.jsx";
import { TermsAndConditions } from "./Pages/PrivacyPolicy/TermsAndConditions.jsx";
import { PrivacyPolicy } from "./Pages/PrivacyPolicy/PrivacyPolicy.jsx";
import { UnsubscribeForm } from "./Components/Contact/UnsubscribeForm.jsx";


const Layout = ({ children }) => {
  const location = useLocation();
  const shouldRenderFooter =
    !location.pathname.includes("/forgot-password") &&
    !location.pathname.includes("/reset-password") &&
    !location.pathname.includes("/search-jobs") &&
    !location.pathname.includes("/user/login") &&
    !location.pathname.includes("/user/signup") &&
    !location.pathname.includes("/user/otp") &&
    !location.pathname.includes("/user/create-password") &&
    !location.pathname.includes("/user/dashboard") &&
    !location.pathname.includes("/user/applied-jobs") &&
    !location.pathname.includes("/user/favourite-jobs") &&
    !location.pathname.includes("/user/saved-jobs") &&

    !location.pathname.includes("/user/job-alerts")&&
  !location.pathname.includes("/user/job-overview")&&
  !location.pathname.includes("/user/profile")&&
  !location.pathname.includes("/user/settings")&&
  !location.pathname.includes("/user/help-support")&&
  !location.pathname.includes("/user/message")&&
  !location.pathname.includes("/user/refer-earn")&&
  !location.pathname.includes("/user/payroll") &&
  !location.pathname.includes("/user/referal-requests")&&
  !location.pathname.includes("/user/notifications")


  const shouldRenderHeader =
    !location.pathname.includes("/forgot-password") &&
    !location.pathname.includes("/reset-password") &&    
    !location.pathname.includes("/user/login") &&
    !location.pathname.includes("/user/signup") &&
    !location.pathname.includes("/user/otp") &&
    !location.pathname.includes("/user/create-password") &&
    !location.pathname.includes("/user/dashboard") &&
    !location.pathname.includes("/user/applied-jobs") &&
    !location.pathname.includes("/user/favourite-jobs") &&
    !location.pathname.includes("/user/saved-jobs") &&
    !location.pathname.includes("/user/job-alerts")&&
  !location.pathname.includes("/user/job-overview")&&
  !location.pathname.includes("/user/profile")&&
  !location.pathname.includes("/user/settings")&&
  !location.pathname.includes("/user/help-support")&&
  !location.pathname.includes("/user/message")&&
  !location.pathname.includes("/user/refer-earn")&&
  !location.pathname.includes("/user/payroll") &&
  !location.pathname.includes("/user/referal-requests")&&
  !location.pathname.includes("/user/notifications")



  return (
    <>
      {shouldRenderHeader && <Header />}
      {children}
      {shouldRenderFooter && <Footer />}
    </>
  );
};

const AppRoutes = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const hideLoader = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(hideLoader);
  }, []);

  return (
    <Router>
      <Layout>
        <ScrollToTop />
        {isLoading && (
          <div className="loader">
            <GridLoader size={15} color={"#123abc"} loading={isLoading} />
          </div>
        )}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/sign-up" element={<SignUp />} />
          <Route exact path="/sign-in" element={<SignIn />} />
          <Route exact path="/career" element={<Career />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<ContactPage />} />
          <Route exact path="/weekly-pay" element={<WeeklyPay />} />
          <Route exact path="/sick-leave" element={<SickLeave />} />
          <Route exact path="/holiday" element={<Holiday />} />
          <Route exact path="/short-term" element={<ShortTerm />} />
          <Route exact path="/travel" element={<Travel />} />
          <Route exact path="/referal-bonus" element={<Referal />} />
          <Route exact path="/housing" element={<Housing />} />
          <Route exact path="/education" element={<Education />} />
          <Route exact path="/employees" element={<Employees />} />
          <Route exact path="/service" element={<Service setIsLoading={setIsLoading} />} />
          <Route exact path="/search-jobs" element={<JobPages />} />
          <Route exact path="/join-us/quick-application" element={<JoinUsQuickApplication />} />
          <Route exact path="/join-us/full-application" element={<JoinUsFullApplication />} />
          <Route exact path="/disclaimer" element={<Disclaimer />} />
          <Route exact path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route exact path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route exact path="/unsubscribe-form" element={<UnsubscribeForm />} />




          {/* <Route path="/apply-now/quick-application/:id" element={<QuickApplication />} /> */}
          {/* <Route path="/apply-now/full-application/:id" element={<FullApplication />} /> */}
          <Route exact path="/jobs/:location/:title/:id" element={<JobDetail />} />
          {/* <Route
            exact
            path="/post/:categorySlug/:postId"
            element={<PostDetail setIsLoading={setIsLoading} />}
          /> */}
          <Route exact path="/location" element={<Hiringlocation />} />
          {/* <Route path="/health-care" element={<HealthCare />} /> */}
          <Route path="/:postUrl" element={<PostDetail />} />
          <Route path="/job-pages" element={<JobPages />} />
          <Route path="/refer" element={<Refer />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/*" element={<Error404 />} />

          {/* job seeker routes */}
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/signup" element={<Signup />} />
          <Route path="/user/forgot-password" element={<ForgetPassword />} />
          <Route path="/user/otp" element={<OtpPage />} />
          <Route path="/user/create-password" element={<CreatePassword />} />
          <Route path="/user/dashboard" element={<ProtectUser Component={DashboardPage} />} />
          <Route path="/user/job-overview" element={<ProtectUser Component={JobOverviewPage} />}/>
          <Route path="/user/applied-jobs" element={<ProtectUser Component={AppliedJobPage} />} />
          <Route path="/user/favourite-jobs" element={<ProtectUser Component={FavouriteJobPage} />} />
          <Route path="/user/saved-jobs" element={<ProtectUser Component={SavedJobsPage} />} />
          <Route path="/user/job-alerts" element={<ProtectUser Component={JobAlertsPage} />} />
          <Route path="/user/profile" element={< ProtectUser Component={ProfilePage}/>}/>
          <Route path="/user/settings" element={<ProtectUser Component={SettingsPage} />}/>
          <Route path="/user/help-support" element={<ProtectUser Component={HelpSupportPage} />}/>
          <Route path="/user/message" element={<ProtectUser Component={MessagePage} />}/>
          <Route path="/user/refer-earn" element={<ProtectUser Component={ReferEarnPage} />}/>

          <Route path="/user/payroll" element={<ProtectUser Component={PayrollPage} />}/>

          <Route path="/user/referal-requests" element={<ProtectUser Component={ReferEarnStatusPage} />}/>
          <Route path="/user/notifications" element={<ProtectUser Component={NotificationPage} />}/>



        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRoutes;
