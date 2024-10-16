import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  text-align: center;
  font-family: 'Arial', sans-serif;
`;

// const MacImage = styled.img`
//   width: 100px;
//   margin-bottom: 20px;
// `;

const MacInfo = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const MacDetails = styled.div`
  margin-top: 10px;
  font-size: 14px;
`;

function AboutThisMacContent() {
  return (
    <AboutContainer>
      {/* <MacImage src="/path/mac-image.png" alt="MacBook Pro" /> */}
      <MacInfo>MacBook Pro</MacInfo>
      <MacDetails>
        13-inch, 2022
        <br />
        Chip: Apple M2 Pro
        <br />
        Memory: 16 GB
        <br />
        Serial Number: DXJHY4XY4X
        <br />
        macOS Ventura 13.1
      </MacDetails>
    </AboutContainer>
  );
}

export default AboutThisMacContent;
