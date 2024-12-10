import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Modal, Button, Input } from "antd";
const { TextArea } = Input;

export const ClienteleNew = () => {
    const [index, setIndex] = useState(0);
    const sliderRef = useRef();
    const [isModalVisible,setIsModalVisible] =useState(false);
    const [review,setReview] = useState("");

    useEffect(() => {
        sliderRef.current.slickGoTo(index);
    }, [index]);

    const clients = [
        {
            title: "What they say",
            description:
                "“our clients' staffing needs. With her keen eye for talent and extensive industry knowledge, she ensures that every candidate we place is the perfect fit for our clients' requirements.”",
            name: "Emily Bennett",
            position: "Senior Recruitment Specialist",
        },
        {
            title: "What they say",
            description:
                "“our clients and ensuring their satisfaction with our services. With his proactive approach and dedication to client success, Ryan goes above and beyond to exceed expectations and build lasting relationships.”",
            name: "Ryan Parker",
            position: "Client Relations Manager",
        },
        {
            title: "What they say",
            description:
                "“our recruitment processes. Her meticulous attention to detail and organizational skills ensure that our operations run efficiently, enabling us to deliver high-quality services to our clients.”",
            name: "Jessica Nguyen",
            position: "Operations Manager",
        },
        {
            title: "What they say",
            description:
                "“our  recruit and place skilled professionals in the tech industry. With his in-depth understanding of technology trends and exceptional leadership skills, Daniel ensures that our clients have access to the best tech talent available.”",
            name: "Daniel Evans",
            position: "Technology Division Lead",
        },
        {
            title: "What they say",
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
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows:false,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    dots:false,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    dots:false,
                }
               
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    
                dots:false,
                }
            }
        ]
    };
    
    return (
        <>
            <Container  className="ClienteleNew-container">
                <h2>Testimonial</h2>
                <Row>
                    <Col md={4} className="mt-5">
                        <h1><span style={{ color: "#ce1b28", paddingRight: "10px" }}>"</span>What they say about BILKINS<span style={{ color: "#ce1b28", paddingLeft: "10px" }}>"</span></h1>
                        <p>More than 3000+ users have been got there Dream Job it’s time for you.</p>
                        {/* <div className="d-flex ">
                            <button className='review-button' onClick={() => setIsModalVisible(true)} >Write Review</button>
                        </div> */}
                        <Modal
                          title="Write Review"
                          open={isModalVisible}
                          onOk={() => setIsModalVisible(false)}
                          onCancel={() => setIsModalVisible(false)}
                          footer={[
                            <Button key="cancel" danger onClick={() => setIsModalVisible(false)}>
                              Cancel
                            </Button>,
                            <Button key="submit" type="primary" danger onClick={() =>{
                                setIsModalVisible(false);
                                setReview("");
                            }}>
                              Submit
                            </Button>,
                          ]}
                        >
                             <TextArea style={{resize:"none"}} rows={15} value={review} onChange={(e) => setReview(e.target.value)} />
                        </Modal>

                    </Col>
                    <Col md={8}>

                       
                        <div className="slider-wrapper" >
                            <Slider {...settings} ref={sliderRef}>
                                {clients.map((client, idx) => (
                                    <div key={idx} className="client-new-item">
                                        <h4>{client.title}</h4>
                                        <p>{client.description}</p>
                                        <div className="career-client-profile mt-4">
                                            {/* <img src={image} alt={`Profile ${idx + 1}`} /> */}
                                            <div>
                                                <h1>{client.name}</h1>
                                                
                                                <h4>{client.position}</h4>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>

                    </Col>
                </Row>
            </Container>


        </>
    )
}

