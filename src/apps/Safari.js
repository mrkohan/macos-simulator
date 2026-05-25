import React, { useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import {
  FaArrowLeft,
  FaArrowRight,
  FaRedo,
  FaPlus,
  FaTimes,
  FaLock,
} from 'react-icons/fa';

const Container = styled.div`
  flex: 1;
  width: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  background: #f5f5f7;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`;

const TabBar = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 6px;
  padding: 8px 12px 0;
  background: #e8e8ed;
  border-bottom: 1px solid #d1d1d6;
  overflow-x: auto;
  flex-shrink: 0;

  &::-webkit-scrollbar {
    height: 4px;
  }
`;

const Tab = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  max-width: 200px;
  padding: 8px 12px;
  border: none;
  border-radius: 8px 8px 0 0;
  background: ${(props) => (props.active ? '#f5f5f7' : '#d8d8dd')};
  color: #1d1d1f;
  font-size: 12px;
  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    background: ${(props) => (props.active ? '#f5f5f7' : '#ececef')};
  }

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const TabClose = styled.span`
  display: flex;
  padding: 2px;
  border-radius: 4px;
  opacity: 0.6;

  &:hover {
    opacity: 1;
    background: rgba(0, 0, 0, 0.1);
  }
`;

const NewTabButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  margin-bottom: 4px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: #555;
  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    background: rgba(0, 0, 0, 0.08);
  }
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: #f5f5f7;
  border-bottom: 1px solid #d1d1d6;
  flex-shrink: 0;
`;

const NavButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: ${(props) => (props.disabled ? '#c7c7cc' : '#1d1d1f')};
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};

  &:hover:not(:disabled) {
    background: rgba(0, 0, 0, 0.06);
  }
`;

const AddressBar = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 14px;
  height: 36px;
  background: #fff;
  border: 1px solid #d1d1d6;
  border-radius: 10px;
  min-width: 0;

  &:focus-within {
    border-color: #007aff;
    box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.2);
  }

  svg {
    color: #86868b;
    flex-shrink: 0;
  }
`;

const UrlInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  min-width: 0;
  background: transparent;
`;

const Content = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  background: #fff;
`;

const Frame = styled.iframe`
  flex: 1;
  width: 100%;
  min-height: 0;
  border: none;
  background: #fff;
`;

const StartPage = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background: linear-gradient(180deg, #f5f5f7 0%, #fff 100%);
  text-align: center;
`;

const StartTitle = styled.h1`
  margin: 0 0 8px;
  font-size: 28px;
  font-weight: 600;
  color: #1d1d1f;
`;

const StartSubtitle = styled.p`
  margin: 0 0 32px;
  color: #86868b;
  font-size: 15px;
`;

const BlockedPage = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: center;
  background: #f5f5f7;
`;

const BlockedTitle = styled.h2`
  margin: 0 0 12px;
  font-size: 22px;
  color: #1d1d1f;
`;

const BlockedText = styled.p`
  margin: 0 0 24px;
  max-width: 400px;
  color: #86868b;
  font-size: 14px;
  line-height: 1.5;
`;

const OpenExternalButton = styled.button`
  padding: 10px 24px;
  border: none;
  border-radius: 8px;
  background: #007aff;
  color: #fff;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background: #0066d6;
  }
`;

const HomeButton = styled.button`
  margin-top: 12px;
  padding: 8px 16px;
  border: none;
  background: transparent;
  color: #007aff;
  font-size: 13px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Favorites = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 20px;
  max-width: 520px;
  width: 100%;
`;

const Favorite = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 12px;
  border: none;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  font-size: 12px;
  color: #1d1d1f;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  span:first-child {
    font-size: 28px;
  }
