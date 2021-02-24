// Import package members section:
import React, { 
    ChangeEvent
    , Dispatch, FormEvent
    , ReactElement
    , SetStateAction, useState 
} from 'react';
import { 
    Button, Card, Container, Form, ListGroup, Row 
} from 'react-bootstrap';
import './SelectRolePage.css';
import { TypeGuard } from '../common/service/TypeGuard';
import { DialogControl } from '../common/component/ModalDialog';
import { UserAPI } from '../common/service/UserAPI';
import { LoggedInUser } from '../model/LoggedInUser';
import { Location, History } from "../../node_modules/@types/history";
import { useHistory, useLocation } from 'react-router-dom';
import { LocationState } from '../common/component/ProtectedRoute';

interface SelectRolePageProps {
    dialogController: DialogControl;
    modalDialog: ReactElement;
}

export function SelectRolePage (props: SelectRolePageProps): ReactElement {

    // Variables declaration:
    
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
                                Choose a role
                            </Card.Header>
                            <ListGroup variant = "flush">
                                <ListGroup.Item>
                                    Cras justo odio
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Dapibus ac facilisis in
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