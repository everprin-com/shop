import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';

const mapTypeAndActionDiolog = {
  close: {
    size: "CLOSE_SET_SIZE_WINDOW",
    successOrder: "CLOSE_SUCCESS_WINDOW"
  },
  open: {
    size: "OPEN_SET_SIZE_WINDOW",
    successOrder: "SHOW_SUCCESS_WINDOW"
  }
}

const mapStateToProps = state => {
  return {
    dialog: state.dialog
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeDialog: type => dispatch({ type:  mapTypeAndActionDiolog.close[type]}),
  }
}

const styles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing.unit * 2,
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing.unit,
  },
  title: {
    textAlign: 'center',
  }
});

class DialogWindow extends React.PureComponent {
  render() {
    const { classes, title, Component, dialog, closeDialog, type } = this.props;
    return (
      <Dialog
        onClose={() => closeDialog(type)}
        aria-labelledby="customized-dialog-title"
        open={dialog[type].status}
        className={classes.dialog}
        maxWidth="lg"
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={() => closeDialog(type)}
          className={classes.title}
        >
          {title}
        </DialogTitle>
        <DialogContent>
            <Component />
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>
    );
  }
}

DialogWindow.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DialogWindow))