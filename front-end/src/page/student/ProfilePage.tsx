import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ReactElement } from "react";
import { Breadcrumb, Button, Col, Container, Form, Image, Modal, Row, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { StudentSidebar } from "../../common/component/student_sidebar/StudentSidebar";
import { LocalStorageService } from "../../common/service/LocalStorageService";
import { UserAPI } from "../../common/service/UserAPI";
import { User, UserIndexSignature } from "../../model/User";
import AboutUs from './sda.png'

interface StudentDashboardPageProps {
    modalDialog: ReactElement;
}

export function ProfilePage(
    props: StudentDashboardPageProps
): ReactElement {
    let [user, setUser] = useState<User>(new User());
    let updatedUser: User | undefined;
    let inputField:
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | undefined;
    let userAPI: UserAPI | undefined;
    let localStorageService = new LocalStorageService();
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const name = localStorageService.getLoggedUserName();

    const date = new Date(user.dob);
    const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
    const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);

    useEffect(() => {
        userAPI = new UserAPI();
        userAPI.displayProfile(name).then(
            (res) => {
                setUser(res.data);
            }
        ).catch((err) => {
            console.log(err);
        });
    }, []);

    function handleUserChange(
        event: ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) {
        updatedUser = new User(user);
        inputField = event.target;
        updatedUser[
            inputField.name as keyof UserIndexSignature
        ] = inputField.value;
        setUser(updatedUser);
    }

    function updateMyProfile(event: FormEvent<HTMLFormElement>, userName: any) {
        event.preventDefault();
        userAPI = new UserAPI();
        userAPI.updateProfile(user, userName);
    }

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
                            <h1 style={{ textAlign: 'center' }}>My Profile</h1>
                            <Row>
                                <Col xs={6} md={4}>
                                    <Row>
                                        <Col>
                                            <Image src={AboutUs}
                                                rounded
                                                style={{ width: 280, height: 250, borderStyle: "groove" }} />
                                        </Col>
                                        <Col sm="12" md={{ offset: 3 }}>
                                            <Button style={{ marginTop: 20 }} onClick={handleShow}>Edit Profile</Button>

                                            <Modal show={show} onHide={handleClose}>
                                                <Form
                                                    noValidate={false}
                                                    onSubmit={(event) => {
                                                        updateMyProfile(event, name);
                                                    }}
                                                    className="wrapper"
                                                    style={{width:1000}}
                                                >
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Edit My Profile</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <Form.Group>
                                                            <Form.Label>
                                                                User Name:
                                                        </Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                autoComplete="on"
                                                                autoFocus={true}
                                                                name="userName"
                                                                id="userName"
                                                                pattern="^[\p{L} .'-]+$"
                                                                value={user.userName}
                                                                required={true}
                                                                spellCheck={false}
                                                                // value = {student.userName}
                                                                onChange={handleUserChange}
                                                            />
                                                        </Form.Group>
                                                        <Form.Row>
                                                            <Form.Group as={Col}>
                                                                <Form.Label>
                                                                    First Name:
                                                            </Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    autoComplete="on"
                                                                    autoFocus={true}
                                                                    name="firstName"
                                                                    id="firstName"
                                                                    pattern="^[\p{L} .'-]+$"
                                                                    value={user.firstName}
                                                                    required={true}
                                                                    spellCheck={false}
                                                                    // value = {user.userName}
                                                                    onChange={handleUserChange}
                                                                />
                                                            </Form.Group>
                                                            <Form.Group as={Col}>
                                                                <Form.Label>
                                                                    Middle Name:
                                                            </Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    autoComplete="on"
                                                                    autoFocus={true}
                                                                    name="middleName"
                                                                    id="middleName"
                                                                    pattern="^[\p{L} .'-]+$"
                                                                    value={user.middleName}
                                                                    required={true}
                                                                    spellCheck={false}
                                                                    // value = {user.userName}
                                                                    onChange={handleUserChange}
                                                                />
                                                            </Form.Group>
                                                            <Form.Group as={Col}>
                                                                <Form.Label>
                                                                    Last Name:
                                                            </Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    autoComplete="on"
                                                                    autoFocus={true}
                                                                    name="lastName"
                                                                    id="lastName"
                                                                    pattern="^[\p{L} .'-]+$"
                                                                    value={user.lastName}
                                                                    required={true}
                                                                    spellCheck={false}
                                                                    // value = {user.userName}
                                                                    onChange={handleUserChange}
                                                                />
                                                            </Form.Group>
                                                        </Form.Row>
                                                        <Form.Group>
                                                            <Form.Label>
                                                                Email:
                                                        </Form.Label>
                                                            <Form.Control
                                                                type="email"
                                                                autoComplete="on"
                                                                autoFocus={false}
                                                                name="email"
                                                                id="email"
                                                                value={user.email}
                                                                required={false}
                                                                spellCheck={false}
                                                                onChange={handleUserChange}
                                                            />
                                                        </Form.Group>
                                                        <Form.Group>
                                                            <Form.Label>
                                                                DOB:
                                                        </Form.Label>
                                                            <Form.Control
                                                                type="date"
                                                                autoComplete="on"
                                                                autoFocus={false}
                                                                name="dob"
                                                                id="dob"
                                                                value={user.dob.toString()}
                                                                required={false}
                                                                spellCheck={false}
                                                                onChange={handleUserChange}
                                                            />
                                                        </Form.Group>
                                                        <Form.Group>
                                                            <Form.Label>
                                                                Phone:
                                                        </Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                autoComplete="on"
                                                                autoFocus={false}
                                                                name="phoneNumber"
                                                                id="phoneNumber"
                                                                pattern="^(?:[0-9] ?){6,14}[0-9]$"
                                                                value={user.phoneNumber}
                                                                required={false}
                                                                spellCheck={false}
                                                                onChange={handleUserChange}
                                                            />
                                                        </Form.Group>
                                                        <Form.Group>
                                                            <Form.Label>
                                                                Gender
                                                        </Form.Label>
                                                            <Form.Control as="select" id="gender" name="gender" onChange={handleUserChange}>
                                                                <option value="Male">Male</option>
                                                                <option value="Female">Female</option>
                                                                <option value="Bisexual">Bisexual</option>
                                                            </Form.Control>
                                                        </Form.Group>
                                                        <Form.Group>
                                                            <Form.Label>
                                                                Job:
                                                        </Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                autoComplete="on"
                                                                autoFocus={false}
                                                                name="job"
                                                                id="job"
                                                                pattern="^[\p{L} .'-]+$"
                                                                value={user.job}
                                                                required={true}
                                                                spellCheck={false}
                                                                onChange={handleUserChange}
                                                            />
                                                        </Form.Group>
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="primary" onClick={handleClose} block={true}>
                                                            Save Changes
                                                        </Button>
                                                        <Button variant="secondary" onClick={handleClose} type="submit" block={true}>
                                                            Close
                                                        </Button>
                                                    </Modal.Footer>
                                                </Form>
                                            </Modal>
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
                                                <td>{day}-{month}-{year}</td>
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
                                                <td>Job:</td>
                                                <td>{user.job}</td>
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