// Import package members section:
import React, { ReactElement } from "react";
import { Col, Container, Jumbotron, Media, Row } from "react-bootstrap";
import './HomePage.css';
import AboutUs from './AboutUs.jpg';

interface HomePageProps {
    modalDialog: ReactElement;
}

export function HomePage (props: HomePageProps): ReactElement {
    return (
        <Container fluid = {true}>
            {props.modalDialog}
            <main>
                <Container 
                    fluid = {true} 
                    className = "px-0"
                >
                    <Row>
                        <Col>
                            <Jumbotron fluid id = "AboutUs">
                                <Container>
                                    <Media>
                                        <Media.Body>
                                            <h2 className = "py-5">
                                                About Language Center
                                            </h2>
                                            <p className = "pr-5">
                                                <span 
                                                    className 
                                                    = "font-weight-bold"
                                                >
                                                    Language Center
                                                </span> is an internal language training and testing organization for the organization, 
                                                especially aimed at employees and students. Language Center brings advanced educational methods, 
                                                maximum technology application. We develop services based on our core values of responsibility, 
                                                flexibility and creativity. Each Language Center's product, service and action meets 3 criteria: 
                                                flexibility, efficiency, and efficiency.
                                            </p>
                                        </Media.Body>
                                        <img
                                            width = "40%"
                                            height = "200%"
                                            className="mr-3"
                                            src = {AboutUs}
                                            alt="Generic placeholder"
                                        />         
                                    </Media>
                                </Container>
                            </Jumbotron>
                            <div>sdasdsadsadsa</div>
                        </Col>
                    </Row>
                </Container>
            </main>
            <footer>
            </footer>
        </Container>
    );
}