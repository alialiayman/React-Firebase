import React, { useState } from 'react';
// import SignUp from './features/auth/SignUp';
import SignIn from './features/auth/SignIn';
import CustomersManager from './features/Customers/CustomersManager';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppHeader from './features/AppHeader/AppHeader';
import ContactsManager from './features/Contacts/ContactsManager';

function App() {
  const [appState, setAppState] = useState({ User: {} });
  const handleOnSignedIn = (fbUser) => {
    if (fbUser) {
      setAppState(s => s = { ...appState, User: fbUser });
    }
  }


  return (
    <Router>
      <AppHeader fbUser={appState.User}></AppHeader>
      <Route exact path="/" component={null}></Route>
      <Route exact path="/signin" component={() => <SignIn onSignedIn={handleOnSignedIn} />}></Route>
      <Route exact path="/customers" component={() => <CustomersManager fbUser={appState.User} />}></Route>
      <Route exact path="/contacts" component={() => <ContactsManager fbUser={appState.User} />}></Route>
    </Router>
  );
}

export default App;
