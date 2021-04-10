// Import package members section:
import React, { ReactElement, useState } from "react";
import { ListGroup } from "react-bootstrap";
import './TeacherSidebar.css';
import { Link } from "react-router-dom";

export function TeacherSidebar (): ReactElement {
    
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
                <ListGroup variant = "flush" onClick = {toggleSideBar}>
                    <h5 className = "text-white ml-3">
                        Examination
                    </h5>
                    <ListGroup.Item 
                        variant = "light" 
                        action = {true}
                        as = {Link}
                        to = {"/teacher-dashboard/manage-exam-question-page"}
                    >
                        Manage Multiple Choice Question
                    </ListGroup.Item>
                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                    <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                    <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                </ListGroup> 
            </nav>
        </div>
    );
}