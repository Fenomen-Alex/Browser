import React, {useState} from 'react';
import Tabs from './components/Tabs';
import AddressBar from './components/AddressBar';
import './App.css';

const App = () => {
  const [browsers, setBrowsers] = useState([
      'https://google.com',
      'https://codepen.io'
  ]);
  const [activeBrowser, setActiveBrowser] = useState(0);

  const url = browsers[activeBrowser];

  const chooseBrowser = (id: number) => {
    setActiveBrowser(id);
  }
  const addBrowser = () => {
    const newBrowsers = [...browsers, ''];
    setBrowsers(newBrowsers);
    setActiveBrowser(newBrowsers.length - 1);
  }
  const updateBrowser = (url: string) => {
    const newBrowsers = [...browsers, ''];
    newBrowsers[activeBrowser] = url;
    setBrowsers(newBrowsers);
  }

  return (
    <div className="app">
      <div className="browser">
        <Tabs
            browsers={browsers}
            active={activeBrowser}
            choose={chooseBrowser}
            add={addBrowser}
        />

        <AddressBar
        update={updateBrowser}
        url={url}
        />

        <div className="viewport">
          {url ? (
              <iframe src={url} title="Tab"/>
          ) : (
              <>New Tab Page</>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
