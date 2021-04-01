import React, { useEffect, useState } from "react";
import { ReactElement } from "react";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { StudentSidebar } from "../../common/component/student_sidebar/StudentSidebar";
import { CourseAPI } from "../../common/service/CourseAPI";
import { Course } from "../../model/Course";
import { Lesson } from "../../model/Lesson";
interface StudentDashboardPageProps {
    modalDialog: ReactElement;
}

export function CourseDetailPage(
    props: StudentDashboardPageProps
): ReactElement {
    let param: any = useParams();
    let [course, setCourse] = useState<Course>(new Course());
    let [lesson, setLessson] = useState<Lesson>(new Lesson());
    let courseAPI: CourseAPI | undefined;

    useEffect(() => {
        courseAPI = new CourseAPI();
        courseAPI.getOneCourse(param.courseID).then(
            (res) => {
                setCourse(res.data);
                // console.log(student.userName);
            }
        );
    }, []);

    return (
        <Container id="CourseDetailPage">
            {props.modalDialog}
            <main>
                <StudentSidebar/>
                <Container>
                    <Row>
                        <Col>
                            <ListGroup horizontal>
                                <ListGroup.Item>This</ListGroup.Item>
                                <ListGroup.Item>ListGroup</ListGroup.Item>
                                <ListGroup.Item>renders</ListGroup.Item>
                                <ListGroup.Item>horizontally!</ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </Container>
            </main>
        </Container>
    );
}