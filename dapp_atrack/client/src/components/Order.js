import React, { Component } from "react";
import { ProductConsumer } from "../context";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";

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
  class Order extends Component {
    render() {
      // console.log("this.props", this.props);
      const { classes } = this.props;
      const { order } = this.props;
      return (
        <ProductConsumer>
          {value => {
            if (
              order.contAddr !== "0x0000000000000000000000000000000000000000"
            ) {
              return (
                <div className="container verspaceMobile">
                  <TableRow key={order.id}>
                    <TableCell component="th" scope="row">
                      {order.orderN}
                    </TableCell>
                    <TableCell align="right">{order.contAddr}</TableCell>
                  </TableRow>
                </div>
              );
            } else if (
              order.contAddr === "0x0000000000000000000000000000000000000000" &&
              order.orderN
            ) {
              return (
                <div className="container verspaceMobile">
                  <TableRow key={order.id}>
                    <TableCell component="th" scope="row">
                      {order.orderN}
                    </TableCell>
                    <TableCell align="right">
                      <form className="verspace">
                        <br />
                        <TextField
                          id="container-address"
                          label="Container Address"
                          name="container"
                          onChange={e => value.change(e, order.orderN)}
                          margin="normal"
                          variant="outlined"
                          className={classes.textField}
                        />
                        <br />

                        <Button
                          variant="contained"
                          color="primary"
                          onClick={e => {
                            value.onSubmit(e);
                            //closeFormal();
                          }}
                          className={classes.button}
                        >
                          Set Container
                        </Button>
                      </form>
                    </TableCell>
                  </TableRow>
                </div>
              );
            } else {
              return console.log("no order");
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
