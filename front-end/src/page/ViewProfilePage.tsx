import React, {
    ChangeEvent, FormEvent, MouseEvent, ReactElement, useEffect, useState
} from 'react';
import {
    Button, Col, Container, Form, FormControl, Nav, Navbar, Row
} from 'react-bootstrap';
import { UserAPI } from '../common/service/UserAPI';
import { Link, useParams, useRouteMatch } from 'react-router-dom';
import { User, UserIndexSignature } from '../model/User';
import { ColDef, DataGrid, ValueGetterParams } from '@material-ui/data-grid';

const columns: ColDef[] = [
    { field: 'userID', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params: ValueGetterParams) =>
            `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
    },
    { field: 'email', headerName: 'Email', width: 130 },
    { field: 'dbo', headerName: 'Date of Birth', type: 'Date', width: 90 },
    { field: 'phoneNumber', headerName: 'Phone', width: 70 },
    { field: 'gender', headerName: 'Gender', width: 30 },
    { field: 'job', headerName: 'Job', width: 70 },
    { field: 'photoURI', headerName: 'Photo URI', width: 130 },
    { field: 'selfDescription', headerName: 'Self Description', width: 200 },
    { field: 'password', headerName: 'Password', width: 70 },
    { field: 'accountStatus', headerName: 'Account Status', width: 70 },
    { field: 'dateCreated', headerName: 'Date Created', type: 'Date', width: 70 },
    { field: 'lastLogin', headerName: 'Last Login', type: 'Date', width: 70 },
    { field: 'roleList', headerName: 'Role', width: 70 },
    { field: 'addressList', headerName: 'Address', width: 130 },


];

export function ViewProfilePage(): ReactElement {

    let [user, getUser] = useState<User>(new User());
    let userID: number;
    let showUser: User | undefined;
    let userAPI: UserAPI | undefined;
    let match = useRouteMatch();
    let param: any = useParams();
    let studentID: number;
    let [student, getStudent] = useState<User>(new User());

    useEffect(() => {
        userAPI = new UserAPI();
        userAPI.displayUser(param.studentID).then(
            (res) => {
                getStudent(res.data);
                console.log(student.userName);
            }
        );
    });

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
                                <DataGrid rows={useEffect} columns={columns} pageSize={5} checkboxSelection />
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