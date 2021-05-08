// Import package members section:
import React, { ReactElement, useEffect, useState } from "react";
import { Line } from "@ant-design/charts";
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
import { ChartAPI } from "../../common/service/Chart";

interface AdminConsolePageProps {
  modalDialog: ReactElement;
}

export function AdminConsolePage(props: AdminConsolePageProps): ReactElement {
  let chartAPI: ChartAPI | undefined;
  const [data, setDataChart] = useState([]);

  const config = {
    data,
    height: 400,
    xField: "valueX",
    yField: "valueY",
    point: {
      size: 5,
      shape: "diamond",
    },
    label: {
      style: {
        fill: "#aaa",
      },
    },
  };

  useEffect(() => {
    getDataChart();
  }, []);

  function getDataChart() {
    chartAPI = new ChartAPI();

    chartAPI.getDataChart().then((res) => {
      const newValue = res.map((e: any, index: number) => {
        return {
          valueX: "Exam " + e.valueX.toString(),
          valueY: e.valueY,
        };
      });
      setDataChart(newValue);
    });
  }

  return (
    <Container fluid={true}>
      {props.modalDialog}
      <main style={{ background: "#fff" }}>
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
                        // as={Link}
                        // to={"/admin" + "/spare-time-management"}
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
                        // as={Link}
                        // to={"/admin-console" + "/class-page"}
                      >
                        Class
                      </Button>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </Col>
          </Row>
          <div style={{ marginTop: "30px", paddingBottom: "30px" }}>
            <Line {...config} />
          </div>
        </Container>
      </main>
      <footer className="bg-dark text-center text-white">
        <div className="container p-4">
          <section className="">
            <form action="">
              <div className="row d-flex justify-content-center">
                <div className="col-auto">
                  <p className="pt-2">
                    <strong>Sign up for our newsletter</strong>
                  </p>
                </div>
                <div className="col-md-5 col-12">
                  <div className="form-outline form-white mb-4">
                    <input
                      type="email"
                      id="form5Example2"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-auto">
                  <button type="submit" className="btn btn-outline-light mb-4">
                    Subscribe
                  </button>
                </div>
              </div>
            </form>
          </section>
          <section className="mb-4">
            <p>
            FPT University
            </p>
          </section>
        </div>
      </footer>
    </Container>
    //   </main>
    //   <footer></footer>
    // </Container>
  );
}
