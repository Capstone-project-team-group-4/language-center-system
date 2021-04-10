import React, {
    ChangeEvent, FormEvent, MouseEvent,
    ReactElement, useEffect, useState
} from "react";
import { Breadcrumb, Button, Col, Container, Form, Modal, Row, Table }
    from "react-bootstrap";
import { Lesson } from '../../model/Lesson';
import { LessonAPI } from '../../common/service/LessonAPI';
import { Link } from "react-router-dom";
import { DataPage } from "../../App";
import { DialogControl } from "../../common/component/ModalDialog";
import { TypeGuard } from "../../common/service/TypeGuard";

function renderLessonTable (
    lesson: Lesson
    , index: number
    , openViewDetailsDialog: (
        event: MouseEvent<HTMLElement, globalThis.MouseEvent>
    ) => void
    , openEditLessonForm: (
        event: MouseEvent<HTMLElement, globalThis.MouseEvent>
    ) => void
    , handleDeleteLesson: (
        event: MouseEvent<HTMLElement, globalThis.MouseEvent>
    ) => void
): ReactElement {
    return (
        <tr key={lesson.lessonID}>
            <td>
                {index + 1}
            </td>
            <td>
                {lesson.lessonName}
            </td>
            <td>
                {lesson.type}
            </td>
            <td>
                {lesson.duration}
            </td>
            <td>
                <Button
                    variant="primary"
                    type="button"
                    value={lesson.lessonID}
                    onClick={
                        (event) => {
                            openViewDetailsDialog(event);
                        }
                    }
                >
                    Details
            </Button>
            &nbsp;
                <Button
                    variant="success"
                    type="button"
                    value={lesson.lessonID}
                    onClick={
                        (event) => {
                            openEditLessonForm(event);
                        }
                    }
                >
                    Edit
            </Button>
            &nbsp;
                <Button
                    variant="danger"
                    type="button"
                    value={lesson.lessonID}
                    onClick={
                        (event) => {
                            handleDeleteLesson(event);
                        }
                    }
                >
                    Delete
            </Button>
            </td>
        </tr>
    );
}

interface ManageLessonPageProps {
    dialogController: DialogControl;
    modalDialog: ReactElement;
}

