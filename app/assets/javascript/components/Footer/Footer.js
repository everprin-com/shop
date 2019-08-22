import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import styles from "./styles";
import Delivery from "../conditions/Delivery";
import Return from "../conditions/Return";
import Payment from "../conditions/Payment";
import { connect } from "react-redux";
import Dialog from "../Dialog/Dialog";

const mapDispatchToProps = dispatch => {
  return {
    showDelivery: () => dispatch({ type: "SHOW_DELIVERY_WINDOW" }),
    showReturn: () => dispatch({ type: "SHOW_RETURN_WINDOW" }),
    showPayment: () => dispatch({ type: "SHOW_PAYMENT_WINDOW" }),
  };
};

function Item({ title, classes, onClick }) {
  return (
    <li className={classes.item} onClick={onClick}>
      {title}
    </li>
  );
}

function Footer(props) {
  const { classes, showDelivery, showReturn, showPayment } = props;

  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <ul className={classes.list}>
          <Item
            title="Условия доставки"
            onClick={showDelivery}
            classes={classes}
          />
          <Item
            title="Условия возврата"
            classes={classes}
            onClick={showReturn}
          />
          <Item
            title="Оплата"
            classes={classes}
            onClick={showPayment}
          />
          <Item title="Вопросы и ответы" classes={classes} />
          <Item title="Контакты" classes={classes} />
        </ul>
        <div className={classes.contacts}>
          Киев, №1. Ул Чешская 9, 201/203, БЦ modnaVilla, 1 этаж +38 (095)
          755-25-73 info@kilo.com.ua
        </div>
        <ul className={classes.list}>
          <Item title="О нас" classes={classes} />
          <Item title="Контакты" classes={classes} />
        </ul>
      </Paper>
      <Dialog title="Условия доставки" Component={Delivery} type="delivery" />
      <Dialog title="Условия Возврата" Component={Return} type="return" />
      <Dialog title="Оплата" Component={Payment} type="payment" />
    </div>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(Footer));
