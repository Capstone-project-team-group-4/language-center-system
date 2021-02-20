// Import package members section:
import React, { ReactElement } from "react";
import { 
    Accordion
    , Breadcrumb
    , Button, Card, Col
    , Container
    , Row 
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./AdminConsolePage.css";

interface AdminConsolePageProps {
    modalDialog: ReactElement;
}

export function AdminConsolePage (props: AdminConsolePageProps): ReactElement {
    return (
        <Container fluid = {true}>
            {props.modalDialog}
            <main>
                <Container>
                    <Row>
                        <Col>
                            <Breadcrumb>
                                <Breadcrumb.Item active>
                                    Admin Console
                                </Breadcrumb.Item>
                            </Breadcrumb>
                            <Accordion>
                                <Card>
                                    <Accordion.Toggle 
                                        as = {Card.Header} 
                                        eventKey = "0"
                                    >
                                        Student Management
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey = "0">
                                        <Card.Body>
                                            <Button 
                                                variant = "success"
                                                block = {true}
                                                as = {Link}
                                                to = {
                                                    "/admin-console" 
// eslint-disable-next-line max-len
                                                    + "/create-account-request-page"
                                                }
                                            >
                                                Waiting for approval 
                                                create-account-requests
                                            </Button>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <Accordion.Toggle 
                                        as={Card.Header} 
                                        eventKey="1"
                                    >
                                        Click me!
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="1">
                                        <Card.Body>
                                            Hello! I&apos;m another body
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                        </Col>
                    </Row>
                </Container>
            </main>
            <footer>
            </footer>
        </Container>
    );
}