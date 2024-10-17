import React from 'react';
import styled from 'styled-components';

const IconContainer = styled.div`
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  text-align: center;
  color: white;
  width: 60px;
  cursor: pointer;
  user-select: none;

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
    openWindow(appName);
  };

  const { top, left } = position || { top: '0px', left: '0px' };

  const renderIcon = () => {
    switch (appName) {
      case 'Finder':
        return <img src="/icons/finder.png" alt="VSCode" style={{ width: 40, height: 40 }} />;
      case 'Notes':
        return <img src="/icons/note.png" alt="VSCode" style={{ width: 40, height: 40 }} />;
        case 'Safari':
          return <img src="/icons/safari.png" alt="VSCode" style={{ width: 40, height: 40 }} />;
      default:
        return <img src="/icons/note.png" alt="VSCode" style={{ width: 40, height: 40 }} />;
    }
  };

  return (
    <IconContainer
      top={top}
      left={left}
      onDoubleClick={handleDoubleClick}
      draggable={false}
    >
      {renderIcon()}
      <IconLabel>{appName}</IconLabel>
    </IconContainer>
  );
}

export default DesktopIcon;
