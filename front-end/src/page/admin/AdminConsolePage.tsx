// Import package members section:
import React, { ReactElement } from "react";
import {
  Accordion,
  Breadcrumb,
  Button,
  Card,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";

interface AdminConsolePageProps {
  modalDialog: ReactElement;
}

export function AdminConsolePage(props: AdminConsolePageProps): ReactElement {
  return (
    <Container fluid={true}>
      {props.modalDialog}
      <main>
        <Container>
          <Row>
            <Col>
              <Breadcrumb>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
                  Home
                </Breadcrumb.Item>
                <Breadcrumb.Item active={true}>Admin Console</Breadcrumb.Item>
              </Breadcrumb>
              <Accordion>
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="0">
                    User Account Management
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <Button
                        variant="success"
                        block={true}
                        as={Link}
                        to={
                          "/admin-console" +
                          // eslint-disable-next-line max-len
                          "/create-account-request-page"
                        }
                      >
                        Accept Create-Account-Requests
                      </Button>
                      <Button
                        variant="success"
                        block={true}
                        as={Link}
                        to={
                          "/admin-console" +
                          // eslint-disable-next-line max-len
                          "/disable-or-delete-account-page"
                        }
                      >
                        Disable Or Delete User Account
                      </Button>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="1">
                    Student
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="1">
                    <Card.Body>
                      <Button
                        variant="success"
                        block={true}
                        as={Link}
                        to={"/admin-console/manage-student-page"}
                      >
                        Manage Student
                      </Button>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="2">
                    Course
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="2">
                    <Card.Body>
                      <Button
                        variant="success"
                        block={true}
                        as={Link}
                        to={"/admin-console" + "/manage-course-page"}
                      >
                        Manage Course
                      </Button>
                      <Button
                        variant="success"
                        block={true}
                        as={Link}
                        to={
                          "/admin-console" +
                          // eslint-disable-next-line max-len
                          "/manage-things-in-course-page"
                        }
                      >
                        Manage Things In Course
                      </Button>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>

                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="3">
                    Teacher
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="3">
                    <Card.Body>
                      <Button
                        variant="success"
                        block={true}
                        as={Link}
                        to={"/admin-console" + "/manage-teacher-page"}
                      >
                        Manage Teacher
                      </Button>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>

                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="4">
                    Examination
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="4">
                    <Card.Body>
                      <Button
                        variant="success"
                        block={true}
                        as={Link}
                        to={
                          "/admin-console" +
                          // eslint-disable-next-line max-len
                          "/manage-things-in-examination-page"
                        }
                      >
                        Manage Things In Examination
                      </Button>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="5">
                    Spare Time Management
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="5">
                    <Card.Body>
                      <Button
                        variant="success"
                        block={true}
                        as={Link}
                        to={"/admin" + "/spare-time-management"}
                      >
                        List Spare Time
                      </Button>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>

                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="6">
                    Class Management
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="6">
                    <Card.Body>
                      <Button
                        variant="success"
                        block={true}
                        as={Link}
                        to={"/admin-console" + "/class-page"}
                      >
                        Class
                      </Button>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </Col>
          </Row>
        </Container>
      </main>
      <footer></footer>
    </Container>
    //   </main>
    //   <footer></footer>
    // </Container>
  );
}
