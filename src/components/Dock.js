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
        <img src="/icons/finder.png" alt="Finder" style={{ width: 40, height: 40 }} />
        </DockIcon>
        <DockIcon>
        <img src="/icons/maps.png" alt="Maps" style={{ width: 40, height: 40 }} />
        </DockIcon>
        <DockIcon>
        <img src="/icons/calendar.png" alt="Calendar" style={{ width: 40, height: 40 }} />
        </DockIcon>
        <DockIcon>
        <img src="/icons/contacts.png" alt="Contacts" style={{ width: 40, height: 40 }} />
        </DockIcon>
        <DockIcon>
        <img src="/icons/message.png" alt="iMessage" style={{ width: 40, height: 40 }} />
        </DockIcon>
        <DockIcon>
        <img src="/icons/safari.png" alt="Safari" style={{ width: 40, height: 40 }} />
        </DockIcon>
        <DockIcon>
        <img src="/icons/facetime.png" alt="Facetime" style={{ width: 40, height: 40 }} />
        </DockIcon>
        <DockIcon>
        <img src="/icons/vscode.png" alt="VSCode" style={{ width: 40, height: 40 }} />
        </DockIcon>
        <DockIcon>
        <img src="/icons/chrome.png" alt="Chrome" style={{ width: 40, height: 40 }} />
        </DockIcon>
        <DockIcon>
        <img src="/icons/spotify.png" alt="Spotify" style={{ width: 40, height: 40 }} />
        </DockIcon>
        <DockIcon>
        <img src="/icons/bin.png" alt="Bin" style={{ width: 40, height: 40 }} />
        </DockIcon>
      </DockInner>
    </DockContainer>
  );
}

export default Dock;
