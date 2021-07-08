import React, {useEffect, useReducer} from 'react';
import Tabs from './components/Tabs';
import AddressBar from './components/AddressBar';
import './App.css';

type StateType = {
  browsers: string[]
  activeBrowser: number
}
type ActionType = {
  type: string
  payload?: number | string
}

const reducer = (state: StateType, action: ActionType): StateType => {
  const {browsers, activeBrowser} = state;
  const {type, payload} = action;
  if (type === 'ADD') {
    const newBrowsers = [...browsers, ''];
    const activeBrowser = newBrowsers.length - 1;
    return {browsers: newBrowsers, activeBrowser};
  } else if (type === 'CHOOSE') {
    return {...state, activeBrowser: payload} as StateType;
  } else if (type === 'UPDATE') {
    const newBrowsers = [...browsers];
    if (typeof payload === 'string') {
      newBrowsers[activeBrowser] = payload;
    }
    return {...state, browsers: newBrowsers};
  } else if (type === 'CLOSE') {
    const oldBrowsers = [...browsers];
    const newBrowsers = oldBrowsers.filter((b, index) => index !== payload);
    const oldUrl = oldBrowsers[activeBrowser];
    const activeTab = activeBrowser > newBrowsers.length - 1
        ? newBrowsers.length - 1
        : newBrowsers.findIndex(b => b === oldUrl);
    return { browsers: newBrowsers, activeBrowser: activeTab };
  } else {
    return state;
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    browsers: [
      'https://www.google.com/webhp?igu=1',
      'https://www.codepen.io'
    ],
    activeBrowser: 0
  })

  const {browsers, activeBrowser} = state;
  const url = browsers[activeBrowser];

  const chooseBrowser = (id: number) => dispatch({type: 'CHOOSE', payload: id});
  const addBrowser = () => dispatch({type: 'ADD'});
  const updateBrowser = (url: string) => dispatch({type: 'UPDATE', payload: url});
  const closeBrowser = (id: number) => dispatch({type: 'CLOSE', payload: id});

  useEffect(() => {},[browsers]);

  return (
      <div className="app">
        <div className="browser">
          <Tabs
              browsers={browsers}
              active={activeBrowser}
              choose={chooseBrowser}
              add={addBrowser}
              close={closeBrowser}
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
