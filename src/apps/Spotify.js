import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 100%;
  display: flex;
  background: #121212;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`;

const Sidebar = styled.div`
  width: 200px;
  padding: 16px 12px;
  background: #000;
`;

const Logo = styled.div`
  font-size: 22px;
  font-weight: 700;
  color: #1db954;
  margin-bottom: 20px;
`;

const NavItem = styled.button`
  display: block;
  width: 100%;
  padding: 10px 12px;
  border: none;
  border-radius: 6px;
  background: ${(props) => (props.active ? '#282828' : 'transparent')};
  color: #b3b3b3;
  font-size: 14px;
  text-align: left;
  cursor: pointer;

  &:hover {
    color: #fff;
  }
`;

const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

const SectionTitle = styled.h2`
  margin: 0 0 16px;
  font-size: 22px;
`;

const TrackList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TrackRow = styled.button`
  display: grid;
  grid-template-columns: 24px 1fr 80px;
  gap: 12px;
  align-items: center;
  padding: 10px 12px;
  border: none;
  border-radius: 6px;
  background: ${(props) => (props.playing ? '#282828' : 'transparent')};
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  text-align: left;

  &:hover {
    background: #282828;
  }
`;

const PlayerBar = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  background: #181818;
  border-top: 1px solid #282828;
`;

const PlayButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: #1db954;
  color: #000;
  font-size: 16px;
  cursor: pointer;
`;

const NowPlaying = styled.div`
  flex: 1;
  font-size: 13px;

  strong {
    display: block;
    color: #fff;
  }

  span {
    color: #b3b3b3;
  }
`;

const TRACKS = [
  { title: 'Blinding Lights', artist: 'The Weeknd', duration: '3:20' },
  { title: 'Levitating', artist: 'Dua Lipa', duration: '3:23' },
  { title: 'Stay', artist: 'The Kid LAROI', duration: '2:21' },
  { title: 'Heat Waves', artist: 'Glass Animals', duration: '3:58' },
  { title: 'As It Was', artist: 'Harry Styles', duration: '2:47' },
];

function Spotify() {
  const [playingIndex, setPlayingIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const track = TRACKS[playingIndex];

  const togglePlay = () => setIsPlaying(!isPlaying);

  const playTrack = (index) => {
    setPlayingIndex(index);
    setIsPlaying(true);
  };

  return (
    <Container>
      <Sidebar>
        <Logo>Spotify</Logo>
        <NavItem type="button" active>
          Home
        </NavItem>
        <NavItem type="button">Search</NavItem>
        <NavItem type="button">Your Library</NavItem>
      </Sidebar>
      <Main>
        <Content>
          <SectionTitle>Made for You</SectionTitle>
          <TrackList>
            {TRACKS.map((t, i) => (
              <TrackRow
                key={t.title}
                type="button"
                playing={isPlaying && i === playingIndex}
                onClick={() => playTrack(i)}
              >
                <span>{i + 1}</span>
                <span>
                  {t.title}
                  <br />
                  <small style={{ color: '#b3b3b3' }}>{t.artist}</small>
                </span>
                <span style={{ color: '#b3b3b3' }}>{t.duration}</span>
              </TrackRow>
            ))}
          </TrackList>
        </Content>
        <PlayerBar>
          <PlayButton type="button" onClick={togglePlay}>
            {isPlaying ? '⏸' : '▶'}
          </PlayButton>
          <NowPlaying>
            <strong>{track.title}</strong>
            <span>{track.artist}</span>
          </NowPlaying>
        </PlayerBar>
      </Main>
    </Container>
  );
}

export default Spotify;