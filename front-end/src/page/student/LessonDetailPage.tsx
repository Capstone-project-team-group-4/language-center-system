import React, { useEffect, useState } from "react";
import { ReactElement } from "react";
import { Breadcrumb, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { StudentSidebar } from "../../common/component/student_sidebar/StudentSidebar";
import { LessonAPI } from "../../common/service/LessonAPI";
import { Course } from "../../model/Course";
import { Lesson } from "../../model/Lesson";
import ReactPlayer from "react-player";
import { CourseAPI } from "../../common/service/CourseAPI";

interface StudentDashboardPageProps {
    modalDialog: ReactElement;
}

var bgColors = { "Default": "#81b71a",
                    "Blue": "#00B1E1",
                    "Cyan": "#37BC9B",
                    "Green": "#8CC152",
                    "Red": "#E9573F",
                    "Yellow": "#F6BB42",
                    "White": "#FFFFFF",
};

export function LessonDetailPage(
    props: StudentDashboardPageProps
): ReactElement {
    let param: any = useParams();
    let [lesson, setLesson] = useState<Lesson>(new Lesson());
    let [course, setCourse] = useState<Course>(new Course());
    let lessonAPI: LessonAPI | undefined;
    let courseAPI: CourseAPI | undefined;

    useEffect(() => {
        lessonAPI = new LessonAPI();
        courseAPI = new CourseAPI();
        lessonAPI.getOne(param.lessonID).then(
            (res) => {
                setLesson(res.data);
                // console.log(student.userName);
            }
        ).catch((err) => {
            console.log(err);
        });

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
                                <Breadcrumb.Item
                                    linkAs={Link}
                                    linkProps={{ to: "/student-dashboard-course/" + course.courseID }}>
                                    Course
                                </Breadcrumb.Item>
                                <Breadcrumb.Item active={true}>
                                    {lesson.lessonName}
                                </Breadcrumb.Item>
                            </Breadcrumb>
                            <Row style={{backgroundColor: bgColors.White, borderRadius:10 + 'px'}}>
                                <Col sm={9}>
                                    <ReactPlayer
                                        controls
                                        url={lesson.contentURI}
                                    />
                                </Col>
                                <Col sm={3}>
                                    <div>
                                        <br/>
                                        <h4>Description</h4>
                                        <p>{lesson.description}</p>
                                        <h5>Time</h5>
                                        {lesson.duration} minutes
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </main>
        </Container>
    );
}

