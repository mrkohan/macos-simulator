import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';


const WindowContainer = styled.div`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  background-color: #e0e0e0;
  border-radius: ${(props) => (props.isMaximized ? '0' : '10px')};
  overflow: hidden;
  position: ${(props) => (props.isMaximized ? 'fixed' : 'absolute')};
  top: ${(props) => (props.isMaximized ? '27px' : '100px')};
  left: ${(props) => (props.isMaximized ? '0' : '100px')};
  right: ${(props) => (props.isMaximized ? '0' : 'unset')};
  bottom: ${(props) => (props.isMaximized ? '0' : 'unset')};
  display: ${(props) => (props.minimized ? 'none' : 'flex')};
  flex-direction: column;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  transition: ${(props) => (props.isMaximized ? 'none' : 'width 0.2s, height 0.2s')};
  z-index: 1001;
`;

const TitleBar = styled.div`
  background-color: #e0e0e0;
  height: 30px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  cursor: move;
  user-select: none;
  justify-content: space-between;
`;

const WindowControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
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
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 600, height: 400 });
  const [isResizing, setIsResizing] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 100, y: 100 }); // Initial drag position


  // Toggle minimize
  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  // Toggle maximize
  const handleMaximize = () => {
    if (isMaximized) {
      setDragPosition(dragPosition);
    } else {
      setDragPosition({ x: 0, y: 0 });
    }
    setIsMaximized(!isMaximized);
  };

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

    return () => {
      document.removeEventListener('mousemove', handleResize);
      document.removeEventListener('mouseup', stopResize);
    };
  }, [isResizing]);

  return (
    <Draggable
    handle=".title-bar"
    position={isMaximized ? { x: 0, y: 0 } : dragPosition}
    onStop={(e, data) => setDragPosition({ x: data.x, y: data.y })}
    disabled={isMaximized}>
       <WindowContainer
        width={isMaximized ? window.innerWidth : dimensions.width}
        height={isMaximized ? window.innerHeight : dimensions.height}
        minimized={isMinimized}
        isMaximized={isMaximized}
      >
        <TitleBar className="title-bar">
          <WindowControls>
            <ControlButton color="red" onClick={handleClose} /> {/* Close */}
            <ControlButton color="yellow" onClick={handleMinimize} /> {/* Minimize */}
            <ControlButton color="green" onClick={handleMaximize} /> {/* Maximize */}
          </WindowControls>
          <TitleText>{appName}</TitleText>
        </TitleBar>
        <ContentArea>{content}</ContentArea>
        {!isMaximized && <ResizeHandle onMouseDown={startResize} />} {/* Resize handle starts resizing */}
      </WindowContainer>
    </Draggable>
  );
}

export default Window;
