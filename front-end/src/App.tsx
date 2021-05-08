/* eslint-disable @typescript-eslint/no-array-constructor */
// Import package members section:
import React, { ReactElement, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import "./App.css";
import { PageHeader } from "./common/component/PageHeader";
import { ModalDialog, DialogControl } from "./common/component/ModalDialog";
// import { InfoPage } from "./page/student/InfoPage";
import { TeacherSpareTimePage } from "./page/teacher/SpareTimePage";
import 'antd/dist/antd.css';
import { AdminClassPage } from "./page/admin/AdminClassPage";
import { TeacherClassPage } from "./page/teacher/TeacherClassPage";
import { StudentClassPage } from "./page/student/StudentClassPage";
import { AdminSpareTimePage } from "./page/admin/AdminSpareTimePage";
import {
  HomePageHeader
} from './common/component/home_page_header/HomePageHeader';
import {
  ProtectedRoute
  , SecurityContext
} from './common/component/ProtectedRoute';
import { LogOutAPI } from './common/service/LogOutAPI';
import { TypeGuard } from './common/service/TypeGuard';
import { LoggedInUser } from './model/LoggedInUser';
import { AdminConsolePage } from './page/admin/AdminConsolePage';
import { CreateAccountPage } from './page/admin/CreateAccountPage';
import { HomePage } from './page/home_page/HomePage';
import { EditStudentInfo } from './page/EditStudentInfo';
import { LogInPage } from './page/log_in_page/LogInPage';
import { SelectRolePage } from './page/select_role_page/SelectRolePage';
import { SignUpPage } from './page/sign_up_page/SignUpPage';
import { History } from '../node_modules/@types/history';
import {
  DisableOrDeleteAccountPage
} from './page/admin/DisableOrDeleteAccountPage';
import { ManageCoursePage } from './page/admin/ManageCoursePage';
import {
  ManageStudentInCoursePage
} from './page/admin/ManageStudentInCoursePage';
import { ManageStudentPage } from './page/admin/ManageStudentPage';
import { TeacherDashboardPage } from './page/teacher/TeacherDashboardPage';
import { StudentDashboardPage } from './page/student/StudentDashboardPage';
import { EditTeacherInfo } from './page/EditTeacherInfo';
import { ViewProfilePage } from './page/ViewProfilePage';
import { DetailPage } from './page/DetailPage';
import { LessonDetailPage } from './page/student/LessonDetailPage';
import { ManageExamQuestionPage } from './page/teacher/ManageExamQuestionPage';
import {
  ManageThingsInCoursePage
} from './page/admin/ManageThingsInCoursePage';
import {
  ManageExaminationInCoursePage
} from './page/admin/ManageExaminationInCoursePage';
import { ManageLessonPage } from './page/admin/ManageLessonPage';
import { TypeConvert } from './common/service/TypeConvert';
import {
  ManageThingsInExaminationPage
} from './page/admin/ManageThingsInExaminationPage';
import {
  ManageExamQuestionInExaminationPage
} from './page/admin/ManageExamQuestionInExaminationPage';
import { LessonListPage } from './page/student/LessonListlPage';
import { CourseDetailPage } from './page/student/CourseDetailPage';
import { ProfilePage } from './page/student/ProfilePage';
import { ManageTeacherPage } from './page/admin/ManageTeacherPage';
import { ContactUs } from './page/contact_us_page/ContactPage';
import { Header } from './common/component/home_page_header/Header';
import { useSessionState } from './common/service/PersistedStateHook';
import { ShowAllExamPage } from './page/student/ShowAllExamPage';
import { TakeExamPage } from './page/student/TakeExamPage';
import { ShowExamScorePage } from './page/student/ShowExamScorePage';

export interface DataPage<T> {
  totalRowCount: number;
  pageDataHolder: T[];
}

export function App(): ReactElement {
  // Variables declaration:
  let [showDialog, setShowDialog] = useState<boolean>(false);
  let [dialogTitle, setDialogTitle] = useState<string>("");
  let [dialogBody, setDialogBody] = useState<string>("");
  let [dialogType, setDialogType] = useState<string>("");
  let modalDialog: ReactElement | undefined;
  let [isAuthenticated, setIsAuthenticated] = useSessionState<boolean>(
    "isAuthenticated",
    false
  );
  let [loggedInUser, setLoggedInUser] = useSessionState<LoggedInUser>(
    "loggedInUser",
    new LoggedInUser()
  );
  let dialogController: DialogControl | undefined;
  let acceptableRoleNameHolder: string[] | undefined;
  let adminPageSecurity: SecurityContext | undefined;
  let selectRolePageSecurity: SecurityContext | undefined;
  let teacherPageSecurity: SecurityContext | undefined;
  let studentPageSecurity: SecurityContext | undefined;
  let history: History<unknown>;
  let [dialogIsConfirmed, setDialogIsConfirmed] = useState<boolean>(false);
  let [typeGuardian] = useState<TypeGuard>(new TypeGuard());
  let [typeConverter] = useState<TypeConvert>(new TypeConvert());

  let [logOutAPI] = useState<LogOutAPI>(new LogOutAPI());
  history = useHistory();

  function handleCloseDialog(): void {
    setShowDialog(false);
  }

  function handleConfirmDialog(): void {
    setDialogIsConfirmed(true);
    setShowDialog(false);
  }

  modalDialog = (
    <ModalDialog
      showDialog={showDialog}
      dialogTitle={dialogTitle}
      dialogBody={dialogBody}
      dialogType={dialogType}
      handleCloseDialog={handleCloseDialog}
      handleConfirmDialog={handleConfirmDialog}
    />
  );
  dialogController = new DialogControl(
    setShowDialog,
    setDialogTitle,
    setDialogBody,
    setDialogType,
    setDialogIsConfirmed,
    dialogIsConfirmed
  );
  acceptableRoleNameHolder = new Array("ROLE_ADMIN");
  adminPageSecurity = new SecurityContext(
    isAuthenticated,
    loggedInUser,
    acceptableRoleNameHolder
  );
  acceptableRoleNameHolder = new Array("ROLE_TEACHER");
  teacherPageSecurity = new SecurityContext(
    isAuthenticated,
    loggedInUser,
    acceptableRoleNameHolder
  );
  acceptableRoleNameHolder = new Array("ROLE_STUDENT");
  studentPageSecurity = new SecurityContext(
    isAuthenticated
    , loggedInUser
    , acceptableRoleNameHolder
  );
  acceptableRoleNameHolder = new Array (
    "ROLE_ADMIN"
    , "ROLE_TEACHER"
    , "ROLE_STUDENT"
  );
  selectRolePageSecurity = new SecurityContext(
    isAuthenticated,
    loggedInUser,
    acceptableRoleNameHolder
  );

  async function logOut(): Promise<void> {
    try {
      await logOutAPI.logOut();
      history.push("/");
      setIsAuthenticated(false);
      setLoggedInUser(new LoggedInUser());
    } catch (apiError: unknown) {
      if (typeGuardian.isAxiosError(apiError)) {
        if (typeof apiError.code === "string") {
          setDialogTitle(`${apiError.code}: ${apiError.name}`);
        } else {
          setDialogTitle(apiError.name);
        }
        setDialogBody(apiError.message);
        setDialogType("error");
        setShowDialog(true);
      } else {
        throw new Error("This api error is not valid !");
      }
    }
  }

  return (
    <Switch>
      <Route exact path="/admin-console/editStudentInfo/:studentID">
        <EditStudentInfo />
      </Route>
      <Route exact={true} path="/">
        <HomePageHeader />
        <HomePage modalDialog={modalDialog} />
      </Route>
      <Route path = "/admin-console/manage-teacher-page">
        <PageHeader logOut = {logOut}/>
        <ManageTeacherPage />
      </Route>

      <ProtectedRoute
        path = "/admin-console/manage-student-page"
        securityContext = {adminPageSecurity}
        dialogController = {dialogController}
      >
        <PageHeader logOut = {logOut}/>
        <ManageStudentPage
          dialogController = {dialogController}
          modalDialog = {modalDialog}
        />
      </ProtectedRoute>

      {/* <Route exact path="/editStudentInfo/studentID">
        <EditStudentInfo />
      </Route> */}

      <Route path="/admin-console/view-student-detail">
        <ViewProfilePage />
      </Route>

      <ProtectedRoute
        path = "/admin-console/manage-teacher-page"
        securityContext = {adminPageSecurity}
        dialogController = {dialogController}
      >
        <PageHeader logOut = {logOut}/>
        <ManageTeacherPage/>
      </ProtectedRoute>

      <Route path="/sign-up-page">
        <SignUpPage
          dialogController={dialogController}
          modalDialog={modalDialog}
          typeGuardian={typeGuardian}
        />
      </Route>

      <Route path="/log-in-page">
        <LogInPage
          dialogController={dialogController}
          modalDialog={modalDialog}
          setIsAuthenticated={setIsAuthenticated}
          setLoggedInUser={setLoggedInUser}
          typeGuardian={typeGuardian}
        />
      </Route>

      <Route path="/contact-us">
        <Header />
        <ContactUs
          modalDialog = {modalDialog}
        />
      </Route>

      <ProtectedRoute
        path="/admin-console/managa-teacher-page"
        securityContext={adminPageSecurity}
        dialogController={dialogController}
      >
        <PageHeader logOut={logOut} />
        <DisableOrDeleteAccountPage
          dialogController={dialogController}
          modalDialog={modalDialog}
          typeGuardian={typeGuardian}
        />
      </ProtectedRoute>

      <Route exact path="/editTeacherInfo/:teacherID">
        <EditTeacherInfo />
      </Route>

      <Route path="/user_view">
        <ViewProfilePage />
      </Route>

      <Route path="/user_detail/:studentID">
        <DetailPage />
      </Route>

      <ProtectedRoute
        path="/admin-console/create-account-request-page"
        securityContext={adminPageSecurity}
        dialogController={dialogController}
      >
        <PageHeader logOut={logOut} />
        <CreateAccountPage
          dialogController={dialogController}
          modalDialog={modalDialog}
          typeGuardian={typeGuardian}
        />
      </ProtectedRoute>

      <ProtectedRoute
        path="/admin-console/disable-or-delete-account-page"
        securityContext={adminPageSecurity}
        dialogController={dialogController}
      >
        <PageHeader logOut={logOut} />
        <DisableOrDeleteAccountPage
          dialogController={dialogController}
          modalDialog={modalDialog}
          typeGuardian={typeGuardian}
        />
      </ProtectedRoute>

      <ProtectedRoute
        path={
          "/admin-console/manage-things-in-course-page" +
          "/courses/:courseID/students"
        }
        securityContext={adminPageSecurity}
        dialogController={dialogController}
      >
        <PageHeader logOut={logOut} />
        <ManageStudentInCoursePage
          dialogController={dialogController}
          modalDialog={modalDialog}
          typeGuardian={typeGuardian}
        />
      </ProtectedRoute>

      <ProtectedRoute
        path={
          "/admin-console/manage-things-in-course-page" +
          "/courses/:courseID/examinations"
        }
        securityContext={adminPageSecurity}
        dialogController={dialogController}
      >
        <PageHeader logOut={logOut} />
        <ManageExaminationInCoursePage
          dialogController={dialogController}
          modalDialog={modalDialog}
          typeGuardian={typeGuardian}
          typeConverter={typeConverter}
        />
      </ProtectedRoute>

      <ProtectedRoute
        path="/admin-console/manage-things-in-course-page"
        securityContext={adminPageSecurity}
        dialogController={dialogController}
      >
        <PageHeader logOut={logOut} />
        <ManageThingsInCoursePage
          dialogController={dialogController}
          modalDialog={modalDialog}
          typeGuardian={typeGuardian}
        />
      </ProtectedRoute>

      <ProtectedRoute
        path={
          "/admin-console/manage-things-in-examination-page" +
          "/examinations/:examID/exam-questions"
        }
        securityContext={adminPageSecurity}
        dialogController={dialogController}
      >
        <PageHeader logOut={logOut} />
        <ManageExamQuestionInExaminationPage
          dialogController={dialogController}
          modalDialog={modalDialog}
          typeGuardian={typeGuardian}
        />
      </ProtectedRoute>

      <ProtectedRoute
        path="/admin-console/manage-things-in-examination-page"
        securityContext={adminPageSecurity}
        dialogController={dialogController}
      >
        <PageHeader logOut={logOut} />
        <ManageThingsInExaminationPage
          dialogController={dialogController}
          modalDialog={modalDialog}
          typeGuardian={typeGuardian}
        />
      </ProtectedRoute>

      <ProtectedRoute
        path="/admin-console/manage-course-page"
        securityContext={adminPageSecurity}
        dialogController={dialogController}
      >
        <PageHeader logOut={logOut} />
        <ManageCoursePage
          dialogController={dialogController}
          modalDialog={modalDialog}
          typeGuardian={typeGuardian}
        />
      </ProtectedRoute>

      <ProtectedRoute
        path="/admin-console/class-page"
        securityContext={adminPageSecurity}
        dialogController={dialogController}
      >
        <PageHeader logOut={logOut} />
        <AdminClassPage />
      </ProtectedRoute>

      <ProtectedRoute
        path = "/admin-console/manage-lesson-page/:courseID"
        securityContext = {adminPageSecurity}
        dialogController = {dialogController}
      >
        <ManageLessonPage
          dialogController = {dialogController}
          modalDialog = {modalDialog}
        />
      </ProtectedRoute>

      <ProtectedRoute
        path="/admin-console"
        securityContext={adminPageSecurity}
        dialogController={dialogController}
      >
        <PageHeader logOut={logOut} />
        <AdminConsolePage modalDialog={modalDialog} />
      </ProtectedRoute>

      <ProtectedRoute
        path="/admin/spare-time-management"
        securityContext={adminPageSecurity}
        dialogController={dialogController}
      >
        <PageHeader logOut={logOut} />
        <AdminSpareTimePage
          modalDialog={modalDialog}
          dialogController={dialogController}
          typeGuardian={typeGuardian}
        />
      </ProtectedRoute>

      <ProtectedRoute
        path="/select-role-page"
        securityContext={selectRolePageSecurity}
        dialogController={dialogController}
      >
        <SelectRolePage
          dialogController={dialogController}
          modalDialog={modalDialog}
        />
      </ProtectedRoute>

      <ProtectedRoute
        path="/teacher-dashboard/manage-exam-question-page"
        securityContext={teacherPageSecurity}
        dialogController={dialogController}
      >
        <PageHeader logOut={logOut} />
        <ManageExamQuestionPage
          dialogController={dialogController}
          modalDialog={modalDialog}
          typeGuardian={typeGuardian}
        />
      </ProtectedRoute>

      <ProtectedRoute
        path="/teacher-dashboard"
        securityContext={teacherPageSecurity}
        dialogController={dialogController}
      >
        <PageHeader logOut={logOut} />
        <TeacherDashboardPage modalDialog={modalDialog} />
      </ProtectedRoute>

      <ProtectedRoute
        path="/teacher/class-page"
        securityContext={teacherPageSecurity}
        dialogController={dialogController}
      >
        <PageHeader logOut={logOut} />
        <TeacherClassPage />
      </ProtectedRoute>

      <ProtectedRoute
        path="/teacher/spare-time-management"
        securityContext={teacherPageSecurity}
        dialogController={dialogController}
      >
        <PageHeader logOut={logOut} />
        <TeacherSpareTimePage
          modalDialog={modalDialog}
          dialogController={dialogController}
          typeGuardian={typeGuardian}
        />
      </ProtectedRoute>

      <ProtectedRoute
        path = "/student-dashboard/show-all-exam-page"
        securityContext = {studentPageSecurity}
        dialogController = {dialogController}
      >
        <PageHeader logOut = {logOut} />
        <ShowAllExamPage
          dialogController = {dialogController}
          modalDialog = {modalDialog}
          typeGuardian = {typeGuardian}
        />
      </ProtectedRoute>

      <ProtectedRoute
        path="/student-dashboard"
        securityContext = {studentPageSecurity}
        dialogController = {dialogController}
      >
        <PageHeader logOut={logOut} />
        <StudentDashboardPage modalDialog={modalDialog} />
      </ProtectedRoute>

      <ProtectedRoute
        path="/student-dashboards/:courseID"
        securityContext = {studentPageSecurity}
        dialogController = {dialogController}
      >
        <PageHeader logOut={logOut} />
        <LessonListPage modalDialog={modalDialog} />
      </ProtectedRoute>

      <ProtectedRoute
        path="/student-dashboardz/:courseName/:lessonID"
        securityContext = {studentPageSecurity}
        dialogController = {dialogController}
      >
        <PageHeader logOut={logOut} />
        <LessonDetailPage modalDialog={modalDialog} />
      </ProtectedRoute>

      <ProtectedRoute
        path="/student-dashboardx/profile/:userID"
        securityContext = {studentPageSecurity}
        dialogController = {dialogController}
      >
        <PageHeader logOut={logOut} />
        <ProfilePage modalDialog={modalDialog}/>
      </ProtectedRoute>

      {/* <Route path="/student">
        <PageHeader logOut={logOut} />
        <InfoPage modalDialog={modalDialog} />
      </Route> */}
      <Route path="/student-class-page">
        <PageHeader logOut={logOut} />
        <StudentClassPage />
      </Route>

      <ProtectedRoute
        path="/course-detail/:courseID"
        securityContext = {studentPageSecurity}
        dialogController = {dialogController}
      >
        <PageHeader logOut={logOut} />
        <CourseDetailPage modalDialog={modalDialog}/>
      </ProtectedRoute>

      <ProtectedRoute
        path = "/take-exam-page"
        securityContext = {studentPageSecurity}
        dialogController = {dialogController}
      >
        <TakeExamPage
          dialogController = {dialogController}
          modalDialog = {modalDialog}
          typeGuardian = {typeGuardian}
        />
      </ProtectedRoute>

      <ProtectedRoute
        path = "/show-exam-score-page"
        securityContext = {studentPageSecurity}
        dialogController = {dialogController}
      >
        <ShowExamScorePage
          dialogController = {dialogController}
          modalDialog = {modalDialog}
          typeGuardian = {typeGuardian}
        />
      </ProtectedRoute>
    </Switch>
  );
}
