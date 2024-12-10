import React from 'react'
import { Container, Row } from 'react-bootstrap';
import Animate from '../Animation/Animate';
import { useNavigate } from "react-router-dom";

const PostPageBanner = ({ postTitle, postSubTitle, imageURL }) => {

    const navigate = useNavigate();

    const handleApplyLink = () => {
        navigate("/apply-now/quick-application");
    }
    const handleContactLink = () => {
        navigate("/contact");
    }
    return (
        <div>
            <Container fluid className='postPagebanner-container'>
                <Row>

                    <div className='service-banner-right'>
                        <div className='serviceBaner-text text-center'>
                            <Animate>
                                <h1>{postTitle}</h1>
                            </Animate>
                            <h3>{postSubTitle}</h3>
                            <div className="d-flex justify-content-center mt-4">
                                <button className='home-about-us-btn-1' onClick={handleApplyLink}>Apply Now</button>
                                <button className='service-about-btn ml-3' onClick={handleContactLink} >Contact Us</button>
                            </div>
                        </div>
                    </div>
                </Row>
            </Container>
        </div>
    )
}
export default PostPageBanner;
