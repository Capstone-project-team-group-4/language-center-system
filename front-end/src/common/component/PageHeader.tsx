// Import package members section:
import React, { ReactElement } from "react";
import { 
    Button, Carousel, Container, Form, FormControl, Nav, Navbar 
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './PageHeader.css';
import Carousel1 from './Carousel-1.jpg';
import Carousel2 from './Carousel-2.jpg';
import Carousel3 from './Carousel-3.jpg';

export function PageHeader (): ReactElement {
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
                            <h1>Welcome to Language Center</h1>
                            <p>
                                Nâng cao kỹ năng giao tiếp
                                , sử dụng Tiếng Anh trong môi trường công sở
                                , nâng tầm sự phát triển của doanh nghiệp.
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
                            <h1>Foreign language certificates</h1>
                            <p>Lorem ipsum dolor sit amet</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block"
                            src = {Carousel3}
                            alt="Third slide"
                        />
                        <Carousel.Caption>
                            <h1>Third slide label</h1>
                            <p>Praesent commodo cursus magna</p>
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
                    <Navbar.Brand as = {Link} to = "/" className = "py-4">
                        Logo
                    </Navbar.Brand>
                    <Nav 
                        id = "NavLinkSection" 
                        className = {
                            `d-md-inline-flex 
                            justify-content-around 
                            container-fluid`
                        }
                    >
                        <Nav.Link as = {Link} to = "/sign-up">
                            Sign up
                        </Nav.Link>
                        <Nav.Link as = {Link} to = "/log-in">
                            Log in
                        </Nav.Link>
                    </Nav>
                    <Form className = "d-md-inline-flex">
                        <FormControl 
                            type = "text" 
                            placeholder = "Search" 
                            className = "mr-md-2" 
                        />
                        <Button variant = "info">Search</Button>
                    </Form>
                </Navbar>
            </nav>
        </Container>
    );
}