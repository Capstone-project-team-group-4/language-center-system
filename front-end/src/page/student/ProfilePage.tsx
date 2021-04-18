import React, { useEffect, useState } from "react";
import { ReactElement } from "react";
import { Breadcrumb, Button, Col, Container, Image, Row, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { StudentSidebar } from "../../common/component/student_sidebar/StudentSidebar";
import { LocalStorageService } from "../../common/service/LocalStorageService";
import { UserAPI } from "../../common/service/UserAPI";
import { User } from "../../model/User";

interface StudentDashboardPageProps {
    modalDialog: ReactElement;
}

export function ProfilePage(
    props: StudentDashboardPageProps
): ReactElement {
    let [user, setUser] = useState<User>(new User());
    let userAPI: UserAPI | undefined;
    let localStorageService = new LocalStorageService();
    useEffect(() => {
        const name = localStorageService.getLoggedUserName();
        userAPI = new UserAPI();
        userAPI.displayProfile(name).then(
            (res) => {
                setUser(res.data);
            }
        ).catch((err) => {
            console.log(err);
        });
    }, []);

    return (
        <Container id="ProfilePage">
            {props.modalDialog}
            <main>
                <StudentSidebar />
                <Container>
                    <Row>
                        <Col style={{ backgroundColor: 'white' }}>
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
                                    active={true}
                                >
                                    Profile
                                </Breadcrumb.Item>
                            </Breadcrumb>
                            <h1 style={{ textAlign: 'center' }}>Profile</h1>
                            <Row>
                                <Col xs={6} md={4}>
                                    <Row>
                                        <Col>
                                            <Image src="src\page\student\sda.png"
                                                rounded
                                                style={{ width: 250, height: 250 }} />
                                        </Col>
                                        <Col sm="12" md={{ offset: 3 }}>
                                            <Button style={{marginTop: 20}}>Edit Profile</Button>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>User Name:</th>
                                                <th>{user.userName}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>First Name:</td>
                                                <td>{user.firstName}</td>
                                            </tr>
                                            <tr>
                                                <td>Middle Name:</td>
                                                <td>{user.middleName}</td>

                                            </tr>
                                            <tr>
                                                <td>Last Name:</td>
                                                <td>{user.lastName}</td>
                                            </tr>
                                            <tr>
                                                <td>DOB:</td>
                                                <td>{user.dob.toString()}</td>
                                            </tr>
                                            <tr>
                                                <td>Email:</td>
                                                <td>{user.email}</td>
                                            </tr>
                                            <tr>
                                                <td>Phone Number:</td>
                                                <td>{user.phoneNumber}</td>
                                            </tr>
                                            <tr>
                                                <td>Gender:</td>
                                                <td>{user.gender}</td>
                                            </tr>
                                            <tr>
                                                <td>Description</td>
                                                <td>{user.selfDescription}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </main>
        </Container>
    );
}