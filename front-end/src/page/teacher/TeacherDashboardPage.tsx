// Import package members section:
import React, { ReactElement } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { 
    TeacherSidebar 
} from "../../common/component/teacher_sidebar/TeacherSidebar";

interface TeacherDashboardPageProps {
    modalDialog: ReactElement;
}

export function TeacherDashboardPage (
        props: TeacherDashboardPageProps
): ReactElement {
    return (
        <Container id = "TeacherDashboardPage">
            {props.modalDialog}
            <TeacherSidebar />
            <main>
                <Container>
                    <Row>
                        <Col>
                            aaaaaaaaaaaa
                        </Col>
                    </Row>
                </Container>
            </main>
            <footer>
            </footer>
        </Container>
    );
}