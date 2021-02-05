import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { ManageStudentPage } from './page/ManageStudentPage';

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
      <Route path="/">
        <ManageStudentPage />
      </Route>
    </Switch>
  );
}


