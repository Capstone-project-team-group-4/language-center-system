// Import package members section:
import React, { ReactElement, useEffect, useState } from "react";
import { Accordion, Button, Card, ListGroup } from "react-bootstrap";
import './StudentSidebar.css';
import { Link, useParams } from "react-router-dom";
import { CourseAPI } from "../../service/CourseAPI";
import { Course } from "../../../model/Course";
import { LocalStorageService } from "../../service/LocalStorageService";
import { UserAPI } from "../../service/UserAPI";
import { User } from "../../../model/User";

export function StudentSidebar(): ReactElement {

    // Variables declaration:
    let courseAPI = new CourseAPI();
    let userAPI = new UserAPI();
    let [user, setUser] = useState<User>(new User());
    let [sideBarActivated, setSideBarActivated]
        = useState<string>("");
    let localStorageService = new LocalStorageService();
    let [myCourseList, setMyCourseList] = useState<Course[]>([]);


    useEffect(() => {
        const name = localStorageService.getLoggedUserName();
        courseAPI.getAllCoursesByCurrentUser(name).then(
            (res) => {
                setMyCourseList(res.data);
            }
        )
        userAPI.displayProfile(name).then(
            (res) => {
                setUser(res.data);
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
                <span style={{color:'white', textAlign:'justify'}}>Hi {user.userName}!</span>
                <ListGroup >
                    <ListGroup.Item action={true} 
                                    href="\student-dashboard" 
                                    style={{backgroundColor: '#242424', color:'#e6ccb3'}}
                                    className="btt"
                    >
                        Dashboard
                    </ListGroup.Item >
                    <Accordion style={{backgroundColor: '#242424'}}>
                        <Card style={{backgroundColor: '#242424'}} className="btt">
                            <Accordion.Toggle as={Card.Header} eventKey="0" style={{color:'#e6ccb3'}}>
                                Course
                            </Accordion.Toggle>
                            {myCourseList.map((course) => {
                                return (
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body>
                                            <a href={"/student-dashboards/" + course.courseID}
                                               style={{textDecoration: 'none'}}
                                            >
                                                        {course.courseName}
                                            </a>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                )
                            })}
                        </Card>
                    </Accordion>
                    <ListGroup.Item action={true} 
                                    href={"/student-dashboardx/profile/" + user.userID}
                                    style={{backgroundColor: '#242424', color:'#e6ccb3'}}
                                    className="btt"
                    >
                        Profile
                    </ListGroup.Item>
                    <ListGroup.Item action={true}
                                    style={{backgroundColor: '#242424', color:'#e6ccb3'}}
                                    className="btt"
                    >
                        Test
                    </ListGroup.Item>
                </ListGroup>
            </nav>
        </div>
    );
}