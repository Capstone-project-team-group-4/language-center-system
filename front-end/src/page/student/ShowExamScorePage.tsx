/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactElement } from "react";
import { 
    Button
    , Container
    , Form
    , Row} from "react-bootstrap";
import { Link } from "react-router-dom";
import { DialogControl } from "../../common/component/ModalDialog";
import { useSessionState } from "../../common/service/PersistedStateHook";
import { TypeGuard } from "../../common/service/TypeGuard";
import { StudentScore } from "../../model/StudentScore";

interface ShowExamScorePageProps {
    dialogController: DialogControl;
    modalDialog: ReactElement;
    typeGuardian: TypeGuard;
}

export function ShowExamScorePage (props: ShowExamScorePageProps): ReactElement {

    // Variables declaration:
    let [studentScore] = useSessionState<StudentScore> (
            "studentScore"
            , new StudentScore ()  
    );

    return (
        <Container fluid = {true} className = "vh-100">   
            {props.modalDialog}
            <header>
            </header>
            <nav>
            </nav>
            <main className = "h-100">
                <Container fluid = {true} className = "h-100">
                    <Row 
                        className = {
                            `h-100 
                            justify-content-md-center 
                            align-items-center`
                        }
                    >
                        <Form
                            id = "ShowExamScoreForm"
                            className = "bg-white p-5 h-auto"
                            style = {{borderRadius:10 + 'px'}}
                        >
                            <Form.Group 
                                as = {Row} 
                                className = "justify-content-md-center"
                            >
                                <h2>
                                    Your Score: {studentScore.score}
                                </h2>
                            </Form.Group>

                            <Form.Group 
                                as = {Row} 
                                className = "justify-content-md-center"
                            >
                                <h1>
                                    You have {studentScore.status} !
                                </h1>
                            </Form.Group>

                            <Form.Group 
                                as = {Row} 
                                className = "justify-content-md-center"
                            >
                                <Button 
                                    variant = "primary"
                                    block = {true}
                                    as = {Link}
                                    to = {
                                        "/student-dashboard/show-all-exam-page"
                                    }
                                >
                                    Done
                                </Button>
                            </Form.Group>
                        </Form>
                    </Row>
                </Container>
            </main>
            <footer>
            </footer>
        </Container>
    );
}