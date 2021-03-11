// Import package members section:
import React, { ReactElement } from "react";
import { 
    Button, Container, Form, FormControl, Nav, Navbar 
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface AdminPageHeaderProps {
    logOut (): Promise<void>;
}

export function AdminPageHeader (props: AdminPageHeaderProps): ReactElement {
    return (
        <Container fluid = {true}>
            <header>
            </header>
            <nav>
                <Navbar bg = "dark" variant = "dark">
                    <Navbar.Brand as = {Link} to = "/">
                        Language Center
                    </Navbar.Brand>
                    <Nav className = "ml-auto mr-3">
                        <Button 
                            variant = "danger"
                            onClick = {props.logOut}
                        >
                            Log out
                        </Button>
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