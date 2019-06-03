import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CartMicro from './CartMicro';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => {
  return {
    closeOrderForm: () => dispatch({ type: 'CLOSE_ORDER_FORM'}),
    closeCart: () => dispatch({ type: 'CLOSE_CART'}),
  }
}

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

class OrderForm extends React.Component {
  state = {
    file: null,
    name: "",
    phone: "",
    address: "",
    name_question: "",
    telephone: "",
    message: "",
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  componentDidMount() {
    this.props.closeOrderForm()
    this.props.closeCart()
  }

  sendOrder = () => {
    fetch('/orders', {
     method: 'post',
     headers: {'Content-Type':'application/json'},
     body: JSON.stringify({order: {name: this.state.name, phone: this.state.phone, address: this.state.address}}),
   })
  }

  sendQuestion = () => {
    fetch('/messagestoadministrators', {
     method: 'post',
     headers: {'Content-Type':'application/json'},
     body: JSON.stringify({messagestoadministrator: {name: this.state.name_question, telephone: this.state.telephone, message: this.state.message}}),
   })
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <form noValidate autoComplete="off"  >
          <div className={classes.title}>
            Оформление заказа
          </div>
          <TextField
            label="Имя"
            className={classes.textField}
            type="text"
            value={this.state.name}
            onChange={this.handleChange('name')}
            margin="normal"
            fullWidth
          />
          <TextField
            label="Телефон"
            value={this.state.phone}
            onChange={this.handleChange('phone')}
            className={classes.textField}
            type="text"
            margin="normal"
            fullWidth
          />
            <TextField
            label="Адресс"
            value={this.state.address}
            onChange={this.handleChange('address')}
            className={classes.textField}
            type="text"
            margin="normal"
            fullWidth
          />
          <Button variant="contained" className={classes.button} onClick={this.sendOrder} color="primary">
            Отправить заказ
          </Button>
        </form>
        <form noValidate autoComplete="off"  >
          <div className={classes.title}>
            Вопрос менеджеру
          </div>
          <TextField
            label="Имя"
            className={classes.textField}
            type="text"
            value={this.state.name_question}
            onChange={this.handleChange('name_question')}
            margin="normal"
            fullWidth
          />
          <TextField
            label="Телефон"
            value={this.state.telephone}
            onChange={this.handleChange('telephone')}
            className={classes.textField}
            type="text"
            margin="normal"
            fullWidth
          />
          <TextField
            label="Сообщение"
            className={classes.textField}
            type="text"
            value={this.state.message}
            onChange={this.handleChange('message')}
            margin="normal"
            fullWidth
          />
          <Button variant="contained" className={classes.button} onClick={this.sendQuestion} color="primary">
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

OrderForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(OrderForm))
