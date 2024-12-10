import React from "react";
import work1 from "../../Assets/Img/hero/work-1.png";
import work2 from "../../Assets/Img/hero/work-2.png";
import work3 from "../../Assets/Img/hero/work-3.png";
import work4 from "../../Assets/Img/hero/work-4.png";
import Animate from "../Animation/Animate";

const steps = [
  {
    img: work1,
    title: "Profile Creation & Assessment",
    description:
      "Begin by creating your personalized profile on the Bilkins platform. This involves providing information about your skills, experience, career goals, and preferences. Our platform then assesses your profile to understand your unique needs and aspirations.",
  },
  {
    img: work2,
    title: "Smart Job Matching",
    description:
      "Our advanced algorithms analyze your profile and preferences to match you with relevant job opportunities from our extensive database. You'll receive tailored job recommendations that align with your skills, experience, and career objectives, making the job search process more targeted and efficient.",
  },
  {
    img: work3,
    title: "Application & Support",
    description:
      "Once you find a job that interests you, our platform facilitates the application process. You can easily submit your application directly through the platform and track its status. Throughout this process, our team is available to provide guidance, support, and assistance as needed.",
  },
  {
    img: work4,
    title: "Placement & Follow-Up",
    description:
      "After successfully securing a job, Bilkins ensures a smooth transition into your new role. We follow up to ensure your satisfaction and address any concerns you may have. Our support doesn't end there—we continue to provide ongoing assistance, career guidance, and resources to help you thrive in your new position.",
  },
];

const HowItWorks = () => {
  return (
    <div className="home-how-it-works">
      <div className="home-title-how-works">
        <Animate>
          <h3>How It Works</h3>
        </Animate>
        <p>
          Crafting a digital experience that feels personalized and effortlessly
          navigable.
        </p>
      </div>

      <div className="row mt-5">
        {steps.map((step, index) => (
          <div key={index} className="col-lg-3">
            <div className={`how-it-work-${index % 2 === 0 ? 1 : 2}`}>
              <img src={step.img} alt="work" />
              <div className="work-content ">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
