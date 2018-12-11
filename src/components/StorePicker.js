import React from "react";
import PropTypes from "prop-types";
import { getFunName } from "../helpers";

export default class StorePicker extends React.Component {
  constructor() {
    // Super makes sure to first create the React.Component before we can extend StorePicker:
    super();
    // Allows us to reference 'this' inside our created method
    this.goToStore = this.goToStore.bind(this);
  }

  static propTypes = {
    history: PropTypes.object
  };

  // Creates a reference we can save dom info to, and then pull data from:
  myInput = React.createRef();

  // This has to be binded because this method we created didn't come with React.
  goToStore(e) {
    // 1. Stop form from submitting
    e.preventDefault();
    // 2. Get Text from that input
    const storeName = this.myInput.value.value;
    // 3. Change the page to /store/whatever-user-entered
    this.props.history.push(`/store/${storeName}`);
    // We can use history.push because ReactRouter passes it down to us
  }

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter a Store</h2>
        <input
          type="text"
          ref={this.myInput}
          required
          placeholder="Store Name"
          defaultValue={getFunName()}
        />
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
