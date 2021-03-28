/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
    ReactElement, useEffect, useState
} from 'react';
import {
    Button, Col, Container, Form, FormControl, Nav, Navbar, Row, Table
} from 'react-bootstrap';
import { UserAPI } from '../common/service/UserAPI';
import { Link, useParams, useRouteMatch } from 'react-router-dom';
import { User, UserIndexSignature } from '../model/User';
import './ViewProfilePage.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

function renderUserTable(
    user: User
    // , index: number
): ReactElement {
    return (
        <table key={user.userID} className="table table-bordered">
            <tr>
                <th>First Name</th>
                <td>{user.firstName + " " + user.middleName + " " + user.lastName}</td>
            </tr>
            <tr>
                <th>Phone</th>
                <td>{user.phoneNumber}</td>
            </tr>
            <tr>
                <th>DoB</th>
                <td>{user.dob.toString()}</td>
            </tr>
            <tr>
                <th>Email</th>
                <td>{user.email}</td>
            </tr>
            <tr>
                <th>Gender</th>
                <td>{user.gender}</td>
            </tr>
            <tr>
                <th>Job</th>
                <td>{user.job}</td>
            </tr>
            <tr>
                <th>Self Description</th>
                <td>{user.selfDescription}</td>
            </tr>
            <tr>
                <th>Account Status</th>
                <td>{user.accountStatus}</td>
            </tr>
            <tr>
                <th>Date Created</th>
                <td>{user.dateCreated.toString()}</td>
            </tr>
            <tr>
                <th>Last Login</th>
                <td>{user.lastLogin.toString()}</td>
            </tr>
            <tr>
                <th>Last Modified</th>
                <td>{user.lastModified.toString()}</td>
            </tr>
        </table>
    );
}
export function DetailPage(): ReactElement {

    let [user, getUser] = useState<User>(new User());
    let userID: number;
    let showUser: User | undefined;
    let userAPI: UserAPI | undefined;
    let match = useRouteMatch();
    let param: any = useParams();
    let studentID: number;
    let [student, setStudent] = useState<User>(new User());

    useEffect(() => {
        userAPI = new UserAPI();
        userAPI.displayStudentbyID(param.studentID).then(
            (res) => {
                console.log(res);
                setStudent(res.data);
                console.log(student);
            }
        );
    }, []);

    console.log(param.studentID);

    return (
        <Container fluid={true} id="PageContentContainer">
            <Container fluid={true} id="PageHeaderContainer">
                <header>
                </header>
                <nav>
                </nav>
            </Container>
            <main>
                <Container id="PageBodyContainer">
                    <Row className="bg-white">
                        <Col>
                            <div className="student-profile py-4">
                                <div className="container">
                                    <div className="row">
                                        {/* <div className="col-lg-4">
                                            <div className="card shadow-sm">
                                                <div className="card-header bg-transparent text-center">
                                                    <img key={user.userID} className="profile_img" src="{user.photoURI}" alt="" />
                                                    <h3>{user.firstName + " " + user.middleName + " " + user.lastName}</h3>
                                                </div>
                                                <div className="card-body">
                                                    <p className="mb-0"><strong className="pr-1">Student ID:</strong>{user.userID + 1}</p>
                                                    <p className="mb-0"><strong className="pr-1">Class:</strong>5</p>
                                                    <p className="mb-0"><strong className="pr-1">Section:</strong>A</p>
                                                </div>
                                            </div>
                                        </div> */}
                                        <div className="col-lg-12">
                                            <div className="card shadow-sm">
                                                <div className="card-header bg-transparent border-0">
                                                    <h3 className="mb-0"><i className="far fa-clone pr-1"></i>General Information</h3>
                                                </div>
                                                <div className="card-body pt-0">
                                                    <>
                                                        {
                                                            renderUserTable(student)
                                                            // student.map((item, index) => (
                                                            //     <li key={index}>{item}</li>
                                                            // ))
                                                        }
                                                    </>
                                                    {/* {student.map(
                                                        (
                                                            user
                                                            , index
                                                        ) => renderUserTable(
                                                            user
                                                            , index
                                                        )
                                                    )} */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </main>
            <footer>
            </footer>
        </Container>
    );
}