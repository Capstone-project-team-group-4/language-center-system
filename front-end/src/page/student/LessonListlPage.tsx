import React, { useEffect, useState } from "react";
import { ReactElement } from "react";
import { Breadcrumb, Col, Container, ListGroup, Row, Tab } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { StudentSidebar } from "../../common/component/student_sidebar/StudentSidebar";
import { CourseAPI } from "../../common/service/CourseAPI";
import { LessonAPI } from "../../common/service/LessonAPI";
import { Course } from "../../model/Course";
import { Lesson } from "../../model/Lesson";
interface StudentDashboardPageProps {
    modalDialog: ReactElement;
}

export function LessonListPage(
    props: StudentDashboardPageProps
): ReactElement {
    let param: any = useParams();
    let [course, setCourse] = useState<Course>(new Course());
    let [lessonList, setLessonList] = useState<Lesson[]>([]);
    let lessonAPI: LessonAPI | undefined;
    let courseAPI: CourseAPI | undefined;

    useEffect(() => {
        lessonAPI = new LessonAPI();
        courseAPI = new CourseAPI();
        lessonAPI.getAllLessonByCourse(param.courseID).then(
            (res) => {
                setLessonList(res.data);
                // console.log(student.userName);
            }
        ).catch((err) => {
            console.log(err);
        });
        courseAPI.getOneCourse(param.courseID).then(
            (res) => {
                console.log("course", res.data);
                
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
                                <Breadcrumb.Item active={true}>
                                    {course.courseName}
                                </Breadcrumb.Item>
                            </Breadcrumb>
                            <Tab.Container id="list-group-tabs-example">
                            {lessonList.map((lesson) => {
                                return (

                                        <ListGroup className="my-2">
                                            <ListGroup.Item action href={"/student-dashboardz/" + course.courseName + "/" + lesson.lessonID}>
                                                {lesson.lessonName}
                                            </ListGroup.Item>
                                        </ListGroup>
                                )
                                })}                      
                            </Tab.Container>
                        </Col>
                    </Row>
                </Container>
            </main>
        </Container>
    );
}