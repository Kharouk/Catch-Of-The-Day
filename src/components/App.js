import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";

export default class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  addFish = fish => {
    // the ... is an object spread that makes a copy
    const fishes = { ...this.state.fishes };
    // add our new fishes to the fishes variable
    fishes[`fish${Date.now()}`] = fish;
    // set the new fishes object to state
    this.setState({ fishes });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
        </div>
        <Order />
        <Inventory addFish={this.addFish} />
      </div>
    );
  }
}
