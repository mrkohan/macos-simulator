import React, { useState } from 'react';
import Desktop from './components/Desktop';
import LoginPage from './components/LoginPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
    {isLoggedIn ? <Desktop /> : <LoginPage onLogin={handleLogin} />}
  </div>
  );
}

export default App;
