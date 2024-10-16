import React from 'react';
import styled from 'styled-components';
import { FaRegStickyNote, FaSearch } from 'react-icons/fa';

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
        return <FaSearch size={40} color="white" />;
      case 'Notes':
        return <FaRegStickyNote size={40} color="white" />;
        case 'Safari':
          return <FaSafari size={40} color="white" />;
      default:
        return <FaRegStickyNote size={40} color="white" />;
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
