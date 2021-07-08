import React from 'react';

const AddressBar = (): JSX.Element => {
  return (
    <div className="address-bar">
      <form>
        <input type="text" name="url" />
      </form>
    </div>
  );
}

export default AddressBar;
