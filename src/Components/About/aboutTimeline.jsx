import React from "react";
import {
  BsBadge3D,
  BsGlobe,
  BsGlobeEuropeAfrica,
  BsGraphUpArrow,
  BsHandThumbsUp,
  BsShieldShaded,
  BsSkipStart,
  BsStopBtn,
  BsUnity,
} from "react-icons/bs";

const Timeline = () => {
  const initialItems = [
    {
      date: "2016",
      content:
        "Bilkins laid the foundation for its operations, dedicated to providing exceptional Recruitment & Staffing Services nationwide.",
      icon: <BsSkipStart />,
    },
    {
      date: "2017",
      content:
        " Building on the success of the previous year, Bilkins continued to enhance its service offerings, catering to the evolving needs of its diverse clientele",
      icon: <BsGraphUpArrow />,
    },
    {
      date: "2018",
      content:
        " Bilkins experienced a period of accelerated growth and innovation. Leveraging its strong foundation and expertise in recruitment and staffing.",
      icon: <BsGlobe />,
    },
    {
      date: "2019",
      content:
        " Bilkins continued its upward trajectory, further solidifying its position as a trusted leader in the recruitment and staffing industry",
      icon: <BsGlobeEuropeAfrica />,
    },
    {
      date: "2020",
      content:
        "Despite the unprecedented challenges posed by the global pandemic, Bilkins demonstrated resilience and adaptability in 2020.",
      icon: <BsBadge3D />,
    },
    {
      date: "2021",
      content:
        ":Bilkins embraced a renewed sense of optimism and opportunity as the world began to emerge from the challenges of the previous year.",
      icon: <BsUnity />,
    },
    {
      date: "2022",
      content:
        " Bilkins continued its trajectory of growth and expansion, solidifying its position as a market leader in recruitment and staffing.",
      icon: <BsHandThumbsUp />,
    },
    {
      date: "2023",
      content:
        "Bilkins embraced cutting-edge tools and platforms to streamline processes and enhance service delivery. ",
      icon: <BsShieldShaded />,
    },
    {
      date: "2024",
      content:
        " Bilkins remained committed to its core values of  client satisfaction, ensuring that every interaction reflected its  dedication to excellence.", 
        
      icon: <BsStopBtn />,
    },
  ];

  return (
    <div className="about-timeline-section">
      <div className="timeline">
        {initialItems.map((item, index) => (
          <div key={index} className="timeline-content">
            <div className="timeline-period">{item.date}</div>
            <div className="timeline-icon">{item.icon}</div>
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
