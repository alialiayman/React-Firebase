import React from 'react';
// import SignUp from './features/auth/SignUp';
import SignIn from './features/auth/SignIn';
import { BrowserRouter as Router } from 'react-router-dom';
import AppHeader from './features/AppHeader/AppHeader';
import AppHome from './features/AppHome/AppHome';
import Admin from './features/Admin/Admin'
import Profile from './features/Profile/Profile'
import PublicRoute from './features/auth/PublicRoute';
import PrivateRoute from './features/auth/PrivateRoute';
import TableManager from './features/TableManager/TableManager';
import DataManager from './features/DataManager/DataManager';

function App() {

  return (
    <Router>
      <AppHeader></AppHeader>
      <PublicRoute exact path="/" component={AppHome}></PublicRoute>
      <PublicRoute restricted={true} exact path="/signin" component={SignIn}></PublicRoute>
      <PrivateRoute exact path="/admin" component={Admin}></PrivateRoute>
      <PrivateRoute exact path="/profile" component={Profile}></PrivateRoute>
      <PrivateRoute exact path="/table" component={TableManager}></PrivateRoute>
      <PrivateRoute exact path="/table/:tableName" component={DataManager}></PrivateRoute>
    </Router>
  );
}

export default App;
