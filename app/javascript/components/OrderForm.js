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
import classNames from 'classnames';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import CartMicro from './CartMicro';

// const styles = theme => ({
//   root: {
//     width: 1264,
//     margin: '50px auto'
//   },
//   input: {
//     fontSize: '16px'
//   },
//   inputItem: {
//     display: 'flex',
//   },
//   title: {
//     fontSize: 20,
//     textAlign: 'center',
//     fontFamily: 'arial',
//   }
// });

// function OrderForm(props) {
//   const { classes } = props;

//   return (
//     <div>
//       <div className={classes.root}>
//         <div className={classes.title}>Оформление заказа</div>
//         <form action="" className="ui-form">
//           <div className="form-row">
//             <input type="text" id="name" required autocomplete="off" /><label for="name">Имя и Фамилия</label>
//           </div>
//           <div className="form-row">
//             <input type="text" id="city" required autocomplete="off" /><label for="city">Город</label>
//           </div>
//           <div className="form-row">
//             <input type="phone" id="phone" required autocomplete="off" /><label for="phone">Мобильный телефон</label>
//           </div>
//           <p><input type="submit" value="Оформить заказ" /></p>
//         </form>
//       </div>
//     </div>
//   );
// }

// OrderForm.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(OrderForm);

// import React from 'react';
// import PropTypes from 'prop-types';

// import { withStyles } from '@material-ui/core/styles';

// import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
    fontSize: '16px !important',
    display: 'block',
  },
  root: {
    width: '900px',
    margin: '60px auto', 
    display: 'flex',
  },
  button: {
    marginTop: 15,
  }
});

class TextFields extends React.Component {
  state = {
    name: 'Cat in the Hat',
    age: '',
    multiline: 'Controlled',
    currency: 'EUR',
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <form noValidate autoComplete="off">
          <div className={classes.title}>
            Оформление заказа
          </div>
          <TextField
            id="standard-password-input"
            label="Имя"
            className={classes.textField}
            type="text"
            autoComplete="current-password"
            margin="normal"
          />
          <TextField
            id="standard-password-input"
            label="Телефон"
            className={classes.textField}
            type="text"
            autoComplete="current-password"
            margin="normal"
          />
            <TextField
            id="standard-password-input"
            label="Адресс"
            className={classes.textField}
            type="text"
            autoComplete="current-password"
            margin="normal"
          />
          <Button variant="contained" className={classes.button}  color="primary">
            Отправить заказ
          </Button>
        </form>
        <div className={classes.cartMicro}>
          <CartMicro />
        </div>  
      </div>
     
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);
