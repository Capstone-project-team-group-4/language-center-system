// Import package members section:
import React, { ReactElement, useEffect, useState } from "react";
import { Accordion, Button, Card, ListGroup } from "react-bootstrap";
import './StudentSidebar.css';
import { Link } from "react-router-dom";
import { CourseAPI } from "../../service/CourseAPI";
import { Course } from "../../../model/Course";
import { LocalStorageService } from "../../service/LocalStorageService";

export function StudentSidebar(): ReactElement {

    // Variables declaration:
    let a: number[] = [17, 16, 22]
    let [courseList, setCourseList] = useState<Course[]>([]);
    let courseAPI = new CourseAPI();
    let [course, setCourse] = useState<Course>(new Course());
    let [sideBarActivated, setSideBarActivated]
        = useState<string>("");
    let localStorageService = new LocalStorageService();
    let [myCourseList, setMyCourseList] = useState<Course[]>([]);


    useEffect(() => {
        // courseAPI = new CourseAPI();
        // a.map((id) => {
        //     return (
        //         courseAPI.getOneCourse(id).then(
        //             (res) => {
        //                 courseList.push(res.data);
        //                 setCourseList(courseList);
        //                 // console.log(student.userName);
        //             }
        //         )
        //     )
        // })
        const name = localStorageService.getLoggedUserName();
        courseAPI.getAllCoursesByCurrentUser(name).then(
            (res) => {
                setMyCourseList(res.data);
            }
        )
    }, []);


    function toggleSideBar(): void {
        if (sideBarActivated !== "activated") {
            setSideBarActivated("activated");
        }
        else {
            setSideBarActivated("");
        }
    }

    return (
        <div>
            <div
                id="SideBarButton"
                className={
                    `Side_Bar_Button_Z_Index 
                    ${sideBarActivated}`
                }
                onClick={toggleSideBar}
            >
                <div id="Top"></div>
                <div id="Middle"></div>
                <div id="Bottom"></div>
            </div>
            <nav
                id="SideBar"
                className={`Side_Bar_Z_Index ${sideBarActivated}`}
            >
                <ListGroup variant="flush">
                    <ListGroup.Item variant="light" action={true} href="\student-dashboard">
                        Dashboard
                    </ListGroup.Item>
                    <Accordion>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="0">
                                Course
                            </Accordion.Toggle>
                            {myCourseList.map((course) => {
                                return (
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body><a href={"/student-dashboard-course/" + course.courseID}>{course.courseName}</a></Card.Body>
                                    </Accordion.Collapse>
                                )
                            })}
                        </Card>
                    </Accordion>
                    <ListGroup.Item variant="light" action={true}>
                        Info
                    </ListGroup.Item>
                    <ListGroup.Item variant="light" action={true}>
                        Test
                    </ListGroup.Item>
                </ListGroup>
            </nav>
        </div>
    );
}