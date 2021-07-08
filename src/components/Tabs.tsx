import React, {useState} from 'react';

type TabsPropsType = {
  browsers: string[]
  active: number
  choose: Function
  add: Function
}

const Tabs = ({browsers, active, add, choose}: TabsPropsType): JSX.Element => {
  return (
      <div className="tabs">
        {browsers.map((browser, index) => (
            <Tab key={index} isActive={active === index}>
              <button onClick={() => choose(index)}>{browser}</button>
            </Tab>))}
        <Tab>
          <button onClick={() => add()}>+</button>
        </Tab>
      </div>
  );
}

export default Tabs;

type TabPropsType = {
  index?: number
  children?: JSX.Element
  close?: Function
  isActive?: boolean
}

const Tab = ({index, children, close, isActive}: TabPropsType): JSX.Element => {
  const [highlightStyle, setHighlightStyle] = useState({
    left: 0,
    opacity: 1
  });

  function moveHighlight(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    setHighlightStyle({
      opacity: 0.4,
      left: e.nativeEvent.offsetX - 250,
    });
  }

  function hideHighlight(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    setHighlightStyle({opacity: 0, left: e.nativeEvent.offsetX - 250});
  }

  return (
      <div
          className={`tab ${isActive ? 'is-active' : ''}`}
          onMouseOut={(e) => hideHighlight(e)}
          onMouseMove={(e) => moveHighlight(e)}
      >
        <div className="highlight" style={highlightStyle}/>
        {children}
        {close && (
            <button className="close-tab" onClick={() => close(index)}>
              x
            </button>
        )}
      </div>
  );
}
