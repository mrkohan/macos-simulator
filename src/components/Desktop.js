import React, { useState,useEffect } from 'react';
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
      cursor: url(/cursor.svg), auto;

  }
`;

const DesktopContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url('/back3.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
`;
// Styled components for the context menu
const ContextMenu = styled.div`
  position: absolute;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding: 10px;
  z-index: 1000;
  display: ${(props) => (props.visible ? 'block' : 'none')};
`;

const MenuItem = styled.div`
  padding: 5px 20px;
  font-size: 13px;
  border-radius: 4px;

  &:hover {
    background-color: #e6e6e6;
  }

  &.divider {
    border-top: 1px solid #d1d1d1;
    margin: 8px 0;
  }
     &:hover {
    background-color: #fff;
  }
`;

function Desktop() {
  const [windows, setWindows] = useState([]);
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });

  const openWindow = (appName) => {
    if (!windows.find((win) => win.appName === appName)) {
      setWindows([...windows, { appName }]);
    }
  };

  const closeWindow = (appName) => {
    setWindows(windows.filter((win) => win.appName !== appName));
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    setContextMenuPosition({ x: e.pageX, y: e.pageY });
    setContextMenuVisible(true);
  };

  const handleClickOutside = () => {
    setContextMenuVisible(false);
  };

  useEffect(() => {
    window.addEventListener('contextmenu', handleRightClick);
    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('contextmenu', handleRightClick);
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

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

      <ContextMenu
        visible={contextMenuVisible}
        style={{ top: `${contextMenuPosition.y}px`, left: `${contextMenuPosition.x}px` }}
      >
        <MenuItem>New Folder</MenuItem>
        <MenuItem>Get Info</MenuItem>
        <MenuItem>Change Wallpaper...</MenuItem>
        <MenuItem className="divider"></MenuItem>
        <MenuItem>Use Stacks</MenuItem>
        <MenuItem>Group Stacks By</MenuItem>
        <MenuItem>Show View Options</MenuItem>
        <MenuItem className="divider"></MenuItem>
        <MenuItem>Import from iPhone or iPad</MenuItem>
      </ContextMenu>

    </DesktopContainer>
    </>
  );
}

export default Desktop;
