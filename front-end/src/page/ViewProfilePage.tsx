import React, { ReactElement } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { User, UserIndexSignature } from '../model/User';
import { UserAPI } from '../common/service/UserAPI';
import { Link } from 'react-router-dom';
import { DataGrid, ColDef, ValueGetterParams } from '@material-ui/data-grid';

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

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export function HomePage(): ReactElement {
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
                                <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
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