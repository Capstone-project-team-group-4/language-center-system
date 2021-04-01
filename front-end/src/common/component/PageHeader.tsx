// Import package members section:
import React, { ReactElement } from "react";
import { 
    Button, Container, Form, FormControl, Nav, Navbar 
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface PageHeaderProps {
    logOut (): Promise<void>;
}

export function PageHeader (props: PageHeaderProps): ReactElement {
    return (
        <Container fluid = {true} id = "PageHeader">
            <header>
            </header>
            <nav>
                <Navbar bg = "dark" variant = "dark" expand = "md">
                    <Navbar.Brand as = {Link} to = "/">
                        Language Center
                    </Navbar.Brand>
                    <Nav className = "ml-auto mr-3">
                        {/* <Button 
                            variant = "primary"
                            as = {Link}
                            to = {"/select-role-page"}
                        >
                            Switch role
                        </Button> */}
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