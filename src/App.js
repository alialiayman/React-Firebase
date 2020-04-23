import React, { useState } from 'react';
// import SignUp from './features/auth/SignUp';
import SignIn from './features/auth/SignIn';
import CustomersManager from './features/Customers/CustomersManager';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppHeader from './features/AppHeader/AppHeader';
import ContactsManager from './features/Contacts/ContactsManager';
import AppHome  from './features/AppHome/AppHome';
import YachtsManager from './features/YachtsManager/YactsManager';
import Admin from './features/Admin/Admin'

function App() {
  const [appState, setAppState] = useState({ User: {} });
  const handleOnSignedIn = (fbUser) => {
    if (fbUser) {
      setAppState(s => s = { ...appState, User: fbUser });
    }
  }
  const handleOnSignedout = (fbUser) => {
      setAppState({ User: {} });
  }

  const handleOnEnableImport = ()=> {
    const newState = {...appState};
    newState.User.enableImport = true;
    setAppState(newState);
  }

  return (
    <Router>
      <AppHeader fbUser={appState.User} onSignout={handleOnSignedout}></AppHeader>
      <Route exact path="/" component={() => <AppHome fbUser={appState.User} />}></Route>
      <Route exact path="/signin" component={() => <SignIn onSignedIn={handleOnSignedIn} />}></Route>
      <Route exact path="/customers" component={() => <CustomersManager fbUser={appState.User} />}></Route>
      <Route exact path="/yachts" component={() => <YachtsManager fbUser={appState.User} />}></Route>
      <Route exact path="/contacts" component={() => <ContactsManager fbUser={appState.User} />}></Route>
      <Route exact path="/admin" component={() => <Admin fbUser={appState.User} onEnableImport={handleOnEnableImport} />}></Route>
    </Router>
  );
}

export default App;
