import React, { ReactElement } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";

export function ManageStudentPage (): ReactElement {
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
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Username</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Email</th>
                                        <th>Date of birth</th>
                                        <th>Phone</th>
                                        <th>Gender</th>
                                        <th>Job</th>
                                        <th>Avatar</th>
                                        <th>Description</th>
                                        <th>Password</th>
                                        <th>Status</th>
                                        <th>Created date</th>
                                        <th>Last login</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>@mdo</td>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>ottomark@gmail.com</td>
                                        <td>20-01-1990</td>
                                        <td>012345678</td>
                                        <td>Male</td>
                                        <td>Tour Guide</td>
                                        <td>
                                            <img src="" alt=""/>
                                        </td>
                                        <td>I like traveling</td>
                                        <td>Otto@0120</td>
                                        <td>Active</td>
                                        <td>27-01-2021</td>
                                        <td>27-01-2021</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>@fat</td>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>jacobthornton@gmail.com</td>
                                        <td>12-12-1985</td>
                                        <td>012387654</td>
                                        <td>Female</td>
                                        <td>Programmer</td>
                                        <td>
                                            <img src="" alt=""/>
                                        </td>
                                        <td>I like coding</td>
                                        <td>Jacob@1212</td>
                                        <td>Active</td>
                                        <td>27-01-2021</td>
                                        <td>27-01-2021</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>@twitter</td>
                                        <td>Larry </td> 
                                        <td>the Bird</td>
                                        <td>larrythebird@gmail.com</td>
                                        <td>5-5-1995</td>
                                        <td>012387654</td>
                                        <td>Female</td>
                                        <td>Marketing</td>
                                        <td>
                                            <img src="" alt=""/>
                                        </td>
                                        <td>I like shopping</td>
                                        <td>Larry@0505</td>
                                        <td>Active</td>
                                        <td>27-01-2021</td>
                                        <td>27-01-2021</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </main>
            <footer>
            </footer>
        </Container>
    );
}