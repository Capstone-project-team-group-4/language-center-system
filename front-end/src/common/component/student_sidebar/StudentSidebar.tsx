// Import package members section:
import React, { ReactElement, useState } from "react";
import { ListGroup } from "react-bootstrap";
import './StudentSidebar.css';
import { Link } from "react-router-dom";

export function StudentSidebar (): ReactElement {
    
    // Variables declaration:
    let [sideBarActivated, setSideBarActivated] 
        = useState<string> ("");

    function toggleSideBar (): void {
        if (sideBarActivated !== "activated"){
            setSideBarActivated ("activated");
        }
        else {
            setSideBarActivated ("");
        }
    }

    return (
        <div>
            <div 
                id = "SideBarButton" 
                className = {
                    `Side_Bar_Button_Z_Index 
                    ${sideBarActivated}`
                } 
                onClick = {toggleSideBar} 
            >
                <div id = "Top"></div>
                <div id = "Middle"></div>
                <div id = "Bottom"></div>
            </div>
            <nav 
                id = "SideBar" 
                className = {`Side_Bar_Z_Index ${sideBarActivated}`}
            >
                <ListGroup variant = "flush">
                    <ListGroup.Item variant = "light" action = {true} href="\student-dashboard">
                        Dashboard
                    </ListGroup.Item>
                    <ListGroup.Item variant = "light" action = {true} href="/student-dashboard-course/:courseID">
                        Course
                    </ListGroup.Item>
                    <ListGroup.Item variant = "light" action = {true}>
                        Info
                    </ListGroup.Item>
                    <ListGroup.Item variant = "light" action = {true}>
                        Test
                    </ListGroup.Item>
                </ListGroup> 
            </nav>
        </div>
    );
}