import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CartMicro from './CartMicro';
import { connect } from 'react-redux';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400,
    fontSize: '16px !important',
    display: 'block',
  },
  root: {
    width: '900px',
    margin: '100px auto 0',
    display: 'flex',
    justifyContent: 'space-around',
  },
  button: {
    marginTop: 15,
  }
});

class RegistrationForm extends React.Component {
  state = {
    email: "",
    password: "",
    password_confirmation: "",
    passwordLogin: "",
    emailLogin: "",

  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  signIn = () => {
    fetch('/users/sign_in', {
     method: 'post',
     headers: {'Content-Type':'application/json'},
     body: JSON.stringify({ user: { email: this.state.emailLogin, password: this.state.passwordLogin }}),
   })
  }

  sendOrder = () => {
    fetch('/users', {
     method: 'post',
     headers: {'Content-Type':'application/json'},
     body: JSON.stringify({user: {email: this.state.email, password: this.state.password, password_confirmation: this.state.password_confirmation}}),
   })
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <form noValidate autoComplete="off"  >
          <div className={classes.title}>
            Login
          </div>
          <TextField
            label="email"
            className={classes.textField}
            type="text"
            value={this.state.emailLogin}
            onChange={this.handleChange('emailLogin')}
            margin="normal"
            fullWidth
          />
          <TextField
            label="password"
            value={this.state.passwordLogin}
            onChange={this.handleChange('passwordLogin')}
            className={classes.textField}
            type="password"
            margin="normal"
            fullWidth
          />
          <Button variant="contained" className={classes.button} onClick={this.signIn} color="primary">
            Login
          </Button>
        </form>

        <form noValidate autoComplete="off"  >
          <div className={classes.title}>
            Зарегестрировать
          </div>
          <TextField
            label="email"
            className={classes.textField}
            type="text"
            value={this.state.email}
            onChange={this.handleChange('email')}
            margin="normal"
            fullWidth
          />
          <TextField
            label="password"
            value={this.state.password}
            onChange={this.handleChange('password')}
            className={classes.textField}
            type="password"
            margin="normal"
            fullWidth
          />
            <TextField
            label="password_confirmation"
            value={this.state.password_confirmation}
            onChange={this.handleChange('password_confirmation')}
            className={classes.textField}
            type="password"
            margin="normal"
            fullWidth
          />
          <Button variant="contained" className={classes.button} onClick={this.sendOrder} color="primary">
            Зарегестрировать
          </Button>
        </form>
      </div>

    );
  }
}

RegistrationForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RegistrationForm)
