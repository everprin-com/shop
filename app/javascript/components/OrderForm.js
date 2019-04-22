import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';

const styles = theme => ({
  root: {
    width: 1264,
    margin: '50px auto'
  },
  input: {
    fontSize: '16px'
  },
  inputItem: {
    display: 'flex',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'arial',
  }
});

function OrderForm(props) {
  const { classes } = props;

  return (
    <div>
      <div className={classes.root}>
        <div className={classes.title}>Оформление заказа</div>
        <form action="" className="ui-form">
          <div className="form-row">
            <input type="text" id="name" required autocomplete="off" /><label for="name">Имя и Фамилия</label>
          </div>
          <div className="form-row">
            <input type="text" id="city" required autocomplete="off" /><label for="city">Город</label>
          </div>
          <div className="form-row">
            <input type="phone" id="phone" required autocomplete="off" /><label for="phone">Мобильный телефон</label>
          </div>
          <p><input type="submit" value="Оформить заказ" /></p>
        </form>
      </div>
    </div>
  );
}

OrderForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OrderForm);