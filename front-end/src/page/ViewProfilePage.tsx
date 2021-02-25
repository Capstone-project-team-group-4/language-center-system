import React, {
    ChangeEvent, FormEvent, MouseEvent, ReactElement, useEffect, useState
} from 'react';
import {
    Button, Col, Container, Form, FormControl, Nav, Navbar, Row, Table
} from 'react-bootstrap';
import { UserAPI } from '../common/service/UserAPI';
import { Link, useParams, useRouteMatch } from 'react-router-dom';
import { User, UserIndexSignature } from '../model/User';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

function renderUserTable(
    user: User
    , index: number
): ReactElement {
    return (
        <tr key={user.userID}>
            <td>
                {index + 1}
            </td>
            <td>
                {user.firstName}
            </td>
            <td>
                {user.lastName}
            </td>
            <td>
                {user.phoneNumber}
            </td>
            <td>
                {user.dob}
            </td>
            <td>
                {user.email}
            </td>
            <td>
                {user.gender}
            </td>
            <td>
                {user.job}
            </td>
            <td>
                {user.selfDescription}
            </td>
            <td>
                {user.accountStatus}
            </td>
            <td>
                {user.dateCreated}
            </td>
            <td>
                {user.lastLogin}
            </td>
        </tr>
    );
}
export function ViewProfilePage(): ReactElement {

    let [user, getUser] = useState<User>(new User());
    let userID: number;
    let showUser: User | undefined;
    let userAPI: UserAPI | undefined;
    let match = useRouteMatch();
    let param: any = useParams();
    let studentID: number;
    let [student, setStudent] = useState<User[]>([]);

    useEffect(() => {
        userAPI = new UserAPI();
        userAPI.displayStudent(param.studentID).then(
            (res) => {
                setStudent(res.data);
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
                    <Row>
                        <Col>
                            <div style={{ height: 400, width: '100%' }}>
                                <Table responsive="md" hover={true}>
                                    <thead>
                                        <tr>
                                            <th>
                                                #
                                            </th>
                                            <th>
                                                First Name
                                            </th>
                                            <th>
                                                Last Name
                                            </th>
                                            <th>
                                                Phone Number
                                            </th>
                                            <th>
                                                Date of birth
                                            </th>
                                            <th>
                                                Email
                                            </th>
                                            <th>
                                                Gender
                                            </th>
                                            <th>
                                                Job
                                            </th>
                                            <th>
                                                Description
                                            </th>
                                            <th>
                                                Status
                                            </th>
                                            <th>
                                                Date Created
                                            </th>
                                            <th>
                                                Last Login
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {student.map(
                                            (
                                                user
                                                , index
                                            ) => renderUserTable(
                                                user
                                                , index
                                            )
                                        )}
                                    </tbody>
                                </Table>
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