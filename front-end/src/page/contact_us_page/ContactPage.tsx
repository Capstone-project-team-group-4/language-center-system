// Import package members section:
import React, { ReactElement } from "react";
import { Col, Container, Jumbotron, Media, Row } from "react-bootstrap";

interface ContactUsProps {
    modalDialog: ReactElement;
}

export function ContactUs (props: ContactUsProps): ReactElement {
    return (
        <Container fluid = {true}>
            {props.modalDialog}
            <main>
                <Container 
                    fluid = {true} 
                    className = "px-0"
                    style={{backgroundColor:'silver'}}
                >
                    <Row>
                        <Col>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1478.0640045030577!2d105.52627793336553!3d21.013154039142645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31345b465a4e65fb%3A0xaae6040cfabe8fe!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyBGUFQ!5e0!3m2!1svi!2s!4v1619044601505!5m2!1svi!2s" width="700" height="500" style={{border:0}}  loading="lazy"></iframe>
                        </Col>
                        <Col style={{marginTop:50}}>
                            <h1>Language Center LCS</h1><br/>
                            <p>Address: FPT University, Hoa Lac High Tech Park, Hanoi, Vietnam</p>
                            <p>Tel: (+84) 0946531195</p>
                            <p>Mail: <a href="mailto:languagecenter_lcs@gmail.com">languagecenter_lcs@gmail.com</a></p>
                            <b>Office Hours</b>
                            <p>Monday- Friday: 8.00 a.m to 5.30 p.m (Hanoi time, GMT +7)</p>
                        </Col>
                    </Row>
                </Container>
            </main>
            <footer>
            </footer>
        </Container>
    );
}