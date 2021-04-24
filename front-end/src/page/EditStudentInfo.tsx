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
    let [student, setStudent] = useState<User>(new User());
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
                <Form
                    noValidate={false}
                    onSubmit={(event) => {
                        updateStudent(event, param.userID);
                    }}
                    className="wrapper"
                    style={{ width: 1000 }}
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
        </>
    );
}