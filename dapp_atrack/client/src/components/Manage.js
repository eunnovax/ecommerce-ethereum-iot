import React, { Component } from "react";
import { ProductConsumer } from "../context";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
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
  class Manage extends Component {
    render() {
      console.log("this.props", this.props);
      const { classes } = this.props;

      return (
        <ProductConsumer>
          {value => {
            return (
              <ModalContainer>
                <div className="row d-flex justify-content-center">
                  <form className="verspace">
                    <br />
                    <TextField
                      id="container-address"
                      label="Container Address"
                      name="container"
                      onChange={e => value.change(e)}
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
                </div>
              </ModalContainer>
            );
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
