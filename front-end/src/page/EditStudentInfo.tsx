import React, {
    ChangeEvent, FormEvent, ReactElement, useEffect, useState
} from 'react';
import {
    Button, Col, Container, Form, Modal, Row
} from 'react-bootstrap';
import { UserAPI } from '../common/service/UserAPI';
import { useParams } from 'react-router-dom';
import { User, UserIndexSignature } from '../model/User';

export function EditStudentInfo(): ReactElement {
    let [user, setUser] = useState<User>(new User());
    let updatedUser: User | undefined;
    let inputField:
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | undefined;
    let userAPI: UserAPI | undefined;
    let param: any = useParams();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        userAPI = new UserAPI();
        userAPI.displayStudent(param.studentID).then(
            (res) => {
                setUser(res.data);
                // console.log(student.userName);
            }
        );
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

    function updateStudent(event: FormEvent<HTMLFormElement>, userID: number) {
        event.preventDefault();
        userAPI = new UserAPI();
        userAPI.update(user, userID);
    }
    // console.log(student.userName);
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Container fluid={true} id="PageContentContainer">
                    <Container fluid={true} id="PageHeaderContainer">
                    </Container>
                    <main>
                        <Container id="PageBodyContainer">
                            <Modal.Header closeButton>
                                <h1>Edit</h1>
                            </Modal.Header>
                            <Row>
                                <Col>

                                    <Form
                                        noValidate={false}
                                        onSubmit={(event) => {
                                            updateStudent(event, param.studentID);
                                        }}
                                        className="wrapper"
                                    >
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
                                                    placeholder={user.userName}
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
                                                        placeholder={user.firstName}
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
                                                        placeholder={user.middleName}
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
                                                        placeholder={user.lastName}
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
                                                    placeholder={user.email}
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
                                                    placeholder={user.phoneNumber}
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
                                                    <option value="male">male</option>
                                                    <option value="female">female</option>
                                                    <option value="bisexual">bisexual</option>
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
                                                    placeholder={user.job}
                                                    required={true}
                                                    spellCheck={false}
                                                    onChange={handleUserChange}
                                                />
                                            </Form.Group>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button
                                                variant="primary"
                                                type="submit"
                                                block={true}
                                            >
                                                Save
                                            </Button>
                                            <Button variant="secondary"
                                                onClick={handleClose}
                                                block={true}
                                            >
                                                Close
                                            </Button>
                                        </Modal.Footer>
                                        <br />
                                    </Form>
                                </Col>
                            </Row>
                        </Container>
                    </main>
                    <footer>
                    </footer>
                </Container>
            </Modal>
        </>
    );
}