import React, { useState } from "react";
import styled from "styled-components";

const TerminalContainer = styled.div`
  background-color: black;
  color: white;
  height: 100%;
  width: 100%;
  border-radius: 8px;
  padding: 10px;
  font-family: "Menlo", "Monaco", monospace;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-left:15px;
`;

const OutputLine = styled.div`
  display: flex;
`;

const InputLine = styled.div`
  display: flex;
`;

const Input = styled.input`
  background: transparent;
  border: none;
  color: white;
  font-family: inherit;
  font-size: inherit;
  outline: none;
  flex-grow: 1;
`;

const TerminalText = styled.span`
  color: ${(props) => props.color || "white"};
`;

const Prompt = styled.span`
  color: lightgreen;
  padding-right: 5px;
`;

// Terminal Component
const Terminal = () => {
  const [output, setOutput] = useState([]);
  const [command, setCommand] = useState("");
  
  const handleCommand = (e) => {
    if (e.key === "Enter") {
      const newOutput = [...output, { text: command, color: "white" }];

      if (command.startsWith("ls")) {
        // Fake directory output
        newOutput.push({ text: "Documents Path_Test notes.txt painscale.ubp phonebook.py", color: "lightgray" });
      } else if (command === "clear") {
        setOutput([]);
        setCommand("");
        return;
      } else {
        newOutput.push({ text: `-bash: ${command}: command not found`, color: "red" });
      }

      setOutput(newOutput);
      setCommand("");
    }
  };

  return (
    <TerminalContainer>
      {output.map((line, index) => (
        <OutputLine key={index}>
          <TerminalText color={line.color}>{line.text}</TerminalText>
        </OutputLine>
      ))}
      <InputLine>
        <Prompt>Reza@MacBook-Pro:~$</Prompt>
        <Input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onKeyDown={handleCommand}
          autoFocus
        />
      </InputLine>
    </TerminalContainer>
  );
};

export default Terminal;
