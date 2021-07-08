import React, {useEffect, useState} from 'react';
import {OnSubmit} from "react-hook-form";

type PropsType = {
  update: Function
  url: string
}

const AddressBar = ({ update, url }: PropsType): JSX.Element => {

  const [value, setValue] = useState(url || '');

  const addHttps = (url: string): string => {
    if(!url.startsWith('http') || !url.startsWith('https')) {
      return `https://${url}`
    }
    return url;
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const httpsUrl = addHttps(value);
    update(httpsUrl);
  };

  useEffect(() => {
    setValue(url);
  }, [url])

  return (
    <div className="address-bar">
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
            type="text"
            name="url"
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
      </form>
    </div>
  );
}

export default AddressBar;
