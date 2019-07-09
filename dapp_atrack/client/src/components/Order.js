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
import CartTotals from "./Cart/CartTotals";

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
      return (
        <ProductConsumer>
          {value => {
            // const { formalOpen, closeFormal } = value;
            // if (!formalOpen) {
            //   return null;
            // } else {

            return (
              <ModalContainer>
                <div className="container verspaceMobile">
                  <div className="row d-flex justify-content-center">
                    <br />
                    <Paper className={classes.root}>
                      <Table className={classes.table}>
                        <TableHead>
                          <TableRow>
                            <TableCell>Order IDs </TableCell>
                            <TableCell align="right">
                              Active Container Address
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {value.orderArray.map(row => (
                            <TableRow key={row.id}>
                              <TableCell component="th" scope="row">
                                {row.orderN}
                              </TableCell>
                              <TableCell align="right">
                                {row.contAddr}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Paper>
                  </div>
                </div>
              </ModalContainer>
            );
            //}
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
