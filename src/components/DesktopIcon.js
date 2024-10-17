import React from 'react';
import styled from 'styled-components';

const IconContainer = styled.div`
  position: absolute;
  top: ${(props) => props.styletop};
  right: ${(props) => props.styleleft};
  text-align: center;
  margin-top: 20px;
  color: white;
  width: 60px;
  cursor: pointer;
  user-select: none;
  z-index: 1;

  &:hover {
    opacity: 0.8;
  }
`;

const IconLabel = styled.div`
  margin-top: 5px;
  font-size: 12px;
`;

function DesktopIcon({ appName, openWindow, position }) {
  const handleDoubleClick = () => {
    openWindow(appName); // Open the app when double-clicked
  };

  const { top, left } = position || { top: '0px', left: '0px' };

  return (
    <IconContainer
      styletop={top}
      styleleft={left}
      onDoubleClick={handleDoubleClick} // Trigger double-click to open the window
      draggable={false}
    >
      {renderIcon(appName)}
      <IconLabel>{appName}</IconLabel>
    </IconContainer>
  );
}

function renderIcon(appName) {
  switch (appName) {
    case 'Finder':
      return <img src="/icons/finder.png" alt="VSCode" style={{ width: 40, height: 40 }} />;
    case 'Notes':
      return <img src="/icons/note.png" alt="VSCode" style={{ width: 40, height: 40 }} />;
    case 'Safari':
      return <img src="/icons/safari.png" alt="VSCode" style={{ width: 40, height: 40 }} />;
    case 'Terminal':
      return <img src="/icons/terminal.png" alt="VSCode" style={{ width: 40, height: 40 }} />;
    case 'VSCode':
      return <img src="/icons/vscode.png" alt="VSCode" style={{ width: 40, height: 40 }} />;
    default:
      return <img src="/icons/finder.png" alt="VSCode" style={{ width: 40, height: 40 }} />;
  }
}

export default DesktopIcon;
