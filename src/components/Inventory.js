import React from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import Login from "./Login";
import base, { firebaseApp } from "../base";

export default class Inventory extends React.Component {
  state = {
    uid: null,
    owner: null
  };

  static propTypes = {
    fishes: PropTypes.object,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    loadSampleFishes: PropTypes.func,
    storeName: PropTypes.string
  };

  authHandler = async authData => {
    // 1. look up the current store in the FB database
    const store = await base.fetch(this.props.storeName, { context: this });
    // 2. Claim it if there's no owner
    if (!store.owner) {
      // Save the store to the owner:
      await base.post(`${this.props.storeName}/owner`, {
        // uid = unique identifier of that user
        data: authData.user.uid
      });
    }
    // 3. Set the state of the inventory component to reflect the current user
    this.setState({
      // Currently logged in user:
      uid: authData.user.uid,
      // who is the owner of the store:
      owner: store.owner || authData.user.uid
    });
  };

  authenticate = provider => {
    // Dynamically create a firebase auth instead of importing the 3 authentications:
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  signOut = async () => {
    console.log("Thanks for checking out my app! 🥚");
    await firebase.auth().signOut();
    this.setState({ uid: null });
  };

  render() {
    const signOut = <button onClick={this.signOut}>Sign Out</button>;
    // 1. check if user is logged in
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }

    // 2. check if user is not the owner of the store
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <h2>Inventory Login</h2>
          <p>Sorry, you are not the owner of this store.</p>
          {signOut}
        </div>
      );
    }

    // 3. If no objections, then the user must be the owner so render inventory:
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {signOut}
        {Object.keys(this.props.fishes).map(key => (
          <EditFishForm
            key={key}
            index={key}
            fish={this.props.fishes[key]}
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish}
          />
        ))}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>
          Load Sample Fishes
        </button>
      </div>
    );
  }
}
