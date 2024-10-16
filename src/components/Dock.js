import React from 'react';
import styled from 'styled-components';
import { FaRegStickyNote, FaSafari, FaEnvelope, FaMusic } from 'react-icons/fa';

const DockContainer = styled.div`
  position: fixed;
  bottom: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 1000;
`;

const DockInner = styled.div`
  background-color: rgba(255, 255, 255, 0.3);
  padding: 10px 20px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  display: flex;
  gap: 20px;
`;

const DockIcon = styled.div`
  text-align: center;
  cursor: pointer;
  user-select: none;

  &:hover {
    transform: scale(1.2);
    transition: transform 0.2s;
  }
`;

function Dock() {
  return (
    <DockContainer>
      <DockInner>
        <DockIcon>
          <FaRegStickyNote size={40} color="white" />
        </DockIcon>
        <DockIcon>
          <FaSafari size={40} color="white" />
        </DockIcon>
        <DockIcon>
          <FaEnvelope size={40} color="white" />
        </DockIcon>
        <DockIcon>
          <FaMusic size={40} color="white" />
        </DockIcon>
        {/* Add more icons here */}
      </DockInner>
    </DockContainer>
  );
}

export default Dock;
