import React, { ReactElement, useEffect, useState } from "react";
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
    let [pageIndex] = useState<number> (0);
    let [pageSize] = useState<number> (10);
    let [totalRowCount, setTotalRowCount] = useState<number> (0);
    
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
                                        {courseHolder.map (
                                            (
                                                    course
                                                    , index
                                            ) => renderCourseTable (
                                                    course
                                                    , index
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
            </td>
        </tr>
    );
}