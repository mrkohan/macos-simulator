import React from "react";
import styled from "styled-components";


const VSCodeContainer = styled.div`
  height: 100%;
  width: 100%;
  iframe {
    height: 100%;
    width: 100%;
    border: none;
  }
`;

function VSCode({ closeWindow }) {
  return (
      <VSCodeContainer>
        <iframe
          src="https://github1s.com/mrkohan/macos-simulator"
          title="VSCode"
        />
      </VSCodeContainer>
  );
}

export default VSCode;
