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
    , Modal
    , Row
    , Table 
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { DataPage } from "../../App";
import { DialogControl } from "../../common/component/ModalDialog";
import { CourseAPI } from "../../common/service/CourseAPI";
import { TypeGuard } from "../../common/service/TypeGuard";
import { UserAPI } from "../../common/service/UserAPI";
import { User } from "../../model/User";

interface ManageStudentInCoursePageUrlParameter {
    courseID: string;
}

interface ManageStudentInCoursePageProps {
    dialogController: DialogControl;
    modalDialog: ReactElement;
    typeGuardian: TypeGuard;
}

export function ManageStudentInCoursePage (
        props: ManageStudentInCoursePageProps
): ReactElement {

    // Variables declaration:
    let [showAddStudentDialog, setShowAddStudentDialog] 
        = useState<boolean> (false);
    let studentDataPage: DataPage<User> | undefined;
    let [studentHolder, setStudentHolder] = useState<User[]> ([]);
    let [pageIndex] = useState<number> (0);
    let [pageSize] = useState<number> (10);
    let [totalRowCount, setTotalRowCount] = useState<number> (0);
    let courseID = useParams<ManageStudentInCoursePageUrlParameter> ().courseID;
    let button: HTMLButtonElement | undefined;
    let [studentInTheCourseHolder, setStudentInTheCourseHolder] 
        = useState<User[]> ([]);
    let [pageIndex2] = useState<number> (0);
    let [pageSize2] = useState<number> (10);
    let [totalRowCount2, setTotalRowCount2] = useState<number> (0);
    let [pendingUserID, setPendingUserID] = useState<number> (0);

    let [userAPI] = useState<UserAPI> (new UserAPI ());
    let [courseAPI] = useState<CourseAPI> (new CourseAPI ());
    
    function openAddStudentDialog (): void {
        loadStudentExcludingStudentInTheCourseTable ().catch (
                (error: unknown) => {
                    console.error (error);
                }
        );
        setShowAddStudentDialog (true);
    }

    function closeAddStudentDialog (): void {
        setShowAddStudentDialog (false);
    }

    function handleRemoveAStudentFromCourse (
            event: MouseEvent<HTMLElement, globalThis.MouseEvent>
    ): void {
        button = event.target as HTMLButtonElement;
        setPendingUserID (Number (button.value));
        props.dialogController.setDialogTitle (
                "Confirm Remove Student From Course"
        );
        props.dialogController.setDialogBody (
                "Are you sure you want to remove this student from the course ?"
        );
        props.dialogController.setDialogType ("confirm");
        props.dialogController.setShowDialog (true);
    }

    async function executeAStudentFromCourseRemoval (): Promise<void> {
        try {
            await courseAPI.removeAStudentFromCourse (
                    pendingUserID
                    , Number (courseID)
            );
            await loadStudentInTheCourseTable ();
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

    async function addAStudentToCourse (
            event: MouseEvent<HTMLElement, globalThis.MouseEvent>
    ): Promise<void> {
        button = event.target as HTMLButtonElement;
        try {
            await courseAPI.addAStudentToCourse (
                    Number (button.value)
                    , Number (courseID)
            );
            await loadStudentExcludingStudentInTheCourseTable ();
            await loadStudentInTheCourseTable ();
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

    async function loadStudentExcludingStudentInTheCourseTable (    
    ): Promise<void> {
        try {
            studentDataPage 
                = await userAPI.getAllStudentExcludingStudentInTheCourse (
                    Number (courseID)
                    , pageIndex
                    , pageSize
            );
            setTotalRowCount (studentDataPage.totalRowCount);
            setStudentHolder (studentDataPage.pageDataHolder);
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

    async function loadStudentInTheCourseTable (): Promise<void> {
        try {
            studentDataPage 
                = await userAPI.getAllStudentAreInTheCourse (
                    Number (courseID)
                    , pageIndex2
                    , pageSize2
            );
            setTotalRowCount2 (studentDataPage.totalRowCount);
            setStudentInTheCourseHolder (studentDataPage.pageDataHolder);
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
            loadStudentInTheCourseTable ().catch (
                    (error: unknown) => {
                        console.error (error);
                    }
            );
        }
        , []
    );
    
    useEffect (
        () => {
            if (props.dialogController.dialogIsConfirmed === true){
                executeAStudentFromCourseRemoval ().catch (
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
                show = {showAddStudentDialog}
                backdrop = "static"
                keyboard = {false}
                size = "lg"
            >
                <Modal.Header>
                    <Modal.Title>Add A Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table responsive = "md" hover = {true}>
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>
                                    Student ID
                                </th>
                                <th>
                                    Full Name
                                </th>
                                <th>
                                    Phone Number
                                </th>
                                <th>
                                    Email
                                </th>
                                <th>
                                    User Name
                                </th>
                                <th>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentHolder.map (
                                (
                                        user
                                        , index
                                ) => renderStudentTable (
                                        user
                                        , index
                                        , addAStudentToCourse
                                )
                            )}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant = "info" 
                        onClick = {closeAddStudentDialog}
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
                                            + "/manage-things-in-course-page"
                                        }
                                    }
                                >
                                    Manage Things In Course
                                </Breadcrumb.Item>
                                <Breadcrumb.Item active>
                                    Manage Student In Course
                                </Breadcrumb.Item>
                            </Breadcrumb>
                            <h1 className = "mb-3">
                                <span className = "mr-3">
                                    Manage Student In Course
                                </span>
                                <Button 
                                    variant = "success"
                                    type = "button"
                                    onClick = {openAddStudentDialog}
                                >
                                    Add Student
                                </Button>
                            </h1>
                            <Table responsive = "md" hover = {true}>
                                <thead>
                                    <tr>
                                        <th>
                                            #
                                        </th>
                                        <th>
                                            Student ID
                                        </th>
                                        <th>
                                            Full Name
                                        </th>
                                        <th>
                                            Phone Number
                                        </th>
                                        <th>
                                            Email
                                        </th>
                                        <th>
                                            User Name
                                        </th>
                                        <th>
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studentInTheCourseHolder.map (
                                        (
                                                user
                                                , index
                                        ) => renderStudentInTheCourseTable (
                                                user
                                                , index
                                                , handleRemoveAStudentFromCourse
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

function renderStudentTable (
        user: User
        , index: number
        , addAStudentToCourse: (
                event: MouseEvent<HTMLElement, globalThis.MouseEvent>
        ) => Promise<void>
): ReactElement {
    return (
        <tr key = {user.userID}>
            <td>
                {index + 1}
            </td>
            <td>
                {user.userID}
            </td>
            <td>
                {`${
                    user.firstName
                } ${
                    user.middleName
                } ${
                    user.lastName
                }`}
            </td>
            <td>
                {user.phoneNumber}
            </td>
            <td>
                {user.email}
            </td>
            <td>
                {user.userName}
            </td>
            <td>
                <Button 
                    variant = "success"
                    type = "button"
                    value = {user.userID}
                    onClick = {
                        (event) => {
                            addAStudentToCourse (event).catch (
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

function renderStudentInTheCourseTable (
        user: User
        , index: number
        , handleRemoveAStudentFromCourse: (
                event: MouseEvent<HTMLElement, globalThis.MouseEvent>
        ) => void 
): ReactElement {
    return (
        <tr key = {user.userID}>
            <td>
                {index + 1}
            </td>
            <td>
                {user.userID}
            </td>
            <td>
                {`${
                    user.firstName
                } ${
                    user.middleName
                } ${
                    user.lastName
                }`}
            </td>
            <td>
                {user.phoneNumber}
            </td>
            <td>
                {user.email}
            </td>
            <td>
                {user.userName}
            </td>
            <td>
                <Button 
                    variant = "danger"
                    type = "button"
                    value = {user.userID}
                    onClick = {
                        (event) => {
                            handleRemoveAStudentFromCourse (event);
                        }
                    }
                >
                    Remove
                </Button>
            </td>
        </tr>
    );
}