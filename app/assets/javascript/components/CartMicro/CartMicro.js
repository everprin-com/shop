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
import styles from "./styles";

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

function MicroCart(props) {
  const { classes, card, redirToOrderForm, deleteFromCart, closeCart } = props;
  const totalPrice = card.data.reduce((prev, next) => {
    return prev + +next.price * next.amount;
  }, 0);

  const renderProducts = () => {
    return (
      <Paper className={classes.table}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell className={`${classes.headerCell} ${classes.cell}`}>
                Название
              </TableCell>
              <TableCell className={`${classes.headerCell} ${classes.cell}`}>
                Кол-во
              </TableCell>
              <TableCell className={`${classes.headerCell} ${classes.cell}`}>
                Размер
              </TableCell>
              <TableCell className={`${classes.headerCell} ${classes.cell}`}>
                Цена
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {card.data.map(cartDataItem => {
              const { picture, name, amount, price, activeSize } = cartDataItem;
              const srcImg = Array.isArray(picture) ? picture[0] : picture;
              const withoutSizeName = name.replace(/[0-9-]*$/g, "");
              return (
                <TableRow key={cartDataItem.id}>
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.cell}
                  >
                    <div className={classes.imageWrapper}>
                      <img src={srcImg} className={classes.image} />
                    </div>
                  </TableCell>
                  <TableCell className={`${classes.name} ${classes.cell}`}>
                    {withoutSizeName}
                  </TableCell>
                  <TableCell className={classes.cell}>{amount}</TableCell>
                  <TableCell className={classes.cell}>{activeSize}</TableCell>
                  <TableCell className={classes.cell}>{`${
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
