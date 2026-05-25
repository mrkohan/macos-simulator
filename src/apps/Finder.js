import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

const Container = styled.div`
  height: 100%;
  display: flex;
  background: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`;

const Sidebar = styled.div`
  width: 180px;
  background: #f5f5f7;
  border-right: 1px solid #e0e0e0;
  padding: 12px 8px;
  overflow-y: auto;
`;

const SidebarSection = styled.div`
  margin-bottom: 16px;
`;

const SectionLabel = styled.div`
  font-size: 11px;
  font-weight: 600;
  color: #86868b;
  padding: 4px 8px 6px;
  text-transform: uppercase;
`;

const SidebarItem = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 6px 10px;
  border: none;
  border-radius: 6px;
  background: ${(props) => (props.active ? '#007aff' : 'transparent')};
  color: ${(props) => (props.active ? '#fff' : '#1d1d1f')};
  font-size: 13px;
  cursor: pointer;
  text-align: left;

  &:hover {
    background: ${(props) => (props.active ? '#007aff' : '#e8e8ed')};
  }
`;

const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-bottom: 1px solid #e0e0e0;
  background: #fafafa;
`;

const PathLabel = styled.span`
  flex: 1;
  font-size: 14px;
  font-weight: 500;
`;

const ToolButton = styled.button`
  padding: 4px 10px;
  border: 1px solid #d1d1d6;
  border-radius: 6px;
  background: #fff;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background: #f0f0f5;
  }
`;

const FileGrid = styled.div`
  flex: 1;
  padding: 16px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  gap: 16px;
  align-content: start;
  overflow-y: auto;
`;

const FileItem = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;

  &:hover {
    background: #e8f4ff;
  }
`;

const FileIcon = styled.span`
  font-size: 42px;
`;

const FileName = styled.span`
  font-size: 12px;
  text-align: center;
  word-break: break-word;
  color: #1d1d1f;
`;

const ContextMenu = styled.div`
  position: fixed;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  padding: 6px 0;
  z-index: 5000;
  min-width: 160px;
`;

const MenuItem = styled.button`
  display: block;
  width: 100%;
  padding: 6px 16px;
  border: none;
  background: transparent;
  font-size: 13px;
  text-align: left;
  cursor: pointer;
  color: #1d1d1f;

  &:hover {
    background: #007aff;
    color: #fff;
  }
`;

const LOCATIONS = {
  Desktop: [
    { name: 'Finder', icon: '📁', type: 'app' },
    { name: 'Notes', icon: '📝', type: 'app' },
    { name: 'Safari', icon: '🌐', type: 'app' },
    { name: 'back3.jpg', icon: '🖼️', type: 'file' },
  ],
  Documents: [
    { name: 'Resume.pdf', icon: '📄', type: 'file' },
    { name: 'Project', icon: '📁', type: 'folder' },
    { name: 'notes.txt', icon: '📄', type: 'file' },
  ],
  Downloads: [
    { name: 'macos-simulator.zip', icon: '📦', type: 'file' },
    { name: 'photo.png', icon: '🖼️', type: 'file' },
  ],
  Applications: [
    { name: 'Safari', icon: '🧭', type: 'app' },
    { name: 'Messages', icon: '💬', type: 'app' },
    { name: 'Calendar', icon: '📅', type: 'app' },
    { name: 'Maps', icon: '🗺️', type: 'app' },
    { name: 'Spotify', icon: '🎵', type: 'app' },
    { name: 'VS Code', icon: '💻', type: 'app' },
  ],
};

const FAVORITES = ['Desktop', 'Documents', 'Downloads', 'Applications'];

function Finder() {
  const [location, setLocation] = useState('Desktop');
  const [contextMenu, setContextMenu] = useState(null);
  const files = LOCATIONS[location] || [];

  useEffect(() => {
    const closeMenu = () => setContextMenu(null);
    window.addEventListener('click', closeMenu);
    return () => window.removeEventListener('click', closeMenu);
  }, []);

  const handleFileContextMenu = (e, file) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({ x: e.clientX, y: e.clientY, file });
  };

  return (
    <Container>
      <Sidebar>
        <SidebarSection>
          <SectionLabel>Favorites</SectionLabel>
          {FAVORITES.map((name) => (
            <SidebarItem
              key={name}
              type="button"
              active={location === name}
              onClick={() => setLocation(name)}
            >
              <span>
                {name === 'Desktop' && '🖥️'}
                {name === 'Documents' && '📄'}
                {name === 'Downloads' && '⬇️'}
                {name === 'Applications' && '📱'}
              </span>
              {name}
            </SidebarItem>
          ))}
        </SidebarSection>
      </Sidebar>
      <Main>
        <Toolbar>
          <ToolButton type="button">‹</ToolButton>
          <ToolButton type="button">›</ToolButton>
          <PathLabel>{location}</PathLabel>
          <ToolButton type="button">View</ToolButton>
        </Toolbar>
        <FileGrid>
          {files.map((file) => (
            <FileItem
              key={file.name}
              type="button"
              onContextMenu={(e) => handleFileContextMenu(e, file)}
            >
              <FileIcon>{file.icon}</FileIcon>
              <FileName>{file.name}</FileName>
            </FileItem>
          ))}
        </FileGrid>
      </Main>
      {contextMenu &&
        createPortal(
          <ContextMenu
            style={{ left: contextMenu.x, top: contextMenu.y }}
            onClick={(e) => e.stopPropagation()}
          >
            <MenuItem type="button">Open "{contextMenu.file.name}"</MenuItem>
            <MenuItem type="button">Get Info</MenuItem>
            <MenuItem type="button">Rename</MenuItem>
            <MenuItem type="button">Move to Bin</MenuItem>
          </ContextMenu>,
          document.body
        )}
    </Container>
  );
}

export default Finder;
