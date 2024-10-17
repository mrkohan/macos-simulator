import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';

const WindowContainer = styled.div`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  background-color: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  position: absolute;
  top: 100px;
  left: 100px;
  display: ${(props) => (props.minimized ? 'none' : 'flex')};
  flex-direction: column;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  transition: width 0.2s, height 0.2s;
  z-index:999;
`;

const TitleBar = styled.div`
  background-color: #e0e0e0;
  height: 30px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  cursor: move;
  user-select: none;
  justify-content: flex-start; /* Align content to the left */
`;

const WindowControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; /* Space between buttons */
`;

const ControlButton = styled.div`
  width: 12px;
  height: 12px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  cursor: pointer;
`;

const TitleText = styled.div`
  flex-grow: 1;
  text-align: center;
  font-weight: bold;
`;

const ContentArea = styled.div`
  flex-grow: 1;
  background-color: white;
`;

const ResizeHandle = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 15px;
  height: 15px;
  background-color: transparent;
  cursor: se-resize;
`;

function Window({ appName, closeWindow, content }) {
  // const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 1024, height: 500 });
  const [isResizing, setIsResizing] = useState(false); // Track resizing state

  // Toggle minimize
  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  // Toggle maximize
  // const handleMaximize = () => {
  //   if (isMaximized) {
  //     setDimensions({ width: 600, height: 400 });
  //     setIsMaximized(false);
  //   } else {
  //     setDimensions({ width: window.innerWidth, height: window.innerHeight });
  //     setIsMaximized(true);
  //   }
  // };

  // Handle close window
  const handleClose = () => {
    closeWindow(appName);
  };

  // Start resizing
  const startResize = (e) => {
    setIsResizing(true);
    e.preventDefault();
  };

  // Handle resizing
  const handleResize = (e) => {
    if (isResizing) {
      const newWidth = e.clientX - e.target.offsetParent.offsetLeft;
      const newHeight = e.clientY - e.target.offsetParent.offsetTop;
      if (newWidth > 200 && newHeight > 150) {
        setDimensions({ width: newWidth, height: newHeight });
      }
    }
  };

  // Stop resizing when mouse is released
  const stopResize = () => {
    setIsResizing(false);
  };

  // Add global event listener for mouseup to stop resizing
  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleResize);
      document.addEventListener('mouseup', stopResize);
    } else {
      document.removeEventListener('mousemove', handleResize);
      document.removeEventListener('mouseup', stopResize);
    }

    // Cleanup event listeners on unmount
    return () => {
      document.removeEventListener('mousemove', handleResize);
      document.removeEventListener('mouseup', stopResize);
    };
  }, [isResizing]); // Effect will re-run when isResizing state changes

  return (
    <Draggable handle=".title-bar" bounds="parent">
      <WindowContainer
        width={dimensions.width}
        height={dimensions.height}
        minimized={isMinimized}
      >
        <TitleBar className="title-bar">
          <WindowControls>
            <ControlButton color="red" onClick={handleClose} /> {/* Close */}
            <ControlButton color="yellow" onClick={handleMinimize} /> {/* Minimize */}
            <ControlButton color="green" /> {/* Maximize */}
          </WindowControls>
          <TitleText>{appName}</TitleText>
        </TitleBar>
        <ContentArea>{content}</ContentArea>
        <ResizeHandle onMouseDown={startResize} /> {/* Resize handle starts resizing */}
      </WindowContainer>
    </Draggable>
  );
}

export default Window;
