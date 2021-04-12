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


interface StudentDashboardPageProps {
    modalDialog: ReactElement;
    // LoginUser: any;
}

export function StudentDashboardPage(
    props: any 
): ReactElement {
    let [course, setCourse] = useState<Course>(new Course());
    let [courseList, setCourseList] = useState<Course[]>([]);
    let [myCourseList, setMyCourseList] = useState<Course[]>([]);
    let courseAPI = new CourseAPI();
    let param: any = useParams();

    useEffect(() => {
        
        const account:any = localStorage.getItem('account');
        const js = JSON.parse(account).userName;
        console.log("asasasa", js);
        // console.log("asasasa", localStorage.getItem('sonDoHoi'));
        courseAPI.getAllCoursesByCurrentUser("a").then(
            (res) => {
                setMyCourseList(res.data);
                console.log("12345", localStorage.getItem('sonDoHoi'));
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
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                {myCourseList.map((course) => {
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
                                                <Button variant="primary" style={{alignItems: 'stretch'}}>
                                                    Detail
                                                </Button>
                                                <Button variant="primary" href={"/student-dashboard-course/" + course.courseID} style={{alignItems: 'stretch'}}>
                                                    Learn
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