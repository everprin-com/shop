import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import styles from "./styles";
import { connect } from "react-redux";
import Logo from "../Logo/Logo";
import DialogSwitcher from "../DialogSwitcher";
import googleEvents from "../constants/googleEvents";

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

class Footer extends React.PureComponent {
  showReturn = () => {
    this.props.showReturn();
    this.sendGoogleEvent();
  };

  showPayment = () => {
    this.props.showPayment();
    this.sendGoogleEvent();
  };

  showDelivery = () => {
    this.props.showDelivery();
    this.sendGoogleEvent();
  };

  sendGoogleEvent = () => {
    gtag(
      "event",
      googleEvents["Чтение доставки и оплаты"].title,
      googleEvents["Чтение доставки и оплаты"].data
    );
  };

  render() {
    const { classes, redirectToRoot } = this.props;

    return (
      <Paper className={classes.root} elevation={1}>
        <ul className={classes.list}>
          <Item
            title="Доставка"
            onClick={this.showDelivery}
            classes={classes}
          />
          <Item title="Возврат" classes={classes} onClick={this.showReturn} />
          <Item title="Оплата" classes={classes} onClick={this.showPayment} />
          {/* <Item title="Вопросы и ответы" classes={classes} /> */}
        </ul>
        <div className={classes.contacts}>
          {/* <p className={classes.contactsRow}>Киев, Ул Чешская 9, 201/203, БЦ modnaVilla, 1 этаж</p> */}
          <p className={classes.contactsRow}>+38 (095) 755-25-73</p>
          <p className={classes.contactsRow}>info@kilo.com.ua</p>
        </div>
        <Logo
          classes={classes}
          className={classes.logo}
          redirectToRoot={redirectToRoot}
        />
        <DialogSwitcher
          dialogs={[
            { title: "Условия Доставки", type: "delivery" },
            { title: "Условия Возврата", type: "return" },
            { title: "Оплата", type: "payment" }
          ]}
        />
      </Paper>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Footer));