`;

const HOME_URL = 'https://kohan.com.tr';

const FAVORITES = [
  { name: 'Kohan', url: HOME_URL, icon: '🏠' },
  { name: 'Wikipedia', url: 'https://www.wikipedia.org', icon: '📚' },
  { name: 'MDN Web Docs', url: 'https://developer.mozilla.org', icon: '📖' },
  { name: 'Example', url: 'https://example.com', icon: '🌐' },
];

/** Sites that block embedding in iframes (X-Frame-Options / CSP) */
const IFRAME_BLOCKED_HOSTS = [
  'apple.com',
  'google.com',
  'github.com',
  'facebook.com',
  'twitter.com',
  'x.com',
  'youtube.com',
];

function isIframeBlocked(url) {
  try {
    const host = new URL(url).hostname.replace(/^www\./, '');
    return IFRAME_BLOCKED_HOSTS.some(
      (blocked) => host === blocked || host.endsWith(`.${blocked}`)
    );
  } catch {
    return false;
  }
}

function normalizeUrl(input) {
  const trimmed = input.trim();
  if (!trimmed) return HOME_URL;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed.includes('.') && !trimmed.includes(' ')) {
    return `https://${trimmed}`;
  }
  return `https://www.google.com/search?q=${encodeURIComponent(trimmed)}`;
}

function getTabTitle(url) {
  if (!url || url === 'about:blank') return 'New Tab';
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return 'Page';
  }
}

function createTab(id, url = '') {
  const normalized = url ? normalizeUrl(url) : '';
  return {
    id,
    url: normalized,
    title: getTabTitle(normalized),
    history: normalized ? [normalized] : [],
    historyIndex: normalized ? 0 : -1,
  };
}

let nextTabId = 2;

