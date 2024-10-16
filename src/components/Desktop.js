import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import DesktopIcon from './DesktopIcon';
import Window from './Window';
import Dock from './Dock';
import Finder from '../apps/Finder';
import Notes from '../apps/Notes';
import Safari from '../apps/Safari';
import Terminal from '../apps/Terminal';
import VSCode from '../apps/VSCode';
// import Widgets from './Widgets';
import MenuBar from './MenuBar';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family:Arial;
  }
`;

const DesktopContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url('/back.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
`;

function Desktop() {
  const [windows, setWindows] = useState([]);

  const openWindow = (appName) => {
    if (!windows.find((win) => win.appName === appName)) {
      setWindows([...windows, { appName }]);
    }
  };

  const closeWindow = (appName) => {
    setWindows(windows.filter((win) => win.appName !== appName));
  };


  return (
    <>
    <GlobalStyle />
    <DesktopContainer>
      <MenuBar />
      {/* Desktop Icons */}
      <DesktopIcon
        appName="Finder"
        openWindow={openWindow}
        position={{ top: '20px', left: '20px' }}
      />
      <DesktopIcon
        appName="Notes"
        openWindow={openWindow}
        position={{ top: '100px', left: '20px' }}
      />
        <DesktopIcon
        appName="Safari"
        openWindow={openWindow}
        position={{ top: '180px', left: '20px' }}
      />

        <DesktopIcon
        appName="Terminal"
        openWindow={openWindow}
        position={{ top: '260px', left: '20px' }}
      />
      <DesktopIcon
        appName="VSCode"
        openWindow={openWindow}
        position={{ top: '340px', left: '20px' }}
      />

      {/* Windows */}
      {windows.map((win, index) => (
        <Window
        key={win.id}
          appName={win.appName}
          closeWindow={closeWindow}
          content={
            win.appName === 'Finder' ? (
              <Finder />
            ) : win.appName === 'Notes' ? (
              <Notes />
            ) : win.appName === 'Safari' ? (
              <Safari />
            ) : win.appName === 'Terminal' ? (
              <Terminal />
            ) : win.appName === 'VSCode' ? (
              <VSCode />
            ) : null
          }
        />
      ))}

      {/* Dock */}
            {/* <Widgets /> */}

      <Dock openWindow={openWindow} />
    </DesktopContainer>
    </>
  );
}

export default Desktop;
