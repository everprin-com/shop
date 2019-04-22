import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Input from './Input'
import { ShoppingCart } from '@material-ui/icons'
import Cart from './CartItem';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    card: state.card
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeCart: () => dispatch({ type: 'CLOSE_CART'}),
  }
}

const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2,
    maxWidth: 900,
    minWidth: 700,
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit,
  },
}))(MuiDialogActions);

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  icon: {
      fontSize: '40px',
      verticalAlign: 'middle',
      cursor: 'pointer',
  },
  cardText: {
    fontSize: '18px',
    fontWeight: 'bold',
    verticalAlign: 'middle',
  },
  dialog: {
    // maxWidth: 900
  },
  cardBlock: {
    cursor: 'pointer'
  }
};

class Panel extends React.PureComponent {
  constructor(props){
    super(props)
  }

  state = {
    open: false || this.props.card.isOpen,
  }

  componentDidUpdate (prevProps, prevState) {
    console.log(this.props.card.isOpen)
    console.log(prevState.open)
    if (this.props.card.isOpen !== prevState.open) this.setState({open: this.props.card.isOpen})
  }

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.closeCart()
  };
  render(){
    const { classes, card } = this.props;
    const cardLengh = card.data.length
    return (
      <div>
          <Toolbar className={classes.root}>
              <Input />
              <div className={classes.cardBlock} onClick={this.handleClickOpen}>
                <Badge className={classes.margin} invisible={!cardLengh} badgeContent={cardLengh} color="primary">
                  <ShoppingCart className={classes.icon} />
                </Badge>
                <span className={classes.cardText}>
                  Корзина
                </span>
              </div>
          </Toolbar>
          <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
          className={classes.dialog}
          maxWidth="lg"
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            Modal title
          </DialogTitle>
          <DialogContent>
            <Cart />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Save changes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

Panel.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Panel));