import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import styled, { createGlobalStyle } from 'styled-components';
import DesktopIcon from './DesktopIcon';
import Window from './Window';
import Dock from './Dock';
import Finder from '../apps/Finder';
import Notes from '../apps/Notes';
import Safari from '../apps/Safari';
import Terminal from '../apps/Terminal';
import VSCode from '../apps/VSCode';
import Calendar from '../apps/Calendar';
import Maps from '../apps/Maps';
import Messages from '../apps/Messages';
import Contacts from '../apps/Contacts';
import FaceTime from '../apps/FaceTime';
import Spotify from '../apps/Spotify';
import Bin from '../apps/Bin';
import Chrome from '../apps/Chrome';
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
  position: fixed;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding: 10px;
  z-index: 5000;
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

function getAppContent(appName) {
  switch (appName) {
    case 'Finder':
      return <Finder />;
    case 'Notes':
      return <Notes />;
    case 'Safari':
      return <Safari />;
    case 'Terminal':
      return <Terminal />;
    case 'VSCode':
      return <VSCode />;
    case 'Calendar':
      return <Calendar />;
    case 'Maps':
      return <Maps />;
    case 'Messages':
      return <Messages />;
    case 'Contacts':
      return <Contacts />;
    case 'FaceTime':
      return <FaceTime />;
    case 'Spotify':
      return <Spotify />;
    case 'Bin':
      return <Bin />;
    case 'Chrome':
      return <Chrome />;
    default:
      return null;
  }
}

const BASE_WINDOW_Z = 1000;

function Desktop({ onLogOut }) {
  const [windows, setWindows] = useState([]);
  const [focusedApp, setFocusedApp] = useState(null);
  const [zOrder, setZOrder] = useState({});
  const [zoomSignal, setZoomSignal] = useState(0);
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });

  const bringToFront = useCallback((appName) => {
    setFocusedApp(appName);
    setZOrder((prev) => {
      const maxZ = Math.max(BASE_WINDOW_Z, ...Object.values(prev), 0);
      return { ...prev, [appName]: maxZ + 1 };
    });
  }, []);

  const openWindow = (appName) => {
    const existing = windows.find((win) => win.appName === appName);
    if (existing) {
      setWindows((prev) =>
        prev.map((win) =>
          win.appName === appName ? { ...win, minimized: false } : win
        )
      );
    } else {
      setWindows((prev) => [...prev, { appName, minimized: false }]);
    }
    bringToFront(appName);
  };

  const closeWindow = (appName) => {
    setWindows((prev) => prev.filter((win) => win.appName !== appName));
    setFocusedApp((prev) => (prev === appName ? null : prev));
    setZOrder((prev) => {
      const next = { ...prev };
      delete next[appName];
      return next;
    });
  };

  const setWindowMinimized = (appName, minimized) => {
    setWindows((prev) =>
      prev.map((win) =>
        win.appName === appName ? { ...win, minimized } : win
      )
    );
    if (minimized) {
      setFocusedApp((prev) => (prev === appName ? null : prev));
    } else {
      bringToFront(appName);
    }
  };

  const focusWindow = (appName) => {
    bringToFront(appName);
  };

  const restoreAllWindows = () => {
    setWindows((prev) => prev.map((win) => ({ ...win, minimized: false })));
  };

  const minimizeAllWindows = () => {
    setWindows((prev) => prev.map((win) => ({ ...win, minimized: true })));
    setFocusedApp(null);
  };

  const minimizeOthers = () => {
    setWindows((prev) =>
      prev.map((win) =>
        win.appName === focusedApp ? win : { ...win, minimized: true }
      )
    );
  };

  const cycleFocus = () => {
    const visible = windows.filter((w) => !w.minimized);
    if (visible.length < 2) return;
    const idx = visible.findIndex((w) => w.appName === focusedApp);
    const next = visible[(idx + 1) % visible.length];
    bringToFront(next.appName);
  };

  const handleRightClick = (e) => {
    if (e.target.closest('[data-app-window]')) return;
    e.preventDefault();
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
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
      <MenuBar
        focusedApp={focusedApp}
        windows={windows}
        openWindow={openWindow}
        closeWindow={closeWindow}
        restoreAllWindows={restoreAllWindows}
        minimizeAllWindows={minimizeAllWindows}
        minimizeOthers={minimizeOthers}
        cycleFocus={cycleFocus}
        onMinimizeFocused={() =>
          focusedApp && setWindowMinimized(focusedApp, true)
        }
        onZoomFocused={() => setZoomSignal((n) => n + 1)}
        onLogOut={onLogOut}
      />
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
      {windows.map((win) => (
        <Window
          key={win.appName}
          appName={win.appName}
          minimized={win.minimized}
          isFocused={focusedApp === win.appName}
          zIndex={zOrder[win.appName] || BASE_WINDOW_Z}
          zoomSignal={focusedApp === win.appName ? zoomSignal : 0}
          onMinimize={() => setWindowMinimized(win.appName, true)}
          onFocus={() => focusWindow(win.appName)}
          closeWindow={closeWindow}
          content={getAppContent(win.appName)}
        />
      ))}

      {/* Dock */}
            {/* <Widgets /> */}

      <Dock openWindow={openWindow} windows={windows} />

      {contextMenuVisible &&
        createPortal(
          <ContextMenu
            style={{
              top: `${contextMenuPosition.y}px`,
              left: `${contextMenuPosition.x}px`,
            }}
            onClick={(e) => e.stopPropagation()}
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
          </ContextMenu>,
          document.body
        )}

    </DesktopContainer>
    </>
  );
}

export default Desktop;
