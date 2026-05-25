import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 100%;
  display: flex;
  background: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`;

const List = styled.div`
  width: 260px;
  border-right: 1px solid #e0e0e0;
  overflow-y: auto;
`;

const ListHeader = styled.div`
  padding: 14px 16px;
  font-size: 22px;
  font-weight: 700;
  border-bottom: 1px solid #e0e0e0;
`;

const ContactRow = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 10px 16px;
  border: none;
  background: ${(props) => (props.active ? '#dcebff' : 'transparent')};
  cursor: pointer;
  text-align: left;

  &:hover {
    background: ${(props) => (props.active ? '#dcebff' : '#f5f5f7')};
  }
`;

const Avatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${(props) => props.color};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
`;

const Detail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: #fafafa;
`;

const DetailAvatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: ${(props) => props.color};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  font-weight: 600;
  margin-bottom: 16px;
`;

const DetailName = styled.h2`
  margin: 0 0 24px;
  font-size: 28px;
  font-weight: 600;
`;

const InfoRow = styled.div`
  width: 100%;
  max-width: 320px;
  padding: 12px 0;
  border-bottom: 1px solid #e0e0e0;
  font-size: 14px;

  span {
    display: block;
    color: #86868b;
    font-size: 11px;
    margin-bottom: 4px;
  }
`;

const ActionRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`;

const ActionButton = styled.button`
  padding: 10px 20px;
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

const CONTACTS = [
  { id: 1, name: 'Alex Chen', color: '#5856d6', phone: '+1 (555) 234-5678', email: 'alex@example.com' },
  { id: 2, name: 'Sam Rivera', color: '#34c759', phone: '+1 (555) 876-5432', email: 'sam@example.com' },
  { id: 3, name: 'Jordan Lee', color: '#ff9500', phone: '+1 (555) 111-2222', email: 'jordan@example.com' },
  { id: 4, name: 'Taylor Kim', color: '#ff2d55', phone: '+1 (555) 333-4444', email: 'taylor@example.com' },
  { id: 5, name: 'Reza', color: '#007aff', phone: '+1 (555) 000-0000', email: 'reza@example.com' },
];

function Contacts() {
  const [activeId, setActiveId] = useState(1);
  const contact = CONTACTS.find((c) => c.id === activeId) || CONTACTS[0];

  return (
    <Container>
      <List>
        <ListHeader>Contacts</ListHeader>
        {CONTACTS.map((c) => (
          <ContactRow
            key={c.id}
            type="button"
            active={c.id === activeId}
            onClick={() => setActiveId(c.id)}
          >
            <Avatar color={c.color}>{c.name[0]}</Avatar>
            <span>{c.name}</span>
          </ContactRow>
        ))}
      </List>
      <Detail>
        <DetailAvatar color={contact.color}>{contact.name[0]}</DetailAvatar>
        <DetailName>{contact.name}</DetailName>
        <InfoRow>
          <span>phone</span>
          {contact.phone}
        </InfoRow>
        <InfoRow>
          <span>email</span>
          {contact.email}
        </InfoRow>
        <ActionRow>
          <ActionButton type="button">message</ActionButton>
          <ActionButton type="button">call</ActionButton>
        </ActionRow>
      </Detail>
    </Container>
  );
}

export default Contacts;