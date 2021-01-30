import React, { ReactElement } from "react";
import { 
    Button, Container, Form, FormControl, Nav, Navbar 
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './AdminPageHeader.css';

export function AdminPageHeader (): ReactElement {
    return (
        <Container fluid = {true} id = "PageHeaderContainer">
            <header>
            </header>
            <nav>
                <Navbar bg = "dark" variant = "dark">
                    <Navbar.Brand as = {Link} to = "/">
                        Demo Prototype
                    </Navbar.Brand>
                    <Nav className = "mr-auto">
                        <Nav.Link as = {Link} to = "/">
                            Sign Up
                        </Nav.Link>
                        <Nav.Link as = {Link} to = "/my-profile">
                            My Profile
                        </Nav.Link>
                        <Nav.Link href = "#pricing">Pricing</Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl 
                            type = "text" 
                            placeholder = "Search" 
                            className = "mr-sm-2" 
                        />
                        <Button variant = "info">Search</Button>
                    </Form>
                </Navbar>
            </nav>
        </Container>
    );
}