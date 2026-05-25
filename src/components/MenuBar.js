import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Modal, message } from 'antd';
import {
  FaApple,
  FaWifi,
  FaBatteryFull,
  FaBatteryQuarter,
  FaBatteryHalf,
  FaBatteryThreeQuarters,
  FaBatteryEmpty,
} from 'react-icons/fa';
import AboutThisMacContent from './AboutThisMacContent';

const MenuBarContainer = styled.div`
  width: 100%;
  height: 27px;
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  color: white;
  z-index: 3000;
  font-size: 13px;
  user-select: none;
`;

const MenuItems = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  position: relative;
`;

const RightIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const MenuLabel = styled.div`
  position: relative;
  font-weight: 500;
  padding: 2px 8px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;

const AppleButton = styled.button`
  display: flex;
  align-items: center;
  border: none;
  background: transparent;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  background: rgba(40, 40, 40, 0.95);
  backdrop-filter: blur(12px);
  color: white;
  list-style: none;
  padding: 6px 0;
  margin: 0;
  min-width: 220px;
  border-radius: 6px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  z-index: 6000;

  li {
    padding: 6px 16px;
    font-size: 13px;
    cursor: pointer;
    white-space: nowrap;

    &:hover:not(.disabled) {
      background: #007aff;
    }

    &.disabled {
      color: rgba(255, 255, 255, 0.35);
      cursor: default;
    }

    &.divider {
      height: 0;
      padding: 0;
      margin: 6px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      pointer-events: none;
    }
  }
`;

const getFormattedDate = () => {
  const now = new Date();
  return now.toLocaleString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
};

