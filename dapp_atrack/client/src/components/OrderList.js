import React, { Component } from "react";
import Order from "./Order";
import Title from "./Title";
import { ProductConsumer } from "../context";

export default class OrderList extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="py-5">
          <div className="container">
            <Title name="" title="Orders" />
            <div className="col">
              <ProductConsumer>
                {value => {
                  return value.orderArray.map(order => {
                    return <Order key={order.id} order={order} />;
                  });
                }}
              </ProductConsumer>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
