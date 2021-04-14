// Import package members section:
import React, { 
    MouseEvent
    , ReactElement
    , useEffect
    , useState 
} from "react";
import { 
    Breadcrumb
    , Button
    , Col
    , Container
    , Form
    , Modal
    , Row
    , Table 
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { DataPage } from "../../App";
import { DialogControl } from "../../common/component/ModalDialog";
import { ExaminationAPI } from "../../common/service/ExaminationAPI";
import { QuizAPI } from "../../common/service/QuizAPI";
import { TypeGuard } from "../../common/service/TypeGuard";
import { MultipleChoiceQuestion } from "../../model/MultipleChoiceQuestion";
import { QuestionOption } from "../../model/QuestionOption";
import { Quiz } from "../../model/Quiz";

interface ManageExamQuestionInExaminationPageUrlParameter {
    examID: string;
}

interface ManageExamQuestionInExaminationPageProps {
    dialogController: DialogControl;
    modalDialog: ReactElement;
    typeGuardian: TypeGuard;
}

export function ManageExamQuestionInExaminationPage (
        props: ManageExamQuestionInExaminationPageProps
): ReactElement {

    // Variables declaration:
    let [quizInTheExamHolder, setQuizInTheExamHolder] 
        = useState<Quiz[]> (new Array<Quiz> ());
    let quizDataPage: DataPage<Quiz> | undefined;
    let [pageIndex2] = useState<number> (0);
    let [pageSize2] = useState<number> (10);
    let [totalRowCount2, setTotalRowCount2] = useState<number> (0);
    let examID = useParams<ManageExamQuestionInExaminationPageUrlParameter> ()
        .examID;
    let [showAddExamQuestionDialog, setShowAddExamQuestionDialog] 
        = useState<boolean> (false);
    let [pageIndex] = useState<number> (0);
    let [pageSize] = useState<number> (10);
    let [totalRowCount, setTotalRowCount] = useState<number> (0);
    let [quizHolder, setQuizHolder] = useState<Quiz[]> (new Array<Quiz> ());
    let button: HTMLButtonElement | undefined;
    let [pendingQuestionID, setPendingQuestionID] = useState<number> (0);
    let [showViewDetailDialog, setShowViewDetailDialog] 
        = useState<boolean> (false);
    let questionID: number | undefined;
    let i: number | undefined;
    let quizSample: Quiz | undefined;
    let [question, setQuestion] 
        = useState<MultipleChoiceQuestion> (new MultipleChoiceQuestion ());
    let [option1, setOption1] 
        = useState<QuestionOption> (new QuestionOption ()); 
    let [option2, setOption2] 
        = useState<QuestionOption> (new QuestionOption ());
    let [option3, setOption3] 
        = useState<QuestionOption> (new QuestionOption ());
    let [option4, setOption4] 
        = useState<QuestionOption> (new QuestionOption ());
    let rawDate: Date | undefined;
    let [formattedLastModified, setFormattedLastModified] 
        = useState<string> ("");
    let [formattedDateCreated, setFormattedDateCreated] 
        = useState<string> ("");

    let [quizAPI] = useState<QuizAPI> (new QuizAPI ());
    let [examAPI] = useState<ExaminationAPI> (new ExaminationAPI ());
    
    function openViewExamQuestionDetailDialog (
            event: MouseEvent<HTMLElement, globalThis.MouseEvent>
    ): void {
        button = event.target as HTMLButtonElement;
        questionID = Number (button.value);
        for (i = 0; i < quizHolder.length; i++){
            quizSample = quizHolder[i];
            if (quizSample.multipleChoiceQuestion.questionID === questionID){
                setQuestion (quizSample.multipleChoiceQuestion);
                setOption1 (quizSample.questionOptionHolder[0]);
                setOption2 (quizSample.questionOptionHolder[1]);
                setOption3 (quizSample.questionOptionHolder[2]);
                setOption4 (quizSample.questionOptionHolder[3]);
                rawDate = new Date (
                        quizSample.multipleChoiceQuestion.lastModified
                ); 
                if (rawDate.toString () === new Date (0).toString ()){
                    setFormattedLastModified ("Has not been modified yet !");
                }
                else {
                    setFormattedLastModified (rawDate.toLocaleString ());
                }
                rawDate = new Date (
                        quizSample.multipleChoiceQuestion.dateCreated
                );
                setFormattedDateCreated (rawDate.toLocaleString ());
                break;
            }
        }
        setShowViewDetailDialog (true);
    }

    function openViewExamQuestionInTheExamDetailDialog (
            event: MouseEvent<HTMLElement, globalThis.MouseEvent>
    ): void {
        button = event.target as HTMLButtonElement;
        questionID = Number (button.value);
        for (i = 0; i < quizInTheExamHolder.length; i++){
            quizSample = quizInTheExamHolder[i];
            if (quizSample.multipleChoiceQuestion.questionID === questionID){
                setQuestion (quizSample.multipleChoiceQuestion);
                setOption1 (quizSample.questionOptionHolder[0]);
                setOption2 (quizSample.questionOptionHolder[1]);
                setOption3 (quizSample.questionOptionHolder[2]);
                setOption4 (quizSample.questionOptionHolder[3]);
                rawDate = new Date (
                        quizSample.multipleChoiceQuestion.lastModified
                ); 
                if (rawDate.toString () === new Date (0).toString ()){
                    setFormattedLastModified ("Has not been modified yet !");
                }
                else {
                    setFormattedLastModified (rawDate.toLocaleString ());
                }
                rawDate = new Date (
                        quizSample.multipleChoiceQuestion.dateCreated
                );
                setFormattedDateCreated (rawDate.toLocaleString ());
                break;
            }
        }
        setShowViewDetailDialog (true);
    }

    function closeViewDetailDialog (): void {
        setShowViewDetailDialog (false);
    }

    function openAddExamQuestionDialog (): void {
        loadQuizExcludingQuizInTheExamTable ().catch (
                (error: unknown) => {
                    console.error (error);
                }
        );
        setShowAddExamQuestionDialog (true);
    }

    function closeAddExamQuestionDialog (): void {
        setShowAddExamQuestionDialog (false);
    }

    function handleRemoveAQuizFromExam (
            event: MouseEvent<HTMLElement, globalThis.MouseEvent>
    ): void {
        button = event.target as HTMLButtonElement;
        setPendingQuestionID (Number (button.value));
        props.dialogController.setDialogTitle (
                "Confirm Remove Exam Question From Examination"
        );
        props.dialogController.setDialogBody (
                "Are you sure you want to remove this exam question" 
                + "from the exam ?"
        );
        props.dialogController.setDialogType ("confirm");
        props.dialogController.setShowDialog (true);
    }

    async function executeAQuizFromExamRemoval (): Promise<void> {
        try {
            await examAPI.removeAQuizFromExam (
                    pendingQuestionID
                    , Number (examID)
            );
            await loadQuizInTheExamTable (); 
            return Promise.resolve<undefined> (undefined);
        }
        catch (apiError: unknown){
            if (props.typeGuardian.isAxiosError (apiError)){
                if (typeof apiError.code === "string"){
                    props.dialogController.setDialogTitle (
                        `${apiError.code}: ${apiError.name}`
                    );
                }
                else {
                    props.dialogController.setDialogTitle (apiError.name);
                }
                props.dialogController.setDialogBody (apiError.message);
                props.dialogController.setDialogType ("error");
                props.dialogController.setShowDialog (true);
            }
            return Promise.reject (apiError);
        }
    }

    async function addAQuizToExam (
            event: MouseEvent<HTMLElement, globalThis.MouseEvent>
    ): Promise<void> {
        button = event.target as HTMLButtonElement;
        try {
            await examAPI.addAQuizToExam (
                    Number (button.value)
                    , Number (examID)
            ); 
            await loadQuizExcludingQuizInTheExamTable ();
            await loadQuizInTheExamTable (); 
            return Promise.resolve<undefined> (undefined); 
        }
        catch (apiError: unknown){
            if (props.typeGuardian.isAxiosError (apiError)){
                if (typeof apiError.code === "string"){
                    props.dialogController.setDialogTitle (
                        `${apiError.code}: ${apiError.name}`
                    );
                }
                else {
                    props.dialogController.setDialogTitle (apiError.name);
                }
                props.dialogController.setDialogBody (apiError.message);
                props.dialogController.setDialogType ("error");
                props.dialogController.setShowDialog (true);
            }
            return Promise.reject (apiError);
        }
    }

    async function loadQuizExcludingQuizInTheExamTable (): Promise<void> {
        try {
            quizDataPage 
                = await quizAPI.getAllQuizExcludingQuizInTheExam (
                    Number (examID)
                    , pageIndex
                    , pageSize
            ); 
            setTotalRowCount (quizDataPage.totalRowCount);
            setQuizHolder (quizDataPage.pageDataHolder);
            return Promise.resolve<undefined> (undefined);
        }
        catch (apiError: unknown){
            if (props.typeGuardian.isAxiosError (apiError)){
                if (typeof apiError.code === "string"){
                    props.dialogController.setDialogTitle (
                            `${apiError.code}: ${apiError.name}`
                    );
                }
                else {
                    props.dialogController.setDialogTitle (apiError.name);
                }
                props.dialogController.setDialogBody (apiError.message);
                props.dialogController.setDialogType ("error");
                props.dialogController.setShowDialog (true);
            }
            return Promise.reject (apiError);
        }
    }

    async function loadQuizInTheExamTable (): Promise<void> {
        try {
            quizDataPage 
                = await quizAPI.getAllQuizAreInTheExam (
                    Number (examID)
                    , pageIndex2
                    , pageSize2
            ); 
            setTotalRowCount2 (quizDataPage.totalRowCount);
            setQuizInTheExamHolder (quizDataPage.pageDataHolder);
            return Promise.resolve<undefined> (undefined);
        }
        catch (apiError: unknown){
            if (props.typeGuardian.isAxiosError (apiError)){
                if (typeof apiError.code === "string"){
                    props.dialogController.setDialogTitle (
                            `${apiError.code}: ${apiError.name}`
                    );
                }
                else {
                    props.dialogController.setDialogTitle (apiError.name);
                }
                props.dialogController.setDialogBody (apiError.message);
                props.dialogController.setDialogType ("error");
                props.dialogController.setShowDialog (true);
            }
            return Promise.reject (apiError);
        }
    }

    useEffect (
        () => {
            loadQuizInTheExamTable ().catch (
                    (error) => {
                        console.error (error);
                    }
            );
        }
        , []
    );
    
    useEffect (
        () => {
            if (props.dialogController.dialogIsConfirmed === true){
                executeAQuizFromExamRemoval ().catch (
                        (error) => {
                            console.error (error);
                        }
                );
                props.dialogController.setDialogIsConfirmed (false); 
            }
        }
        , [props.dialogController.dialogIsConfirmed]
    );

    return (
        <Container fluid = {true}>
            {props.modalDialog}
            <Modal
                show = {showViewDetailDialog}
                backdrop = "static"
                keyboard = {false}
                size = "lg"
            >
                <Modal.Header>
                    <Modal.Title>Exam Question Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        className = "pt-2 pr-5 pl-5 pb-0"
                    >
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
                                    value = {formattedLastModified}
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
                                    value = {formattedDateCreated}
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
                                value = {question.content}
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
                                value = {option1.content}
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
                                value = {option2.content}
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
                                value = {option3.content}
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
                                value = {option4.content}
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
                                            checked = {option1.isCorrectAnswer}
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
                                            checked = {option2.isCorrectAnswer}
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
                                            checked = {option3.isCorrectAnswer}
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
                                            checked = {option4.isCorrectAnswer}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant = "info" 
                        onClick = {closeViewDetailDialog}
                    >
                        Close
                    </Button>   
                </Modal.Footer>
            </Modal>
            <Modal
                show = {showAddExamQuestionDialog}
                backdrop = "static"
                keyboard = {false}
                size = "lg"
            >
                <Modal.Header>
                    <Modal.Title>Add An Exam Question</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table responsive = "md" hover = {true}>
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>
                                    Question Content
                                </th>
                                <th>
                                    Created By
                                </th>
                                <th>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {quizHolder.map (
                                (
                                        quiz
                                        , index
                                ) => renderQuizTable (
                                        quiz
                                        , index
                                        , openViewExamQuestionDetailDialog
                                        , addAQuizToExam
                                )
                            )}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant = "info" 
                        onClick = {closeAddExamQuestionDialog}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <main>
                <Container>
                    <Row className = "bg-white">
                        <Col>
                            <Breadcrumb>
                                <Breadcrumb.Item 
                                    linkAs = {Link}
                                    linkProps = {{to: "/"}}
                                >
                                    Home
                                </Breadcrumb.Item>
                                <Breadcrumb.Item 
                                    linkAs = {Link}
                                    linkProps = {{to: "/admin-console"}}
                                >
                                    Admin Console
                                </Breadcrumb.Item>
                                <Breadcrumb.Item 
                                    linkAs = {Link}
                                    linkProps = {
                                        {
                                            to: "/admin-console"
                                            + "/manage-things-"
                                            + "in-examination-page"
                                        }
                                    }
                                >
                                    Manage Things In Examination
                                </Breadcrumb.Item>
                                <Breadcrumb.Item active>
                                    Manage Exam Question In Examination
                                </Breadcrumb.Item>
                            </Breadcrumb>
                            <h1 className = "mb-3">
                                <span className = "mr-3">
                                    Manage Exam Question In Examination
                                </span>
                                <Button 
                                    variant = "success"
                                    type = "button"
                                    onClick = {openAddExamQuestionDialog}
                                >
                                    Add Exam Question
                                </Button>
                            </h1>
                            <Table responsive = "md" hover = {true}>
                                <thead>
                                    <tr>
                                        <th>
                                            #
                                        </th>
                                        <th>
                                            Question Content
                                        </th>
                                        <th>
                                            Created By
                                        </th>
                                        <th>
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {quizInTheExamHolder.map (
                                        (
                                                quiz
                                                , index
                                        ) => renderQuizInTheExamTable (
                                                quiz
                                                , index
                                            // eslint-disable-next-line max-len
                                                , openViewExamQuestionInTheExamDetailDialog
                                                , handleRemoveAQuizFromExam  
                                        )
                                    )}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </main>
            <footer>
            </footer>
        </Container>
    );
}

function renderQuizTable (
        quiz: Quiz
        , index: number 
        , openViewExamQuestionDetailDialog: (
                event: MouseEvent<HTMLElement, globalThis.MouseEvent>
        ) => void 
        , addAQuizToExam: (
                event: MouseEvent<HTMLElement, globalThis.MouseEvent>
        ) => Promise<void>
): ReactElement {
    return (
        <tr key = {quiz.multipleChoiceQuestion.questionID}>
            <td>
                {index + 1}
            </td>
            <td>
                {quiz.multipleChoiceQuestion.content}
            </td>
            <td>
                {`${
                    quiz.multipleChoiceQuestion.creator.firstName
                } ${
                    quiz.multipleChoiceQuestion.creator.middleName
                } ${
                    quiz.multipleChoiceQuestion.creator.lastName
                }`}
            </td>
            <td>
                <Button 
                    variant = "primary"
                    type = "button"
                    value = {quiz.multipleChoiceQuestion.questionID}
                    onClick = {
                        (event) => {
                            openViewExamQuestionDetailDialog (event);
                        }
                    }
                >
                    Details
                </Button>
                <Button 
                    variant = "success"
                    type = "button"
                    value = {quiz.multipleChoiceQuestion.questionID}
                    onClick = {
                        (event) => {
                            addAQuizToExam (event).catch (
                                    (error: unknown) => {
                                        console.error (error);
                                    }
                            );
                        }
                    }
                >
                    Add
                </Button>
            </td>
        </tr>
    );
}

function renderQuizInTheExamTable (
        quiz: Quiz
        , index: number 
        , openViewExamQuestionInTheExamDetailDialog: (
                event: MouseEvent<HTMLElement, globalThis.MouseEvent>
        ) => void
        , handleRemoveAQuizFromExam: (
                event: MouseEvent<HTMLElement, globalThis.MouseEvent>
        ) => void 
): ReactElement {
    return (
        <tr key = {quiz.multipleChoiceQuestion.questionID}>
            <td>
                {index + 1}
            </td>
            <td>
                {quiz.multipleChoiceQuestion.content}
            </td>
            <td>
                {`${
                    quiz.multipleChoiceQuestion.creator.firstName
                } ${
                    quiz.multipleChoiceQuestion.creator.middleName
                } ${
                    quiz.multipleChoiceQuestion.creator.lastName
                }`}
            </td>
            <td>
                <Button 
                    variant = "primary"
                    type = "button"
                    value = {quiz.multipleChoiceQuestion.questionID}
                    onClick = {
                        (event) => {
                            openViewExamQuestionInTheExamDetailDialog (event);
                        }
                    }
                >
                    Details
                </Button>
                <Button 
                    variant = "danger"
                    type = "button"
                    value = {quiz.multipleChoiceQuestion.questionID}
                    onClick = {
                        (event) => {
                            handleRemoveAQuizFromExam (event);
                        }
                    }
                >
                    Remove
                </Button>
            </td>
        </tr>
    );
}