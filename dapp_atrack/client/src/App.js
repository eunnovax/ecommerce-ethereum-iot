import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Logistics from "./contracts/Logistics.json";
import getWeb3 from "./utils/getWeb3";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Details from "./components/Details";
import Cart from "./components/Cart/Cart";
import Default from "./components/Default";
import Modal from "./components/Modal";
import Manage from "./components/Manage";
import Tracking from "./components/Tracking";
import { ProductProvider } from "./context";

class App extends Component {
  state = {
    web3: null,
    accounts: null,
    contract: null,
    response: ""
  };

  // componentDidMount = async () => {

  //   try {
  //     // Get network provider and web3 instance.
  //     const web3 = await getWeb3();

  //     // Use web3 to get the user's accounts.
  //     const accounts = await web3.eth.getAccounts();

  //     // Get the contract instance.
  //     const networkId = await web3.eth.net.getId();
  //     const deployedNetwork = Logistics.networks[networkId];
  //     const instance = new web3.eth.Contract(
  //       Logistics.abi,
  //       deployedNetwork && deployedNetwork.address
  //     );

  //     // Set web3, accounts, and contract to the state, and then proceed with an
  //     // example of interacting with the contract's methods.
  //     this.setState({ web3, accounts, contract: instance }, this.runExample);
  //   } catch (error) {
  //     // Catch any errors for any of the above operations.
  //     alert(
  //       `Failed to load web3, accounts, or contract. Check console for details.`
  //     );
  //     console.error(error);
  //   }
  // };

  // runExample = async () => {
  //   const { accounts, contract } = this.state;

  //   // Stores a given value, 5 by default.
  //   //await contract.methods.contractCheck().send({ from: accounts[0] });

  //   // Get the response from the contract to prove it worked.
  //   const response = await contract.methods
  //     .contractCheck()
  //     .call({ from: accounts[0] });
  //   // Update state with the result.
  //   this.setState({ response: response }, () => {
  //     console.log("web3 contract response", this.state.response);
  //   });
  // };

  render() {
    // if (!this.state.web3) {
    //   return <div>Loading Web3, accounts, and contract...</div>;
    // }
    return (
      <React.Fragment>
        <Navbar />
        <Switch>
          <Route exact path="/" component={ProductList} />
          <Route path="/details" component={Details} />
          <Route path="/cart" component={Cart} />
          <Route path="/manage" component={Manage} />
          <Route path="/tracking" component={Tracking} />
          <Route component={Default} />
        </Switch>
        <Modal />
      </React.Fragment>
    );
  }
}

export default App;
