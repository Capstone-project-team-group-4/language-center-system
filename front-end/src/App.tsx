import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { AdminPageHeader } from './common/component/AdminPageHeader';
import { PageHeader } from './common/component/PageHeader';
import { AdminConsolePage } from './page/admin/AdminConsolePage';
import { HomePage } from './page/HomePage';

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
      <Route exact = {true} path="/">
        <PageHeader />
        <HomePage />
      </Route>
      <Route path="/log-in">
        <AdminPageHeader />
        <AdminConsolePage />
      </Route>
    </Switch>
  );
}


