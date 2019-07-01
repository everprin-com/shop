import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CartMicro from './CartMicro';
import { connect } from 'react-redux';
import Dialog from './Dialog';
import SuccessOrder from './SuccessOrder';
import AdressInput from './AdressInput';

const mapDispatchToProps = dispatch => {
  return {
    closeOrderForm: () => dispatch({ type: 'CLOSE_ORDER_FORM'}),
    closeCart: () => dispatch({ type: 'CLOSE_CART'}),
    showSuccess: () => dispatch({ type: 'SHOW_SUCCESS_WINDOW'}),
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
  },
  content: {
    marginTop: 50,
    display: 'flex',
    justifyContent: 'space-around',
  },
  button: {
    marginTop: 15,
  },
  askForm: {
    display: 'none'
  }
});

class OrderForm extends React.PureComponent {
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
    if (name == "address") this.sendNP(event.target.value)
    this.setState({ [name]: event.target.value });
  };

  sendNP = (city) => {
    fetch('https://api.novaposhta.ua/v2.0/json/', {
      crossDomain: true,
      method: 'POST',
      headers: {"content-type": "application/json",},
      processData: false,
      body: JSON.stringify({
        apiKey: "a558d1d4ddf8205b9bee6fc1b597327a",
        modelName: "Address",
        // calledMethod: "searchSettlements",
        calledMethod: "getWarehouses",
        
        methodProperties: {CityName: city, Limit:50}
      }),
    }).then(res => res.json()).then(data => console.log(data))
  }

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
   this.props.showSuccess()
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
      <div className={classes.imgWrap}>
        <img src="/imgs/logo.png" className={classes.logo} />
      </div>
      <div className={classes.content}>
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
              {/* <TextField
              label="Адрес"
              value={this.state.address}
              onChange={this.handleChange('address')}
              className={classes.textField}
              type="text"
              margin="normal"
              fullWidth
            /> */}
            <AdressInput classesFromOrder={classes} />
            <Button variant="contained" className={classes.button} onClick={this.sendOrder} color="primary">
              Отправить заказ
            </Button>
          </form>

          <form noValidate autoComplete="off" className={classes.askForm} >
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
        <Dialog title="Ваш заказ принят" Component={SuccessOrder} type="successOrder" />
      </div>

      </div>

    );
  }
}

OrderForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(OrderForm))
