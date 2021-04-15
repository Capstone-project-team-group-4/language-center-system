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
import { ExaminationAPI } from "../../common/service/ExaminationAPI";
import { TypeGuard } from "../../common/service/TypeGuard";
import { Course } from "../../model/Course";
import { Examination } from "../../model/Examination";

interface ManageThingsInExaminationPageProps {
    dialogController: DialogControl;
    modalDialog: ReactElement;
    typeGuardian: TypeGuard;
}

export function ManageThingsInExaminationPage (
        props: ManageThingsInExaminationPageProps
): ReactElement {

    // Variables declaration:
    let [examHolder, setExamHolder] 
        = useState<Examination[]> (new Array<Examination> ());
    let examDataPage: DataPage<Examination> | undefined;
    let [pageIndex] = useState<number> (0);
    let [pageSize] = useState<number> (10);
    let [totalRowCount, setTotalRowCount] = useState<number> (0);
        
    let [examAPI] = useState<ExaminationAPI> (new ExaminationAPI ());
    
    async function loadExamTable (): Promise<void> {
        try {
            examDataPage = await examAPI.getAllExam (
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
                                    Manage Things In Examination
                                </Breadcrumb.Item>
                            </Breadcrumb>
                            <h1 className = "mb-3">
                                Manage Things In Examination
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
                                                Course Name
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
                                                    course
                                                    , index
                                            ) => renderExamTable (
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

function renderExamTable (
        exam: Examination
        , index: number
): ReactElement {
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
                {exam.course.courseName}
            </td>
            <td>
                {exam.duration}
            </td>
            <td>
                <Button 
                    variant = "outline-primary"
                    as = {Link}
                    to = {
                        "/admin-console/manage-things-in-examination-page"
                        + `/examinations/${exam.examID}/exam-questions`
                    }
                >
                    Manage Exam Question
                </Button>
            </td>
        </tr>
    );
}