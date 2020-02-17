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
import Logo from "../Logo/Logo";

const mapDispatchToProps = dispatch => {
  return {
    showDelivery: () => dispatch({ type: "SHOW_DELIVERY_WINDOW" }),
    showReturn: () => dispatch({ type: "SHOW_RETURN_WINDOW" }),
    showPayment: () => dispatch({ type: "SHOW_PAYMENT_WINDOW" })
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
  const {
    classes,
    showDelivery,
    showReturn,
    showPayment,
    redirectToRoot
  } = props;

  return (
      <Paper className={classes.root} elevation={1}>
        <ul className={classes.list}>
          <Item
            title="Доставка"
            onClick={showDelivery}
            classes={classes}
          />
          <Item
            title="Возврат"
            classes={classes}
            onClick={showReturn}
          />
          <Item title="Оплата" classes={classes} onClick={showPayment} />
          {/* <Item title="Вопросы и ответы" classes={classes} /> */}
        </ul>
        <div className={classes.contacts}>
          {/* <p className={classes.contactsRow}>Киев, Ул Чешская 9, 201/203, БЦ modnaVilla, 1 этаж</p> */}
          <p className={classes.contactsRow}>+38 (095) 755-25-73</p>
          <p className={classes.contactsRow}>info@kilo.com.ua</p>
        </div>
        <Logo classes={classes} className={classes.logo} redirectToRoot={redirectToRoot} />
        <Dialog title="Условия Доставки" Component={Delivery} type="delivery" />
        <Dialog title="Условия Возврата" Component={Return} type="return" />
        <Dialog title="Оплата" Component={Payment} type="payment" />
      </Paper>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(Footer));
