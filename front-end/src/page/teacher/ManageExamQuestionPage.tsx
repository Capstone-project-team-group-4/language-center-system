// Import package members section:
import React, { 
    ChangeEvent
    , FormEvent
    , MouseEvent
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
import { DialogControl } from "../../common/component/ModalDialog";
import { Link } from "react-router-dom";
import { 
    TeacherSidebar 
} from "../../common/component/teacher_sidebar/TeacherSidebar";
import { MultipleChoiceQuestion } from "../../model/MultipleChoiceQuestion";
import { QuestionOption } from "../../model/QuestionOption";
import { QuizAPI } from "../../common/service/QuizAPI";
import { Quiz } from "../../model/Quiz";
import { TypeGuard } from "../../common/service/TypeGuard";
import { DataPage } from "../../App";
import { InputValidate } from "../../common/service/InputValidate";

interface ManageExamQuestionPageProps {
    dialogController: DialogControl;
    modalDialog: ReactElement;
}

export function ManageExamQuestionPage (
        props: ManageExamQuestionPageProps
): ReactElement {

    // Variables declaration:
    let [showCreateQuizForm, setShowCreateQuizForm] = useState<boolean> (false);
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
    let updatedQuestion: MultipleChoiceQuestion | undefined;
    let updatedOption: QuestionOption | undefined; 
    let htmlElement: 
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | undefined;
    let questionOptionHolder: QuestionOption[] | undefined;
    let quizAPI: QuizAPI;
    let quiz: Quiz | undefined;
    let typeGuardian: TypeGuard;
    let quizDataPage: DataPage<Quiz> | undefined; 
    let [quizHolder, setQuizHolder] = useState<Quiz[]> (new Array<Quiz> ());
    let [pageIndex] = useState<number> (0);
    let [pageSize] = useState<number> (10);
    let [totalRowCount, setTotalRowCount] = useState<number> (0);
    let [showViewDetailDialog, setShowViewDetailDialog] 
        = useState<boolean> (false);
    let button: HTMLButtonElement | undefined;
    let [formattedLastModified, setFormattedLastModified] 
        = useState<string> ("");
    let [formattedDateCreated, setFormattedDateCreated] 
        = useState<string> ("");
    let questionID: number | undefined;
    let i: number | undefined;
    let quizSample: Quiz | undefined;
    let rawDate: Date | undefined;
    let [showEditQuizForm, setShowEditQuizForm] 
        = useState<boolean> (false);
    let isValid: boolean | undefined;
    let inputValidator: InputValidate;
    let [pendingQuestionID, setPendingQuestionID] = useState<number> (0); 

    quizAPI = new QuizAPI ();
    typeGuardian = new TypeGuard ();
    inputValidator = new InputValidate (props.dialogController);

    function openCreateQuizForm (): void {
        setQuestion (new MultipleChoiceQuestion ());
        setOption1 (new QuestionOption ());
        setOption2 (new QuestionOption ());
        setOption3 (new QuestionOption ());
        setOption4 (new QuestionOption ());
        setShowCreateQuizForm (true);
    }

    function closeCreateQuizForm (): void {
        setShowCreateQuizForm (false);
    }

    function openViewDetailDialog (
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

    function closeViewDetailDialog (): void {
        setShowViewDetailDialog (false);
    }

    function openEditQuizForm (
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
                break;
            }
        }
        setShowEditQuizForm (true);
    }

    function closeEditQuizForm (): void {
        setShowEditQuizForm (false);
    }

    function handleChange (
        event: ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ): void {
        htmlElement = event.target;
        switch (htmlElement.name){
            default:
                throw new Error ("Unknown html element !");

            case "questionTextarea":
                updatedQuestion = new MultipleChoiceQuestion (question);
                updatedQuestion.content = htmlElement.value;
                setQuestion (updatedQuestion);
                break;

            case "option1Textarea":
                updatedOption = new QuestionOption (option1);
                updatedOption.content = htmlElement.value;
                setOption1 (updatedOption); 
                break;

            case "option2Textarea":
                updatedOption = new QuestionOption (option2);
                updatedOption.content = htmlElement.value;
                setOption2 (updatedOption); 
                break;

            case "option3Textarea":
                updatedOption = new QuestionOption (option3);
                updatedOption.content = htmlElement.value;
                setOption3 (updatedOption); 
                break;

            case "option4Textarea":
                updatedOption = new QuestionOption (option4);
                updatedOption.content = htmlElement.value;
                setOption4 (updatedOption); 
                break;

            case "option1Checkbox":
                updatedOption = new QuestionOption (option1);
                updatedOption.isCorrectAnswer 
                    = (htmlElement as HTMLInputElement).checked;
                setOption1 (updatedOption);
                break;

            case "option2Checkbox":
                updatedOption = new QuestionOption (option2);
                updatedOption.isCorrectAnswer 
                    = (htmlElement as HTMLInputElement).checked;
                setOption2 (updatedOption);
                break;

            case "option3Checkbox":
                updatedOption = new QuestionOption (option3);
                updatedOption.isCorrectAnswer 
                    = (htmlElement as HTMLInputElement).checked;
                setOption3 (updatedOption);
                break;

            case "option4Checkbox":
                updatedOption = new QuestionOption (option4);
                updatedOption.isCorrectAnswer 
                    = (htmlElement as HTMLInputElement).checked;
                setOption4 (updatedOption);
                break;
        }
    }

    async function createQuiz (
            event: FormEvent<HTMLFormElement>
    ): Promise<void> {
        event.preventDefault ();
        questionOptionHolder = new Array<QuestionOption> ();
        questionOptionHolder.push (option1);
        questionOptionHolder.push (option2);
        questionOptionHolder.push (option3);
        questionOptionHolder.push (option4);
        isValid = inputValidator.validateQuestionOption (questionOptionHolder);
        if (isValid === false){
            return Promise.resolve<undefined> (undefined);
        }
        else {
            quiz = new Quiz (question, questionOptionHolder);
            try {
                await quizAPI.createNewQuiz (quiz);
                closeCreateQuizForm ();
                props.dialogController.setDialogTitle (
                        "Quiz Question Created !"
                );
                props.dialogController.setDialogBody (
                        "The quiz question has been created successfully."
                );
                props.dialogController.setDialogType ("inform");
                props.dialogController.setShowDialog (true);
                loadQuizTable ();
                return Promise.resolve<undefined> (undefined);
            }
            catch (apiError: unknown){
                if (typeGuardian.isAxiosError (apiError)){
                    if (typeof apiError.code === "string"){
                        props.dialogController.setDialogTitle (
                                `${apiError.code}: ${apiError.name}`
                        );
                    }
                    else {
                        props.dialogController.setDialogTitle (
                                apiError.name
                        );
                    }
                    props.dialogController.setDialogBody (apiError.message);
                    props.dialogController.setDialogType ("error");
                    props.dialogController.setShowDialog (true);
                }
                return Promise.reject (apiError);
            }
        }
    }

    async function editQuiz (
            event: FormEvent<HTMLFormElement>
    ): Promise<void> {
        event.preventDefault ();
        questionOptionHolder = new Array<QuestionOption> ();
        questionOptionHolder.push (option1);
        questionOptionHolder.push (option2);
        questionOptionHolder.push (option3);
        questionOptionHolder.push (option4);
        isValid = inputValidator.validateQuestionOption (questionOptionHolder);
        if (isValid === false){
            return Promise.resolve<undefined> (undefined);
        }
        else {
            quiz = new Quiz (question, questionOptionHolder);
            try {
                await quizAPI.updateQuiz (quiz);
                closeEditQuizForm ();
                props.dialogController.setDialogTitle ("Quiz Question Saved !");
                props.dialogController.setDialogBody (
                        "The quiz question has been saved successfully."
                );
                props.dialogController.setDialogType ("inform");
                props.dialogController.setShowDialog (true);
                loadQuizTable ();
                return Promise.resolve<undefined> (undefined);
            }
            catch (apiError: unknown){
                if (typeGuardian.isAxiosError (apiError)){
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
    }

    function handleDeleteQuiz (
            event: MouseEvent<HTMLElement, globalThis.MouseEvent>
    ): void {
        button = event.target as HTMLButtonElement;
        setPendingQuestionID (Number (button.value));
        props.dialogController.setDialogTitle ("Confirm Delete Quiz Question");
        props.dialogController.setDialogBody (
                "Are you sure you want to delete this quiz question ?"
        );
        props.dialogController.setDialogType ("confirm");
        props.dialogController.setShowDialog (true);
    }

    async function executeQuizDeletion (): Promise<void> {
        try {
            await quizAPI.deleteQuizByQuestionID (pendingQuestionID);
            loadQuizTable ();
            return Promise.resolve<undefined> (undefined);
        }
        catch (apiError: unknown){
            if (typeGuardian.isAxiosError (apiError)){
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

    async function loadQuizTable (): Promise<void> {
        try {
            quizDataPage 
                = await quizAPI.getAllQuizCreatedByCurrentLoggedInUser (
                    pageIndex
                    , pageSize
            ); 
            setTotalRowCount (quizDataPage.totalRowCount);
            setQuizHolder (quizDataPage.pageDataHolder);
            return Promise.resolve<undefined> (undefined);
        }
        catch (apiError: unknown){
            if (typeGuardian.isAxiosError (apiError)){
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
            loadQuizTable ().catch (
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
                executeQuizDeletion ().catch (
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
                show = {showCreateQuizForm}
                backdrop = "static"
                keyboard = {false}
                size = "lg"
            >
                <Modal.Header>
                    <Modal.Title>New Quiz Question</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form 
                        id = "CreateQuizForm"
                        className = "pt-2 pr-5 pl-5 pb-0"
                        onSubmit = {
                            (event) => {
                                createQuiz (event).catch (
                                        (error) => {
                                            console.error (error);
                                        }
                                );
                            }
                        }
                    >
                        <Form.Group controlId = "QuestionTextarea">
                            <Form.Label>
                                <h5>
                                    Question:
                                </h5>
                                <Form.Text className = "text-muted">
                                    format: max 500 characters  
                                </Form.Text>
                            </Form.Label>
                            <Form.Control
                                as = "textarea"
                                autoComplete = "off"
                                autoFocus = {true}
                                name = "questionTextarea"
                                placeholder 
                                    = "Content for the new quiz question ?"
                                required = {true}
                                spellCheck = {true}
                                rows = {3}
                                maxLength = {500}
                                value = {question.content}
                                onChange = {
                                    (event) => {
                                        handleChange (event);
                                    }
                                }
                            />
                        </Form.Group>

                        <Form.Group controlId = "Option1Textarea">
                            <Form.Label>
                                Option 1:
                                <Form.Text className = "text-muted">
                                    format: max 500 characters  
                                </Form.Text>
                            </Form.Label>
                            <Form.Control
                                as = "textarea"
                                autoComplete = "off"
                                autoFocus = {false}
                                name = "option1Textarea"
                                placeholder = "Content for the option 1 ?"
                                required = {true}
                                spellCheck = {true}
                                rows = {3}
                                maxLength = {500}
                                value = {option1.content}
                                onChange = {
                                    (event) => {
                                        handleChange (event);
                                    }
                                }
                            />
                        </Form.Group>

                        <Form.Group controlId = "Option2Textarea">
                            <Form.Label>
                                Option 2:
                                <Form.Text className = "text-muted">
                                    format: max 500 characters  
                                </Form.Text>
                            </Form.Label>
                            <Form.Control
                                as = "textarea"
                                autoComplete = "off"
                                autoFocus = {false}
                                name = "option2Textarea"
                                placeholder = "Content for the option 2 ?"
                                required = {true}
                                spellCheck = {true}
                                rows = {3}
                                maxLength = {500}
                                value = {option2.content}
                                onChange = {
                                    (event) => {
                                        handleChange (event);
                                    }
                                }
                            />
                        </Form.Group>

                        <Form.Group controlId = "Option3Textarea">
                            <Form.Label>
                                Option 3:
                                <Form.Text className = "text-muted">
                                    format: max 500 characters  
                                </Form.Text>
                            </Form.Label>
                            <Form.Control
                                as = "textarea"
                                autoComplete = "off"
                                autoFocus = {false}
                                name = "option3Textarea"
                                placeholder = "Content for the option 3 ?"
                                required = {true}
                                spellCheck = {true}
                                rows = {3}
                                maxLength = {500}
                                value = {option3.content}
                                onChange = {
                                    (event) => {
                                        handleChange (event);
                                    }
                                }
                            />
                        </Form.Group>

                        <Form.Group controlId = "Option4Textarea">
                            <Form.Label>
                                Option 4:
                                <Form.Text className = "text-muted">
                                    format: max 500 characters  
                                </Form.Text>
                            </Form.Label>
                            <Form.Control
                                as = "textarea"
                                autoComplete = "off"
                                autoFocus = {false}
                                name = "option4Textarea"
                                placeholder = "Content for the option 4 ?"
                                required = {true}
                                spellCheck = {true}
                                rows = {3}
                                maxLength = {500}
                                value = {option4.content}
                                onChange = {
                                    (event) => {
                                        handleChange (event);
                                    }
                                }
                            />
                        </Form.Group>

                        <hr />
                        Answer(s):
                        <Form.Text className = "text-muted mb-3">
                            format: select at least 
                            one option, select all 4 options is not allowed !  
                        </Form.Text>

                        <Form.Row>
                            <Col md = {3} className = "pr-4">
                                <Form.Group 
                                    as = {Row} 
                                    controlId = "Option1Checkbox"
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
                                            autoFocus = {false}
                                            name = "option1Checkbox"
                                            required = {false}
                                            checked = {option1.isCorrectAnswer}
                                            onChange = {
                                                (event) => {
                                                    handleChange (event);
                                                }
                                            }
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                            
                            <Col md = {3} className = "pr-4">
                                <Form.Group 
                                    as = {Row} 
                                    controlId = "Option2Checkbox"
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
                                            autoFocus = {false}
                                            name = "option2Checkbox"
                                            required = {false}
                                            checked = {option2.isCorrectAnswer}
                                            onChange = {
                                                (event) => {
                                                    handleChange (event);
                                                }
                                            }
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                            
                            <Col md = {3} className = "pr-4">
                                <Form.Group 
                                    as = {Row} 
                                    controlId = "Option3Checkbox"
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
                                            autoFocus = {false}
                                            name = "option3Checkbox"
                                            required = {false}
                                            checked = {option3.isCorrectAnswer}
                                            onChange = {
                                                (event) => {
                                                    handleChange (event);
                                                }
                                            }
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>

                            <Col md = {3} className = "pr-4">
                                <Form.Group 
                                    as = {Row} 
                                    controlId = "Option4Checkbox"
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
                                            autoFocus = {false}
                                            name = "option4Checkbox"
                                            required = {false}
                                            checked = {option4.isCorrectAnswer}
                                            onChange = {
                                                (event) => {
                                                    handleChange (event);
                                                }
                                            }
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant = "success" 
                        type = "submit"
                        form = "CreateQuizForm" 
                    >
                        Create Question
                    </Button>
                    <Button 
                        variant = "outline-secondary" 
                        onClick = {closeCreateQuizForm}
                    >
                        Cancel
                    </Button>   
                </Modal.Footer>
            </Modal>
            <Modal
                show = {showViewDetailDialog}
                backdrop = "static"
                keyboard = {false}
                size = "lg"
            >
                <Modal.Header>
                    <Modal.Title>Quiz Question Details</Modal.Title>
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
                show = {showEditQuizForm}
                backdrop = "static"
                keyboard = {false}
                size = "lg"
            >
                <Modal.Header>
                    <Modal.Title>Edit Quiz Question</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form 
                        id = "EditQuizForm"
                        className = "pt-2 pr-5 pl-5 pb-0"
                        onSubmit = {
                            (event) => {
                                editQuiz (event).catch (
                                        (error) => {
                                            console.error (error);
                                        }
                                );
                            }
                        }
                    >
                        <Form.Group controlId = "QuestionTextarea">
                            <Form.Label>
                                <h5>
                                    Question:
                                </h5>
                                <Form.Text className = "text-muted">
                                    format: max 500 characters  
                                </Form.Text>
                            </Form.Label>
                            <Form.Control
                                as = "textarea"
                                autoComplete = "off"
                                autoFocus = {true}
                                name = "questionTextarea"
                                placeholder 
                                    = "Content for the quiz question ?"
                                required = {true}
                                spellCheck = {true}
                                rows = {3}
                                maxLength = {500}
                                value = {question.content}
                                onChange = {
                                    (event) => {
                                        handleChange (event);
                                    }
                                }
                            />
                        </Form.Group>

                        <Form.Group controlId = "Option1Textarea">
                            <Form.Label>
                                Option 1:
                                <Form.Text className = "text-muted">
                                    format: max 500 characters  
                                </Form.Text>
                            </Form.Label>
                            <Form.Control
                                as = "textarea"
                                autoComplete = "off"
                                autoFocus = {false}
                                name = "option1Textarea"
                                placeholder = "Content for the option 1 ?"
                                required = {true}
                                spellCheck = {true}
                                rows = {3}
                                maxLength = {500}
                                value = {option1.content}
                                onChange = {
                                    (event) => {
                                        handleChange (event);
                                    }
                                }
                            />
                        </Form.Group>

                        <Form.Group controlId = "Option2Textarea">
                            <Form.Label>
                                Option 2:
                                <Form.Text className = "text-muted">
                                    format: max 500 characters  
                                </Form.Text>
                            </Form.Label>
                            <Form.Control
                                as = "textarea"
                                autoComplete = "off"
                                autoFocus = {false}
                                name = "option2Textarea"
                                placeholder = "Content for the option 2 ?"
                                required = {true}
                                spellCheck = {true}
                                rows = {3}
                                maxLength = {500}
                                value = {option2.content}
                                onChange = {
                                    (event) => {
                                        handleChange (event);
                                    }
                                }
                            />
                        </Form.Group>

                        <Form.Group controlId = "Option3Textarea">
                            <Form.Label>
                                Option 3:
                                <Form.Text className = "text-muted">
                                    format: max 500 characters  
                                </Form.Text>
                            </Form.Label>
                            <Form.Control
                                as = "textarea"
                                autoComplete = "off"
                                autoFocus = {false}
                                name = "option3Textarea"
                                placeholder = "Content for the option 3 ?"
                                required = {true}
                                spellCheck = {true}
                                rows = {3}
                                maxLength = {500}
                                value = {option3.content}
                                onChange = {
                                    (event) => {
                                        handleChange (event);
                                    }
                                }
                            />
                        </Form.Group>

                        <Form.Group controlId = "Option4Textarea">
                            <Form.Label>
                                Option 4:
                                <Form.Text className = "text-muted">
                                    format: max 500 characters  
                                </Form.Text>
                            </Form.Label>
                            <Form.Control
                                as = "textarea"
                                autoComplete = "off"
                                autoFocus = {false}
                                name = "option4Textarea"
                                placeholder = "Content for the option 4 ?"
                                required = {true}
                                spellCheck = {true}
                                rows = {3}
                                maxLength = {500}
                                value = {option4.content}
                                onChange = {
                                    (event) => {
                                        handleChange (event);
                                    }
                                }
                            />
                        </Form.Group>

                        <hr />
                        Answer(s):
                        <Form.Text className = "text-muted mb-3">
                            format: select at least one option
                            , select all 4 options is not allowed !  
                        </Form.Text>

                        <Form.Row>
                            <Col md = {3} className = "pr-4">
                                <Form.Group 
                                    as = {Row} 
                                    controlId = "Option1Checkbox"
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
                                            autoFocus = {false}
                                            name = "option1Checkbox"
                                            required = {false}
                                            checked = {option1.isCorrectAnswer}
                                            onChange = {
                                                (event) => {
                                                    handleChange (event);
                                                }
                                            }
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                            
                            <Col md = {3} className = "pr-4">
                                <Form.Group 
                                    as = {Row} 
                                    controlId = "Option2Checkbox"
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
                                            autoFocus = {false}
                                            name = "option2Checkbox"
                                            required = {false}
                                            checked = {option2.isCorrectAnswer}
                                            onChange = {
                                                (event) => {
                                                    handleChange (event);
                                                }
                                            }
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                            
                            <Col md = {3} className = "pr-4">
                                <Form.Group 
                                    as = {Row} 
                                    controlId = "Option3Checkbox"
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
                                            autoFocus = {false}
                                            name = "option3Checkbox"
                                            required = {false}
                                            checked = {option3.isCorrectAnswer}
                                            onChange = {
                                                (event) => {
                                                    handleChange (event);
                                                }
                                            }
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>

                            <Col md = {3} className = "pr-4">
                                <Form.Group 
                                    as = {Row} 
                                    controlId = "Option4Checkbox"
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
                                            autoFocus = {false}
                                            name = "option4Checkbox"
                                            required = {false}
                                            checked = {option4.isCorrectAnswer}
                                            onChange = {
                                                (event) => {
                                                    handleChange (event);
                                                }
                                            }
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant = "success" 
                        type = "submit"
                        form = "EditQuizForm" 
                    >
                        Save
                    </Button>
                    <Button 
                        variant = "outline-secondary" 
                        onClick = {closeEditQuizForm}
                    >
                        Cancel
                    </Button>   
                </Modal.Footer>
            </Modal>
            <TeacherSidebar />
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
                                    linkProps = {{to: "/teacher-dashboard"}}
                                >
                                    Teacher Dashboard
                                </Breadcrumb.Item>
                                <Breadcrumb.Item active>
                                    Manage Multiple Choice Question
                                </Breadcrumb.Item>
                            </Breadcrumb>
                            <h1 className = "mb-3">
                                <span className = "mr-3">
                                    Manage Exam Multiple Choice Question
                                </span>
                                <Button 
                                    variant = "success"
                                    type = "button"
                                    onClick = {openCreateQuizForm}
                                >
                                    Create New
                                </Button>
                            </h1>
                            <Form>
                                <Table responsive = "md" hover = {true}>
                                    <thead>
                                        <tr>
                                            <th>
                                                #
                                            </th>
                                            <th>
                                                Question ID
                                            </th>
                                            <th>
                                                Question Content
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
                                                    , openViewDetailDialog
                                                    , openEditQuizForm
                                                    , handleDeleteQuiz
                                            )
                                        )}
                                    </tbody>
                                </Table>
                            </Form>
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
        , openViewDetailsDialog: (
                event: MouseEvent<HTMLElement, globalThis.MouseEvent>
        ) => void 
        , openEditQuizForm: (
                event: MouseEvent<HTMLElement, globalThis.MouseEvent>
        ) => void
        , handleDeleteQuiz: (
                event: MouseEvent<HTMLElement, globalThis.MouseEvent>
        ) => void 
): ReactElement {
    return (
        <tr key = {quiz.multipleChoiceQuestion.questionID}>
            <td>
                {index + 1}
            </td>
            <td>
                {quiz.multipleChoiceQuestion.questionID}
            </td>
            <td>
                {quiz.multipleChoiceQuestion.content}
            </td>
            <td>
                <Button 
                    variant = "primary"
                    type = "button"
                    value = {quiz.multipleChoiceQuestion.questionID}
                    onClick = {
                        (event) => {
                            openViewDetailsDialog (event);
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
                            openEditQuizForm (event);
                        }
                    }
                >
                    Edit
                </Button>
                <Button 
                    variant = "danger"
                    type = "button"
                    value = {quiz.multipleChoiceQuestion.questionID}
                    onClick = {
                        (event) => {
                            handleDeleteQuiz (event);
                        }
                    }
                >
                    Delete
                </Button>
            </td>
        </tr>
    );
}