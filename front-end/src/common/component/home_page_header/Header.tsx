// Import package members section:
import React, { ReactElement } from "react";
import {
    Button, Card, Container, Form, FormControl, Nav, Navbar
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Carousel1 from './Carousel-1.jpg';
import { textSpanEnd } from "typescript";

export function Header(): ReactElement {
    return (
        <Container
            fluid={true}
        >
            <header>
                <Card className="bg-dark text-white">
                    <Card.Img src={Carousel1} alt="Card image" style={{height:300, opacity:0.3, borderStyle:'none'}}/>
                    <Card.ImgOverlay>
                        <Card.Title style={{fontSize:55, marginTop:80, marginLeft:50}}>Contact</Card.Title>
                        <Card.Text style={{fontSize:25, marginLeft:50}}>
                            Language Center LCS was established in 2021
                        </Card.Text>
                    </Card.ImgOverlay>
                </Card>
            </header>
            <nav>
                <Navbar
                    bg="none"
                    fixed="top"
                    expand="md"
                    className="w-100 px-5"
                >
                    <Navbar.Brand as={Link} to="/"
                        className="py-4"
                        style={{
                            fontFamily: 'Calibri',
                            fontWeight: 'bold',
                            color: 'white',
                        }}
                    >
                        <span style={{ fontSize: 40 + 'px', verticalAlign: 'top' }} >LCS</span>
                        {/* <span style={{fontSize:10}}>Language Center System</span> */}

                    </Navbar.Brand>
                    <Nav
                        id="NavLinkSection"
                        className={
                            `d-md-inline-flex 
                            justify-content-around 
                            container-fluid`
                        }
                    >
                        <Nav.Link as={Link} to="/sign-up-page">
                            Sign up
                        </Nav.Link>
                        <Nav.Link as={Link} to="/log-in-page">
                            Log in
                        </Nav.Link>
                        <Nav.Link as={Link} to="/contact-us">
                            Contact us
                        </Nav.Link>
                    </Nav>
                </Navbar>
            </nav>
        </Container>
    );
}