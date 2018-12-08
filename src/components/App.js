import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import Fish from "./Fish";
import base from "../base";
import sampleFishes from "../sample-fishes";

export default class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  // Built-in function in React that runs when component loads on page.
  componentDidMount() {
    const { params } = this.props.match;
    // first reinstate our localstorage
    const localStorageRef = localStorage.getItem(params.storeName);

    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
    // different ref; for firebase
    this.ref = base.syncState(`${params.storeName}/fishes`, {
      context: this,
      state: "fishes"
    });
  }

  //
  componentDidUpdate() {
    // Saves to local storage, the store name and the fish order
    localStorage.setItem(
      this.props.match.params.storeName,
      JSON.stringify(this.state.order)
    );
  }

  // So component is not always listening -> prevents memory leaks
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = fish => {
    // the ... is an object spread that makes a copy
    const fishes = { ...this.state.fishes };
    // add our new fishes to the fishes variable
    fishes[`fish${Date.now()}`] = fish;
    // set the new fishes object to state
    this.setState({ fishes });
  };

  addToOrder = key => {
    // 1. Take a copy of state
    const order = { ...this.state.order };
    // 2. Either add to the order, or update the order
    order[key] = order[key] + 1 || 1;
    // 3. Call setState to update our state object
    this.setState({ order });
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} />
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
        />
      </div>
    );
  }
}