function MenuBar({
  focusedApp,
  windows = [],
  openWindow,
  closeWindow,
  restoreAllWindows,
  minimizeAllWindows,
  minimizeOthers,
  cycleFocus,
  onMinimizeFocused,
  onZoomFocused,
  onLogOut,
}) {
  const [dateTime, setDateTime] = useState(getFormattedDate());
  const [batteryLevel, setBatteryLevel] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [activeMenu, setActiveMenu] = useState(null);
  const [aboutOpen, setAboutOpen] = useState(false);

  const closeMenus = useCallback(() => setActiveMenu(null), []);

  const toggleMenu = (id) => {
    setActiveMenu((prev) => (prev === id ? null : id));
  };

  const visibleWindowCount = windows.filter((w) => !w.minimized).length;

  const requireFocus = (fn) => {
    if (!focusedApp) {
      message.info('No window selected');
      return;
    }
    fn();
  };

  const handleMenuAction = (action) => {
    switch (action) {
      case 'about-mac':
        setAboutOpen(true);
        break;
      case 'about-finder':
        setAboutOpen(true);
        break;
      case 'open-finder':
        openWindow('Finder');
        break;
      case 'open-safari':
        openWindow('Safari');
        break;
      case 'open-bin':
        openWindow('Bin');
        break;
      case 'close-window':
        requireFocus(() => closeWindow(focusedApp));
        break;
      case 'force-quit':
        requireFocus(() => {
          closeWindow(focusedApp);
          message.success(`${focusedApp} force quit`);
        });
        break;
      case 'minimize-window':
        requireFocus(() => onMinimizeFocused?.());
        break;
      case 'zoom-window':
        requireFocus(() => onZoomFocused?.());
        break;
      case 'hide-others':
        minimizeOthers?.();
        message.success('Other windows hidden');
        break;
      case 'show-all':
        restoreAllWindows?.();
        message.success('All windows shown');
        break;
      case 'cycle-windows':
        cycleFocus?.();
        break;
      case 'copy':
        navigator.clipboard?.writeText('Copied from macOS Simulator');
        message.success('Copied to clipboard');
        break;
      case 'paste':
        navigator.clipboard?.readText?.().then((text) => {
          message.success(text ? `Paste: ${text.slice(0, 40)}…` : 'Clipboard empty');
        });
        break;
      case 'fullscreen':
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          document.documentElement.requestFullscreen?.().catch(() => {
            message.warning('Fullscreen not supported');
          });
        }
        break;
      case 'reload':
        window.location.reload();
        break;
      case 'sleep':
        minimizeAllWindows?.();
        message.info('Sleep — all windows minimized');
        break;
      case 'logout':
      case 'lock':
        onLogOut?.();
        break;
      case 'restart':
        Modal.confirm({
          title: 'Restart?',
          content: 'The simulator will reload.',
          onOk: () => window.location.reload(),
        });
        break;
      case 'shutdown':
        Modal.confirm({
          title: 'Shut Down?',
          onOk: () => onLogOut?.(),
        });
        break;
      default:
        message.info('Not available in simulator');
    }
    closeMenus();
  };

  const appleItems = [
    { label: 'About This Mac', action: 'about-mac' },
    { divider: true },
    { label: 'System Preferences…', action: 'default' },
    { label: 'App Store…', action: 'open-safari' },
    { divider: true },
    { label: 'Force Quit…', action: 'force-quit', disabled: !focusedApp },
    { divider: true },
    { label: 'Sleep', action: 'sleep' },
    { label: 'Restart…', action: 'restart' },
    { label: 'Shut Down…', action: 'shutdown' },
    { divider: true },
    { label: 'Lock Screen', action: 'lock' },
    { label: 'Log Out Reza…', action: 'logout' },
  ];

  const finderItems = [
    { label: 'About Finder', action: 'about-finder' },
    { label: 'Preferences…', action: 'default' },
    { divider: true },
    { label: 'Empty Bin…', action: 'open-bin' },
    { divider: true },
    { label: 'Hide Finder', action: 'minimize-window', disabled: focusedApp !== 'Finder' },
    { label: 'Hide Others', action: 'hide-others' },
    { label: 'Show All', action: 'show-all' },
    { divider: true },
    { label: 'Quit Finder', action: 'close-window', disabled: focusedApp !== 'Finder' },
  ];

  const fileItems = [
    { label: 'New Finder Window', action: 'open-finder' },
    { label: 'New Folder', action: 'default' },
    { divider: true },
    { label: 'Close Window', action: 'close-window', disabled: !focusedApp },
    { label: 'Get Info', action: 'default' },
  ];

  const editItems = [
    { label: 'Undo', action: 'default', disabled: true },
    { divider: true },
    { label: 'Cut', action: 'default', disabled: true },
    { label: 'Copy', action: 'copy' },
    { label: 'Paste', action: 'paste' },
    { label: 'Select All', action: 'default' },
  ];

  const viewItems = [
    { label: 'Enter Full Screen', action: 'fullscreen' },
    { label: 'Zoom In', action: 'zoom-window', disabled: !focusedApp },
    { label: 'Zoom Out', action: 'minimize-window', disabled: !focusedApp },
  ];

  const goItems = [
    { label: 'All Applications', action: 'open-finder' },
    { label: 'Computer', action: 'open-finder' },
    { label: 'Desktop', action: 'open-finder' },
  ];

  const windowItems = [
    { label: 'Minimize', action: 'minimize-window', disabled: !focusedApp },
    { label: 'Zoom', action: 'zoom-window', disabled: !focusedApp },
    { divider: true },
    { label: 'Bring All to Front', action: 'show-all' },
    { label: 'Cycle Through Windows', action: 'cycle-windows', disabled: visibleWindowCount < 2 },
  ];

  const helpItems = [
    { label: 'Search Help', action: 'open-safari' },
    { label: 'Keyboard Shortcuts', action: 'default' },
  ];

  const menus = [
    { id: 'finder', label: focusedApp || 'Finder', items: finderItems },
    { id: 'file', label: 'File', items: fileItems },
    { id: 'edit', label: 'Edit', items: editItems },
    { id: 'view', label: 'View', items: viewItems },
    { id: 'go', label: 'Go', items: goItems },
    { id: 'window', label: 'Window', items: windowItems },
    { id: 'help', label: 'Help', items: helpItems },
  ];

  useEffect(() => {
    const tick = setInterval(() => setDateTime(getFormattedDate()), 1000);
    if ('getBattery' in navigator) {
      navigator.getBattery().then((battery) => {
        setBatteryLevel(battery.level);
        battery.onlevelchange = () => setBatteryLevel(battery.level);
      });
    }
    const onOnline = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOnline);

    const onDocClick = () => closeMenus();
    document.addEventListener('click', onDocClick);

    return () => {
      clearInterval(tick);
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOnline);
      document.removeEventListener('click', onDocClick);
    };
  }, [closeMenus]);

  const getBatteryIcon = () => {
    if (batteryLevel === null) return <FaBatteryEmpty size={14} />;
    if (batteryLevel >= 0.75) return <FaBatteryFull size={14} />;
    if (batteryLevel >= 0.5) return <FaBatteryThreeQuarters size={14} />;
    if (batteryLevel >= 0.25) return <FaBatteryHalf size={14} />;
    return <FaBatteryQuarter size={14} />;
  };

  const renderDropdown = (items) => (
    <DropdownMenu onClick={(e) => e.stopPropagation()}>
      {items.map((item, i) =>
        item.divider ? (
          <li key={`d-${i}`} className="divider" />
        ) : (
          <li
            key={item.label}
            className={item.disabled ? 'disabled' : ''}
            onClick={() => !item.disabled && handleMenuAction(item.action)}
          >
            {item.label}
          </li>
        )
      )}
    </DropdownMenu>
  );

  return (
    <>
      <MenuBarContainer onClick={(e) => e.stopPropagation()}>
        <MenuItems>
          <AppleButton
            type="button"
            aria-label="Apple menu"
            onClick={(e) => {
              e.stopPropagation();
              toggleMenu('apple');
            }}
          >
            <FaApple size={15} />
          </AppleButton>
          {activeMenu === 'apple' && (
            <DropdownMenu
              style={{ left: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {appleItems.map((item, i) =>
                item.divider ? (
                  <li key={`a-${i}`} className="divider" />
                ) : (
                  <li
                    key={item.label}
                    className={item.disabled ? 'disabled' : ''}
                    onClick={() => !item.disabled && handleMenuAction(item.action)}
                  >
                    {item.label}
                  </li>
                )
              )}
            </DropdownMenu>
          )}

          {menus.map((menu) => (
            <MenuLabel
              key={menu.id}
              onClick={(e) => {
                e.stopPropagation();
                toggleMenu(menu.id);
              }}
            >
              {menu.label}
              {activeMenu === menu.id && renderDropdown(menu.items)}
            </MenuLabel>
          ))}
        </MenuItems>

        <RightIcons>
          <FaWifi size={14} color={isOnline ? 'white' : 'gray'} title={isOnline ? 'Online' : 'Offline'} />
          <div title={batteryLevel != null ? `${Math.round(batteryLevel * 100)}%` : 'Battery'}>
            {getBatteryIcon()}
          </div>
          <span>{dateTime}</span>
        </RightIcons>
      </MenuBarContainer>

      <Modal
        title="About This Mac"
        open={aboutOpen}
        onCancel={() => setAboutOpen(false)}
        footer={null}
      >
        <AboutThisMacContent />
      </Modal>
    </>
  );
}

export default MenuBar;
