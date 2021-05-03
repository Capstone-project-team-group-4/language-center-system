// Import package members section:
import React, { ReactElement } from "react";
import {
    Button, Col, Container, Form, FormControl, Nav, Navbar, Row
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface PageHeaderProps {
    logOut(): Promise<void>;
}

export function PageHeader(props: PageHeaderProps): ReactElement {
    return (
        <Container fluid={true} id="PageHeader">
            <header>
            </header>
            <nav>
                <Navbar bg="dark" variant="dark" expand="md">
                    <Navbar.Brand as={Link} to="/">
                        Language Center
                    </Navbar.Brand>
                    <Nav className="ml-auto mr-3">
                        <Row>
                            <Col>
                                <Button
                                    variant="primary"
                                    as={Link}
                                    to={"/select-role-page"}
                                    block
                                    style={{width: 110}}
                                >
                                    Switch role
                                </Button>
                            </Col>
                            <Col>
                                <Button
                                    variant="danger"
                                    onClick={props.logOut}
                                    block
                                >
                                    Log out
                                </Button>
                            </Col>
                        </Row>
                    </Nav>
                    <Form inline>
                        <FormControl
                            type="text"
                            placeholder="Search"
                            className="mr-md-2"
                        />
                        <Button variant="info">Search</Button>
                    </Form>
                </Navbar>
            </nav>
        </Container>
    );
}