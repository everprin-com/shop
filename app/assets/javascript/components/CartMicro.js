import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const mapStateToProps = state => {
  return {
    card: state.card
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeCart: () => dispatch({ type: "CLOSE_CART" }),
    redirToOrderForm: () => dispatch({ type: "OPEN_ORDER_FORM" }),
    deleteFromCart: id => dispatch({ type: "DELETE_FROM_CART", id })
  };
};

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    padding: 5,
    maxWidth: 800,
    margin: "10 0"
  },
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around"
  },
  title: {
    margin: 0
  },
  totalBlock: {
    margin: 20,
    // flexDirection: 'column',
    display: "flex",
    alignItems: "flex-end",
    fontFamily:
      'Arial,Helvetica,FreeSans,"Liberation Sans","Nimbus Sans",sans-serif',
    fontSize: 24,
    justifyContent: "flex-end"
  },
  imageWrapper: {
    width: 100,
    height: 100
  },
  image: {
    height: "100%"
  },
  totalPrice: {
    marginBottom: 5
  },
  contentText: {
    display: "flex",
    flexDirection: "column",
    minWidth: 200
  },
  paperRoot: {
    padding: 5
  },
  name: {
    padding: 0,
    textTransform: "lowercase",
    fontSize: 16
  },
  headerCell: {
    padding: 7,
  },
  table:{
    overflowY: 'auto',
    maxHeight: 500,
  }
});

function MicroCart(props) {
  const { classes, card, redirToOrderForm, deleteFromCart, closeCart } = props;
  const totalPrice = card.data.reduce((prev, next) => {
    return prev + +next.price;
  }, 0);

  const renderProducts = () => {
    return (
      <Paper className={classes.table}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell className={classes.headerCell}>Название</TableCell>
              <TableCell className={classes.headerCell}>Кол-во</TableCell>
              <TableCell className={classes.headerCell}>Размер</TableCell>
              <TableCell className={classes.headerCell}>Цена</TableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {card.data.map(cartDataItem => {
              const { picture, name, amount, price, activeSize } = cartDataItem;
              const withoutSizeName = name.replace(/[0-9-]*$/g, "");
              return (
                <TableRow key={cartDataItem.id}>
                  <TableCell component="th" scope="row">
                    <div className={classes.imageWrapper}>
                      <img src={picture} className={classes.image} />
                    </div>
                  </TableCell>
                  <TableCell className={classes.name}>
                    {withoutSizeName}
                  </TableCell>
                  <TableCell>{amount}</TableCell>
                  <TableCell>{activeSize}</TableCell>
                  <TableCell>{`${
                    amount ? price * amount : price
                  } грн`}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  };
  return (
    <Paper className={classes.paperRoot}>
      {renderProducts()}
      <div className={classes.totalBlock}>
        <div className={classes.totalPrice}>{`Итого: ${totalPrice} грн`}</div>
      </div>
    </Paper>
  );
}

MicroCart.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MicroCart));
