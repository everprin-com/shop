import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import styles from "./styles";

const mapDispatchToProps = dispatch => {
  return {
    closeDialog: () => dispatch({ type: "CLOSE_SET_SIZE_WINDOW" }),
    resetCard: () => dispatch({ type: "RESET_CART" })
  };
};

class SuccessOrder extends React.PureComponent {
  componentDidMount() {
    this.props.resetCard();
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.title}>Спасибо, ваш заказ принят</div>
        <div className={classes.title}>
          Наш менеджер в скором времени свяжется с вами
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(SuccessOrder));
