import React, { Component } from "react";
import { ProductConsumer } from "../context";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  button: {
    margin: theme.spacing.unit
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

export default withStyles(styles)(
  class Tracking extends Component {
    state = {
      contract: null,
      accounts: null
    };

    handleUpdate = contra => {
      return this.setState({
        contract: contra
      });
    };
    render() {
      console.log("this.props", this.props);
      const { classes } = this.props;

      return (
        <ProductConsumer>
          {value => {
            if (value.orderStatus) {
              console.log("typeOf promise result", value.orderID);
              return (
                <ModalContainer>
                  <div className="row d-flex justify-content-center">
                    <br />
                    <TextField
                      id="order-number"
                      label="Order Number"
                      name="orderNumber"
                      value={value.orderID}
                      onChange={e => value.change(e)}
                      margin="normal"
                      variant="outlined"
                      className={classes.textField}
                    />
                    <br />
                    <TextField
                      id="order-status"
                      label="Order Status"
                      name="orderStatus"
                      value={value.orderStatus}
                      onChange={e => value.change(e)}
                      margin="normal"
                      variant="outlined"
                      className={classes.textField}
                    />
                  </div>
                </ModalContainer>
              );
            } else {
              return (
                <ModalContainer>
                  <div className="row d-flex justify-content-center">
                    <br />
                    <TextField
                      id="order-number"
                      label="Order Number"
                      name="orderNumber"
                      onChange={e => value.change(e)}
                      margin="normal"
                      variant="outlined"
                      className={classes.textField}
                    />
                    <br />
                  </div>
                </ModalContainer>
              );
            }
          }}
        </ProductConsumer>
      );
    }
  }
);

const ModalContainer = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin-top: 1rem;
  background: rgba(255, 255, 255, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  #modal {
    background: var(--mainWhite);
  }
`;
