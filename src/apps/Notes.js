import React, { useState } from 'react';
import styled from 'styled-components';

// Styled components for the note window
const NoteContainer = styled.div`
  height: 100%;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
`;

const NoteHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background-color: #f1f1f1;
  border-bottom: 1px solid #e0e0e0;
`;


const NoteTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: normal;
`;

const NoteIcons = styled.div`
  display: flex;
  gap: 10px;
`;

const Icon = styled.div`
  font-size: 16px;
  cursor: pointer;
`;

const NoteContent = styled.textarea`
  width: 100%;
  height: calc(100% - 50px);
  border: none;
  outline: none;
  padding: 15px;
  font-size: 16px;
  font-family: 'Arial', sans-serif;
  resize: none;
`;

// Main Note component
const Note = () => {
  const [noteContent, setNoteContent] = useState('');

  const handleNoteChange = (e) => {
    setNoteContent(e.target.value);
  };

  return (
    <NoteContainer>
      <NoteHeader>
        <NoteTitle>New Note</NoteTitle>
        <NoteIcons>
          {/* Icons can be added here using react-icons */}
          <Icon>📝</Icon>
          <Icon>📋</Icon>
          <Icon>📁</Icon>
        </NoteIcons>
      </NoteHeader>
      <NoteContent
        placeholder="Start typing your note..."
        value={noteContent}
        onChange={handleNoteChange}
      />
    </NoteContainer>
  );
};

export default Note;
