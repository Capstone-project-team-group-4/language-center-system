/* eslint-disable eqeqeq */
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
import { Link, useHistory } from "react-router-dom";
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
import { History } from "history";

interface TakeExamPageProps {
    dialogController: DialogControl;
    modalDialog: ReactElement;
    typeGuardian: TypeGuard;
}

export function TakeExamPage (props: TakeExamPageProps): ReactElement {
    
    // Variables declaration:
    let [quiz, setQuiz] = useState<Quiz> (new Quiz ());
    let [option1, setOption1] 
        = useState<QuestionOption> (new QuestionOption ()); 
    let [option2, setOption2] 
        = useState<QuestionOption> (new QuestionOption ());
    let [option3, setOption3] 
        = useState<QuestionOption> (new QuestionOption ());
    let [option4, setOption4] 
        = useState<QuestionOption> (new QuestionOption ());
    let htmlElement: 
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | undefined;
    let updatedOption: QuestionOption | undefined;
    let [isFirstQuestion, setIsFirstQuestion] = useState<boolean> (true);
    let [isLastQuestion, setIsLastQuestion] = useState<boolean> (false);
    let nextQuestionButton: ReactElement | undefined;
    let previousQuestionButton: ReactElement | undefined;
    let quizAnswer: QuestionOption[] | undefined; 
    let [archivedExamAnswer] 
        = useSessionState<Array<QuestionOption[]>> (
                "archivedExamAnswer"
                , new Array<QuestionOption[]> () 
        );
    let [questionIndex, setQuestionIndex] = useSessionState<number> (
            "questionIndex"
            , 0  
    );
    let archivedQuizAnswer: QuestionOption[] | undefined;
    let [totalNumberOfQuestion] = useSessionState<number> (
            "totalNumberOfQuestion"
            , 0  
    );
    let [timeRemainingInSeconds, setTimeRemainingInSeconds] 
        = useSessionState<number> (
                "timeRemainingInSeconds"
                , 1  
        );
    let minuteCountdown: number | undefined;
    let secondCountdown: number | undefined;
    let [pendingQuizAnswer, setPendingQuizAnswer]
        = useSessionState<QuestionOption[]> (
                "pendingQuizAnswer"
                , new Array<QuestionOption> ()   
        );
    let history: History<unknown>;

    let [examSessionAPI] = useState<ExaminationSessionAPI> (
        new ExaminationSessionAPI ()
    );
    history = useHistory ();
    
    function countDown (): void {
        setTimeRemainingInSeconds (
                (previousTimeRemaining) => {
                    let newTimeRemaining: number | undefined;

                    newTimeRemaining = (previousTimeRemaining - 1); 
                    return newTimeRemaining;
                }
        );       
    } 

    async function goToPreviousQuestion (): Promise<void> {
        quizAnswer = new Array<QuestionOption> ();
        if (option1.isCorrectAnswer === true){
            quizAnswer.push (quiz.questionOptionHolder[0]);
        }
        if (option2.isCorrectAnswer === true){
            quizAnswer.push (quiz.questionOptionHolder[1]);
        }
        if (option3.isCorrectAnswer === true){
            quizAnswer.push (quiz.questionOptionHolder[2]);
        }
        if (option4.isCorrectAnswer === true){
            quizAnswer.push (quiz.questionOptionHolder[3]);
        }
        try {
            await examSessionAPI.goToPreviousQuestion (quizAnswer);
            archivedQuizAnswer = new Array<QuestionOption> ();
            archivedQuizAnswer.push (option1);
            archivedQuizAnswer.push (option2);
            archivedQuizAnswer.push (option3);
            archivedQuizAnswer.push (option4);
            if ((questionIndex + 1) > archivedExamAnswer.length){
                archivedExamAnswer.push (archivedQuizAnswer);
            }
            else {
                archivedExamAnswer[questionIndex] = archivedQuizAnswer;
            }
            setQuestionIndex (questionIndex - 1);
            await loadExamQuiz ();
            await loadExamQuizState ();
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

    async function goToNextQuestion (): Promise<void> {
        quizAnswer = new Array<QuestionOption> ();
        if (option1.isCorrectAnswer === true){
            quizAnswer.push (quiz.questionOptionHolder[0]);
        }
        if (option2.isCorrectAnswer === true){
            quizAnswer.push (quiz.questionOptionHolder[1]);
        }
        if (option3.isCorrectAnswer === true){
            quizAnswer.push (quiz.questionOptionHolder[2]);
        }
        if (option4.isCorrectAnswer === true){
            quizAnswer.push (quiz.questionOptionHolder[3]);
        }
        try {
            await examSessionAPI.goToNextQuestion (quizAnswer);
            archivedQuizAnswer = new Array<QuestionOption> ();
            archivedQuizAnswer.push (option1);
            archivedQuizAnswer.push (option2);
            archivedQuizAnswer.push (option3);
            archivedQuizAnswer.push (option4);
            if ((questionIndex + 1) > archivedExamAnswer.length){
                archivedExamAnswer.push (archivedQuizAnswer);
            }
            else {
                archivedExamAnswer[questionIndex] = archivedQuizAnswer;
            }
            setQuestionIndex (questionIndex + 1);
            await loadExamQuiz ();
            await loadExamQuizState ();
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

    function handleSubmitExam (): void {
        if (option1.isCorrectAnswer === true){
            pendingQuizAnswer.push (quiz.questionOptionHolder[0]);
        }
        if (option2.isCorrectAnswer === true){
            pendingQuizAnswer.push (quiz.questionOptionHolder[1]);
        }
        if (option3.isCorrectAnswer === true){
            pendingQuizAnswer.push (quiz.questionOptionHolder[2]);
        }
        if (option4.isCorrectAnswer === true){
            pendingQuizAnswer.push (quiz.questionOptionHolder[3]);
        }
        props.dialogController.setDialogTitle ("Confirm Submit Exam");
        props.dialogController.setDialogBody (
                "Are you sure you want to submit this exam ?"
        );
        props.dialogController.setDialogType ("confirm");
        props.dialogController.setShowDialog (true);
    }

    async function executeExamSubmission (): Promise<void> {
        try {
            await examSessionAPI.submitExam (pendingQuizAnswer);
            setPendingQuizAnswer (new Array<QuestionOption> ());
            history.push ("/show-exam-score-page");
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

    async function submitExamWhenTimeLimitReached (): Promise<void> {
        quizAnswer = new Array<QuestionOption> ();
        if (option1.isCorrectAnswer === true){
            quizAnswer.push (quiz.questionOptionHolder[0]);
        }
        if (option2.isCorrectAnswer === true){
            quizAnswer.push (quiz.questionOptionHolder[1]);
        }
        if (option3.isCorrectAnswer === true){
            quizAnswer.push (quiz.questionOptionHolder[2]);
        }
        if (option4.isCorrectAnswer === true){
            quizAnswer.push (quiz.questionOptionHolder[3]);
        }
        try {
            await examSessionAPI.submitExam (quizAnswer);
            history.push ("/show-exam-score-page");
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

    function handleChange (
        event: ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ): void {
        htmlElement = event.target;
        switch (htmlElement.name){
            default:
                throw new Error ("Unknown html element !");

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

    async function loadExamQuiz (): Promise<void> {
        try {
            setQuiz (
                await examSessionAPI.getCurrentExamQuiz ()  
            );
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

    async function loadExamQuizState (): Promise<void> {
        try {
            setIsFirstQuestion (
                await examSessionAPI.currentQuestionIsFirstQuestion ()
            );
            setIsLastQuestion (
                await examSessionAPI.currentQuestionIsLastQuestion ()
            );
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

    minuteCountdown = Math.floor (timeRemainingInSeconds / 60);
    secondCountdown = (timeRemainingInSeconds % 60);
    
    useEffect (
        () => {
            let timerID: number | undefined;

            if (timeRemainingInSeconds > 0){
                timerID = window.setTimeout (countDown, 1000);
            }
            else {
                submitExamWhenTimeLimitReached ().catch (
                        (error) => {
                            console.error (error);
                        }
                );
            }
            return () => {
                window.clearTimeout (timerID);
            } 
        }
        , [timeRemainingInSeconds]
    );

    useEffect (
        () => {
            loadExamQuiz ().catch (
                    (error) => {
                        console.error (error);
                    }
            );
        }
        , []
    );
    
    useEffect (
        () => {
            if (archivedExamAnswer[questionIndex] != undefined){
                setOption1 (archivedExamAnswer[questionIndex][0]);
                setOption2 (archivedExamAnswer[questionIndex][1]);
                setOption3 (archivedExamAnswer[questionIndex][2]);
                setOption4 (archivedExamAnswer[questionIndex][3]);
            }
            else {
                setOption1 (new QuestionOption ());
                setOption2 (new QuestionOption ());
                setOption3 (new QuestionOption ());
                setOption4 (new QuestionOption ());
            }
        }
        , [questionIndex]
    );
    
    useEffect (
        () => {
            if (props.dialogController.dialogIsConfirmed === true){
                executeExamSubmission ().catch (
                        (error) => {
                            console.error (error);
                        }
                );
                props.dialogController.setDialogIsConfirmed (false); 
            }
        }
        , [props.dialogController.dialogIsConfirmed]
    );

    if (isFirstQuestion === true){
        previousQuestionButton = 
            <Button 
                variant = "secondary"
                type = "button"
                className = "mr-4"
            >
                Previous Question
            </Button>;
    }
    else {
        previousQuestionButton = 
            <Button 
                variant = "outline-primary"
                type = "button"
                className = "mr-4"
                onClick = {
                    () => {
                        goToPreviousQuestion ();
                    }
                }
            >
                Previous Question
            </Button>;
    }

    if (isLastQuestion === false){
        nextQuestionButton =
            <Button 
                variant = "outline-primary"
                type = "button"
                onClick = {
                    () => {
                        goToNextQuestion ();
                    }
                }
            >
                Next Question
            </Button>;
    }
    else {
        nextQuestionButton =
            <Button 
                variant = "secondary"
                type = "button"
            >
                Next Question
            </Button>;
    }

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
                            <Form.Group as = {Row} className = "justify-content-md-center">
                                <h4>
                                    + Time Remaining: {minuteCountdown}:{secondCountdown}
                                </h4>
                            </Form.Group>

                            <hr />

                            <Form.Group controlId = "QuestionInfo">
                                <Form.Label>
                                    <h5>
                                        Question: ({questionIndex + 1} of {totalNumberOfQuestion})  
                                    </h5>
                                </Form.Label>
                                <Form.Control
                                    plaintext = {true} 
                                    readOnly = {true}
                                    value = {quiz.multipleChoiceQuestion.content}
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
                                    value = {quiz.questionOptionHolder[0].content}
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
                                    value = {quiz.questionOptionHolder[1].content}
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
                                    value = {quiz.questionOptionHolder[2].content}
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
                                    value = {quiz.questionOptionHolder[3].content}
                                />
                            </Form.Group>

                            <hr />
                            Answer(s):

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
                            <Form.Row>
                                <Col md = {7}>
                                    <Form.Group>
                                        {previousQuestionButton}
                                        {nextQuestionButton}
                                    </Form.Group>
                                </Col>
                                <Col md = {5}>
                                    <Form.Group>
                                        <Button 
                                            variant = "success"
                                            type = "button"
                                            className = "ml-5"
                                            onClick = {
                                                () => {
                                                    handleSubmitExam ();
                                                }
                                            }
                                        >
                                            Submit
                                        </Button>
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