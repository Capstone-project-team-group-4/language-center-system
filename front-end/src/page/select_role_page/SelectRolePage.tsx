// Import package members section:
import React, { ReactElement } from 'react';
import { 
    Card, Container, ListGroup, Row 
} from 'react-bootstrap';
import './SelectRolePage.css';
import { DialogControl } from '../../common/component/ModalDialog';
import { Link } from 'react-router-dom';

interface SelectRolePageProps {
    dialogController: DialogControl;
    modalDialog: ReactElement;
}

export function SelectRolePage (props: SelectRolePageProps): ReactElement {

    return (
        <Container 
            fluid = {true} 
            id = "SelectRolePageContentContainer" 
            className = "vh-100"
        >   
            {props.modalDialog}
            <header>
            </header>
            <nav>
            </nav>
            <main className = "h-100">
                <Container 
                    fluid = {true} 
                    className = "h-100"
                >
                    <Row className = {
                        `h-100 
                        justify-content-center 
                        align-items-center`
                    }>
                        <Card id = "SelectRoleCard">
                            <Card.Header className = "text-center">
                                <h5>Choose a role</h5> 
                            </Card.Header>
                            <ListGroup variant = "flush">
                                <ListGroup.Item 
                                    variant = "secondary" 
                                    action = {true}
                                    as = {Link}
                                    to = {"/admin-console"}
                                >
                                    Admin
                                </ListGroup.Item>
                                <ListGroup.Item 
                                    variant = "secondary" 
                                    action = {true}
                                    as = {Link}
                                    to = {"/teacher-dashboard"}
                                >
                                    Teacher
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Vestibulum at eros
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Row>
                </Container>
            </main>
            <footer>
            </footer>
        </Container>
    );
}