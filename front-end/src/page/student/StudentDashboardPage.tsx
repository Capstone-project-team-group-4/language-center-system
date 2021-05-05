// Import package members section:
import React, { ReactElement, useState, useEffect } from "react";
import {
  Col,
  Container,
  Row,
  Card,
  Button,
  Breadcrumb,
  Accordion,
} from "react-bootstrap";
import { StudentSidebar } from "../../common/component/student_sidebar/StudentSidebar";
import { Link, useLocation, useParams } from "react-router-dom";
import { Course } from "../../model/Course";
import { CourseAPI } from "../../common/service/CourseAPI";
import { values } from "lodash";
import { LocalStorageService } from "../../common/service/LocalStorageService";
import { Line } from "@ant-design/charts";
import { ChartAPI } from "../../common/service/Chart";

interface StudentDashboardPageProps {
  modalDialog: ReactElement;
  // LoginUser: any;
}

export function StudentDashboardPage(props: any): ReactElement {
  let [course, setCourse] = useState<Course>(new Course());
  let [courseList, setCourseList] = useState<Course[]>([]);
  let [myCourseList, setMyCourseList] = useState<Course[]>([]);
  let courseAPI = new CourseAPI();
  let param: any = useParams();
  let localStorageService = new LocalStorageService();
  const user = sessionStorage.getItem("loggedInUser");
  let idUser = user ? JSON.parse(user).id : 0;

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

    chartAPI.getDataChart(idUser).then((res) => {
      const newValue = res.map((e: any, index: number) => {
        return {
          valueX: e.valueX.toString(),
          valueY: e.valueY,
        };
      });
      setDataChart(newValue);
    });
  }

  useEffect(() => {
    const name = localStorageService.getLoggedUserName();
    courseAPI.getAllCoursesByCurrentUser(name).then((res) => {
      setMyCourseList(res.data);
    });
  }, []);

  return (
    <div style={{ paddingLeft: "15px", paddingRight: "15px" }}>
      {props.modalDialog}
      <main style={{ background: "#fff" }}>
        <StudentSidebar />
        <Container>
          <Row>
            <Col>
              <Breadcrumb>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
                  Home
                </Breadcrumb.Item>
                <Breadcrumb.Item active={true}>
                  Student Dashboard
                </Breadcrumb.Item>
              </Breadcrumb>
              <Row>
                {myCourseList.map((course) => {
                  return (
                    <Col md={3}>
                      <Card className="mb-3">
                        <Card.Body>
                          <Card.Title>
                            {course.courseName}
                            {/* {i.name} */}
                          </Card.Title>
                          <Card.Text>
                            {course.description}
                            {/* {i.age} */}
                          </Card.Text>
                          <Row>
                            <Col>
                              <Button
                                style={{
                                  alignItems: "stretch",
                                  backgroundColor: "blueviolet",
                                  borderColor: "blueviolet",
                                }}
                                block={true}
                                size="sm"
                                as={Link}
                                to={"/course-detail/" + course.courseID}
                              >
                                Detail
                              </Button>
                            </Col>
                            <Col>
                              <Button
                                as={Link}
                                to={"/student-dashboards/" + course.courseID}
                                style={{ alignItems: "stretch" }}
                                size="sm"
                                block
                              >
                                Learn
                              </Button>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
              <Accordion>
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="3">
                    Student Class Management
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="3">
                    <Card.Body>
                      <Button
                        variant="success"
                        block={true}
                        as={Link}
                        to={"/student-class-page"}
                      >
                        Student Class
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
            <p>FPT University</p>
          </section>
        </div>
      </footer>
    </div>
  );
}
