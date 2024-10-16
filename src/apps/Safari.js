import React, { useState, useRef } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import styled from "styled-components";

// Styled components for the browser interface
const SafariContainer = styled.div`
  height: 100%;
  margin: auto;
  border-radius: 15px;
  background-color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
`;

const TabBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #f1f1f1;
  padding: 9px 0px 0px 0px;
  border-bottom: 1px solid #e0e0e0;
`;

const Tab = styled.div`
  padding: 5px 15px;
  margin-right: 10px;
  background-color: ${(props) => (props.active ? '#ffffff' : '#e0e0e0')};
  border-radius: 8px 8px 0px 0px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background-color: #ddd;
  }
`;

const CloseIcon = styled(FaTimes)`
  color: gray;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    color: black;
  }
`;

const AddTabButton = styled(FaPlus)`
  font-size: 18px;
  cursor: pointer;

  &:hover {
    color: black;
  }
`;

const BrowserBar = styled.div`
  display: flex;
  padding: 10px;
  background-color: #f1f1f1;
`;

const UrlInput = styled.input`
  flex: 1;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  outline: none;
  margin-right: 10px;
`;

const GoButton = styled.button`
  padding: 8px 12px;
  background-color: #007aff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #005bb5;
  }
`;

const ReButton = styled.button`
  padding: 8px 12px;
  background-color: #007aff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left:5px;
  &:hover {
    background-color: #005bb5;
  }
`;

const IframeContainer = styled.div`
  flex: 1;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const EmptyTab = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  height: 100%;
`;

const Safari = () => {
  const iframeRef = useRef(null);
  const [tabs, setTabs] = useState([{ id: 1, url: "https://kohan.com.tr", currentURLIndex: 0 }]); 
  const [activeTab, setActiveTab] = useState(1); // Set the first tab as active
  const [url, setUrl] = useState('');

  // Handle new tab
  const addNewTab = () => {
    const newTab = { id: tabs.length + 1, url: "about:blank", currentURLIndex: 0 };
    setTabs([...tabs, newTab]);
    setActiveTab(newTab.id);
    setUrl('');
  };

  // Handle switching between tabs
  const openTab = (tabId: number) => {
    setActiveTab(tabId);
    const activeTab = tabs.find((tab) => tab.id === tabId);
    if (activeTab) {
      setUrl(activeTab.url);
    }
  };

  // Handle closing a tab
  const closeTab = (tabId: number) => {
    const newTabs = tabs.filter((tab) => tab.id !== tabId);
    setTabs(newTabs);

    // If closing active tab, set another tab as active
    if (activeTab === tabId && newTabs.length > 0) {
      setActiveTab(newTabs[0].id);
      setUrl(newTabs[0].url);
    } else if (newTabs.length === 0) {
      // If no tabs left, reset everything
      addNewTab();
    }
  };

  // Handle URL change and navigation
  const goToUrl = () => {
    setTabs(
      tabs.map((tab) =>
        tab.id === activeTab ? { ...tab, url: url } : tab
      )
    );
  };

  // Refresh the iframe when needed
  const refreshIframe = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src; // Reload iframe
    }
  };

  return (
    <SafariContainer>
      {/* Tab Bar */}
      <TabBar>
        {tabs.map((tab) => (
          <Tab key={tab.id} active={tab.id === activeTab} onClick={() => openTab(tab.id)}>
            Tab {tab.id}
            <CloseIcon onClick={() => closeTab(tab.id)} />
          </Tab>
        ))}
        <AddTabButton onClick={addNewTab} />
      </TabBar>

      {/* Browser Bar */}
      <BrowserBar>
        <UrlInput
          type="text"
          placeholder="Enter website or search"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && goToUrl()}
        />
        <GoButton onClick={goToUrl}>Go</GoButton>
        <ReButton onClick={refreshIframe}>Refresh</ReButton>
      </BrowserBar>

      {/* Iframe for website */}
      <IframeContainer>
        {tabs.find((tab) => tab.id === activeTab)?.url ? (
          <Iframe
            ref={iframeRef} // Assigning ref to iframe
            title="safari-browser"
            className="safari-iframe"
            src={tabs.find((tab) => tab.id === activeTab)?.url}
          />
        ) : (
          <EmptyTab>New Tab</EmptyTab>
        )}
      </IframeContainer>
    </SafariContainer>
  );
};

export default Safari;
