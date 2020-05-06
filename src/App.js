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
import SchemaManager from './features/SchemaManager/SchemaManager';
import RecordsManager from './features/RecordsManager/RecordsManager';

function App() {

  return (
    <Router>
      <AppHeader></AppHeader>
      <PublicRoute exact path="/" component={AppHome}></PublicRoute>
      <PublicRoute restricted={true} exact path="/signin" component={SignIn}></PublicRoute>
      <PrivateRoute exact path="/admin" component={Admin}></PrivateRoute>
      <PrivateRoute exact path="/profile" component={Profile}></PrivateRoute>
      <PrivateRoute exact path="/schema" component={SchemaManager}></PrivateRoute>
      <PrivateRoute exact path="/book/:bookName" component={RecordsManager}></PrivateRoute>
    </Router>
  );
}

export default App;
