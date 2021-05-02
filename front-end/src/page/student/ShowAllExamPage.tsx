/* eslint-disable react-hooks/exhaustive-deps */
import React, { 
    MouseEvent
    , ReactElement
    , ReactNode
    , useEffect
    , useState 
} from "react";
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
import { TypeGuard } from "../../common/service/TypeGuard";
import { Examination } from "../../model/Examination";
import { 
    ExaminationSessionAPI 
} from "../../common/service/ExaminationSessionAPI";
import { History } from "history";
import { useSessionState } from "../../common/service/PersistedStateHook";
import { QuestionOption } from "../../model/QuestionOption";

interface ShowAllExamPageProps {
    dialogController: DialogControl;
    modalDialog: ReactElement;
    typeGuardian: TypeGuard;
}

export function ShowAllExamPage (props: ShowAllExamPageProps): ReactElement {

    // Variables declaration:
    let [examHolder, setExamHolder] 
        = useState<Examination[]> (new Array<Examination> ());
    let examDataPage: DataPage<Examination> | undefined;
    let [pageIndex, setPageIndex] = useState<number> (0);
    let [pageSize] = useState<number> (5);
    let [totalRowCount, setTotalRowCount] = useState<number> (0);
    let examTable: ReactNode;
    let button: HTMLButtonElement | undefined;
    let [pendingExamID, setPendingExamID] = useState<number> (0);
    let history: History<unknown>;
    let [, setArchivedExamAnswer] 
        = useSessionState<Array<QuestionOption[]>> (
                "archivedExamAnswer"
                , new Array<QuestionOption[]> () 
        );
    let [, setQuestionIndex] = useSessionState<number> (
        "questionIndex"
        , 0  
    );

    let [examAPI] = useState<ExaminationAPI> (new ExaminationAPI ());
    let [examSessionAPI] = useState<ExaminationSessionAPI> (
        new ExaminationSessionAPI ()
    );
    history = useHistory ();

    function handleStartExam (
            event: MouseEvent<HTMLElement, globalThis.MouseEvent>
    ): void {
        button = event.target as HTMLButtonElement;
        setPendingExamID (Number (button.value));
        props.dialogController.setDialogTitle ("Confirm Start Exam");
        props.dialogController.setDialogBody (
                "Are you sure you want to start this exam ?"
        );
        props.dialogController.setDialogType ("confirm");
        props.dialogController.setShowDialog (true);
    }

    async function executeExamStart (): Promise<void> {
        try {
            await examSessionAPI.startExamSession (pendingExamID);
            setArchivedExamAnswer (new Array<QuestionOption[]> ());
            setQuestionIndex (0);
            history.push ("/take-exam-page");
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

    async function loadExamTable (): Promise<void> {
        try {
            examDataPage = await examAPI.getAllExamByCurrentLoggedInStudent (
                    pageIndex
                    , pageSize
            );
            setTotalRowCount (examDataPage.totalRowCount);
            setExamHolder (examDataPage.pageDataHolder);
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
            loadExamTable ().catch (
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
                executeExamStart ().catch (
                        (error) => {
                            console.error (error);
                        }
                );
                props.dialogController.setDialogIsConfirmed (false); 
            }
        }
        , [props.dialogController.dialogIsConfirmed]
    );

    function goToPage (destinationPageIndex: number): void {
        setPageIndex (destinationPageIndex);
    }

    useEffect (
        () => {
            loadExamTable ().catch (
                    (error) => {
                        console.error (error);
                    }
            );
        }
        , [pageIndex]
    );
    
    if (examHolder.length === 0){
        examTable =
            <tr>
                <td colSpan = {7} className = "text-center">
                    <h5>
                        There are no exams in the system to show here
                    </h5>
                </td>
            </tr>;
    }
    else {
        examTable =
            examHolder.map (
                (
                        exam
                        , index
                ) => renderExamTable (
                        exam
                        , index
                        , handleStartExam
                )
            );
    }

    return (
        <Container fluid = {true}>
            {props.modalDialog}
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
                                    linkProps = {{to: "/student-dashboard"}}
                                >
                                    Student Dashboard
                                </Breadcrumb.Item>
                                <Breadcrumb.Item active>
                                    Your Examination
                                </Breadcrumb.Item>
                            </Breadcrumb>
                            <h1 className = "mb-3">
                                All Your Examination
                            </h1>
                            <Form>
                                <Table responsive = "md" hover = {true}>
                                    <thead>
                                        <tr>
                                            <th>
                                                #
                                            </th>
                                            <th>
                                                Exam Type
                                            </th>
                                            <th>
                                                Course Name
                                            </th>
                                            <th>
                                                Start Time
                                            </th>
                                            <th>
                                                Total Number Of Question
                                            </th>
                                            <th>
                                                Duration (in minutes)
                                            </th>
                                            <th>
                                                Max Number Of Attempt
                                            </th>
                                            <th>
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {examTable}
                                    </tbody>
                                </Table>
                                <Form.Group>
                                    <Form.Row 
                                        className = "justify-content-md-center"
                                    >
                                        <PagingSection 
                                            pageIndex = {pageIndex}
                                            pageSize = {pageSize}
                                            totalRowCount = {totalRowCount}
                                            goToPage = {goToPage}
                                        />
                                    </Form.Row> 
                                </Form.Group>
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

function renderExamTable (
        exam: Examination
        , index: number
        , handleStartExam: (
                event: MouseEvent<HTMLElement, globalThis.MouseEvent>
        ) => void
): ReactElement {
    
    // Variables declaration:
    let formattedStartTime: string | undefined;
    let rawDate: Date | undefined;

    rawDate = new Date (exam.startTime);
    formattedStartTime = rawDate.toLocaleString ("vi-VN");

    return (
        <tr key = {exam.examID}>
            <td>
                {index + 1}
            </td>
            <td>
                {exam.type}
            </td>
            <td>
                {exam.course.courseName}
            </td>
            <td>
                {formattedStartTime}
            </td>
            <td>
                {exam.totalNumberOfQuiz}
            </td>
            <td>
                {exam.duration}
            </td>
            <td>
                {exam.maxNumberOfAttempt}
            </td>
            <td>
                <Button 
                    variant = "outline-success"
                    type = "button"
                    value = {exam.examID}
                    onClick = {
                        (event) => {
                            handleStartExam (event);
                        }
                    }
                >
                    Start
                </Button>
            </td>
        </tr>
    );
}