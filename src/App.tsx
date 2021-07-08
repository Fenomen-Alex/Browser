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

  return (
    <div className="app">
      <div className="browser">
        <Tabs browsers={browsers} active={activeBrowser} />

        <AddressBar />

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
