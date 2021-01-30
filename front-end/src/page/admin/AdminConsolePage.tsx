import React, { ReactElement } from "react";
import { Col, Container, Row } from "react-bootstrap";

export function AdminConsolePage (): ReactElement {
    return (
        <Container fluid = {true} id = "PageContentContainer">
            <main>
                <Container id = "PageBodyContainer">
                    <Row>
                        <Col>
                            yyyyyyyy
                        </Col>
                    </Row>
                </Container>
            </main>
            <footer>
            </footer>
        </Container>
    );
}