export function ManageLessonPage (props: ManageLessonPageProps): ReactElement {
    // Variables declaration:
    let typeGuardian: TypeGuard;
    let [showCreateLessonForm, setShowCreateLessonForm]
        = useState<boolean>(false);
    let htmlElement:
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | undefined;
    let [lesson, setLesson] = useState<Lesson>(new Lesson());
    let updatedLesson: Lesson | undefined;
    let lessonAPI: LessonAPI;
    let i: number | undefined;
    let [pageIndex] = useState<number>(0);
    let [pageSize] = useState<number>(10);
    let [totalPageCount, setTotalPageCount] = useState<number>(0);
    let lessonDataPage: DataPage<Lesson> | undefined;
    let [lessonHolder, setLessonHolder] = useState<Lesson[]>([]);
    let [showViewDetailDialog, setShowViewDetailDialog]
        = useState<boolean>(false);
    let button: HTMLButtonElement | undefined;
    let lessonID: number | undefined;
    let lessonSample: Lesson | undefined;
    let [formattedLastModified, setFormattedLastModified]
        = useState<string>("");
    let rawDate: Date | undefined;
    let [formattedDateCreated, setFormattedDateCreated]
        = useState<string>("");
    let [pendingLessonID, setPendingLessonID] = useState<number>(0);
    let [showEditLessonForm, setShowEditLessonForm]
        = useState<boolean>(false);

    lessonAPI = new LessonAPI();
    typeGuardian = new TypeGuard();

    function handleDeleteLesson (
        event: MouseEvent<HTMLElement, globalThis.MouseEvent>
    ): void {
        button = event.target as HTMLButtonElement;
        setPendingLessonID(Number(button.value));
        props.dialogController.setDialogTitle("Confirm Delete Lesson");
        props.dialogController.setDialogBody(
            "Are you sure you want to delete this lesson ?"
        );
        props.dialogController.setDialogType("confirm");
        props.dialogController.setShowDialog(true);
    }

    async function executeLessonDeletion (): Promise<void> {
        try {
            await lessonAPI.deleteLesson(pendingLessonID);
            loadLessonTable();
            return Promise.resolve<undefined>(undefined);
        }
        catch (apiError: unknown) {
            if (typeGuardian.isAxiosError(apiError)) {
                if (typeof apiError.code === "string") {
                    props.dialogController.setDialogTitle(
                        `${apiError.code}: ${apiError.name}`
                    );
                }
                else {
                    props.dialogController.setDialogTitle(apiError.name);
                }
                props.dialogController.setDialogBody(apiError.message);
                props.dialogController.setDialogType("error");
                props.dialogController.setShowDialog(true);
            }
            return Promise.reject(apiError);
        }
    }

    function openViewDetailDialog (
        event: MouseEvent<HTMLElement, globalThis.MouseEvent>
    ): void {
        button = event.target as HTMLButtonElement;
        lessonID = Number(button.value);
        for (i = 0; i < lessonHolder.length; i++) {
            lessonSample = lessonHolder[i];
            if (lessonSample.lessonID === lessonID) {
                setLesson(lessonSample);
                rawDate = new Date(lessonSample.lastModified);
                if (rawDate.toString() === new Date(0).toString()) {
                    setFormattedLastModified("Has not been modified yet !");
                }
                else {
                    setFormattedLastModified(rawDate.toLocaleString());
                }
                rawDate = new Date(lessonSample.dateCreated);
                setFormattedDateCreated(rawDate.toLocaleString());
                break;
            }
        }
        setShowViewDetailDialog(true);
    }

    function closeViewDetailDialog (): void {
        setShowViewDetailDialog(false);
    }

    function openCreateLessonForm (): void {
        setLesson(new Lesson());
        setShowCreateLessonForm(true);
    }

    function closeCreateLessonForm (): void {
        setShowCreateLessonForm(false);
    }

    function openEditLessonForm (
        event: MouseEvent<HTMLElement, globalThis.MouseEvent>
    ): void {
        button = event.target as HTMLButtonElement;
        lessonID = Number(button.value);
        for (i = 0; i < lessonHolder.length; i++) {
            lessonSample = lessonHolder[i];
            if (lessonSample.lessonID === lessonID) {
                setLesson(lessonSample);
                break;
            }
        }
        setShowEditLessonForm(true);
    }

    function closeEditLessonForm (): void {
        setShowEditLessonForm(false);
    }

    function handleChange (
        event: ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ): void {
        updatedLesson = new Lesson(lesson);
        htmlElement = event.target;
        console.log(htmlElement.name);
        switch (htmlElement.name) {
            default:
                throw new Error("Unknown html element !");

            case "lessonNameField":
                updatedLesson.lessonName = htmlElement.value;
                break;

            case "lessonTypeField":
                updatedLesson.type = htmlElement.value;
                break;

            case "descriptionTextarea":
                updatedLesson.description = htmlElement.value;
                break;

            case "durationField":
                updatedLesson.duration = Number(htmlElement.value);
                break;
        }
        setLesson(updatedLesson);
    }

    async function createLesson (
        event: FormEvent<HTMLFormElement>
    ): Promise<void> {
        event.preventDefault();
        try {
            await lessonAPI.createNewLesson(lesson);
            closeCreateLessonForm();
            props.dialogController.setDialogTitle("Lesson Created !");
            props.dialogController.setDialogBody(
                `The lesson [${lesson.lessonName}] 
            has been created successfully.`
            );
            props.dialogController.setDialogType("inform");
            props.dialogController.setShowDialog(true);
            loadLessonTable();
            return Promise.resolve<undefined>(undefined);
        }
        catch (apiError: unknown) {
            if (typeGuardian.isAxiosError(apiError)) {
                if (typeof apiError.code === "string") {
                    props.dialogController.setDialogTitle(
                        `${apiError.code}: ${apiError.name}`
                    );
                }
                else {
                    props.dialogController.setDialogTitle(apiError.name);
                }
                props.dialogController.setDialogBody(apiError.message);
                props.dialogController.setDialogType("error");
                props.dialogController.setShowDialog(true);
            }
            return Promise.reject(apiError);
        }
    }

    async function editLesson (
        event: FormEvent<HTMLFormElement>
    ): Promise<void> {
        event.preventDefault();
        try {
            await lessonAPI.updateLesson(lesson);
            closeEditLessonForm();
            props.dialogController.setDialogTitle("Lesson Saved !");
            props.dialogController.setDialogBody(
                `The lesson [${lesson.lessonName}] 
            has been saved successfully.`
            );
            props.dialogController.setDialogType("inform");
            props.dialogController.setShowDialog(true);
            loadLessonTable();
            return Promise.resolve<undefined>(undefined);
        }
        catch (apiError: unknown) {
            if (typeGuardian.isAxiosError(apiError)) {
                if (typeof apiError.code === "string") {
                    props.dialogController.setDialogTitle(
                        `${apiError.code}: ${apiError.name}`
                    );
                }
                else {
                    props.dialogController.setDialogTitle(apiError.name);
                }
                props.dialogController.setDialogBody(apiError.message);
                props.dialogController.setDialogType("error");
                props.dialogController.setShowDialog(true);
            }
            return Promise.reject(apiError);
        }
    }

    async function loadLessonTable (): Promise<void> {
        try {
            lessonDataPage = await lessonAPI.getAllLesson(
                pageIndex
                , pageSize
            );
            setTotalPageCount(lessonDataPage.totalRowCount);
            setLessonHolder(lessonDataPage.pageDataHolder);
            return Promise.resolve<undefined>(undefined);
        }
        catch (apiError: unknown) {
            if (typeGuardian.isAxiosError(apiError)) {
                if (typeof apiError.code === "string") {
                    props.dialogController.setDialogTitle(
                        `${apiError.code}: ${apiError.name}`
                    );
                }
                else {
                    props.dialogController.setDialogTitle(apiError.name);
                }
                props.dialogController.setDialogBody(apiError.message);
                props.dialogController.setDialogType("error");
                props.dialogController.setShowDialog(true);
            }
            return Promise.reject(apiError);
        }
    }

    useEffect(
        (): void => {
            loadLessonTable().catch(
                (error: unknown) => {
                    console.error(error);
                }
            );
        }
        , []
    );

    useEffect(
        (): void => {
            if (props.dialogController.dialogIsConfirmed === true) {
                executeLessonDeletion().catch(
                    (error: unknown) => {
                        console.error(error);
                    }
                );
                props.dialogController.setDialogIsConfirmed(false);
            }
        }
        , [props.dialogController.dialogIsConfirmed]
    );

    // Modals
    return (
        <Container fluid={true}>
            {props.modalDialog}
            <Modal
                show={showCreateLessonForm}
                backdrop="static"
                keyboard={false}
                size="lg"
            >
                <Modal.Header>
                    <Modal.Title>New Lesson Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        id="CreateLessonForm"
                        className="pt-2 pr-5 pl-5 pb-0"
                        onSubmit={
                            (event) => {
                                createLesson(event).catch(
                                    (error: unknown) => {
                                        console.error(error);
                                    }
                                );
                            }
                        }
                    >
                        <Form.Group controlId="LessonNameField">
                            <Form.Label>
                                Lesson Name:
                            </Form.Label>
                            <Form.Control
                                type="text"
                                autoComplete="on"
                                autoFocus={true}
                                name="lessonNameField"
                                pattern="^[a-zA-Z0-9\+]*$"
                                placeholder="Name for the new lesson ?"
                                required={true}
                                spellCheck={false}
                                value={lesson.lessonName}
                                onChange={
                                    (event) => {
                                        handleChange(event);
                                    }
                                }
                            />
                            <Form.Text className="text-muted">
                                format: no special character !
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="LessonTypeField">
                            <Form.Label>
                                Lesson Type:
                            </Form.Label>
                            <Form.Control
                                type="text"
                                autoComplete="on"
                                autoFocus={true}
                                name="lessonTypeField"
                                pattern="^[\p{L} .'-]+$"
                                placeholder="Type for the new lesson ?"
                                required={true}
                                spellCheck={false}
                                value={lesson.type}
                                onChange={
                                    (event) => {
                                        handleChange(event);
                                    }
                                }
                            />
                            <Form.Text className="text-muted">
                                format: no special character !
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="DescriptionTextarea">
                            <Form.Label>
                                Description:
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                autoComplete="off"
                                autoFocus={false}
                                name="descriptionTextarea"
                                placeholder="Description for the new lesson ?"
                                required={false}
                                spellCheck={true}
                                rows={5}
                                value={lesson.description}
                                onChange={
                                    (event) => {
                                        handleChange(event);
                                    }
                                }
                            />
                        </Form.Group>

                        <Form.Group controlId="durationField">
                            <Form.Label>
                                Duration (minutes) :
                            </Form.Label>
                            <Form.Control
                                type="number"
                                autoComplete="on"
                                autoFocus={false}
                                name="durationField"
                                placeholder="Duration of the new lesson ?"
                                required={true}
                                spellCheck={false}
                                min={0}
                                step={1}
                                value={lesson.duration}
                                onChange={
                                    (event) => {
                                        handleChange(event);
                                    }
                                }
                            />
                            <Form.Text className="text-muted">
                                format: numbers only !
                            </Form.Text>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="success"
                        type="submit"
                        form="CreateLessonForm"
                    >
                        Create
                    </Button>
                    &nbsp;
                    <Button
                        variant="outline-secondary"
                        onClick={closeCreateLessonForm}
                    >
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showViewDetailDialog}
                backdrop="static"
                keyboard={false}
                size="lg"
            >
                <Modal.Header>
                    <Modal.Title>Lesson Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        id="viewLessonForm"
                        className="pt-2 pr-5 pl-5 pb-0"
                    >
                        <Form.Row>
                            <Form.Group as={Row} controlId="LessonIDInfo">
                                <Form.Label
                                    column={true}
                                    md={5}
                                >
                                    + Lesson ID:
                                </Form.Label>
                                <Col md={7}>
                                    <Form.Control
                                        plaintext={true}
                                        readOnly={true}
                                        value={lesson.lessonID}
                                    />
                                </Col>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Row} controlId="LessonNameInfo">
                                <Form.Label
                                    column={true}
                                    md={5}
                                >
                                    + Lesson Name:
                                </Form.Label>
                                <Col md={7}>
                                    <Form.Control
                                        plaintext={true}
                                        readOnly={true}
                                        value={lesson.lessonName}
                                    />
                                </Col>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Row} controlId="LessonTypeInfo">
                                <Form.Label
                                    column={true}
                                    md={5}
                                >
                                    + Lesson Type:
                                </Form.Label>
                                <Col md={7}>
                                    <Form.Control
                                        plaintext={true}
                                        readOnly={true}
                                        value={lesson.type}
                                    />
                                </Col>
                            </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="DescriptionInfo">
                            <Form.Label>
                                + Description:
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                readOnly={true}
                                rows={5}
                                value={lesson.description}
                            />
                        </Form.Group>

                        <Form.Row>

                            <Form.Group as={Row} controlId="DurationInfo">
                                <Form.Label
                                    column={true}
                                    md={6}
                                >
                                    + Duration (minutes):
                            </Form.Label>
                                <Col
                                    md={4}
                                >
                                    <Form.Control
                                        plaintext={true}
                                        readOnly={true}
                                        value={
                                            `${lesson.duration.toLocaleString()
                                            }`
                                        }
                                    />
                                </Col>
                            </Form.Group>

                        </Form.Row>

                        <Form.Row>

                            <Form.Group as={Row}
                                controlId="LastModifiedInfo">
                                <Form.Label
                                    column={true}
                                    md={5}
                                >
                                    + Last Modified:
                            </Form.Label>
                                <Col md={7}>
                                    <Form.Control
                                        plaintext={true}
                                        readOnly={true}
                                        value={formattedLastModified}
                                    />
                                </Col>
                            </Form.Group>

                        </Form.Row>

                        <Form.Row>

                            <Form.Group as={Row}
                                controlId="DateCreatedInfo">
                                <Form.Label
                                    column={true}
                                    md={5}
                                >
                                    + Date Created:
                            </Form.Label>
                                <Col md={7}>
                                    <Form.Control
                                        plaintext={true}
                                        readOnly={true}
                                        value={formattedDateCreated}
                                    />
                                </Col>
                            </Form.Group>

                        </Form.Row>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="info"
                        onClick={closeViewDetailDialog}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showEditLessonForm}
                backdrop="static"
                keyboard={false}
                size="lg"
            >
                <Modal.Header>
                    <Modal.Title>Edit Lesson</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        id="EditLessonForm"
                        className="pt-2 pr-5 pl-5 pb-0"
                        onSubmit={
                            (event) => {
                                editLesson(event).catch(
                                    (error: unknown) => {
                                        console.error(error);
                                    }
                                );
                            }
                        }
                    >
                        <Form.Group controlId="LessonNameField">
                            <Form.Label>
                                Lesson Name:
                            </Form.Label>
                            <Form.Control
                                type="text"
                                autoComplete="on"
                                autoFocus={true}
                                name="lessonNameField"
                                pattern="^[a-zA-Z0-9\+]*$"
                                placeholder="Name for the lesson ?"
                                required={true}
                                spellCheck={false}
                                value={lesson.lessonName}
                                onChange={
                                    (event) => {
                                        handleChange(event);
                                    }
                                }
                            />
                            <Form.Text className="text-muted">
                                format: no special character !
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="LessonTypeField">
                            <Form.Label>
                                Lesson Type:
                            </Form.Label>
                            <Form.Control
                                type="text"
                                autoComplete="on"
                                autoFocus={true}
                                name="lessonTypeField"
                                pattern="^[\p{L} .'-]+$"
                                placeholder="Type for the lesson ?"
                                required={true}
                                spellCheck={false}
                                value={lesson.type}
                                onChange={
                                    (event) => {
                                        handleChange(event);
                                    }
                                }
                            />
                            <Form.Text className="text-muted">
                                format: no special character !
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="DescriptionTextarea">
                            <Form.Label>
                                Description:
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                autoComplete="off"
                                autoFocus={false}
                                name="descriptionTextarea"
                                placeholder="Description for the lesson ?"
                                required={false}
                                spellCheck={true}
                                rows={5}
                                value={lesson.description}
                                onChange={
                                    (event) => {
                                        handleChange(event);
                                    }
                                }
                            />
                        </Form.Group>

                        <Form.Group controlId="DurationField">
                            <Form.Label>
                                Duration (minutes):
                            </Form.Label>
                            <Form.Control
                                type="number"
                                autoComplete="on"
                                autoFocus={false}
                                name="durationField"
                                placeholder="Duration of the lesson ?"
                                required={true}
                                spellCheck={false}
                                min={0}
                                step={1}
                                value={lesson.duration}
                                onChange={
                                    (event) => {
                                        handleChange(event);
                                    }
                                }
                            />
                            <Form.Text className="text-muted">
                                format: numbers only !
                            </Form.Text>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="success"
                        type="submit"
                        form="EditLessonForm"
                    >
                        Save
                    </Button>
                    &nbsp;
                    <Button
                        variant="outline-secondary"
                        onClick={closeEditLessonForm}
                    >
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
            <main>
                <Container>
                    <Row className="bg-white">
                        <Col>
                            <Breadcrumb>
                                <Breadcrumb.Item
                                    linkAs={Link}
                                    linkProps={{ to: "/" }}
                                >
                                    Home
                                </Breadcrumb.Item>
                                <Breadcrumb.Item
                                    linkAs={Link}
                                    linkProps={{
                                        to:
                                        "/admin-console/manage-course-function"
                                    }}
                                >
                                    Admin Console
                                </Breadcrumb.Item>
                                <Breadcrumb.Item active>
                                    Manage course function
                                </Breadcrumb.Item>
                                <Breadcrumb.Item active>
                                    Manage lesson function
                                </Breadcrumb.Item>
                            </Breadcrumb>
                            <h1 className="mb-3">
                                <span className="mr-3">
                                    Manage Lessons
                                </span>
                                <Button
                                    variant="success"
                                    type="button"
                                    onClick={openCreateLessonForm}
                                >
                                    Create New
                                </Button>
                            </h1>
                            <Form>
                                <Table responsive="md" hover={true}>
                                    <thead>
                                        <tr>
                                            <th>
                                                #
                                            </th>
                                            <th>
                                                Lesson Name
                                            </th>
                                            <th>
                                                Lesson Type
                                            </th>
                                            <th>
                                                Duration (minutes)
                                            </th>
                                            <th>
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {lessonHolder.map(
                                            (
                                                lesson
                                                , index
                                            ) => renderLessonTable(
                                                lesson
                                                , index
                                                , openViewDetailDialog
                                                , openEditLessonForm
                                                , handleDeleteLesson
                                            )
                                        )}
                                    </tbody>
                                </Table>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </main>
        </Container>
    );
}