function Safari() {
  const iframeRef = useRef(null);
  const [tabs, setTabs] = useState([createTab(1, HOME_URL)]);
  const [activeTabId, setActiveTabId] = useState(1);
  const [addressInput, setAddressInput] = useState(HOME_URL);

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  const navigateTab = useCallback((tabId, rawUrl, { pushHistory = true } = {}) => {
    const url = normalizeUrl(rawUrl);
    setTabs((prev) =>
      prev.map((t) => {
        if (t.id !== tabId) return t;
        let history = [...t.history];
        let historyIndex = t.historyIndex;
        if (pushHistory) {
          history = history.slice(0, historyIndex + 1);
          history.push(url);
          historyIndex = history.length - 1;
        } else if (historyIndex >= 0) {
          history[historyIndex] = url;
        } else {
          history = [url];
          historyIndex = 0;
        }
        return {
          ...t,
          url,
          title: getTabTitle(url),
          history,
          historyIndex,
        };
      })
    );
    if (tabId === activeTabId) setAddressInput(url);
  }, [activeTabId]);

  const selectTab = (tabId) => {
    setActiveTabId(tabId);
    const tab = tabs.find((t) => t.id === tabId);
    setAddressInput(tab?.url || '');
  };

  const addTab = (url = '') => {
    const id = nextTabId++;
    const tab = createTab(id, url);
    setTabs((prev) => [...prev, tab]);
    setActiveTabId(id);
    setAddressInput(tab.url || '');
  };

  const closeTab = (tabId, e) => {
    e.stopPropagation();
    setTabs((prev) => {
      const next = prev.filter((t) => t.id !== tabId);
      if (next.length === 0) {
        const fresh = createTab(nextTabId++);
        setActiveTabId(fresh.id);
        setAddressInput('');
        return [fresh];
      }
      if (activeTabId === tabId) {
        const idx = prev.findIndex((t) => t.id === tabId);
        const newActive = next[Math.min(idx, next.length - 1)];
        setActiveTabId(newActive.id);
        setAddressInput(newActive.url || '');
      }
      return next;
    });
  };

  const go = () => navigateTab(activeTabId, addressInput);

  const goBack = () => {
    const tab = tabs.find((t) => t.id === activeTabId);
    if (!tab || tab.historyIndex <= 0) return;
    const newIndex = tab.historyIndex - 1;
    const url = tab.history[newIndex];
    setTabs((prev) =>
      prev.map((t) =>
        t.id === activeTabId
          ? { ...t, historyIndex: newIndex, url, title: getTabTitle(url) }
          : t
      )
    );
    setAddressInput(url);
  };

  const goForward = () => {
    const tab = tabs.find((t) => t.id === activeTabId);
    if (!tab || tab.historyIndex >= tab.history.length - 1) return;
    const newIndex = tab.historyIndex + 1;
    const url = tab.history[newIndex];
    setTabs((prev) =>
      prev.map((t) =>
        t.id === activeTabId
          ? { ...t, historyIndex: newIndex, url, title: getTabTitle(url) }
          : t
      )
    );
    setAddressInput(url);
  };

  const refresh = () => {
    const iframe = iframeRef.current;
    if (iframe) {
      const currentSrc = iframe.src;
      iframe.src = currentSrc;
    }
  };

  const canGoBack = activeTab?.historyIndex > 0;
  const canGoForward =
    activeTab && activeTab.historyIndex < activeTab.history.length - 1;
  const showStartPage = !activeTab?.url;
  const blockedEmbed = activeTab?.url && isIframeBlocked(activeTab.url);

  const openInBrowser = (url) => window.open(url, '_blank', 'noopener,noreferrer');

  const goHome = () => navigateTab(activeTabId, HOME_URL);

  return (
    <Container>
      <TabBar>
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            type="button"
            active={tab.id === activeTabId}
            onClick={() => selectTab(tab.id)}
          >
            <span>{tab.title}</span>
            <TabClose
              role="button"
              aria-label="Close tab"
              onClick={(e) => closeTab(tab.id, e)}
            >
              <FaTimes size={10} />
            </TabClose>
          </Tab>
        ))}
        <NewTabButton type="button" aria-label="New tab" onClick={() => addTab()}>
          <FaPlus size={12} />
        </NewTabButton>
      </TabBar>

      <Toolbar>
        <NavButton type="button" disabled={!canGoBack} onClick={goBack} title="Back">
          <FaArrowLeft size={14} />
        </NavButton>
        <NavButton
          type="button"
          disabled={!canGoForward}
          onClick={goForward}
          title="Forward"
        >
          <FaArrowRight size={14} />
        </NavButton>
        <NavButton type="button" onClick={refresh} title="Reload">
          <FaRedo size={13} />
        </NavButton>
        <AddressBar>
          <FaLock size={11} />
          <UrlInput
            value={addressInput}
            placeholder="Search or enter website name"
            onChange={(e) => setAddressInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && go()}
          />
        </AddressBar>
      </Toolbar>

      <Content>
        {showStartPage ? (
          <StartPage>
            <StartTitle>Safari</StartTitle>
            <StartSubtitle>Start Page</StartSubtitle>
            <Favorites>
              {FAVORITES.map((fav) => (
                <Favorite
                  key={fav.url}
                  type="button"
                  onClick={() => navigateTab(activeTabId, fav.url)}
                >
                  <span>{fav.icon}</span>
                  <span>{fav.name}</span>
                </Favorite>
              ))}
            </Favorites>
          </StartPage>
        ) : blockedEmbed ? (
          <BlockedPage>
            <BlockedTitle>This site cannot be shown in Safari</BlockedTitle>
            <BlockedText>
              {getTabTitle(activeTab.url)} does not allow embedding in a browser
              window (common for Apple, Google, and similar sites). Open it in your
              system browser instead.
            </BlockedText>
            <OpenExternalButton
              type="button"
              onClick={() => openInBrowser(activeTab.url)}
            >
              Open {getTabTitle(activeTab.url)} in Browser
            </OpenExternalButton>
            <HomeButton type="button" onClick={goHome}>
              Return to {getTabTitle(HOME_URL)}
            </HomeButton>
          </BlockedPage>
        ) : (
          <Frame
            ref={iframeRef}
            key={activeTab.url}
            src={activeTab.url}
            title={activeTab.title}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            referrerPolicy="no-referrer-when-downgrade"
          />
        )}
      </Content>
    </Container>
  );
}

export default Safari;
