// Import package members section:
import React, { ReactElement } from "react";
import { 
    Button, Container, Form, FormControl, Nav, Navbar 
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function AdminPageHeader (): ReactElement {
    return (
        <Container fluid = {true}>
            <header>
            </header>
            <nav>
                <Navbar bg = "dark" variant = "dark">
                    <Navbar.Brand as = {Link} to = "/">
                        Language Center
                    </Navbar.Brand>
                    <Nav className = "mr-auto">
                    </Nav>
                    <Form inline>
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