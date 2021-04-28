/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactElement, ReactNode, useEffect, useState } from "react";
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
import { TypeGuard } from "../../common/service/TypeGuard";
import { Examination } from "../../model/Examination";

interface TakeExamPageProps {
    dialogController: DialogControl;
    modalDialog: ReactElement;
    typeGuardian: TypeGuard;
}

export function TakeExamPage (props: TakeExamPageProps): ReactElement {
    
    return (
        <Container fluid = {true} className = "h-100">
            {props.modalDialog}
            <header>
            </header>
            <nav>
            </nav>
            <main className = "h-100">
                <Container className = "h-100 bg-white">
                    <Row 
                        className = {
                            `h-100 
                            justify-content-md-center
                            align-items-center`
                        }
                    >
                        <Form className = "w-75">
                            <Form.Group as = {Row} controlId = "LastModifiedInfo">
                                <Form.Label
                                    column = {true}
                                    md = {3}
                                >
                                    + Last Modified:
                                </Form.Label>
                                <Col md = {9}>
                                    <Form.Control
                                        plaintext = {true} 
                                        readOnly = {true}
                                        // value = {formattedLastModified}
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as = {Row} controlId = "DateCreatedInfo">
                                <Form.Label
                                    column = {true}
                                    md = {3}
                                >
                                    + Date Created:
                                </Form.Label>
                                <Col md = {9}>
                                    <Form.Control
                                        plaintext = {true} 
                                        readOnly = {true}
                                        // value = {formattedDateCreated}
                                    />
                                </Col>
                            </Form.Group>
                            
                            <hr />

                            <Form.Group controlId = "QuestionInfo">
                                <Form.Label>
                                    <h5>
                                        Question:
                                    </h5>
                                </Form.Label>
                                <Form.Control
                                    plaintext = {true} 
                                    readOnly = {true}
                                    // value = {question.content}
                                />
                            </Form.Group>
                            
                            <hr />
                            
                            <Form.Group controlId = "Option1Info">
                                <Form.Label>
                                    Option 1:
                                </Form.Label>
                                <Form.Control
                                    plaintext = {true} 
                                    readOnly = {true}
                                    // value = {option1.content}
                                />
                            </Form.Group>

                            <hr />

                            <Form.Group controlId = "Option2Info">
                                <Form.Label>
                                    Option 2:
                                </Form.Label>
                                <Form.Control
                                    plaintext = {true} 
                                    readOnly = {true}
                                    // value = {option2.content}
                                />
                            </Form.Group>
                            
                            <hr />

                            <Form.Group controlId = "Option3Info">
                                <Form.Label>
                                    Option 3:
                                </Form.Label>
                                <Form.Control
                                    plaintext = {true} 
                                    readOnly = {true}
                                    // value = {option3.content}
                                />
                            </Form.Group>
                            
                            <hr />

                            <Form.Group controlId = "Option4Info">
                                <Form.Label>
                                    Option 4:
                                </Form.Label>
                                <Form.Control
                                    plaintext = {true} 
                                    readOnly = {true}
                                    // value = {option4.content}
                                />
                            </Form.Group>

                            <hr />
                            Answer(s):

                            <Form.Row className = "mt-3">
                                <Col md = {3} className = "pr-4">
                                    <Form.Group 
                                        as = {Row} 
                                        controlId = "Option1CheckboxInfo"
                                    >
                                        <Form.Label
                                            column = {true}
                                            md = {5}
                                            className = "px-0"
                                        >
                                            Option 1:
                                        </Form.Label>
                                        <Col md = {7}>
                                            <Form.Control
                                                type = "checkbox"
                                                disabled = {true}
                                                // checked = {option1.isCorrectAnswer}
                                            />
                                        </Col>
                                    </Form.Group>
                                </Col>
                                
                                <Col md = {3} className = "pr-4">
                                    <Form.Group 
                                        as = {Row} 
                                        controlId = "Option2CheckboxInfo"
                                    >
                                        <Form.Label
                                            column = {true}
                                            md = {5}
                                            className = "px-0"
                                        >
                                            Option 2:
                                        </Form.Label>
                                        <Col md = {7}>
                                            <Form.Control
                                                type = "checkbox"
                                                disabled = {true}
                                                // checked = {option2.isCorrectAnswer}
                                            />
                                        </Col>
                                    </Form.Group>
                                </Col>
                                
                                <Col md = {3} className = "pr-4">
                                    <Form.Group 
                                        as = {Row} 
                                        controlId = "Option3CheckboxInfo"
                                    >
                                        <Form.Label
                                            column = {true}
                                            md = {5}
                                            className = "px-0"
                                        >
                                            Option 3:
                                        </Form.Label>
                                        <Col md = {7}>
                                            <Form.Control
                                                type = "checkbox"
                                                disabled = {true}
                                                // checked = {option3.isCorrectAnswer}
                                            />
                                        </Col>
                                    </Form.Group>
                                </Col>

                                <Col md = {3} className = "pr-4">
                                    <Form.Group 
                                        as = {Row} 
                                        controlId = "Option4CheckboxInfo"
                                    >
                                        <Form.Label
                                            column = {true}
                                            md = {5}
                                            className = "px-0"
                                        >
                                            Option 4:
                                        </Form.Label>
                                        <Col md = {7}>
                                            <Form.Control
                                                type = "checkbox"
                                                disabled = {true}
                                                // checked = {option4.isCorrectAnswer}
                                            />
                                        </Col>
                                    </Form.Group>
                                </Col>
                            </Form.Row>
                        </Form>
                    </Row>
                </Container>
            </main>
            <footer>
            </footer>
        </Container>
    );
}