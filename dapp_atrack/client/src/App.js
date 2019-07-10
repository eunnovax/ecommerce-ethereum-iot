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
import OrderList from "./components/OrderList";
import Tracking from "./components/Tracking";
import { ProductProvider } from "./context";

class App extends Component {
  state = {
    web3: null,
    accounts: null,
    contract: null,
    response: ""
  };

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
          <Route path="/manage" component={OrderList} />
          <Route path="/tracking" component={Tracking} />
          <Route component={Default} />
        </Switch>
        <Modal />
      </React.Fragment>
    );
  }
}

export default App;
