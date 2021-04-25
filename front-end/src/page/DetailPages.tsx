import React, {
    ChangeEvent, FormEvent, ReactElement, useEffect, useState
} from 'react';
import {
    Button, Col, Container, Form, Modal, Row
} from 'react-bootstrap';
import { UserAPI } from '../common/service/UserAPI';
import { useParams } from 'react-router-dom';
import { User, UserIndexSignature } from '../model/User';

function renderUserTable(
    user: User
    // , index: number
): ReactElement {
    return (
        <table key={user.userID} className="table table-bordered">
            <tr>
                <th>Name</th>
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

export function DetailPages(): ReactElement {
    let userAPI: UserAPI | undefined;
    let param: any = useParams();
    let [teacher, setTeacher] = useState<User>(new User());
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        userAPI = new UserAPI();
        userAPI.displayStudent(param.teacherID).then(
            (res) => {
                console.log(res);
                setTeacher(res.data);
                console.log(teacher);
            }
        );
    }, []);

    console.log(param.teacherID);


    // function handleUserChange(
    //     event: ChangeEvent<
    //         HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    //     >
    // ) {
    //     updatedUser = new User(user);
    //     inputField = event.target;
    //     updatedUser[
    //         inputField.name as keyof UserIndexSignature
    //     ] = inputField.value;
    //     setUser(updatedUser);
    // }

    // function updateStudent(event: FormEvent<HTMLFormElement>, userID: number) {
    //     event.preventDefault();
    //     userAPI = new UserAPI();
    //     userAPI.update(user, userID);
    // }
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
                                <h1>View detail</h1>
                            </Modal.Header>
                            <Row>
                                <Col>
                                    <Modal.Body>
                                    <>
                                    {renderUserTable(teacher)}
                                    </>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary"
                                            onClick={handleClose}
                                            block={true}
                                        >
                                            Close
                                            </Button>
                                    </Modal.Footer>
                                    <br />
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