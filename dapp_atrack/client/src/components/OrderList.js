import React, { Component } from "react";
import Order from "./Order";
import Title from "./Title";
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
  class OrderList extends Component {
    render() {
      const { classes } = this.props;
      return (
        <React.Fragment>
          <div className="py-5">
            <div className="container">
              <Title name="" title="Orders" />
              <div className="col">
                <ProductConsumer>
                  {value => {
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
                                  {value.orderArray.map(order => (
                                    <Order key={order.id} order={order} />
                                  ))}
                                </TableBody>
                              </Table>
                            </Paper>
                          </div>
                        </div>
                      </ModalContainer>
                    );
                  }}
                </ProductConsumer>
              </div>
            </div>
          </div>
        </React.Fragment>
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
