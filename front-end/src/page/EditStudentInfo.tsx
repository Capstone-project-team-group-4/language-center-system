import React, { ReactElement } from "react";
import { Col, Container, Row } from "react-bootstrap";

export function EditStudentInfo (): ReactElement {
    return (
        <Container fluid = {true} id = "PageContentContainer"> 
            <Container fluid = {true} id = "PageHeaderContainer">
                <header>
                </header>
                <nav>
                </nav>
            </Container>
            <main>
                <Container id = "PageBodyContainer">
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