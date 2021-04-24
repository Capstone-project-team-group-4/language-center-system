import React, { useEffect, useState } from "react";
import { ReactElement } from "react";
import { Breadcrumb, Col, Container, Image, Row, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { StudentSidebar } from "../../common/component/student_sidebar/StudentSidebar";
import { CourseAPI } from "../../common/service/CourseAPI";
import { Course } from "../../model/Course";


interface StudentDashboardPageProps {
    modalDialog: ReactElement;
}

export function CourseDetailPage(
    props: StudentDashboardPageProps
): ReactElement {
    let courseAPI: CourseAPI | undefined;
    let param: any = useParams();
    let [course, setCourse] = useState<Course>(new Course());

    const options = {
        style:"currency",
        currency: "VND"
    }
    
    useEffect(() => {
        courseAPI = new CourseAPI();
        courseAPI.getOneCourse(param.courseID).then(
            (res) => {
                setCourse(res.data);
            }
        ).catch((err) => {
            console.log(err);
        });
    }, []);

    return (
        <Container id="CourseDetailPage">
            {props.modalDialog}
            <main>
                <StudentSidebar />
                <Container>
                    <Row>
                        <Col style={{backgroundColor: 'white'}}>
                            <Breadcrumb>
                                <Breadcrumb.Item
                                    linkAs={Link}
                                    linkProps={{ to: "/" }}
                                >
                                    Home
                                </Breadcrumb.Item>
                                <Breadcrumb.Item
                                    linkAs={Link}
                                    linkProps={{ to: "/student-dashboard" }}
                                >
                                    Student Dashboard
                                </Breadcrumb.Item>
                                <Breadcrumb.Item
                                    active={true}
                                >
                                    {course.courseName}
                                </Breadcrumb.Item>
                            </Breadcrumb>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Course Name:</th>
                                        <th>{course.courseName}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Description:</td>
                                        <td>{course.description}</td>
                                        
                                    </tr>
                                    <tr>
                                        <td>Course Type:</td>
                                        <td>{course.courseType.typeName}</td>
                                        
                                    </tr>
                                    <tr>
                                        <td>Course Level:</td>
                                        <td>{course.courseLevel.levelName}</td>
                                    </tr>
                                    <tr>
                                        <td>Tuition Fee:</td>                     
                                        <td>{course.tuitionFee.toLocaleString("de-DE", options)}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </main>
        </Container>
    );
}