import React, { ReactElement } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import { EditStudentInfo } from './page/EditStudentInfo';
import { SignUpPage } from './page/SignUpPage';

export function App (): ReactElement {


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
        <Route exact path="/">
          <SignUpPage />

        </Route>
        <Route exact path="/editStudentInfo/:studentID">
          <EditStudentInfo />
        </Route>
    </Switch>
  );
}


