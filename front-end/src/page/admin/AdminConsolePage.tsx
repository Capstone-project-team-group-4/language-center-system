// Import package members section:
import React, { ReactElement } from "react";
import { 
    Accordion
    , Breadcrumb
    , Button
    , Card
    , Col
    , Container
    , Row 
} from "react-bootstrap";
import { Link } from "react-router-dom";

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
                                <Breadcrumb.Item 
                                    linkAs = {Link}
                                    linkProps = {{to: "/"}}
                                >
                                    Home
                                </Breadcrumb.Item>
                                <Breadcrumb.Item active = {true}>
                                    Admin Console
                                </Breadcrumb.Item>
                            </Breadcrumb>
                            <Accordion>
                                <Card>
                                    <Accordion.Toggle 
                                        as = {Card.Header} 
                                        eventKey = "0"
                                    >
                                        User Account Management
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
                                                Accept Create-Account-Requests
                                            </Button>
                                            <Button 
                                                variant = "success"
                                                block = {true}
                                                as = {Link}
                                                to = {
                                                    "/admin-console" 
                                            // eslint-disable-next-line max-len
                                                    + "/disable-or-delete-account-page"
                                                }
                                            >
                                                Disable Or Delete User Account
                                            </Button>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <Accordion.Toggle 
                                        as = {Card.Header} 
                                        eventKey = "1"
                                    >
                                        Course
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey = "1">
                                        <Card.Body>
                                            <Button 
                                                variant = "success"
                                                block = {true}
                                                as = {Link}
                                                to = {
                                                    "/admin-console"
                                                    + "/manage-course-page"
                                                }
                                            >
                                                Manage Course
                                            </Button>
                                            <Button 
                                                variant = "success"
                                                block = {true}
                                                as = {Link}
                                                to = {
                                                    "/admin-console"
                                            // eslint-disable-next-line max-len
                                                    + "/manage-things-in-course-page"
                                                }
                                            >
                                                Manage Things In Course
                                            </Button>
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