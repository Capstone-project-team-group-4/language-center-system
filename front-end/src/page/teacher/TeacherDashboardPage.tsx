// Import package members section:
import React, { ReactElement } from "react";
import { Col, Container, Row, Accordion, Card, Button } from "react-bootstrap";
import { TeacherSidebar } from "../../common/component/teacher_sidebar/TeacherSidebar";
import { Link } from "react-router-dom";

interface TeacherDashboardPageProps {
  modalDialog: ReactElement;
}

export function TeacherDashboardPage(
  props: TeacherDashboardPageProps
): ReactElement {
  return (
    <Container id="TeacherDashboardPage">
      {props.modalDialog}
      <TeacherSidebar />
      <main>
        <Container>
          <Row>
            <Col>
              <Accordion>
              <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="2">
                    Spare Time Management
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="2">
                    <Card.Body>
                      <Button
                        variant="success"
                        block={true}
                        as={Link}
                        to={"/teacher" + "/spare-time-management"}
                      >
                        Spare Time
                      </Button>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="3">
                    Class Management
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="3">
                    <Card.Body>
                      <Button
                        variant="success"
                        block={true}
                        as={Link}
                        to={"/teacher" + "/class-page"}
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
  );
}
