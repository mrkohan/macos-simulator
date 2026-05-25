import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
`;

const Toolbar = styled.div`
  display: flex;
  gap: 8px;
  padding: 10px 12px;
  background: #f1f3f4;
  border-bottom: 1px solid #dadce0;
`;

const UrlInput = styled.input`
  flex: 1;
  padding: 8px 14px;
  border: 1px solid #dadce0;
  border-radius: 24px;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #1a73e8;
    box-shadow: 0 0 0 1px #1a73e8;
  }
`;

const GoButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background: #1a73e8;
  color: #fff;
  font-size: 13px;
  cursor: pointer;

  &:hover {
    background: #1557b0;
  }
`;

const Frame = styled.iframe`
  flex: 1;
  width: 100%;
  border: none;
`;

function normalizeUrl(input) {
  const trimmed = input.trim();
  if (!trimmed) return 'https://www.google.com';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed.includes('.') && !trimmed.includes(' ')) {
    return `https://${trimmed}`;
  }
  return `https://www.google.com/search?q=${encodeURIComponent(trimmed)}`;
}

function Chrome() {
  const [urlInput, setUrlInput] = useState('https://www.kohan.com.tr');
  const [frameUrl, setFrameUrl] = useState('https://www.kohan.com.tr');

  const navigate = () => setFrameUrl(normalizeUrl(urlInput));

  return (
    <Container>
      <Toolbar>
        <UrlInput
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && navigate()}
        />
        <GoButton type="button" onClick={navigate}>
          Go
        </GoButton>
      </Toolbar>
      <Frame src={frameUrl} title="Chrome" />
    </Container>
  );
}

export default Chrome;