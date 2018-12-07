import React from "react";

export default class StorePicker extends React.Component {
  render() {
    return (
      <form className="store-selector">
        <h2>Please Enter a Store</h2>
        <input type="text" require placeholder="Store Name" />
        <button type="submit">
          Visit Store
          <span role="img" aria-label="fish">
            🐟
          </span>
        </button>
      </form>
    );
  }
}
