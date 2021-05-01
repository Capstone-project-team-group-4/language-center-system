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
import { CourseAPI } from "../../common/service/CourseAPI";
import { TypeGuard } from "../../common/service/TypeGuard";
import { Course } from "../../model/Course";

interface ManageThingsInCoursePageProps {
    dialogController: DialogControl;
    modalDialog: ReactElement;
    typeGuardian: TypeGuard;
}

export function ManageThingsInCoursePage (
        props: ManageThingsInCoursePageProps
): ReactElement {

    // Variables declaration:
    let [courseHolder, setCourseHolder]
        = useState<Course[]> (new Array<Course> ());
    let courseDataPage: DataPage<Course> | undefined;
    let [pageIndex, setPageIndex] = useState<number> (0);
    let [pageSize] = useState<number> (5);
    let [totalRowCount, setTotalRowCount] = useState<number> (0);
    let courseTable: ReactNode;

    let [courseAPI] = useState<CourseAPI> (new CourseAPI ());

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
                                    linkProps = {{to: "/admin-console"}}
                                >
                                    Admin Console
                                </Breadcrumb.Item>
                                <Breadcrumb.Item active>
                                    Manage Things In Course
                                </Breadcrumb.Item>
                            </Breadcrumb>
                            <h1 className = "mb-3">
                                Manage Things In Course
                            </h1>
                            <Form>
                                <Table responsive = "md" hover = {true}>
                                    <thead>
                                        <tr>
                                            <th>
                                                #
                                            </th>
                                            <th>
                                                Course ID
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
): ReactElement {
    return (
        <tr key = {course.courseID}>
            <td>
                {index + 1}
            </td>
            <td>
                {course.courseID}
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
                <Button
                    variant = "outline-primary"
                    as = {Link}
                    to = {
                        "/admin-console/manage-things-in-course-page"
                        + `/courses/${course.courseID}/students`
                    }
                >
                    Manage Student
                </Button>
                <Button
                    variant = "outline-primary"
                    as = {Link}
                    to = {
                        "/admin-console/manage-things-in-course-page"
                        + `/courses/${course.courseID}/examinations`
                    }
                >
                    Manage Examination
                </Button>
                <Button
                    variant = "outline-primary"
                    as = {Link}
                    to = {
                        "/admin-console/manage-lesson-page/" +
                        `${course.courseID}`

                    }
                >
                    Manage Lesson
                </Button>
            </td>
        </tr>
    );
}
