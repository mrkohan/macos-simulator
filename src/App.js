import React, { useState } from 'react';
import Desktop from './components/Desktop';
import LoginPage from './components/LoginPage';
import SplashScreen from './components/SplashScreen';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  // Handle completion of splash screen
  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  // Handle login after user successfully logs in
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      {/* Display Splash Screen, then login, then desktop */}
      {showSplash ? (
        <SplashScreen onComplete={handleSplashComplete} />
      ) : isLoggedIn ? (
        <Desktop />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
