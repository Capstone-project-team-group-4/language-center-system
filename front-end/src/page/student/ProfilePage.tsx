import React from "react";
import { ReactElement } from "react";
import { Breadcrumb, Col, Container, Image, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { StudentSidebar } from "../../common/component/student_sidebar/StudentSidebar";

interface StudentDashboardPageProps {
    modalDialog: ReactElement;
}

export function ProfilePage(
    props: StudentDashboardPageProps
): ReactElement {

    // useEffect(() => {
    //     courseAPI = new CourseAPI();
    //     courseAPI.getOneCourse(param.courseID).then(
    //         (res) => {
    //             setCourse(res.data);
    //         }
    //     ).catch((err) => {
    //         console.log(err);
    //     });
    // }, []);

    return (
        <Container id="ProfilePage">
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
                                <Breadcrumb.Item
                                    linkAs={Link}
                                    linkProps={{ to: "/student-dashboard" }}
                                >
                                    Student Dashboard
                                </Breadcrumb.Item>
                            </Breadcrumb>
                            <Row>
                                <Col xs={6} md={4}>
                                    <Image src="holder.js/171x180" thumbnail />
                                </Col>
                                <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Course Name:</th>
                                        <th>ygfgf</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Description:</td>
                                        <td>tdfdf</td>
                                        
                                    </tr>
                                    <tr>
                                        <td>Course Type:</td>
                                        <td>fdfd</td>
                                        
                                    </tr>
                                    <tr>
                                        <td>Course Level:</td>
                                        <td>fdfdf</td>
                                    </tr>
                                    <tr>
                                        <td>Tuition Fee:</td>
                                        <td>fdfdf</td>
                                    </tr>
                                </tbody>
                            </Table>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </main>
        </Container>
    );
}