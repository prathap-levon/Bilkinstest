import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import map from "../../Assets/Img/hero/map.png"

const Branches = () => {
    return (
        <Container>
            <Row className='careerBranches'>
                <Col md={7}>
                    <h1>We Have Branches<br /> All
                        Over The World</h1>
                    <p>From bustling cities to remote corners, our network ensures accessibility
                        and support wherever you are. Join our diverse team and experience the
                        opportunity to work across borders, cultures, and continents. Wherever
                        your career takes you, we're there to support your journey every step of the way.</p>
                </Col>
                <Col md={5}>
                    <img src={map} alt="map" />
                </Col>
            </Row>
        </Container>
    )
}
export default Branches;