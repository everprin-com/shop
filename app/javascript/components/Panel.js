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
    openCart: () => dispatch({ type: 'OPEN_CART'}),
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
  },
  cardTitleBlock: {
    display: 'flex',
  },
  cardTitle: {
    display: 'inline-flex',
  },
  addedProduct: {
    marginLeft: 110,
    display: 'inline-flex',
  },
};

class Panel extends React.PureComponent {
  render(){
    const { classes, card, closeCart, openCart } = this.props;
    const cardLengh = card.data.length
    return (
      <div>
          <Toolbar className={classes.root}>
              <Input />
              <div className={classes.cardBlock} onClick={openCart}>
                <Badge className={classes.margin} invisible={!cardLengh} badgeContent={cardLengh} color="primary">
                  <ShoppingCart className={classes.icon} />
                </Badge>
                <span className={classes.cardText}>
                  Корзина
                </span>
              </div>
          </Toolbar>
          <Dialog
          onClose={closeCart}
          aria-labelledby="customized-dialog-title"
          open={card.isOpen}
          className={classes.dialog}
          maxWidth="lg"
        >
          <DialogTitle className={classes.cardTitleBlock} onClose={closeCart}>
            <div className={classes.cardTitle}>Корзина</div>
            {card.withProduct && <div className={classes.addedProduct}>Вы добавили товар в корзину</div>}
          </DialogTitle>
          <DialogContent>
            <Cart />
          </DialogContent>
          <DialogActions>
            {/* <Button onClick={closeCart} color="primary">
              Save changes
            </Button> */}
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