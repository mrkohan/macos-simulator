import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  flex: 1;
  width: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  position: relative;
  background: #1c1c1e;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`;

const Header = styled.div`
  flex-shrink: 0;
  padding: 16px 20px;
  font-size: clamp(18px, 2vw, 22px);
  font-weight: 600;
`;

const Grid = styled.div`
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(140px, 100%), 1fr));
  gap: clamp(12px, 2vw, 24px);
  padding: 0 clamp(16px, 3vw, 32px) clamp(16px, 3vw, 32px);
  overflow-y: auto;
  align-content: start;
`;

const ContactCard = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: clamp(16px, 2vw, 24px) 12px;
  border: none;
  border-radius: 12px;
  background: #2c2c2e;
  color: #fff;
  cursor: pointer;

  &:hover {
    background: #3a3a3c;
  }
`;

const Avatar = styled.div`
  width: clamp(48px, 8vw, 72px);
  height: clamp(48px, 8vw, 72px);
  border-radius: 50%;
  background: ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(20px, 3vw, 28px);
  font-weight: 600;
`;

const CallOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
  padding: 24px;
`;

const VideoPreview = styled.div`
  width: min(560px, 85vw);
  height: min(400px, 55vh);
  max-width: 100%;
  border-radius: 12px;
  background: linear-gradient(135deg, #434343, #1a1a1a);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(48px, 10vw, 96px);
  margin-bottom: clamp(16px, 3vh, 32px);
`;

const CallName = styled.div`
  font-size: clamp(20px, 3vw, 28px);
  font-weight: 600;
  margin-bottom: 8px;
`;

const CallStatus = styled.div`
  color: #86868b;
  margin-bottom: clamp(20px, 4vh, 40px);
  font-size: clamp(14px, 2vw, 16px);
`;

const EndButton = styled.button`
  width: clamp(56px, 10vw, 72px);
  height: clamp(56px, 10vw, 72px);
  border-radius: 50%;
  border: none;
  background: #ff3b30;
  color: #fff;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background: #e6352b;
  }
`;

const CONTACTS = [
  { name: 'Alex', color: '#5856d6' },
  { name: 'Sam', color: '#34c759' },
  { name: 'Jordan', color: '#ff9500' },
  { name: 'Taylor', color: '#ff2d55' },
  { name: 'Reza', color: '#007aff' },
];

function FaceTime() {
  const [calling, setCalling] = useState(null);

  return (
    <Container>
      {calling && (
        <CallOverlay>
          <VideoPreview>{calling[0]}</VideoPreview>
          <CallName>{calling}</CallName>
          <CallStatus>Calling…</CallStatus>
          <EndButton type="button" onClick={() => setCalling(null)}>
            End
          </EndButton>
        </CallOverlay>
      )}
      <Header>FaceTime</Header>
      <Grid>
        {CONTACTS.map((c) => (
          <ContactCard key={c.name} type="button" onClick={() => setCalling(c.name)}>
            <Avatar color={c.color}>{c.name[0]}</Avatar>
            <span>{c.name}</span>
          </ContactCard>
        ))}
      </Grid>
    </Container>
  );
}

export default FaceTime;