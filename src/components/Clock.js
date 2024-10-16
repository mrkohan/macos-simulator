import React, { useEffect } from 'react';
import styled from 'styled-components';

const ClockContainer = styled.div`
  width: 120px;
  height: 120px;
  border: 8px solid rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  position: relative;
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  margin:0 auto;
`;

const ClockCenter = styled.div`
  width: 10px;
  height: 10px;
  background-color: black;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Hand = styled.div`
  width: 46%!important;
  height: 2px;
  background-color: black;
  position: absolute;
  top: 50%;
  transform-origin: 100%;
  transform: rotate(${(props) => props.angle}deg);
  transition: transform 0.5s ease-in-out;
`;

function Clock() {
  const updateClock = () => {
    const now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    const secondHandAngle = (seconds / 60) * 360;
    const minuteHandAngle = (minutes / 60) * 360 + (seconds / 60) * 6;
    const hourHandAngle = (hours / 12) * 360 + (minutes / 60) * 30;

    document.getElementById('second-hand').style.transform = `rotate(${secondHandAngle}deg)`;
    document.getElementById('minute-hand').style.transform = `rotate(${minuteHandAngle}deg)`;
    document.getElementById('hour-hand').style.transform = `rotate(${hourHandAngle}deg)`;
  };

  useEffect(() => {
    // Update clock every second
    const interval = setInterval(updateClock, 1000);

    // Cleanup the interval on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <ClockContainer>
      <ClockCenter />
      <Hand id="hour-hand" angle={0} style={{ height: '6px', width: '35%' }} />
      <Hand id="minute-hand" angle={0} style={{ height: '4px', width: '45%' }} />
      <Hand id="second-hand" angle={0} style={{ height: '2px', width: '50%', backgroundColor: 'red' }} />
    </ClockContainer>
  );
}

export default Clock;
