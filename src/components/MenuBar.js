import React, { useState , useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Modal } from 'antd';
import { FaApple, FaWifi, FaBatteryFull, FaBatteryQuarter, FaBatteryHalf, FaBatteryThreeQuarters, FaBatteryEmpty } from 'react-icons/fa';
import AboutThisMacContent from './AboutThisMacContent'; 

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;

const MenuBarContainer = styled.div`
  width: 100%;
  height: 24px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px;
  left:0;
  color: white;
  z-index: 1000;
  font-size:10px;
`;

const MenuItems = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  
`;

const RightIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-right: 10px;
`;

const MenuItem = styled.div`
  font-size: 12px;
  cursor: pointer;
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 24px;
  left: 0;
  background-color: rgba(0, 0, 0, 0.9);
  color: white;
  list-style: none;
  padding: 10px;
  margin: 0;
  width: 200px;
  border-radius: 4px;
  display: ${(props) => (props.show ? 'block' : 'none')};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4);

  li {
    padding: 5px 10px;
    cursor: pointer;
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }

  li.divider {
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    margin: 5px 0;
  }
`;

const getFormattedDate = () => {
  const now = new Date();
  const options = { weekday: "short", day: "numeric", month: "short", hour: "numeric", minute: "numeric", hour12: true };
  return now.toLocaleString("en-US", options);
};

function MenuBar() {
  const [dateTime, setDateTime] = useState(getFormattedDate());
  const [batteryLevel, setBatteryLevel] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const showAboutThisMacModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  useEffect(() => {
    // Update the time every minute
    const intervalId = setInterval(() => {
      setDateTime(getFormattedDate());
    }, 60000); // 60000 ms = 1 minute

     // Battery status
     if ('getBattery' in navigator) {
      navigator.getBattery().then(battery => {
        setBatteryLevel(battery.level);
        battery.onlevelchange = () => setBatteryLevel(battery.level);
      });
    }

     // Listen for online/offline events
    const handleOnlineStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);


    // Cleanup interval on component unmount
 return () => {
      clearInterval(intervalId);
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

    // Determine battery icon based on battery level
    const getBatteryIcon = () => {
      if (batteryLevel === null) return <FaBatteryEmpty size={14} />;
      if (batteryLevel >= 0.75) return <FaBatteryFull size={14} />;
      if (batteryLevel >= 0.5) return <FaBatteryThreeQuarters size={14} />;
      if (batteryLevel >= 0.25) return <FaBatteryHalf size={14} />;
      return <FaBatteryQuarter size={14} />;
    };

  return (
    <>
    <GlobalStyle />
    <MenuBarContainer>
      <MenuItems>
      <FaApple size={14} onClick={toggleDropdown} style={{ cursor: 'pointer' }} />
        <MenuItem>Finder</MenuItem>
        <MenuItem>File</MenuItem>
        <MenuItem>Edit</MenuItem>
        <MenuItem>View</MenuItem>
        <MenuItem>Go</MenuItem>
        <MenuItem>Window</MenuItem>
        <MenuItem>Help</MenuItem>
      </MenuItems>

        {/* Dropdown Menu */}
        <DropdownMenu show={showDropdown}>
        <li onClick={showAboutThisMacModal}>About This Mac</li>
        <li>System Preferences...</li>
        <li>App Store...</li>
        <li className="divider"></li>
        <li>Force Quit Finder</li>
        <li className="divider"></li>
        <li>Sleep</li>
        <li>Restart...</li>
        <li>Shut Down...</li>
        <li className="divider"></li>
        <li>Lock Screen</li>
        <li>Log Out</li>
      </DropdownMenu>


      <RightIcons>
        <FaWifi size={14} color={isOnline ? 'white' : 'gray'} />
        <div title={batteryLevel !== null ? `Battery Level: ${Math.round(batteryLevel * 100)}%` : 'Battery Status Unknown'}>
            {getBatteryIcon()}
          </div>
        <MenuItem>{dateTime}</MenuItem>
      </RightIcons>

       {/* About This Mac Modal */}
       <Modal
        title="About This Mac"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <AboutThisMacContent />
      </Modal>


    </MenuBarContainer>
    </>
  );
}

export default MenuBar;
