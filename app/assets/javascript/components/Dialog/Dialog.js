import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import styles from "./styles";

const mapTypeAndActionDiolog = {
  close: {
    size: "CLOSE_SET_SIZE_WINDOW",
    successOrder: "CLOSE_SUCCESS_WINDOW",
    slider: "CLOSE_SLIDER_WINDOW",
    delivery: "CLOSE_DELIVERY_WINDOW",
    return: "CLOSE_RETURN_WINDOW",
    payment: "CLOSE_PAYMENT_WINDOW",
    writeReview: "CLOSE_WRITEREVIEW_WINDOW",
  },
  open: {
    size: "OPEN_SET_SIZE_WINDOW",
    successOrder: "SHOW_SUCCESS_WINDOW",
    slider: "SHOW_SLIDER_WINDOW",
    delivery: "SHOW_DELIVERY_WINDOW",
    return: "SHOW_RETURN_WINDOW",
    payment: "SHOW_PAYMENT_WINDOW",
    writeReview: "SHOW_WRITEREVIEW_WINDOW",
  }
};

const mapStateToProps = state => {
  return {
    dialog: state.dialog
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeDialog: type => dispatch({ type: mapTypeAndActionDiolog.close[type] })
  };
};

class DialogWindow extends React.PureComponent {
  render() {
    const { classes, title, Component, dialog, closeDialog, type, props } = this.props;
    return (
      <Dialog
        onClose={() => closeDialog(type)}
        aria-labelledby="customized-dialog-title"
        open={dialog[type] ? dialog[type].status : false}
        className={`${classes.dialog} ${
          type == "slider" ? classes.gallery : ""
        }`}
        maxWidth="lg"
        classes={{
          paper: classes.dialog
        }}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={() => closeDialog(type)}
          className={classes.title}
        >
          {title}
        </DialogTitle>
        <DialogContent
          className={`${classes.dialogContent} ${
            type == "slider" ? classes.gallery : ""
          }`}
        >
          <Component {...props} />
        </DialogContent>
        <DialogActions />
      </Dialog>
    );
  }
}

DialogWindow.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(DialogWindow));
