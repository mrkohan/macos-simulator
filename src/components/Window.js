import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';
import { getWindowDefaults } from '../utils/windowDefaults';

const MIN_WIDTH = 320;
const MIN_HEIGHT = 200;
const MENU_BAR_HEIGHT = 27;
const MAX_WIDTH = () => window.innerWidth - 40;
const MAX_HEIGHT = () => window.innerHeight - 80;
const MAXIMIZED_HEIGHT = () => window.innerHeight - MENU_BAR_HEIGHT;

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
  transition: ${(props) =>
    props.isResizing || props.isMaximized ? 'none' : 'width 0.2s, height 0.2s'};
`;

const WindowWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
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
  flex: 1;
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: white;
  position: relative;
`;

const ResizeHandle = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 24px;
  height: 24px;
  cursor: se-resize;
  z-index: 10;

  &::before {
    content: '';
    position: absolute;
    right: 5px;
    bottom: 5px;
    width: 10px;
    height: 10px;
    border-right: 2px solid ${(props) => (props.active ? '#007aff' : '#999')};
    border-bottom: 2px solid ${(props) => (props.active ? '#007aff' : '#999')};
    transition: border-color 0.15s;
  }

  &:hover::before {
    border-color: #007aff;
  }
`;

const ResizeOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10000;
  cursor: se-resize;
`;

function clampSize(width, height) {
  return {
    width: Math.round(Math.min(MAX_WIDTH(), Math.max(MIN_WIDTH, width))),
    height: Math.round(Math.min(MAX_HEIGHT(), Math.max(MIN_HEIGHT, height))),
  };
}

function Window({
  appName,
  closeWindow,
  content,
  minimized = false,
  isFocused = false,
  zIndex = 1000,
  zoomSignal = 0,
  onMinimize,
  onFocus,
}) {
  const defaults = getWindowDefaults(appName);
  const nodeRef = useRef(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: defaults.width,
    height: defaults.height,
  });
  const [isResizing, setIsResizing] = useState(false);
  const [dragPosition, setDragPosition] = useState(defaults.position);

  const resizeSessionRef = useRef(null);

  const stopResize = useCallback(() => {
    if (!resizeSessionRef.current) return;
    resizeSessionRef.current = null;
    setIsResizing(false);
    document.body.style.userSelect = '';
    document.body.style.cursor = '';
  }, []);

  const startResize = useCallback(
    (e) => {
      if (isMaximized) return;
      e.preventDefault();
      e.stopPropagation();

      resizeSessionRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        startWidth: dimensions.width,
        startHeight: dimensions.height,
      };

      setIsResizing(true);
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'se-resize';
    },
    [dimensions.width, dimensions.height, isMaximized]
  );

  useEffect(() => {
    if (!isResizing) return;

    const handlePointerMove = (e) => {
      const session = resizeSessionRef.current;
      if (!session) return;

      const deltaX = e.clientX - session.startX;
      const deltaY = e.clientY - session.startY;
      setDimensions(
        clampSize(session.startWidth + deltaX, session.startHeight + deltaY)
      );
    };

    const endResize = () => stopResize();

    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', endResize, { capture: true });
    document.addEventListener('pointercancel', endResize, { capture: true });
    window.addEventListener('blur', endResize);

    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', endResize, { capture: true });
      document.removeEventListener('pointercancel', endResize, { capture: true });
      window.removeEventListener('blur', endResize);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, [isResizing, stopResize]);

  const handleMinimize = () => onMinimize?.();

  const handleMaximize = () => {
    if (isMaximized) {
      setDragPosition(dragPosition);
    } else {
      setDragPosition({ x: 0, y: 0 });
    }
    setIsMaximized(!isMaximized);
  };

  useEffect(() => {
    if (zoomSignal > 0 && isFocused) {
      setIsMaximized((wasMax) => {
        if (!wasMax) setDragPosition({ x: 0, y: 0 });
        return !wasMax;
      });
    }
  }, [zoomSignal, isFocused]);

  const handleClose = () => closeWindow(appName);

  return (
    <>
      {isResizing && <ResizeOverlay onPointerUp={stopResize} />}
      <Draggable
        nodeRef={nodeRef}
        handle=".title-bar"
        position={isMaximized ? { x: 0, y: 0 } : dragPosition}
        onStart={() => onFocus?.()}
        onStop={(e, data) => setDragPosition({ x: data.x, y: data.y })}
        disabled={isMaximized || isResizing}
      >
        <WindowWrapper
          ref={nodeRef}
          style={{ zIndex }}
          onMouseDownCapture={() => onFocus?.()}
        >
        <WindowContainer
          data-app-window
          width={isMaximized ? window.innerWidth : dimensions.width}
          height={isMaximized ? MAXIMIZED_HEIGHT() : dimensions.height}
          minimized={minimized}
          isMaximized={isMaximized}
          isResizing={isResizing}
          isFocused={isFocused}
        >
          <TitleBar className="title-bar">
            <WindowControls>
              <ControlButton color="red" onClick={handleClose} />
              <ControlButton color="yellow" onClick={handleMinimize} />
              <ControlButton color="green" onClick={handleMaximize} />
            </WindowControls>
            <TitleText>{appName}</TitleText>
          </TitleBar>
          <ContentArea>{content}</ContentArea>
          {!isMaximized && (
            <ResizeHandle active={isResizing} onPointerDown={startResize} />
          )}
        </WindowContainer>
        </WindowWrapper>
      </Draggable>
    </>
  );
}

export default Window;
