import React from 'react';
import styled from 'styled-components';
import { FaCode, FaRegStickyNote, FaSafari, FaSearch, FaTerminal } from 'react-icons/fa';

const IconContainer = styled.div`
  position: absolute;
  top: ${(props) => props.styletop};
  left: ${(props) => props.styleleft};
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
      return <FaSearch size={40} color="white" />;
    case 'Notes':
      return <FaRegStickyNote size={40} color="white" />;
    case 'Safari':
      return <FaSafari size={40} color="white" />;
    case 'Terminal':
      return <FaTerminal size={40} color="white" />;
    case 'VSCode':
      return <FaCode size={40} color="white" />;
    default:
      return <FaRegStickyNote size={40} color="white" />;
  }
}

export default DesktopIcon;
