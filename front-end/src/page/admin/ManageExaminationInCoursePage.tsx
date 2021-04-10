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
    , Modal, Row
    , Table 
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { DataPage } from "../../App";
import { DialogControl } from "../../common/component/ModalDialog";
import { ExaminationAPI } from "../../common/service/ExaminationAPI";
import { TypeConvert } from "../../common/service/TypeConvert";
import { TypeGuard } from "../../common/service/TypeGuard";
import { Examination } from "../../model/Examination";

interface ManageExaminationInCoursePageUrlParameter {
    courseID: string;
}

interface ManageExaminationInCoursePageProps {
    dialogController: DialogControl;
    modalDialog: ReactElement;
}

export function ManageExaminationInCoursePage (
        props: ManageExaminationInCoursePageProps
): ReactElement {

    // Variables declaration:
    let [exam, setExam] = useState<Examination> (new Examination ());
    let [showCreateExamForm, setShowCreateExamForm] = useState<boolean> (false);
    let updatedExam: Examination | undefined;
    let htmlElement: 
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | undefined;
    let minStartTime: Date;
    let [formattedMinStartTime, setFormattedMinStartTime] 
        = useState<string> ("");
    let [formattedStartTime, setFormattedStartTime] = useState<string> ("");
    let typeConverter: TypeConvert;
    let courseID 
        = useParams<ManageExaminationInCoursePageUrlParameter> ().courseID;
    let examAPI: ExaminationAPI;
    let typeGuardian: TypeGuard;
    let examDataPage: DataPage<Examination> | undefined;
    let [pageIndex] = useState<number> (0);
    let [pageSize] = useState<number> (10);
    let [totalRowCount, setTotalRowCount] = useState<number> (0);
    let [examHolder, setExamHolder] 
        = useState<Examination[]> (new Array<Examination> ());
    let [showViewDetailDialog, setShowViewDetailDialog] 
        = useState<boolean> (false);
    let button: HTMLButtonElement | undefined;
    let examID: number | undefined;
    let i: number | undefined;
    let examSample: Examination | undefined;
    let rawDate: Date | undefined;
    let [formattedLastModified, setFormattedLastModified] 
        = useState<string> ("");
    let [formattedDateCreated, setFormattedDateCreated] 
        = useState<string> ("");
    let [showEditExamForm, setShowEditExamForm] = useState<boolean> (false);
    let newExam: Examination | undefined;
    let [pendingExamID, setPendingExamID] = useState<number> (0);

    typeConverter = new TypeConvert ();
    examAPI = new ExaminationAPI ();
    typeGuardian = new TypeGuard ();

    useEffect (
        () => {
            loadExamTable ().catch (
                    (error) => {
                        console.error (error);
                    }
            );
            minStartTime = new Date ();
            minStartTime.setDate (minStartTime.getDate () + 7);
            setFormattedMinStartTime (
                    typeConverter.convertDateTimeToString (minStartTime)
            );
        }
        , []
    );
    
    function openCreateExamForm (): void {
        newExam = new Examination ();  
        setExam (newExam);
        setFormattedStartTime (
                typeConverter.convertDateTimeToString (
                        newExam.startTime
                )
        );
        setShowCreateExamForm (true);
    }

    function closeCreateExamForm (): void {
        setShowCreateExamForm (false);
    }

    function openViewDetailDialog (
            event: MouseEvent<HTMLElement, globalThis.MouseEvent>
    ): void {
        button = event.target as HTMLButtonElement;
        examID = Number (button.value);
        for (i = 0; i < examHolder.length; i++){
            examSample = examHolder[i];
            if (examSample.examID === examID){
                setExam (examSample);
                rawDate = new Date (examSample.startTime);
                setFormattedStartTime (rawDate.toLocaleString ("vi-VN"));
                rawDate = new Date (examSample.lastModified); 
                if (rawDate.toString () === new Date (0).toString ()){
                    setFormattedLastModified ("Has not been modified yet !");
                }
                else {
                    setFormattedLastModified (rawDate.toLocaleString ("vi-VN"));
                }
                rawDate = new Date (examSample.dateCreated);
                setFormattedDateCreated (rawDate.toLocaleString ("vi-VN"));
                break;
            }
        }
        setShowViewDetailDialog (true);
    }

    function closeViewDetailDialog (): void {
        setShowViewDetailDialog (false);
    }

    function openEditExamForm (
            event: MouseEvent<HTMLElement, globalThis.MouseEvent>
    ): void {
        button = event.target as HTMLButtonElement;
        examID = Number (button.value);
        for (i = 0; i < examHolder.length; i++){
            examSample = examHolder[i];
            if (examSample.examID === examID){
                setExam (examSample);
                rawDate = new Date (examSample.startTime);
                setFormattedStartTime (
                        typeConverter.convertDateTimeToString (
                                rawDate
                        )
                );
                break;
            }
        }
        setShowEditExamForm (true);
    }

    function closeEditExamForm (): void {
        setShowEditExamForm (false);
    }

    function handleChange (
        event: ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ): void {
        updatedExam = new Examination (exam);
        htmlElement = event.target;
        switch (htmlElement.name){
            default:
                throw new Error ("Unknown html element !");

            case "examTypeField":
                updatedExam.type = htmlElement.value;
                break;

            case "startTimePicker":
                updatedExam.startTime = new Date (htmlElement.value);
                setFormattedStartTime (
                        typeConverter.convertDateTimeToString (
                                updatedExam.startTime
                        )
                );
                break;

            case "durationField":
                updatedExam.duration = parseInt (htmlElement.value);
                break;

            case "maxNumberOfAttemptField":
                updatedExam.maxNumberOfAttempt = parseInt (htmlElement.value); 
                break;
        }
        setExam (updatedExam);
    }

    async function createExamInCourse (
            event: FormEvent<HTMLFormElement>
    ): Promise<void> {
        event.preventDefault ();
        try {
            await examAPI.createNewExamInCourse (Number (courseID), exam);
            closeCreateExamForm ();
            props.dialogController.setDialogTitle ("Examination Created !");
            props.dialogController.setDialogBody (
                    "The examination has been created successfully."
            );
            props.dialogController.setDialogType ("inform");
            props.dialogController.setShowDialog (true);
            await loadExamTable (); 
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

    async function editExamInCourse (
            event: FormEvent<HTMLFormElement>
    ): Promise<void> {
        event.preventDefault ();
        try {
            await examAPI.updateExamInCourse (Number (courseID), exam);
            closeEditExamForm ();
            props.dialogController.setDialogTitle ("Examination Saved !");
            props.dialogController.setDialogBody (
                    "The examination has been saved successfully."
            );
            props.dialogController.setDialogType ("inform");
            props.dialogController.setShowDialog (true);
            await loadExamTable (); 
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

    function handleDeleteExamInCourse (
            event: MouseEvent<HTMLElement, globalThis.MouseEvent>
    ): void {
        button = event.target as HTMLButtonElement;
        setPendingExamID (Number (button.value));
        props.dialogController.setDialogTitle ("Confirm Delete Examination");
        props.dialogController.setDialogBody (
                "Are you sure you want to delete this exam ?"
        );
        props.dialogController.setDialogType ("confirm");
        props.dialogController.setShowDialog (true);
    }

    async function executeExamInCourseDeletion (): Promise<void> {
        try {
            await examAPI.deleteExamInCourse (Number (courseID), pendingExamID);
            await loadExamTable ();
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

    async function loadExamTable (): Promise<void> {
        try {
            examDataPage = await examAPI.getAllExamByCourseID (
                    Number (courseID)
                    , pageIndex
                    , pageSize
            );
            setTotalRowCount (examDataPage.totalRowCount);
            setExamHolder (examDataPage.pageDataHolder);
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
            if (props.dialogController.dialogIsConfirmed === true){
                executeExamInCourseDeletion ().catch (
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
                show = {showCreateExamForm}
                backdrop = "static"
                keyboard = {false}
                size = "lg"
            >
                <Modal.Header>
                    <Modal.Title>New Examination</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form 
                        id = "CreateExamForm"
                        className = "pt-2 pr-5 pl-5 pb-0"
                        onSubmit = {
                            (event) => {
                                createExamInCourse (event).catch (
                                        (error: unknown) => {
                                            console.error (error);
                                        }
                                );
                            }
                        }
                    >
                        <Form.Group controlId = "ExamTypeField">
                            <Form.Label>
                                Exam Type:
                            </Form.Label>
                            <Form.Control
                                type = "text"
                                autoComplete = "on"
                                autoFocus = {true}
                                name = "examTypeField"
                                pattern = "^[\p{L}\p{N} .,<>(){}]+$"
                                placeholder = "Type of the new exam ?"
                                required = {true}
                                spellCheck = {false}
                                value = {exam.type}
                                onChange = {
                                    (event) => {
                                        handleChange (event);
                                    }
                                }
                            />
                            <Form.Text className = "text-muted">
                                format: letters and numbers only
                                , special characters like !,@,#,$... 
                                are not allowed !  
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId = "StartTimePicker">
                            <Form.Label>
                                Start Time:
                            </Form.Label>
                            <Form.Control
                                type = "datetime-local"
                                autoComplete = "on"
                                autoFocus = {false}
                                min = {formattedMinStartTime}
                                name = "startTimePicker"
                                required = {true}
                                step = "any"
                                value = {formattedStartTime}
                                onChange = {
                                    (event) => {
                                        handleChange (event);
                                    }
                                }
                            />
                            <Form.Text className = "text-muted">
                                format: the examination start time must be 
                                at least 7 days (1 week) after today !  
                            </Form.Text>
                        </Form.Group>
                        
                        <Form.Group controlId = "DurationField">
                            <Form.Label>
                                Duration (in minutes):
                            </Form.Label>
                            <Form.Control
                                type = "number"
                                autoComplete = "on"
                                autoFocus = {false}
                                name = "durationField"
                                placeholder 
                                    = "Duration of the new exam (in minutes) ?"
                                required = {true}
                                spellCheck = {false}
                                min = {10}
                                step = {1}
                                value = {exam.duration}
                                onChange = {
                                    (event) => {
                                        handleChange (event);
                                    }
                                }
                            />
                            <Form.Text className = "text-muted">
                                format: numbers only and 
                                the minimum value is 10 !  
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId = "MaxNumberOfAttemptField">
                            <Form.Label>
                                Max Number Of Attempt(s):
                            </Form.Label>
                            <Form.Control
                                type = "number"
                                autoComplete = "on"
                                autoFocus = {false}
                                name = "maxNumberOfAttemptField"
                                placeholder 
                                    = {`Number of attempts allowed ` 
                                    + `for the new exam ?`}
                                required = {true}
                                spellCheck = {false}
                                min = {1}
                                step = {1}
                                value = {exam.maxNumberOfAttempt}
                                onChange = {
                                    (event) => {
                                        handleChange (event);
                                    }
                                }
                            />
                            <Form.Text className = "text-muted">
                                format: numbers only and 
                                the minimum value is 1 !  
                            </Form.Text>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant = "success" 
                        type = "submit"
                        form = "CreateExamForm" 
                    >
                        Create Exam
                    </Button>
                    <Button 
                        variant = "outline-secondary" 
                        onClick = {closeCreateExamForm}
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
                    <Modal.Title>Examination Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        className = "pt-2 pr-5 pl-5 pb-0"
                    >
                        <Form.Row>
                            <Form.Group as = {Row} controlId = "ExamIDInfo">
                                <Form.Label 
                                    column = {true}
                                    md = {5}
                                >
                                    + Exam ID:
                                </Form.Label>
                                <Col md = {7}>
                                    <Form.Control 
                                        plaintext = {true} 
                                        readOnly = {true} 
                                        value = {exam.examID}
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as = {Row} controlId = "ExamTypeInfo">
                                <Form.Label 
                                    column = {true}
                                    md = {5}
                                >
                                    + Exam Type:
                                </Form.Label>
                                <Col md = {7}>
                                    <Form.Control 
                                        plaintext = {true} 
                                        readOnly = {true} 
                                        value = {exam.type}
                                    />
                                </Col>
                            </Form.Group>
                        </Form.Row>
                        
                        <Form.Row>
                            <Form.Group as = {Row} controlId = "StartTimeInfo">
                                <Form.Label 
                                    column = {true}
                                    md = {5}
                                >
                                    + Start Time:
                                </Form.Label>
                                <Col md = {7}>
                                    <Form.Control 
                                        plaintext = {true} 
                                        readOnly = {true} 
                                        value = {formattedStartTime}
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group 
                                as = {Row} 
                                controlId = "DurationInfo"
                            >
                                <Form.Label 
                                    column = {true}
                                    md = {5}
                                >
                                    + Duration:
                                </Form.Label>
                                <Col md = {7}>
                                    <Form.Control 
                                        plaintext = {true} 
                                        readOnly = {true}
                                        value = {`${exam.duration} minute(s)`}
                                    />
                                </Col>
                            </Form.Group>
                        </Form.Row>

                        <Form.Group 
                            as = {Row} 
                            controlId = "MaxNumberOfAttemptInfo"
                        >
                            <Form.Label
                                column = {true}
                                md = {4}
                            >
                                + Max Number Of Attempt:
                            </Form.Label>
                            <Col md = {8}>
                                <Form.Control
                                    plaintext = {true} 
                                    readOnly = {true}
                                    value = {
                                        `${exam.maxNumberOfAttempt} time(s)`
                                    }
                                />
                            </Col>
                        </Form.Group>

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
                show = {showEditExamForm}
                backdrop = "static"
                keyboard = {false}
                size = "lg"
            >
                <Modal.Header>
                    <Modal.Title>Edit Examination</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form 
                        id = "EditExamForm"
                        className = "pt-2 pr-5 pl-5 pb-0"
                        onSubmit = {
                            (event) => {
                                editExamInCourse (event).catch (
                                        (error: unknown) => {
                                            console.error (error);
                                        }
                                );
                            }
                        }
                    >
                        <Form.Group controlId = "ExamTypeField">
                            <Form.Label>
                                Exam Type:
                            </Form.Label>
                            <Form.Control
                                type = "text"
                                autoComplete = "on"
                                autoFocus = {true}
                                name = "examTypeField"
                                pattern = "^[\p{L}\p{N} .,<>(){}]+$"
                                placeholder = "Type of the new exam ?"
                                required = {true}
                                spellCheck = {false}
                                value = {exam.type}
                                onChange = {
                                    (event) => {
                                        handleChange (event);
                                    }
                                }
                            />
                            <Form.Text className = "text-muted">
                                format: letters and numbers only
                                , special characters like !,@,#,$... 
                                are not allowed !  
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId = "StartTimePicker">
                            <Form.Label>
                                Start Time:
                            </Form.Label>
                            <Form.Control
                                type = "datetime-local"
                                autoComplete = "on"
                                autoFocus = {false}
                                min = {formattedMinStartTime}
                                name = "startTimePicker"
                                required = {true}
                                step = "any"
                                value = {formattedStartTime}
                                onChange = {
                                    (event) => {
                                        handleChange (event);
                                    }
                                }
                            />
                            <Form.Text className = "text-muted">
                                format: the examination start time must be 
                                at least 7 days (1 week) after today !  
                            </Form.Text>
                        </Form.Group>
                        
                        <Form.Group controlId = "DurationField">
                            <Form.Label>
                                Duration (in minutes):
                            </Form.Label>
                            <Form.Control
                                type = "number"
                                autoComplete = "on"
                                autoFocus = {false}
                                name = "durationField"
                                placeholder 
                                    = "Duration of the new exam (in minutes) ?"
                                required = {true}
                                spellCheck = {false}
                                min = {10}
                                step = {1}
                                value = {exam.duration}
                                onChange = {
                                    (event) => {
                                        handleChange (event);
                                    }
                                }
                            />
                            <Form.Text className = "text-muted">
                                format: numbers only and 
                                the minimum value is 10 !  
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId = "MaxNumberOfAttemptField">
                            <Form.Label>
                                Max Number Of Attempt(s):
                            </Form.Label>
                            <Form.Control
                                type = "number"
                                autoComplete = "on"
                                autoFocus = {false}
                                name = "maxNumberOfAttemptField"
                                placeholder 
                                    = {`Number of attempts allowed ` 
                                    + `for the new exam ?`}
                                required = {true}
                                spellCheck = {false}
                                min = {1}
                                step = {1}
                                value = {exam.maxNumberOfAttempt}
                                onChange = {
                                    (event) => {
                                        handleChange (event);
                                    }
                                }
                            />
                            <Form.Text className = "text-muted">
                                format: numbers only and 
                                the minimum value is 1 !  
                            </Form.Text>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant = "success" 
                        type = "submit"
                        form = "EditExamForm" 
                    >
                        Save
                    </Button>
                    <Button 
                        variant = "outline-secondary" 
                        onClick = {closeEditExamForm}
                    >
                        Cancel
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
                                            + "/manage-things-in-course-page"
                                        }
                                    }
                                >
                                    Manage Things In Course
                                </Breadcrumb.Item>
                                <Breadcrumb.Item active>
                                    Manage Examination In Course
                                </Breadcrumb.Item>
                            </Breadcrumb>
                            <h1 className = "mb-3">
                                <span className = "mr-3">
                                    Manage Examination In Course
                                </span>
                                <Button 
                                    variant = "success"
                                    type = "button"
                                    onClick = {openCreateExamForm}
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
                                                Exam ID
                                            </th>
                                            <th>
                                                Exam Type
                                            </th>
                                            <th>
                                                Start Time
                                            </th>
                                            <th>
                                                Duration (in minutes)
                                            </th>
                                            <th>
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {examHolder.map (
                                            (
                                                    exam
                                                    , index
                                            ) => renderExamTable (
                                                    exam
                                                    , index
                                                    , openViewDetailDialog
                                                    , openEditExamForm
                                                    , handleDeleteExamInCourse
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

function renderExamTable (
        exam: Examination
        , index: number
        , openViewDetailsDialog: (
                event: MouseEvent<HTMLElement, globalThis.MouseEvent>
        ) => void
        , openEditExamForm: (
                event: MouseEvent<HTMLElement, globalThis.MouseEvent>
        ) => void
        , handleDeleteExamInCourse: (
                event: MouseEvent<HTMLElement, globalThis.MouseEvent>
        ) => void
): ReactElement {
    let rawStartTime: Date | undefined;

    rawStartTime = new Date (exam.startTime);
    return (
        <tr key = {exam.examID}>
            <td>
                {index + 1}
            </td>
            <td>
                {exam.examID}
            </td>
            <td>
                {exam.type}
            </td>
            <td>
                {rawStartTime.toLocaleString ("vi-VN")}
            </td>
            <td>
                {exam.duration}
            </td>
            <td>
                <Button 
                    variant = "primary"
                    type = "button"
                    value = {exam.examID}
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
                    value = {exam.examID}
                    onClick = {
                        (event) => {
                            openEditExamForm (event);
                        }
                    }
                >
                    Edit
                </Button>
                <Button 
                    variant = "danger"
                    type = "button"
                    value = {exam.examID}
                    onClick = {
                        (event) => {
                            handleDeleteExamInCourse (event);
                        }
                    }
                >
                    Delete
                </Button>
            </td>
        </tr>
    );
}