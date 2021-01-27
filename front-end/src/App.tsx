import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
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
      <Route path="/">
        <SignUpPage />
      </Route>
    </Switch>
  );
}


