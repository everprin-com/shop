import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    dialog: state.dialog
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeDialog: () => dispatch({ type: 'CLOSE_SET_SIZE_WINDOW'}),
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
});

class DialogWindow extends React.Component {
  render() {
    const { classes, title, Component, dialog, closeDialog } = this.props;

    return (
      <Dialog
        onClose={closeDialog}
        aria-labelledby="customized-dialog-title"
        open={dialog.status}
        className={classes.dialog}
        maxWidth="lg"
      >
        <DialogTitle id="customized-dialog-title" onClose={closeDialog}>
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