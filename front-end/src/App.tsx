/* eslint-disable @typescript-eslint/no-array-constructor */
// Import package members section:
import React, { ReactElement, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import { AdminPageHeader } from './common/component/AdminPageHeader';
import { 
  ModalDialog
  , DialogControl 
} from './common/component/ModalDialog';
import { PageHeader } from './common/component/PageHeader';
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
import { SelectRolePage } from './page/SelectRolePage';
import { SignUpPage } from './page/SignUpPage';
import { History } from '../node_modules/@types/history';

export function App (): ReactElement {
  
  // Variables declaration:
  let [showDialog, setShowDialog] = useState<boolean> (false);
  let [dialogTitle, setDialogTitle] = useState<string> ("");
  let [dialogBody, setDialogBody] = useState<string> ("");
  let [dialogType, setDialogType] = useState<string> ("");
  let modalDialog: ReactElement | undefined;
  let [isAuthenticated, setIsAuthenticated] = useState<boolean> (false);
  let [loggedInUser, setLoggedInUser] = useState<LoggedInUser> (
    new LoggedInUser ()
  );
  let dialogController: DialogControl | undefined;
  let acceptableRoleNameHolder: string[] | undefined;
  let createAccountPageSecurity: SecurityContext | undefined;
  let selectRolePageSecurity: SecurityContext | undefined;  
  let logOutAPI: LogOutAPI;
  let typeGuardian: TypeGuard;
  let history: History<unknown>;

  logOutAPI = new LogOutAPI ();
  typeGuardian = new TypeGuard ();
  history = useHistory ();

  function handleCloseDialog (): void {
    setShowDialog (false);
  }

  modalDialog =    
    <ModalDialog 
      showDialog = {showDialog}
      dialogTitle = {dialogTitle}
      dialogBody = {dialogBody}
      dialogType = {dialogType}
      handleCloseDialog = {handleCloseDialog}
    />;       
  dialogController = new DialogControl (
    setShowDialog
    , setDialogTitle
    , setDialogBody
    , setDialogType
  );
  acceptableRoleNameHolder = new Array ("ROLE_ADMIN");
  createAccountPageSecurity = new SecurityContext (
    isAuthenticated
    , loggedInUser
    , acceptableRoleNameHolder
  );
  acceptableRoleNameHolder = new Array (
    "ROLE_ADMIN"
    , "ROLE_TEACHER"
    , "ROLE_STUDENT"
  );
  selectRolePageSecurity = new SecurityContext (
      isAuthenticated
      , loggedInUser
      , acceptableRoleNameHolder
  ); 
  
  async function logOut (): Promise<void> {
    try {
      await logOutAPI.logOut ();
      history.push ("/");
      setIsAuthenticated (false);
      setLoggedInUser (new LoggedInUser ());
    }
    catch (apiError: unknown){
      if (typeGuardian.isAxiosError (apiError)){
        if (typeof apiError.code === "string"){
          setDialogTitle (
            `${apiError.code}: ${apiError.name}`
          );
        }
        else {
          setDialogTitle (apiError.name);
        }
        setDialogBody (apiError.message);
        setDialogType ("error");
        setShowDialog (true);
      }
      else {
        throw new Error ("This api error is not valid !");
      }
    }
  }

  return (
    <Switch>
        <Route exact path="/editStudentInfo/:studentID">
          <EditStudentInfo />
        </Route>
      <Route exact = {true} path="/">
        <PageHeader />
        <HomePage modalDialog = {modalDialog}/>
      </Route>

      <Route path = "/sign-up-page">
        <SignUpPage 
          dialogController = {dialogController}
          modalDialog = {modalDialog} 
        />
      </Route>

      <Route path = "/log-in-page">
        <LogInPage 
          dialogController = {dialogController}
          modalDialog = {modalDialog}
          setIsAuthenticated = {setIsAuthenticated}
          setLoggedInUser = {setLoggedInUser}
        />
      </Route>

      <ProtectedRoute 
        path = "/admin-console/create-account-request-page"
        securityContext = {createAccountPageSecurity}
        dialogController = {dialogController} 
      >
        <AdminPageHeader logOut = {logOut}/>
        <CreateAccountPage 
          dialogController = {dialogController}
          modalDialog = {modalDialog} 
        />
      </ProtectedRoute>
      
      <Route path = "/admin-console">
        <AdminPageHeader logOut = {logOut}/>
        <AdminConsolePage modalDialog = {modalDialog}/>
      </Route>

      <ProtectedRoute 
        path = "/select-role-page"
        securityContext = {selectRolePageSecurity}
        dialogController = {dialogController} 
      >
        <SelectRolePage 
          dialogController = {dialogController}
          modalDialog = {modalDialog} 
        />
      </ProtectedRoute>
    </Switch>
  );
}

