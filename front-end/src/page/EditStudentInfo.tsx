import React, {
    ChangeEvent, FormEvent, ReactElement, useEffect, useState
} from 'react';
import {
    Button, Col, Container, Form, Row
} from 'react-bootstrap';
import { UserAPI } from '../common/service/UserAPI';
import { useParams } from 'react-router-dom';
import { User, UserIndexSignature } from '../model/User';

export function EditStudentInfo (): ReactElement {
    let [user, setUser] = useState<User>(new User());
    let updatedUser: User | undefined;
    let inputField:
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | undefined;
    let userAPI: UserAPI | undefined;
    let param: any = useParams();
    let [student, setStudent] = useState<User>(new User());
    
    useEffect (() => {
        userAPI = new UserAPI();
        userAPI.displayStudent(param.studentID).then(
            (res) => {
                setUser(res.data);
                // console.log(student.userName);
            }
    );
    }, []);

    
    function handleUserChange (
        event: ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ){
        updatedUser = new User(user);
        inputField = event.target;
        updatedUser[
            inputField.name as keyof UserIndexSignature
        ] = inputField.value;
        setUser(updatedUser);
    }

    function updateStudent (event: FormEvent<HTMLFormElement>, userID: number) {
        event.preventDefault();
        userAPI = new UserAPI();
        userAPI.update(user, userID);
        console.log(userID);
    }
 
    console.log(param.studentID);
    // console.log(student.userName);
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
                    <h1>{param.studentID}</h1>
                    <Row>
                        <Col>
                            <Form
                                noValidate={false}
                                onSubmit={(event) => {
                                    updateStudent(event, param.studentID);
                                }}
                            >
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
                                        pattern="^[a-z0-9_-]{3,15}$"
                                        required={true}
                                        spellCheck={false}
                                        value = {user.userName}
                                        onChange={handleUserChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>
                                        First Name:
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        autoComplete="on"
                                        autoFocus={true}
                                        name="firstName"
                                        id="firstName"
                                        pattern="^[a-z0-9_-]{3,15}$"
                                        value={user.firstName}
                                        required={true}
                                        spellCheck={false}
                                        // value = {user.userName}
                                        onChange={handleUserChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>
                                        Last Name:
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        autoComplete="on"
                                        autoFocus={true}
                                        name="lastName"
                                        id="lastName"
                                        pattern="^[a-z0-9_-]{1,15}$"
                                        value={user.lastName}
                                        required={true}
                                        spellCheck={false}
                                        // value = {user.userName}
                                        onChange={handleUserChange}
                                    />
                                </Form.Group>
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
                                    <Form.Control
                                        type=""
                                        autoComplete="on"
                                        autoFocus={false}
                                        name="gender"
                                        id="gender"
                                        value={user.gender}
                                        required={false}
                                        spellCheck={false}
                                        onChange={handleUserChange}
                                    />
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
                                        value={user.job}
                                        required={true}
                                        spellCheck={false}
                                        onChange={handleUserChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>
                                        Password:
                                    </Form.Label>
                                    <Form.Control
                                        type="password"
                                        autoComplete="off"
                                        autoFocus={false}
                                        name="password"
                                        id="password"
                                        placeholder="Your new password"
                                        required={false}
                                        spellCheck={false}
                                        onChange={handleUserChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>
                                        Account Status
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        autoComplete="on"
                                        autoFocus={true}
                                        name="accountStatus"
                                        id="accountStatus"
                                        value={user.accountStatus}
                                        required={false}
                                        spellCheck={false}
                                        // value = {user.userName}
                                        onChange={handleUserChange}
                                    />
                                </Form.Group>
                                <Button
                                    variant="success"
                                    type="submit"
                                    block = {true}
                                >
                                    Save
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </main>
            <footer>
            </footer>
        </Container>
    );
}