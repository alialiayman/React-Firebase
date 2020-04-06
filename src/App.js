import React, { useState } from 'react';
import './App.css';
// import SignUp from './containers/auth/SignUp';
import SignIn from './containers/auth/SignIn';
import CustomerForm from './containers/CustomerForm';

function App() {
  const [appState, setAppState] = useState({});
  
  const handleSignIn = (idToken)=> {
    setAppState(s=> s = {...appState, idToken});
  }
  return (
    <div className="App">
      {
        appState.idToken ? <CustomerForm  appState={appState}/> : <SignIn onSignIn={handleSignIn} />
      }
    </div>
  );
}

export default App;
