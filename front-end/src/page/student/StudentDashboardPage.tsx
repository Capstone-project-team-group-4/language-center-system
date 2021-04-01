// Import package members section:
import React, { ReactElement, useState, useEffect } from "react";
import { Col, Container, Row, Card, Button, Breadcrumb } from "react-bootstrap";
import {
    StudentSidebar
} from "../../common/component/student_sidebar/StudentSidebar";
import { Link, useParams } from "react-router-dom";
import { Course } from "../../model/Course";
import { CourseAPI } from "../../common/service/CourseAPI";
import { values } from "lodash";


interface StudentDashboardPageProps {
    modalDialog: ReactElement;
}

export function StudentDashboardPage(
    props: StudentDashboardPageProps
): ReactElement {
    let a: number[] = [14, 16, 17]
    let [course, setCourse] = useState<Course>(new Course());
    let [courseList, setCourseList] = useState<Course[]>([]);
    let courseAPI = new CourseAPI();
    let param: any = useParams();

    useEffect(() => {
        // courseAPI = new CourseAPI();
        a.map((id) => {
            return (
                courseAPI.getOneCourse(id).then(
                    (res) => {
                        courseList.push(res.data);
                        setCourseList(courseList);
                        // console.log(student.userName);
                    }
                )
            )
        })
        courseAPI.getOneCourse(14).then(
            (res) => {
                setCourse(res.data);
                // console.log(student.userName);
            }
        );
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
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                {courseList.map((course) => {
                                    return (
                                        <Card style={{width: 400, marginRight: 50 }}>
                                            <Card.Body>
                                                <Card.Title>
                                                    {course.courseName}
                                                    {/* {i.name} */}
                                                </Card.Title>
                                                <Card.Text>
                                                    {course.description}
                                                    {/* {i.age} */}
                                                </Card.Text>
                                                <Button variant="primary" href={"/student-dashboard-course/" + course.courseID} style={{alignItems: 'stretch'}}>
                                                    Detail
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    )
                                })}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </main >
        </Container >
    );
}