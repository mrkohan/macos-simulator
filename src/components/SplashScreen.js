// SplashScreen.js
import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { FaApple } from 'react-icons/fa';

// Styles for the splash screen and progress bar
const SplashContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  z-index: 9999;
  flex-direction: column;

  ${(props) =>
    props.fadeOut &&
    css`
      animation: ${fadeOut} 0.5s forwards;
    `}
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const SplashIcon = styled.div`
  font-size: 100px;
  color: white;
`;

const ProgressContainer = styled.div`
  margin-top: 20px;
  width: 150px;
  height: 4px;
  background-color: #555;
  border-radius: 50px;
  overflow: hidden;
`;

const ProgressBar = styled.div`
  width: ${(props) => props.progress}%;
  height: 100%;
  background-color: white;
  transition: width 0.5s;
`;

function SplashScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [fadeOutSplash, setFadeOutSplash] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setFadeOutSplash(true);
          setTimeout(onComplete, 500); // Call onComplete after fading out
        }
        return prev + 10;
      });
    }, 300); // Progress updates every 300ms

    return () => clearInterval(interval); // Clear the interval on component unmount
  }, [onComplete]);

  return (
    <SplashContainer fadeOut={fadeOutSplash}>
      <SplashIcon>
        <FaApple size={128} />
      </SplashIcon>
      <ProgressContainer>
        <ProgressBar progress={progress} />
      </ProgressContainer>
    </SplashContainer>
  );
}

export default SplashScreen;
