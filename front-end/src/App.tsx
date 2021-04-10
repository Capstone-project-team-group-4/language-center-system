/* eslint-disable @typescript-eslint/no-array-constructor */
// Import package members section:
import React, { ReactElement, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import { PageHeader } from './common/component/PageHeader';
import {
  ModalDialog
  , DialogControl
} from './common/component/ModalDialog';
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
import { HomePage } from './page/HomePage';
import { EditStudentInfo } from './page/EditStudentInfo';
import { LogInPage } from './page/LogInPage';
import { SelectRolePage } from './page/select_role_page/SelectRolePage';
import { SignUpPage } from './page/SignUpPage';
import { History } from '../node_modules/@types/history';
import {
  DisableOrDeleteAccountPage
} from './page/admin/DisableOrDeleteAccountPage';
import { ManageCoursePage } from './page/admin/ManageCoursePage';
import {
  ManageStudentInCoursePage
} from './page/admin/ManageStudentInCoursePage';
import { TeacherDashboardPage } from './page/teacher/TeacherDashboardPage';
import { StudentDashboardPage } from './page/student/StudentDashboardPage';
import { EditTeacherInfo } from './page/EditTeacherInfo';
import { ViewProfilePage } from './page/ViewProfilePage';
import { ManageTeacherPage } from './page/admin/ManageTeacherPage';
import { DetailPage } from './page/DetailPage';
import { CourseDetailPage } from './page/student/CourseDetailPage';
import { LessonDetailPage } from './page/student/LessonDetailPage';
import { ManageExamQuestionPage } from './page/teacher/ManageExamQuestionPage';
import { ManageStudentPage } from './page/admin/ManageStudentPage';
import { InfoPage } from './page/student/InfoPage';

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
  let [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  let [loggedInUser, setLoggedInUser] = useState<LoggedInUser>(
    new LoggedInUser()
  );
  let dialogController: DialogControl | undefined;
  let acceptableRoleNameHolder: string[] | undefined;
  let adminPageSecurity: SecurityContext | undefined;
  let selectRolePageSecurity: SecurityContext | undefined;
  let teacherPageSecurity: SecurityContext | undefined;
  let logOutAPI: LogOutAPI;
  let typeGuardian: TypeGuard;
  let history: History<unknown>;
  let [dialogIsConfirmed, setDialogIsConfirmed] = useState<boolean>(false);

  logOutAPI = new LogOutAPI();
  typeGuardian = new TypeGuard();
  history = useHistory();

  function handleCloseDialog(): void {
    setShowDialog(false);
  }

  function handleConfirmDialog(): void {
    setDialogIsConfirmed(true);
    setShowDialog(false);
  }

  modalDialog =
    <ModalDialog
      showDialog={showDialog}
      dialogTitle={dialogTitle}
      dialogBody={dialogBody}
      dialogType={dialogType}
      handleCloseDialog={handleCloseDialog}
      handleConfirmDialog={handleConfirmDialog}
    />;
  dialogController = new DialogControl(
    setShowDialog
    , setDialogTitle
    , setDialogBody
    , setDialogType
    , setDialogIsConfirmed
    , dialogIsConfirmed
  );
  acceptableRoleNameHolder = new Array("ROLE_ADMIN");
  adminPageSecurity = new SecurityContext(
    isAuthenticated
    , loggedInUser
    , acceptableRoleNameHolder
  );
  acceptableRoleNameHolder = new Array("ROLE_TEACHER");
  teacherPageSecurity = new SecurityContext(
    isAuthenticated
    , loggedInUser
    , acceptableRoleNameHolder
  );
  acceptableRoleNameHolder = new Array(
    "ROLE_ADMIN"
    , "ROLE_TEACHER"
    , "ROLE_STUDENT"
  );
  selectRolePageSecurity = new SecurityContext(
    isAuthenticated
    , loggedInUser
    , acceptableRoleNameHolder
  );

  async function logOut(): Promise<void> {
    try {
      await logOutAPI.logOut();
      history.push("/");
      setIsAuthenticated(false);
      setLoggedInUser(new LoggedInUser());
    }
    catch (apiError: unknown) {
      if (typeGuardian.isAxiosError(apiError)) {
        if (typeof apiError.code === "string") {
          setDialogTitle(
            `${apiError.code}: ${apiError.name}`
          );
        }
        else {
          setDialogTitle(apiError.name);
        }
        setDialogBody(apiError.message);
        setDialogType("error");
        setShowDialog(true);
      }
      else {
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

      <Route path="/sign-up-page">
        <SignUpPage
          dialogController={dialogController}
          modalDialog={modalDialog}
        />
      </Route>

      <Route path="/log-in-page">
        <LogInPage
          dialogController={dialogController}
          modalDialog={modalDialog}
          setIsAuthenticated={setIsAuthenticated}
          setLoggedInUser={setLoggedInUser}
        />
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
        />
      </ProtectedRoute>

      <ProtectedRoute
        path="/admin-console/managa-teacher-page"
        securityContext={adminPageSecurity}
        dialogController={dialogController}
      >
        <PageHeader logOut={logOut} />
        <DisableOrDeleteAccountPage
          dialogController={dialogController}
          modalDialog={modalDialog}
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

      <Route path="/admin-console/manage-student-page">
        <ManageStudentPage />
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
        />
      </ProtectedRoute>

      <ProtectedRoute
        path={
          "/admin-console/manage-course-page"
          + "/courses/:courseID/students"
        }
        securityContext={adminPageSecurity}
        dialogController={dialogController}
      >
        <PageHeader logOut={logOut} />
        <ManageStudentInCoursePage
          dialogController={dialogController}
          modalDialog={modalDialog}
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
        />
      </ProtectedRoute>

      <Route path="/teacher-dashboard">
        <PageHeader logOut={logOut} />
        <TeacherDashboardPage modalDialog={modalDialog} />
      </Route>

      <Route path="/student-dashboard">
        <PageHeader logOut={logOut} />
        <StudentDashboardPage modalDialog={modalDialog} />
      </Route>
      <Route path="/student-dashboard-course/:courseID">
        <PageHeader logOut={logOut} />
        <CourseDetailPage modalDialog={modalDialog} />
      </Route>
      <Route path="/student-dashboard-lesson/:lessonID">
        <PageHeader logOut={logOut} />
        <LessonDetailPage modalDialog={modalDialog} />
      </Route>
      <Route path="/student">
        <PageHeader logOut={logOut} />
        <InfoPage modalDialog={modalDialog}/>
      </Route>

    </Switch>
  );
}

