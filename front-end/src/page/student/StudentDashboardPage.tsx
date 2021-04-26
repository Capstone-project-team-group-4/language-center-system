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

  useEffect(() => {
    const name = localStorageService.getLoggedUserName();
    courseAPI.getAllCoursesByCurrentUser(name).then((res) => {
      setMyCourseList(res.data);
    });
  }, []);

  return (
    <Container id="StudentDashboardPage">
      {props.modalDialog}
      <main>
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
              <div style={{ display: "flex", flexDirection: "row" }}>
                {myCourseList.map((course) => {
                  return (
                    <Card style={{ width: 400, marginRight: 50 }}>
                      <Card.Body>
                        <Card.Title>
                          {course.courseName}
                          {/* {i.name} */}
                        </Card.Title>
                        <Card.Text>
                          {course.description}
                          {/* {i.age} */}
                        </Card.Text>
                        <Button
                          variant="primary"
                          style={{ alignItems: "stretch" }}
                        >
                          Detail
                        </Button>
                        <Button
                          variant="primary"
                          href={"/student-dashboard-course/" + course.courseID}
                          style={{ alignItems: "stretch" }}
                        >
                          Learn
                        </Button>
                      </Card.Body>
                    </Card>
                  );
                })}
              </div>
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
                      to={"/student" + "/class-page"}
                    >
                      Student Class
                    </Button>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
            </Col>
          </Row>
        </Container>
      </main>
    </Container>
  );
}
