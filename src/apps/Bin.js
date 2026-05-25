import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #e0e0e0;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
`;

const EmptyButton = styled.button`
  padding: 6px 14px;
  border: 1px solid #d1d1d6;
  border-radius: 6px;
  background: #fff;
  font-size: 13px;
  cursor: pointer;

  &:hover {
    background: #f5f5f7;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const ItemList = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
`;

const TrashItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 8px;

  &:hover {
    background: #f5f5f7;
  }
`;

const ItemIcon = styled.span`
  font-size: 32px;
`;

const ItemInfo = styled.div`
  flex: 1;

  strong {
    display: block;
    font-size: 14px;
  }

  span {
    font-size: 12px;
    color: #86868b;
  }
`;

const RestoreButton = styled.button`
  padding: 4px 10px;
  border: none;
  border-radius: 6px;
  background: #e8e8ed;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background: #d8d8dd;
  }
`;

const EmptyState = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #86868b;
  font-size: 15px;

  span {
    font-size: 48px;
    margin-bottom: 12px;
  }
`;

const INITIAL_ITEMS = [
  { id: 1, name: 'old-screenshot.png', icon: '🖼️', deleted: 'Yesterday' },
  { id: 2, name: 'draft.docx', icon: '📄', deleted: '3 days ago' },
];

function Bin() {
  const [items, setItems] = useState(INITIAL_ITEMS);

  const emptyTrash = () => setItems([]);

  const restoreItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  return (
    <Container>
      <Toolbar>
        <Title>Bin</Title>
        <EmptyButton type="button" onClick={emptyTrash} disabled={items.length === 0}>
          Empty Bin
        </EmptyButton>
      </Toolbar>
      {items.length === 0 ? (
        <EmptyState>
          <span>🗑️</span>
          Bin is empty
        </EmptyState>
      ) : (
        <ItemList>
          {items.map((item) => (
            <TrashItem key={item.id}>
              <ItemIcon>{item.icon}</ItemIcon>
              <ItemInfo>
                <strong>{item.name}</strong>
                <span>Deleted {item.deleted}</span>
              </ItemInfo>
              <RestoreButton type="button" onClick={() => restoreItem(item.id)}>
                Put Back
              </RestoreButton>
            </TrashItem>
          ))}
        </ItemList>
      )}
    </Container>
  );
}

export default Bin;