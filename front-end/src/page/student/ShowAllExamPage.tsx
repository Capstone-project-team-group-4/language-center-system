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
import { ExaminationAPI } from "../../common/service/ExaminationAPI";
import { TypeGuard } from "../../common/service/TypeGuard";
import { Examination } from "../../model/Examination";

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

    let [examAPI] = useState<ExaminationAPI> (new ExaminationAPI ());

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