import React, { useState } from 'react';
import './App.css';
// import SignUp from './containers/auth/SignUp';
import SignIn from './containers/auth/SignIn';
import CustomerForm from './containers/CustomerForm';

function App() {
  const [appState, setAppState] = useState({});
  
  const handleSignIn = (fbUser)=> {
    setAppState(s=> s = {...appState, User: fbUser});
  }
  return (
    <div className="App">
      {
        (appState.User) && (appState.User.idToken )? <CustomerForm  fbUser={appState.User}/> : <SignIn onSignIn={handleSignIn} />
      }
    </div>
  );
}

export default App;
