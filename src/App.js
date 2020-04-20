import React, { useState } from 'react';
import './App.css';
// import SignUp from './features/auth/SignUp';
import SignIn from './features/auth/SignIn';
import RecordsManager from './features/RecordsManager';

function App() {
  const [appState, setAppState] = useState({ User: {} });
  const [mode, setMode] = useState(0);

  const handleOnSignedIn = (fbUser) => {
    if (fbUser) {
      setAppState(s => s = { ...appState, User: fbUser });
      setMode(1);
    }
  }

  const customerDefinition = {
    name: 'customer',
    fields: [
      {name: 'id', type: 'text', isKey: true, isSummary: false, summaryOrder: 0, editOrder: 0, defaultValue: ''},
      {name: 'name', type: 'text', isKey: false, isSummary: true, summaryOrder: 0, editOrder: 0, defaultValue: ''},
      {name: 'address', type: 'text', isKey: false, isSummary: true, summaryOrder: 1, editOrder: 1, defaultValue: ''},
    ]
  }

  return (
    <div className="App">
      {
        (mode === 0) ? <SignIn onSignedIn={handleOnSignedIn} /> : <RecordsManager fbUser={appState.User} definition={customerDefinition}/>
      }
    </div>
  );
}

export default App;
