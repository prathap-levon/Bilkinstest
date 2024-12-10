import React, { useState, useRef, useEffect } from "react";
import image from "../../Assets/Img/user/user-2.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Animate from "../Animation/Animate";
import { Container } from "react-bootstrap";

const Clientele = () => {
  const [index, setIndex] = useState(0);
  const sliderRef = useRef();

  useEffect(() => {
    sliderRef.current.slickGoTo(index);
  }, [index]);

  const clients = [
    {
      title: "what they say",
      description:
        "“our clients' staffing needs. With her keen eye for talent and extensive industry knowledge, she ensures that every candidate we place is the perfect fit for our clients' requirements.”",
      name: "Emily Bennett",
      position: "Senior Recruitment Specialist",
    },
    {
      title: "what they say",
      description:
        "“our clients and ensuring their satisfaction with our services. With his proactive approach and dedication to client success, Ryan goes above and beyond to exceed expectations and build lasting relationships.”",
      name: "Ryan Parker",
      position: "Client Relations Manager",
    },
    {
      title: "what they say",
      description:
        "“our recruitment processes. Her meticulous attention to detail and organizational skills ensure that our operations run efficiently, enabling us to deliver high-quality services to our clients.”",
      name: "Jessica Nguyen",
      position: "Operations Manager",
    },
    {
      title: "what they say",
      description:
        "“our  recruit and place skilled professionals in the tech industry. With his in-depth understanding of technology trends and exceptional leadership skills, Daniel ensures that our clients have access to the best tech talent available.”",
      name: "Daniel Evans",
      position: "Technology Division Lead",
    },
    {
      title: "what they say",
      description:
        "“0ur responsible for managing our human resources department. She oversees employee relations, training programs, and ensures compliance with HR policies and regulations.”",
      name: "Sophia Lee",
      position: "HR Manager",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2, 
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <Container fluid className="clientele-container overflow-hidden">
      <div className="clientLeft">
        <Animate>
          <h1>what they say about BILKINS</h1>
        </Animate>
        <p>More than 3000+ users have got their Dream Job, it’s time for you.</p>
      </div>
      <div className="slider-wrapper">
        <Slider {...settings} ref={sliderRef}>
          {clients.map((client, idx) => (
            <div key={idx} className="client-item">
              <div className="career-client-profile">
                <img src={image} alt={`Profile ${idx + 1}`} />
                <div>
                  <h1>{client.name}</h1>
                  <div className="d-flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FontAwesomeIcon key={i} icon={faStar} style={{ color: "#f00f0f" }} />
                    ))}
                  </div>
                  <h4>{client.position}</h4>
                </div>
              </div>
              <p>{client.description}</p>
            </div>
          ))}
        </Slider>
      </div>
    </Container>
  );
};

export default Clientele;
