// Import package members section:
import React, { ReactElement, useState, useEffect } from "react";
import { Col, Container, Row, Card, Button, Breadcrumb } from "react-bootstrap";
import {
    StudentSidebar
} from "../../common/component/student_sidebar/StudentSidebar";
import { Link, useLocation, useParams } from "react-router-dom";
import { Course } from "../../model/Course";
import { CourseAPI } from "../../common/service/CourseAPI";
import { values } from "lodash";
import { LocalStorageService } from "../../common/service/LocalStorageService";


interface StudentDashboardPageProps {
    modalDialog: ReactElement;
    // LoginUser: any;
}

export function StudentDashboardPage(
    props: any
): ReactElement {
    let [myCourseList, setMyCourseList] = useState<Course[]>([]);
    let courseAPI = new CourseAPI();
    let localStorageService = new LocalStorageService();

    useEffect(() => {
        const name = localStorageService.getLoggedUserName();
        courseAPI.getAllCoursesByCurrentUser(name).then(
            (res) => {
                setMyCourseList(res.data);
            }
        )
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
                                <Breadcrumb.Item
                                    linkAs={Link}
                                    linkProps={{ to: "/" }}
                                >
                                    Home
                                </Breadcrumb.Item>
                                <Breadcrumb.Item active={true}>
                                    Student Dashboard
                                </Breadcrumb.Item>
                            </Breadcrumb>
                            <Row>
                                {myCourseList.map((course, i) => {
                                    return (
                                        <Col md={3} key={i}>
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
                                                                style={{alignItems: 'stretch', backgroundColor: 'blueviolet', borderColor: 'blueviolet'}}
                                                                block = {true}
                                                                size="sm"
                                                                as = {Link}
                                                                to = {
                                                                    "/course-detail/" + course.courseID
                                                                }
                                                            >
                                                                Detail
                                                            </Button>
                                                        </Col>
                                                        <Col>
                                                            <Button 
                                                                    as = {Link}
                                                                    to = {
                                                                        "/student-dashboards/" + course.courseID
                                                                    }
                                                                    style={{ alignItems: 'stretch' }} 
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
                                    )
                                })}
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </main >
        </Container >
    );
}