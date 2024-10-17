import React, { useState, useEffect, useRef } from 'react';
import styled, { createGlobalStyle, keyframes, css } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: Arial;
  }
`;

const shakeAnimation = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-image: url('/back2.png');
  background-size: cover;
  background-position: center;
  position: relative;
  color: white;
`;

const TimeSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: calc(10% - 80px);
`;

const TimeDisplay = styled.div`
  font-size: 80px;
  font-weight: bold;
`;

const DateDisplay = styled.div`
  font-size: 24px;
  margin-top: 10px;
`;

const UserProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: calc(10% - 80px);
  text-align: center;
`;

const UserImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;

const UserName = styled.div`
  margin-top: 10px;
  font-size: 17px;
  font-weight: bold;
  font-family: Arial;
`;

const LoginInput = styled.input`
  margin-top: 10px;
  padding: 7px;
  border: none;
  border-radius: 15px;
  width: 250px;
  text-align: center;
  font-size: 11px;
  outline: none;
  opacity: 0.5;
  ${(props) =>
    props.shake &&
    css`
      animation: ${shakeAnimation} 0.5s;
    `}
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 10px;
`;

function LoginPage({ onLogin }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [password, setPassword] = useState('');
  const [shake, setShake] = useState(false);
  const [attempts, setAttempts] = useState(0); // Track incorrect attempts
  const [isLocked, setIsLocked] = useState(false); // Lock state
  const [lockTime, setLockTime] = useState(30); // Countdown time for lockout
  const countdownRef = useRef(null); // Reference to store the countdown interval

  const inputRef = useRef(null); // Ref for the input field

  // Set focus to the input when the component mounts
  useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle lock countdown and stop when time reaches 0
  useEffect(() => {
    if (isLocked) {
      countdownRef.current = setInterval(() => {
        setLockTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(countdownRef.current); // Clear interval when countdown finishes
            setIsLocked(false); // Unlock the input after countdown ends
            setLockTime(30); // Reset the countdown time for next time
            return 30; // Reset the countdown timer
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(countdownRef.current, ); // Cleanup on unmount or when unlocking
    }
  }, [isLocked]);

  const handleLogin = () => {
    if (isLocked) return; // Prevent input if locked

    if (password === '1234') {
      onLogin(); // Trigger login success
    } else {
      setShake(true); // Trigger the shake animation
      setAttempts((prevAttempts) => prevAttempts + 1); // Increment attempts

      if (attempts >= 2) {
        setIsLocked(true); // Lock after 3 attempts
      }

      setTimeout(() => setShake(false), 500); // Reset shake after animation
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <GlobalStyle />
      <LoginContainer>
        <TimeSection>
          <TimeDisplay>{formattedTime}</TimeDisplay>
          <DateDisplay>{formattedDate}</DateDisplay>
        </TimeSection>

        <UserProfile>
          <UserImage src="/avatar.jpg" alt="User" />
          <UserName>Reza</UserName>
          <LoginInput
            type="password"
            placeholder={
              isLocked
                ? `Locked for ${lockTime} seconds...`
                : 'Touch ID or enter Password'
            }
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyUp={handleKeyPress} // Trigger login on Enter key press
            shake={shake} // Pass the shake state to the input for the animation
            disabled={isLocked} // Disable input if locked
            ref={inputRef} // Assign the input ref
          />
          {isLocked && (
            <ErrorMessage>Too many attempts. Locked for {lockTime} seconds.</ErrorMessage>
          )}
        </UserProfile>
      </LoginContainer>
    </>
  );
}

export default LoginPage;
