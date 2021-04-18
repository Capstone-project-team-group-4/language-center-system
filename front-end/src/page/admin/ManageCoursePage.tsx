/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-await-in-loop */
// Import package members section:
import React, { 
    ChangeEvent
    , FormEvent
    , MouseEvent
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
    , Modal
    , Row
    , Table 
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { DataPage } from "../../App";
import { DialogControl } from "../../common/component/ModalDialog";
import { PagingSection } from "../../common/component/PagingSection";
import { CourseAPI } from "../../common/service/CourseAPI";
import { CourseLevelAPI } from "../../common/service/CourseLevelAPI";
import { CourseTypeAPI } from "../../common/service/CourseTypeAPI";
import { TypeGuard } from "../../common/service/TypeGuard";
import { Course } from "../../model/Course";
import { CourseLevel } from "../../model/CourseLevel";
import { CourseType } from "../../model/CourseType";

function renderCourseTypeDropdownList (courseType: CourseType): ReactElement {
    return (
        <option 
            key = {courseType.typeID} 
            value = {courseType.typeID}
        >
            {courseType.typeName}
        </option>
    );
}

function renderCourseLevelDropdownList (
        courseLevel: CourseLevel
): ReactElement {
    return (
        <option 
            key = {courseLevel.levelID} 
            value = {courseLevel.levelID}
        >
            {courseLevel.levelName}
        </option>
    );
}

interface ManageCoursePageProps {
    dialogController: DialogControl;
    modalDialog: ReactElement;
    typeGuardian: TypeGuard;
}

export function ManageCoursePage (props: ManageCoursePageProps): ReactElement {

    // Variables declaration:
    let [selectedCourseTypeID, setSelectedCourseTypeID] 
        = useState<number> (0); 
    let [courseTypeHolder, setCourseTypeHolder] 
        = useState<CourseType[]> (new Array<CourseType> ());
    let updatedCourseTypeHolder: CourseType[] | undefined;
    let defaultSelectedID: number | undefined;
    let updatedCourseLevelHolder: CourseLevel[] | undefined;
    let [showCreateCourseForm, setShowCreateCourseForm] 
        = useState<boolean> (false);
    let [courseLevelHolder, setCourseLevelHolder] 
        = useState<CourseLevel[]> (new Array<CourseLevel> ());
    let [selectedCourseLevelID, setSelectedCourseLevelID] 
        = useState<number> (0);
    let htmlElement: 
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | undefined;
    let [course, setCourse] = useState<Course> (new Course ());
    let updatedCourse: Course | undefined;
    let courseType: CourseType | undefined;
    let selectedCourseType: CourseType;
    let courseLevel: CourseLevel | undefined;
    let selectedCourseLevel: CourseLevel; 
    let i: number | undefined;
    let [pageIndex, setPageIndex] = useState<number> (0);
    let [pageSize] = useState<number> (5);
    let [totalRowCount, setTotalRowCount] = useState<number> (0);
    let courseDataPage: DataPage<Course> | undefined;
    let [courseHolder, setCourseHolder] 
        = useState<Course[]> (new Array<Course> ());
    let [showViewDetailDialog, setShowViewDetailDialog] 
        = useState<boolean> (false);
    let button: HTMLButtonElement | undefined;
    let courseID: number | undefined;
    let courseSample: Course | undefined;
    let [formattedLastModified, setFormattedLastModified] 
        = useState<string> ("");
    let rawDate: Date | undefined;
    let [formattedDateCreated, setFormattedDateCreated] 
        = useState<string> ("");
    let [pendingCourseID, setPendingCourseID] = useState<number> (0);
    let [showEditCourseForm, setShowEditCourseForm] 
        = useState<boolean> (false);
    let courseTable: ReactNode;
    
    let [courseTypeAPI] = useState<CourseTypeAPI> (new CourseTypeAPI ());
    let [courseLevelAPI] = useState<CourseLevelAPI> (new CourseLevelAPI ());
    let [courseAPI] = useState<CourseAPI> (new CourseAPI ());
    
    function handleDeleteCourse (
            event: MouseEvent<HTMLElement, globalThis.MouseEvent>
    ): void {
        button = event.target as HTMLButtonElement;
        setPendingCourseID (Number (button.value));
        props.dialogController.setDialogTitle ("Confirm Delete Course");
        props.dialogController.setDialogBody (
                "Are you sure you want to delete this course ?"
        );
        props.dialogController.setDialogType ("confirm");
        props.dialogController.setShowDialog (true);
    }

    async function executeCourseDeletion (): Promise<void> {
        try {
            await courseAPI.deleteCourseByID (pendingCourseID);
            await loadCourseTable ();
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

    function openViewDetailDialog (
            event: MouseEvent<HTMLElement, globalThis.MouseEvent>
    ): void {
        button = event.target as HTMLButtonElement;
        courseID = Number (button.value);
        for (i = 0; i < courseHolder.length; i++){
            courseSample = courseHolder[i];
            if (courseSample.courseID === courseID){
                setCourse (courseSample);
                rawDate = new Date (courseSample.lastModified); 
                if (rawDate.toString () === new Date (0).toString ()){
                    setFormattedLastModified ("Has not been modified yet !");
                }
                else {
                    setFormattedLastModified (rawDate.toLocaleString ("vi-VN"));
                }
                rawDate = new Date (courseSample.dateCreated);
                setFormattedDateCreated (rawDate.toLocaleString ("vi-VN"));
                break;
            }
        }
        setShowViewDetailDialog (true);
    }

    function closeViewDetailDialog (): void {
        setShowViewDetailDialog (false);
    }
    
    function openCreateCourseForm (): void {
        setCourse (new Course ());
        loadCourseTypeDropdownList ().catch (
                (error) => {
                    console.error (error);
                }
        );
        setShowCreateCourseForm (true);
    }

    function closeCreateCourseForm (): void {
        setShowCreateCourseForm (false);
    }
    
    async function openEditCourseForm (
            event: MouseEvent<HTMLElement, globalThis.MouseEvent>
    ): Promise<void> {
        button = event.target as HTMLButtonElement;
        courseID = Number (button.value);
        try {
            for (i = 0; i < courseHolder.length; i++){
                courseSample = courseHolder[i];
                if (courseSample.courseID === courseID){
                    setCourse (courseSample);
                    await loadCourseTypeDropdownList ();
                    setSelectedCourseTypeID (courseSample.courseType.typeID);
                    break;
                }
            }
            setShowEditCourseForm (true);
            return Promise.resolve<undefined> (undefined);
        }
        catch (error: unknown){
            return Promise.reject (error);
        }
    }

    function closeEditCourseForm (): void {
        setShowEditCourseForm (false);
    }

    function handleChange (
        event: ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ): void {
        updatedCourse = new Course (course);
        htmlElement = event.target;
        switch (htmlElement.name){
            default:
                throw new Error ("Unknown html element !");

            case "courseNameField":
                updatedCourse.courseName = htmlElement.value;
                break;

            case "descriptionTextarea":
                updatedCourse.description = htmlElement.value;
                break;

            case "courseTypeDropdownList":
                setSelectedCourseTypeID (Number (htmlElement.value));
                break;

            case "courseLevelDropdownList":
                setSelectedCourseLevelID (Number (htmlElement.value));
                break;

            case "tuitionFeeField":
                updatedCourse.tuitionFee = parseFloat (htmlElement.value);
                break;
        }
        setCourse (updatedCourse);
    }

    async function loadCourseTypeDropdownList (): Promise<void> {
        try {
            updatedCourseTypeHolder 
                = await courseTypeAPI.getAllCourseTypeInTheSystem (); 
            setCourseTypeHolder (updatedCourseTypeHolder);
            defaultSelectedID = updatedCourseTypeHolder[0].typeID;
            setSelectedCourseTypeID (defaultSelectedID);
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

    async function loadCourseLevelDropdownList (): Promise<void> {
        try {
            updatedCourseLevelHolder
                = await courseLevelAPI.getAllCourseLevelByTypeID (
                        selectedCourseTypeID
                ); 
            setCourseLevelHolder (updatedCourseLevelHolder);
            defaultSelectedID = updatedCourseLevelHolder[0].levelID;
            setSelectedCourseLevelID (defaultSelectedID);
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

    async function createCourse (
            event: FormEvent<HTMLFormElement>
    ): Promise<void> {
        event.preventDefault ();
        for (i = 0; i < courseTypeHolder.length; i++){
            courseType = courseTypeHolder[i];
            if (courseType.typeID === selectedCourseTypeID){
                selectedCourseType = courseType;
                break;
            }
        }
        for (i = 0; i < courseLevelHolder.length; i++){
            courseLevel = courseLevelHolder[i];
            if (courseLevel.levelID === selectedCourseLevelID){
                selectedCourseLevel = courseLevel;
                break;
            }
        }
        course.courseType = selectedCourseType;
        course.courseLevel = selectedCourseLevel; 
        try {
            await courseAPI.createNewCourse (course);
            closeCreateCourseForm ();
            props.dialogController.setDialogTitle ("Course Created !");
            props.dialogController.setDialogBody (
                    `The course [${course.courseName}] 
                    has been created successfully.`
            );
            props.dialogController.setDialogType ("inform");
            props.dialogController.setShowDialog (true);
            await loadCourseTable ();
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

    async function editCourse (
            event: FormEvent<HTMLFormElement>
    ): Promise<void> {
        event.preventDefault ();
        for (i = 0; i < courseTypeHolder.length; i++){
            courseType = courseTypeHolder[i];
            if (courseType.typeID === selectedCourseTypeID){
                selectedCourseType = courseType;
                break;
            }
        }
        for (i = 0; i < courseLevelHolder.length; i++){
            courseLevel = courseLevelHolder[i];
            if (courseLevel.levelID === selectedCourseLevelID){
                selectedCourseLevel = courseLevel;
                break;
            }
        }
        course.courseType = selectedCourseType;
        course.courseLevel = selectedCourseLevel; 
        try {
            await courseAPI.updateCourse (course);
            closeEditCourseForm ();
            props.dialogController.setDialogTitle ("Course Saved !");
            props.dialogController.setDialogBody (
                    `The course [${course.courseName}] 
                    has been saved successfully.`
            );
            props.dialogController.setDialogType ("inform");
            props.dialogController.setShowDialog (true);
            await loadCourseTable ();
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

    async function loadCourseTable (): Promise<void> {
        try {
            courseDataPage = await courseAPI.getAllCourse (
                    pageIndex
                    , pageSize
            ); 
            setTotalRowCount (courseDataPage.totalRowCount);
            setCourseHolder (courseDataPage.pageDataHolder);
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
            loadCourseTable ().catch (
                    (error) => {
                        console.error (error);
                    }
            );
        }
        , []
    );

    useEffect (
        () => {
            if (selectedCourseTypeID !== 0){
                loadCourseLevelDropdownList ().catch (
                        (error) => {
                            console.error (error);
                        }
                );
            }
        }
        , [selectedCourseTypeID]
    );
    
    useEffect (
        () => {
            if (props.dialogController.dialogIsConfirmed === true){
                executeCourseDeletion ().catch (
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
            loadCourseTable ().catch (
                    (error) => {
                        console.error (error);
                    }
            );
        }
        , [pageIndex]
    );
    
    if (courseHolder.length === 0){
        courseTable =
            <tr>
                <td colSpan = {6} className = "text-center">
                    <h5>
                        There are no courses in the system to show here
                    </h5>
                </td>
            </tr>;
    }
    else {
        courseTable =
            courseHolder.map (
                (
                        course
                        , index
                ) => renderCourseTable (
                        course
                        , index
                        , openViewDetailDialog
                        , openEditCourseForm
                        , handleDeleteCourse
                )
            );
    }

    return (
        <Container fluid = {true}>
            {props.modalDialog}
            <Modal
                show = {showCreateCourseForm}
                backdrop = "static"
                keyboard = {false}
                size = "lg"
            >
                <Modal.Header>
                    <Modal.Title>New Course Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form 
                        id = "CreateCourseForm"
                        className = "pt-2 pr-5 pl-5 pb-0"
                        onSubmit = {
                            (event) => {
                                createCourse (event).catch (
                                        (error) => {
                                            console.error (error);
                                        }
                                );
                            }
                        }
                    >
                        <Form.Group controlId = "CourseNameField">
                            <Form.Label>
                                Course Name:
                            </Form.Label>
                            <Form.Control
                                type = "text"
                                autoComplete = "on"
                                autoFocus = {true}
                                name = "courseNameField"
                                pattern = "^[\p{L} .'-]+$"
                                placeholder = "Name for the new course ?"
                                required = {true}
                                spellCheck = {false}
                                value = {course.courseName}
                                onChange = {
                                    (event) => {
                                        handleChange (event);
                                    }
                                }
                            />
                            <Form.Text className = "text-muted">
                                format: characters only !  
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId = "DescriptionTextarea">
                            <Form.Label>
                                Description:
                            </Form.Label>
                            <Form.Control
                                as = "textarea"
                                autoComplete = "off"
                                autoFocus = {false}
                                name = "descriptionTextarea"
                                placeholder = "Description for the new course ?"
                                required = {false}
                                spellCheck = {true}
                                rows = {5}
                                value = {course.description}
                                onChange = {
                                    (event) => {
                                        handleChange (event);
                                    }
                                }
                            />
                        </Form.Group>

                        <Form.Group controlId = "CourseTypeDropdownList">
                            <Form.Label>
                                Course Type:
                            </Form.Label>
                            <Form.Control 
                                as = "select" 
                                name = "courseTypeDropdownList"
                                autoFocus = {false}
                                required = {true}
                                value = {selectedCourseTypeID}
                                onChange = {
                                    (event) => {
                                        handleChange (
                                            event
                                        );
                                    } 
                                }
                            >
                                {courseTypeHolder.map (
                                    (
                                            courseType
                                    ) => renderCourseTypeDropdownList (
                                            courseType
                                    )  
                                )}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId = "CourseLevelDropdownList">
                            <Form.Label>
                                Course Level:
                            </Form.Label>
                            <Form.Control 
                                as = "select" 
                                name = "courseLevelDropdownList"
                                autoFocus = {false}
                                required = {true}
                                value = {selectedCourseLevelID}
                                onChange = {
                                    (event) => {
                                        handleChange (
                                            event
                                        );
                                    } 
                                }
                            >
                                {courseLevelHolder.map (
                                    (
                                            courseLevel
                                    ) => renderCourseLevelDropdownList (
                                            courseLevel
                                    )  
                                )}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId = "TuitionFeeField">
                            <Form.Label>
                                Tuition Fee (VND):
                            </Form.Label>
                            <Form.Control
                                type = "number"
                                autoComplete = "on"
                                autoFocus = {false}
                                name = "tuitionFeeField"
                                placeholder = "Price of the new course ?"
                                required = {true}
                                spellCheck = {false}
                                min = {0}
                                step = {500}
                                value = {course.tuitionFee}
                                onChange = {
                                    (event) => {
                                        handleChange (event);
                                    }
                                }
                            />
                            <Form.Text className = "text-muted">
                                format: numbers only and 
                                the minimum value is 0 !  
                            </Form.Text>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant = "success" 
                        type = "submit"
                        form = "CreateCourseForm" 
                    >
                        Create Course
                    </Button>
                    <Button 
                        variant = "outline-secondary" 
                        onClick = {closeCreateCourseForm}
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
                    <Modal.Title>Course Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        className = "pt-2 pr-5 pl-5 pb-0"
                    >
                        <Form.Row>
                            <Form.Group as = {Row} controlId = "CourseIDInfo">
                                <Form.Label 
                                    column = {true}
                                    md = {5}
                                >
                                    + Course ID:
                                </Form.Label>
                                <Col md = {7}>
                                    <Form.Control 
                                        plaintext = {true} 
                                        readOnly = {true} 
                                        value = {course.courseID}
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as = {Row} controlId = "CourseNameInfo">
                                <Form.Label 
                                    column = {true}
                                    md = {5}
                                >
                                    + Course Name:
                                </Form.Label>
                                <Col md = {7}>
                                    <Form.Control 
                                        plaintext = {true} 
                                        readOnly = {true} 
                                        value = {course.courseName}
                                    />
                                </Col>
                            </Form.Group>
                        </Form.Row>
                        
                        <Form.Group controlId = "DescriptionInfo">
                            <Form.Label>
                                + Description:
                            </Form.Label>
                            <Form.Control
                                as = "textarea"
                                readOnly = {true}
                                rows = {5}
                                value = {course.description}
                            />
                        </Form.Group>
                        
                        <Form.Row>
                            <Form.Group as = {Row} controlId = "CourseTypeInfo">
                                <Form.Label 
                                    column = {true}
                                    md = {5}
                                >
                                    + Course Type:
                                </Form.Label>
                                <Col md = {7}>
                                    <Form.Control 
                                        plaintext = {true} 
                                        readOnly = {true} 
                                        value = {course.courseType.typeName}
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group 
                                as = {Row} 
                                controlId = "CourseLevelInfo"
                            >
                                <Form.Label 
                                    column = {true}
                                    md = {5}
                                >
                                    + Course Level:
                                </Form.Label>
                                <Col md = {7}>
                                    <Form.Control 
                                        plaintext = {true} 
                                        readOnly = {true} 
                                        value = {course.courseLevel.levelName}
                                    />
                                </Col>
                            </Form.Group>
                        </Form.Row>

                        <Form.Group as = {Row} controlId = "TuitionFeeInfo">
                            <Form.Label
                                column = {true}
                                md = {3}
                            >
                                + Tuition Fee (VND):
                            </Form.Label>
                            <Col md = {9}>
                                <Form.Control
                                    plaintext = {true} 
                                    readOnly = {true}
                                    value = {
                                        `${
                                            course.tuitionFee.toLocaleString ()
                                        } đ`
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
                show = {showEditCourseForm}
                backdrop = "static"
                keyboard = {false}
                size = "lg"
            >
                <Modal.Header>
                    <Modal.Title>Edit Course</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form 
                        id = "EditCourseForm"
                        className = "pt-2 pr-5 pl-5 pb-0"
                        onSubmit = {
                            (event) => {
                                editCourse (event).catch (
                                        (error) => {
                                            console.error (error);
                                        }
                                );
                            }
                        }
                    >
                        <Form.Group controlId = "CourseNameField">
                            <Form.Label>
                                Course Name:
                            </Form.Label>
                            <Form.Control
                                type = "text"
                                autoComplete = "on"
                                autoFocus = {true}
                                name = "courseNameField"
                                pattern = "^[\p{L} .'-]+$"
                                placeholder = "Name for the course ?"
                                required = {true}
                                spellCheck = {false}
                                value = {course.courseName}
                                onChange = {
                                    (event) => {
                                        handleChange (event);
                                    }
                                }
                            />
                            <Form.Text className = "text-muted">
                                format: characters only !  
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId = "DescriptionTextarea">
                            <Form.Label>
                                Description:
                            </Form.Label>
                            <Form.Control
                                as = "textarea"
                                autoComplete = "off"
                                autoFocus = {false}
                                name = "descriptionTextarea"
                                placeholder = "Description for the course ?"
                                required = {false}
                                spellCheck = {true}
                                rows = {5}
                                value = {course.description}
                                onChange = {
                                    (event) => {
                                        handleChange (event);
                                    }
                                }
                            />
                        </Form.Group>

                        <Form.Group controlId = "CourseTypeDropdownList">
                            <Form.Label>
                                Course Type:
                            </Form.Label>
                            <Form.Control 
                                as = "select" 
                                name = "courseTypeDropdownList"
                                autoFocus = {false}
                                required = {true}
                                value = {selectedCourseTypeID}
                                onChange = {
                                    (event) => {
                                        handleChange (
                                            event
                                        );
                                    } 
                                }
                            >
                                {courseTypeHolder.map (
                                    (
                                            courseType
                                    ) => renderCourseTypeDropdownList (
                                            courseType
                                    )  
                                )}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId = "CourseLevelDropdownList">
                            <Form.Label>
                                Course Level:
                            </Form.Label>
                            <Form.Control 
                                as = "select" 
                                name = "courseLevelDropdownList"
                                autoFocus = {false}
                                required = {true}
                                value = {selectedCourseLevelID}
                                onChange = {
                                    (event) => {
                                        handleChange (
                                            event
                                        );
                                    } 
                                }
                            >
                                {courseLevelHolder.map (
                                    (
                                            courseLevel
                                    ) => renderCourseLevelDropdownList (
                                            courseLevel
                                    )  
                                )}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId = "TuitionFeeField">
                            <Form.Label>
                                Tuition Fee (VND):
                            </Form.Label>
                            <Form.Control
                                type = "number"
                                autoComplete = "on"
                                autoFocus = {false}
                                name = "tuitionFeeField"
                                placeholder = "Price of the course ?"
                                required = {true}
                                spellCheck = {false}
                                min = {0}
                                step = {500}
                                value = {course.tuitionFee}
                                onChange = {
                                    (event) => {
                                        handleChange (event);
                                    }
                                }
                            />
                            <Form.Text className = "text-muted">
                                format: numbers only !  
                            </Form.Text>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant = "success" 
                        type = "submit"
                        form = "EditCourseForm" 
                    >
                        Save
                    </Button>
                    <Button 
                        variant = "outline-secondary" 
                        onClick = {closeEditCourseForm}
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
                                <Breadcrumb.Item active>
                                    Manage Course 
                                </Breadcrumb.Item>
                            </Breadcrumb>
                            <h1 className = "mb-3">
                                <span className = "mr-3">
                                    Manage Course
                                </span>
                                <Button 
                                    variant = "success"
                                    type = "button"
                                    onClick = {openCreateCourseForm}
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
                                                Course Name
                                            </th>
                                            <th>
                                                Course Type
                                            </th>
                                            <th>
                                                Course Level
                                            </th>
                                            <th>
                                                Tuition Fee
                                            </th>
                                            <th>
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {courseTable}
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

function renderCourseTable (
        course: Course
        , index: number 
        , openViewDetailsDialog: (
                event: MouseEvent<HTMLElement, globalThis.MouseEvent>
        ) => void 
        , openEditCourseForm: (
                event: MouseEvent<HTMLElement, globalThis.MouseEvent>
        ) => Promise<void>
        , handleDeleteCourse: (
                event: MouseEvent<HTMLElement, globalThis.MouseEvent>
        ) => void 
): ReactElement {
    return (
        <tr key = {course.courseID}>
            <td>
                {index + 1}
            </td>
            <td>
                {course.courseName}
            </td>
            <td>
                {course.courseType.typeName}
            </td>
            <td>
                {course.courseLevel.levelName}
            </td>
            <td>
                {course.tuitionFee}
            </td>
            <td>
                <Button 
                    variant = "primary"
                    type = "button"
                    value = {course.courseID}
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
                    value = {course.courseID}
                    onClick = {
                        (event) => {
                            openEditCourseForm (event).catch (
                                    (error) => {
                                        console.error (error);
                                    }
                            );
                        }
                    }
                >
                    Edit
                </Button>
                <Button 
                    variant = "danger"
                    type = "button"
                    value = {course.courseID}
                    onClick = {
                        (event) => {
                            handleDeleteCourse (event);
                        }
                    }
                >
                    Delete
                </Button>
            </td>
        </tr>
    );
}