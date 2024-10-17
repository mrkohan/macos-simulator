import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

// Styled Components
const DockContainer = styled.div`
  position: fixed;
  bottom: 20px; /* Space between the dock and bottom of the screen */
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 1000;
`;

const DockInner = styled.div`
  background-color: rgba(255, 255, 255, 0.2);
  padding: 10px 20px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  display: flex;
  gap: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  align-items: flex-end; 
  height: 50px;
`;

const DockIconContainer = styled.div`
  text-align: center;
  cursor: pointer;
  user-select: none;
  position: relative;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-20px) scale(1.5); /* Move the icon upwards and scale */
  }

  img {
    width: ${(props) => props.iconSize}px;
    height: ${(props) => props.iconSize}px;
    transition: width 0.2s ease, height 0.2s ease;
  }

  .tooltip {
    display: ${(props) => (props.isHovered ? 'block' : 'none')};
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    padding: 5px 10px;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    border-radius: 5px;
    font-size: 12px;
    white-space: nowrap;
    margin-bottom: 10px;
  }
`;

// Custom interpolation function
function customInterpolate(input, output) {
  return (x) => {
    if (x <= input[0]) return output[0];
    if (x >= input[input.length - 1]) return output[output.length - 1];

    let i = 0;
    while (x > input[i + 1]) {
      i++;
    }

    const t = (x - input[i]) / (input[i + 1] - input[i]);
    return output[i] + t * (output[i + 1] - output[i]);
  };
}

function Dock() {
  const [mouseX, setMouseX] = useState(null);
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const dockRef = useRef();

  // Distance inputs for scaling
  const baseWidth = 40;
  const distanceLimit = baseWidth * 6;
  const distanceInput = [-distanceLimit, -distanceLimit / 1.25, -distanceLimit / 2, 0, distanceLimit / 2, distanceLimit / 1.25, distanceLimit];
  const widthOutput = [baseWidth, baseWidth * 1.1, baseWidth * 1.414, baseWidth * 2, baseWidth * 1.414, baseWidth * 1.1, baseWidth];
  const getWidthFromDistance = customInterpolate(distanceInput, widthOutput);

  const handleMouseMove = (e) => {
    // Only track mouse movement if within the dock area
    const rect = dockRef.current?.getBoundingClientRect();
    if (rect && e.clientY >= rect.top && e.clientY <= rect.bottom) {
      setMouseX(e.clientX);
    } else {
      setMouseX(null); // Reset when the mouse is outside the dock
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleMouseEnterIcon = (index) => {
    setHoveredIcon(index);
  };

  const handleMouseLeaveIcon = () => {
    setHoveredIcon(null);
  };

  const calculateIconSize = (iconCenterX) => {
    if (mouseX === null) return baseWidth;
    const distance = mouseX - iconCenterX;
    return getWidthFromDistance(distance);
  };

  const icons = [
    { src: "/icons/finder.png", alt: "Finder" },
    { src: "/icons/maps.png", alt: "Maps" },
    { src: "/icons/calendar.png", alt: "Calendar" },
    { src: "/icons/contacts.png", alt: "Contacts" },
    { src: "/icons/message.png", alt: "iMessage" },
    { src: "/icons/safari.png", alt: "Safari" },
    { src: "/icons/facetime.png", alt: "Facetime" },
    { src: "/icons/vscode.png", alt: "VSCode" },
    { src: "/icons/chrome.png", alt: "Chrome" },
    { src: "/icons/spotify.png", alt: "Spotify" },
    { src: "/icons/bin.png", alt: "Bin" },
  ];

  return (
    <DockContainer>
      <DockInner ref={dockRef}>
        {icons.map((icon, index) => {
          let iconSize = baseWidth;
          if (dockRef.current) {
            const rect = dockRef.current.getBoundingClientRect();
            const iconCenterX = rect.left + (index * (baseWidth + 20)) + (baseWidth / 2);
            iconSize = calculateIconSize(iconCenterX);
          }

          return (
            <DockIconContainer
              key={index}
              onMouseEnter={() => handleMouseEnterIcon(index)}
              onMouseLeave={handleMouseLeaveIcon}
              isHovered={hoveredIcon === index}
              iconSize={iconSize}
            >
              <img src={icon.src} alt={icon.alt} />
              <div className="tooltip">{icon.alt}</div>
            </DockIconContainer>
          );
        })}
      </DockInner>
    </DockContainer>
  );
}

export default Dock;
