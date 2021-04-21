import React from "react";
import { ReactElement } from "react";
import { Breadcrumb, Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { StudentSidebar } from "../../common/component/student_sidebar/StudentSidebar";

interface StudentDashboardPageProps {
    modalDialog: ReactElement;
}

export function InfoPage(
    props: StudentDashboardPageProps
): ReactElement {
    return (
        <Container id="InfoPage">
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
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </main>
        </Container>
    );
}