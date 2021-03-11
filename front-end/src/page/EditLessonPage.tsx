import React, {
    ChangeEvent, FormEvent, ReactElement, useEffect, useState
} from 'react';
import {
    Button, Col, Container, Form, Row
} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import ModalTitle from 'react-bootstrap/ModalTitle';

import { UserAPI } from '../common/service/UserAPI';
import { User, UserIndexSignature } from '../model/User';

export function EditLessonPage () : ReactElement {
    // let [lesson, setLesson] = useState<Lesson>(new Lesson());
    // let updatedUser: Lesson | undefined;
    // let inputField:
    //     HTMLInputElement | HTMLSelectElement |
    //      HTMLTextAreaElement | undefined;
    // let userAPI: UserAPI | undefined;
    let param: any = useParams();

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
                            
                        </Col>
                    </Row>
                </Container>
            </main>
            <footer>
            </footer>
        </Container>
    );
}
