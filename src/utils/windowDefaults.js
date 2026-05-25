const MENU_BAR_HEIGHT = 27;
const WINDOW_OFFSET_TOP = 100;
const WINDOW_OFFSET_LEFT = 100;

export function getViewportSize() {
  return {
    width: window.innerWidth,
    height: window.innerHeight - MENU_BAR_HEIGHT,
  };
}

export function getDefaultWindowSize(appName) {
  const { width: vw, height: vh } = getViewportSize();

  switch (appName) {
    case 'Safari':
    case 'Chrome':
      return {
        width: Math.round(vw * 0.6),
        height: Math.round(vh * 0.6),
      };
    case 'VSCode':
    case 'Finder':
      return {
        width: Math.round(vw * 0.55),
        height: Math.round(vh * 0.55),
      };
    case 'Terminal':
      return {
        width: Math.round(vw * 0.45),
        height: Math.round(vh * 0.5),
      };
    default:
      return { width: 600, height: 400 };
  }
}

export function getDefaultWindowPosition(width, height) {
  const { width: vw, height: vh } = getViewportSize();
  return {
    x: Math.max(0, Math.round((vw - width) / 2) - WINDOW_OFFSET_LEFT + 50),
    y: Math.max(0, Math.round((vh - height) / 2) - WINDOW_OFFSET_TOP + 50),
  };
}

export function getWindowDefaults(appName) {
  const size = getDefaultWindowSize(appName);
  return {
    ...size,
    position: getDefaultWindowPosition(size.width, size.height),
  };
}