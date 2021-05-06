// Import package members section:
import React, { ReactElement } from "react";
import { 
    Button, Carousel, Container, Form, FormControl, Nav, Navbar 
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './HomePageHeader.css';
import Carousel1 from './Carousel-1.jpg';
import Carousel2 from './Carousel-2.jpg';
import Carousel3 from './Carousel-3.jpg';
import Logo from './Logo.png';
import { textSpanEnd } from "typescript";

export function HomePageHeader (): ReactElement {
    return (
        <Container 
            fluid = {true}
        >
            <header>
                <Carousel id = "HeaderCarousel">
                    <Carousel.Item>
                        <img
                            className="d-block"
                            src = {Carousel1}
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h1 style={{color:"white"}}>Welcome to Language Center</h1>
                            <p style={{textAlign:'left'}}>
                            LCS has a mission to help improve and improve foreign languages for employees, 
                            students easily get job opportunities and deeply integrate in the knowledge economy.
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block"
                            src = {Carousel2}
                            alt="Third slide"
                        />
                        <Carousel.Caption>
                            <h1 style={{textAlign:'left', color:"white"}}>Career Skills - Soft skills develop themselves at work</h1>
                            <p style={{textAlign:'left'}}>
                            Giving learners 5 essential and important soft skills for employees: Study skills; 
                            Personal development skills; Communication skills; Speech skills; Leadership skills
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block"
                            src = {Carousel3}
                            alt="Third slide"
                        />
                        <Carousel.Caption>
                            <h1 style={{textAlign:'left', color:"white"}}>JLPT certified Japanese for student and employee</h1>
                            <p style={{textAlign:'left'}}>
                            Expand your opportunities for personal development by Japanese-Language Proficiency Test - JLPT
                            with a commitment to meeting the output standards with a minimum of N4
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </header>
            <nav>
                <Navbar 
                    bg = "none" 
                    fixed="top"
                    expand = "md"
                    className = "w-100 px-5"
                >
                    <Navbar.Brand as = {Link} to = "/" 
                                className = "py-4" 
                                style={{fontFamily: 'Calibri', 
                                        fontWeight: 'bold',
                                        color: 'white',
                                    }}
                    >
                        <img
                            className="d-block"
                            style = {{
                                width: 150
                                , height: 40
                            }}
                            src = {Logo}
                            alt = "Logo"
                        />
                    </Navbar.Brand>
                    <Nav 
                        id = "NavLinkSection" 
                        className = {
                            `d-md-inline-flex 
                            justify-content-around 
                            container-fluid`
                        }
                    >
                        <Nav.Link as = {Link} to = "/sign-up-page">
                            Sign up
                        </Nav.Link>
                        <Nav.Link as = {Link} to = "/log-in-page">
                            Log in
                        </Nav.Link>
                        <Nav.Link as = {Link} to = "/contact-us">
                            Contact us
                        </Nav.Link>
                    </Nav>
                </Navbar>
            </nav>
        </Container>
    );
}