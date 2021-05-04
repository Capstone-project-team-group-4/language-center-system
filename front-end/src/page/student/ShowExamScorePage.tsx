/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, ReactElement, ReactNode, useEffect, useState } from "react";
import { 
    Breadcrumb
    , Button
    , Col
    , Container
    , Form
    , Row
    , Table 
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { DataPage } from "../../App";
import { DialogControl } from "../../common/component/ModalDialog";
import { PagingSection } from "../../common/component/PagingSection";
import { ExaminationAPI } from "../../common/service/ExaminationAPI";
import { ExaminationSessionAPI } from "../../common/service/ExaminationSessionAPI";
import { useSessionState } from "../../common/service/PersistedStateHook";
import { TypeGuard } from "../../common/service/TypeGuard";
import { Examination } from "../../model/Examination";
import { QuestionOption } from "../../model/QuestionOption";
import { Quiz } from "../../model/Quiz";

interface ShowExamScorePageProps {
    dialogController: DialogControl;
    modalDialog: ReactElement;
    typeGuardian: TypeGuard;
}

export function ShowExamScorePage (props: ShowExamScorePageProps): ReactElement {

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
                            <Form.Group>
                                aaaaaa
                            </Form.Group>

                            <Form.Group>
                                bbbbbb
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