import React, { useState } from 'react';
import './App.css';
// import SignUp from './features/auth/SignUp';
import SignIn from './features/auth/SignIn';
import CustomerForm from './features/CustomerForm';

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
