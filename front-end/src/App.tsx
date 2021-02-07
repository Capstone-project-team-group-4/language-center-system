// Import package members section:
import React, { ReactElement, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { AdminPageHeader } from './common/component/AdminPageHeader';
import { ModalDialog } from './common/component/ModalDialog';
import { PageHeader } from './common/component/PageHeader';
import { AdminConsolePage } from './page/admin/AdminConsolePage';
import { CreateAccountPage } from './page/admin/CreateAccountPage';
import { HomePage } from './page/HomePage';
import { SignUpPage } from './page/SignupPage';
import { EditStudentInfo } from './page/EditStudentInfo';

export function App (): ReactElement {
  
  // Variables declaration:
  let [showDialog, setShowDialog] = useState<boolean> (false);
  let [dialogTitle, setDialogTitle] = useState<string> ("");
  let [dialogBody, setDialogBody] = useState<string> ("");
  let [dialogType, setDialogType] = useState<string> ("");
  let modalDialog: ReactElement | undefined;

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
        
  /*
   * function deleteUser (event: MouseEvent<HTMLButtonElement>){
   *   event.preventDefault ();
   *   userAPI = new UserAPI ();
   *   userID = user.userID;
   *   userAPI.deleteUser (userID);
   * }
   */

  return (
    <Switch>
        <Route exact path="/editStudentInfo/:studentID">
          <EditStudentInfo />
        </Route>
      <Route exact = {true} path="/">
        <PageHeader />
        <HomePage />
      </Route>
      <Route path = "/sign-up">
        <SignUpPage 
          setShowDialog = {setShowDialog}
          setDialogTitle = {setDialogTitle}
          setDialogBody = {setDialogBody}
          setDialogType = {setDialogType}
          handleCloseDialog = {handleCloseDialog}
          modalDialog = {modalDialog} 
        />
      </Route>
      <Route path = "/admin-console">
        <AdminPageHeader />
        <AdminConsolePage />
      </Route>
      <Route path = "/create-account-requests">
        <AdminPageHeader />
        <CreateAccountPage 
          setShowDialog = {setShowDialog}
          setDialogTitle = {setDialogTitle}
          setDialogBody = {setDialogBody}
          setDialogType = {setDialogType}
          handleCloseDialog = {handleCloseDialog}
          modalDialog = {modalDialog} 
        />
      </Route>
    </Switch>
  );
}

