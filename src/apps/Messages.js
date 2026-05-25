import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 100%;
  display: flex;
  background: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`;

const Sidebar = styled.div`
  width: 220px;
  border-right: 1px solid #e0e0e0;
  background: #f6f6f6;
  overflow-y: auto;
`;

const ConversationItem = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 12px 14px;
  border: none;
  border-bottom: 1px solid #ebebeb;
  background: ${(props) => (props.active ? '#dcebff' : 'transparent')};
  cursor: pointer;
  text-align: left;

  &:hover {
    background: ${(props) => (props.active ? '#dcebff' : '#eee')};
  }
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${(props) => props.color || '#007aff'};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
  flex-shrink: 0;
`;

const ConvInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const ConvName = styled.div`
  font-weight: 600;
  font-size: 14px;
`;

const ConvPreview = styled.div`
  font-size: 12px;
  color: #86868b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ChatArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #fff;
`;

const ChatHeader = styled.div`
  padding: 14px 16px;
  border-bottom: 1px solid #e0e0e0;
  font-weight: 600;
  font-size: 15px;
`;

const MessagesList = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: #fff;
`;

const Bubble = styled.div`
  align-self: ${(props) => (props.sent ? 'flex-end' : 'flex-start')};
  max-width: 70%;
  padding: 10px 14px;
  border-radius: 18px;
  background: ${(props) => (props.sent ? '#007aff' : '#e9e9eb')};
  color: ${(props) => (props.sent ? '#fff' : '#1d1d1f')};
  font-size: 14px;
  line-height: 1.4;
`;

const InputRow = styled.div`
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  border-top: 1px solid #e0e0e0;
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 10px 14px;
  border: 1px solid #d1d1d6;
  border-radius: 20px;
  font-size: 14px;
  outline: none;
`;

const SendButton = styled.button`
  padding: 10px 18px;
  border: none;
  border-radius: 20px;
  background: #007aff;
  color: #fff;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background: #0066d6;
  }
`;

const CONVERSATIONS = [
  { id: 1, name: 'Alex', color: '#5856d6', preview: 'See you tomorrow!', messages: [
    { text: 'Hey, are we still on for tomorrow?', sent: false },
    { text: 'Yes! 10am works for me.', sent: true },
    { text: 'See you tomorrow!', sent: false },
  ]},
  { id: 2, name: 'Sam', color: '#34c759', preview: 'Thanks!', messages: [
    { text: 'Did you get the files?', sent: true },
    { text: 'Thanks!', sent: false },
  ]},
  { id: 3, name: 'Jordan', color: '#ff9500', preview: 'Sounds good 👍', messages: [
    { text: 'Want to grab lunch?', sent: false },
    { text: 'Sounds good 👍', sent: true },
  ]},
];

function Messages() {
  const [activeId, setActiveId] = useState(1);
  const [draft, setDraft] = useState('');
  const [chats, setChats] = useState(CONVERSATIONS);

  const active = chats.find((c) => c.id === activeId) || chats[0];

  const sendMessage = () => {
    const text = draft.trim();
    if (!text) return;

    setChats((prev) =>
      prev.map((c) =>
        c.id === activeId
          ? {
              ...c,
              preview: text,
              messages: [...c.messages, { text, sent: true }],
            }
          : c
      )
    );
    setDraft('');
  };

  return (
    <Container>
      <Sidebar>
        {chats.map((conv) => (
          <ConversationItem
            key={conv.id}
            type="button"
            active={conv.id === activeId}
            onClick={() => setActiveId(conv.id)}
          >
            <Avatar color={conv.color}>{conv.name[0]}</Avatar>
            <ConvInfo>
              <ConvName>{conv.name}</ConvName>
              <ConvPreview>{conv.preview}</ConvPreview>
            </ConvInfo>
          </ConversationItem>
        ))}
      </Sidebar>
      <ChatArea>
        <ChatHeader>{active.name}</ChatHeader>
        <MessagesList>
          {active.messages.map((msg, i) => (
            <Bubble key={i} sent={msg.sent}>
              {msg.text}
            </Bubble>
          ))}
        </MessagesList>
        <InputRow>
          <MessageInput
            placeholder="iMessage"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <SendButton type="button" onClick={sendMessage}>
            Send
          </SendButton>
        </InputRow>
      </ChatArea>
    </Container>
  );
}

export default Messages;