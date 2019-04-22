import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    card: state.card
  }
}


const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    maxWidth: 800,
    margin: '10 0',
  },
  content: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    margin: '0 30px'
  },
  totalBlock:{
    margin: 20,
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'flex-end',
    fontFamily: 'Arial,Helvetica,FreeSans,"Liberation Sans","Nimbus Sans",sans-serif',
    fontSize: 24,
  },
  button: {
    fontSize: 16
  }
});

function Cart(props) {
  const { classes, card } = props;
  const totalPrice = card.data.reduce((prev, next)=> { return (prev + next.price)}, 0)
  const renderProducts = card.data.map( cartDataItem => {
    return  (<Paper className={classes.root} elevation={1}>
    <div className={classes.content}>
      <div className={classes.imageWrapper}>
          <img src={cartDataItem.img} className={classes.image}/>
      </div>
      <div className={classes.title}>{cartDataItem.title}</div>
      <div className={classes.price}>{`${cartDataItem.price} грн`}</div>
    </div>
    </Paper>)
    })
    return (
      <div>
        {renderProducts}
        <div className={classes.totalBlock}>
          <div className={classes.totalPrice}>
            {`Итого: ${totalPrice} грн`}
          </div>
          <Button variant="contained" color="secondary" className={classes.button}>
            Оформить заказ
          </Button>
        </div>
      </div>
    );
  
}

Cart.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(Cart));