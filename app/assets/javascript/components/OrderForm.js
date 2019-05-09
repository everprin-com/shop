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
  state = {file: null}
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  componentDidMount() {
    this.props.closeOrderForm()
  }

  sendFetch = () => {

    const formData = new FormData();
    formData.append("items_import[file]", this.state.file);
    var myInit = {
    method: 'POST',
    body: formData,
    headers: {
      Accept: "text/html,application/xhtml+xml,application/xml;" +
      "q=0.9,image/webp,image/apng,*/*",
    },
  }
    console.log(formData)


    fetch("/items_imports", myInit)
    .then(res => res.json())
    .then(data => this.setState({data}))
  }
  onChange = e => {
   let file = e.target.files[0]
   this.setState({file})
  }
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <form noValidate autoComplete="off"  >
          <div className={classes.title}>
            Оформление заказа
          </div>
          <input type="file" name="file" onChange={this.onChange} /> 
          <TextField
            label="Имя"
            className={classes.textField}
            type="text"
            margin="normal"
            fullWidth
          />
          <TextField
            label="Телефон"
            className={classes.textField}
            type="text"
            margin="normal"
            fullWidth
          />
            <TextField
            label="Адресс"
            className={classes.textField}
            type="text"
            margin="normal"
            fullWidth
          />
          <Button variant="contained" className={classes.button} onClick={this.sendFetch} color="primary">
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
