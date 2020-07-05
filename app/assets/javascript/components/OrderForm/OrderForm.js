import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CartMicro from "../CartMicro/CartMicro";
import { connect } from "react-redux";
import CartWithDialog from "../Cart/CartWithDialog";
import AdressInput from "../AdressInput/AdressInput";
import FormHelperText from "@material-ui/core/FormHelperText";
import { Link } from "react-router-dom";
import styles from "./styles";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import TitleComponent from "../TitleComponent";
import { validationConfig } from "../Utils";
import DialogSwitcher from "../DialogSwitcher";
import googleEvents from "../constants/googleEvents";

const mapStateToProps = state => {
  return {
    card: state.card
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeOrderForm: () => dispatch({ type: "CLOSE_ORDER_FORM" }),
    closeCart: () => dispatch({ type: "CLOSE_CART" }),
    showSuccess: () => dispatch({ type: "SHOW_SUCCESS_WINDOW" })
  };
};

class OrderForm extends React.PureComponent {
  state = {
    name: "",
    phone: "",
    city: "",
    departament: "",
    name_question: "",
    telephone: "",
    message: "",
    comment: "",
    errors: {},
    wasTrySend: false
  };

  handleChange = name => event => {
    if (name == "address") this.sendNP(event.target.value);
    this.setState({ [name]: event.target.value });
    if (this.state.wasTrySend) this.validateData();
  };

  sendNP = city => {
    fetch("https://api.novaposhta.ua/v2.0/json/", {
      crossDomain: true,
      method: "POST",
      headers: { "content-type": "application/json" },
      processData: false,
      body: JSON.stringify({
        apiKey: "a558d1d4ddf8205b9bee6fc1b597327a",
        modelName: "Address",
        // calledMethod: "searchSettlements",
        calledMethod: "getWarehouses",

        methodProperties: { CityName: city, Limit: 50 }
      })
    })
      .then(res => res.json())
      .then(data => console.log(data));
  };

  componentDidMount() {
    this.props.closeOrderForm();
    this.props.closeCart();
  }

  changeCity = city => {
    this.setState({ city }, () => {
      if (this.state.wasTrySend) this.validateData();
    });
  };

  changeDepartament = departament => {
    this.setState({ departament }, () => {
      if (this.state.wasTrySend) this.validateData();
    });
  };

  validateData = () => {
    const { name, phone, city, departament } = this.state;
    let withoutErrors = true;

    const isValid = {
      name: validationConfig.regExp.name.test(name),
      phone: validationConfig.regExp.phone.test(phone),
      city: validationConfig.regExp.city.test(city),
      departament: validationConfig.regExp.departament.test(departament)
    };

    if (Object.values(isValid).some(validItem => !validItem)) {
      withoutErrors = false;
      let currentErrors = {};
      for (var key in isValid) {
        if (!isValid[key]) {
          currentErrors[key] = validationConfig.text[key];
        }
      }

      this.setState({ errors: currentErrors });
    } else {
      this.setState({ errors: {} });
    }
    return withoutErrors;
  };

  sumOrders = objs => {
    var sum = 0;
    objs.map(obj => {
      sum += parseFloat(obj["price"]);
    })
    return sum;
  }

  sendOrder = () => {
    this.setState({ wasTrySend: true });
    if (this.validateData()) {
      gtag("event", "Попытка отправить заказ", {'event_category': 'События кнопок', 'event_action': "Попытка отправить заказ"})
      gtag(
        "event",
        googleEvents["Попытка отправить заказ"].title,
        googleEvents["Попытка отправить заказ"].data
      );
      fbq('track', 'Purchase', {value: this.sumOrders(this.props.card.data), currency: 'GRN'});
      const line_items = this.props.card.data.map(function(element) {
        return {
          id: element.id,
          amount: element.amount,
          activeSize: element.activeSize
        };
      });
      fetch("/orders", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order: {
            name: this.state.name,
            phone: this.state.phone,
            address: this.state.city,
            comment: this.state.comment,
            departament: this.state.departament
          },
          line_items: {
            cards: line_items
          }
        })
      });
      this.props.showSuccess();
      setTimeout(this.redirectToMain, 4000);
    }
  };

  errorHelper = field => {
    if (!this.state.errors[field]) return null;
    return (
      <FormHelperText className={this.props.classes.error}>
        {this.state.errors[field]}
      </FormHelperText>
    );
  };

  redirectToMain = () => {
    gtag(
      "event",
      googleEvents["Отправить заказ"].title,
      googleEvents["Отправить заказ"].data
    );
    this.props.history.push("/");
  };

  handleCommentStatus = () =>
    this.setState(prevState => ({ commentStatus: !prevState.commentStatus }));

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <TitleComponent title="KILO магазин одежды и обуви. Широкий ассортимен! Доступные цены!" />
        <Link to="/">
          <div className={classes.imgWrap}>
            <img src="/imgs/logo.png" className={classes.logo} />
          </div>
        </Link>
        <div className={classes.content}>
          <form noValidate autoComplete="off" className={classes.form}>
            <div className={classes.title}>Оформление заказа</div>
            <TextField
              label="Имя и Фамилия"
              className={classes.textField}
              type="text"
              value={this.state.name}
              onChange={this.handleChange("name")}
              margin="normal"
              fullWidth
              error={this.state.errors.name}
            />
            {this.errorHelper("name")}
            <TextField
              label="Телефон"
              value={this.state.phone}
              onChange={this.handleChange("phone")}
              className={classes.textField}
              type="text"
              margin="normal"
              fullWidth
              error={this.state.errors.phone}
            />
            {this.errorHelper("phone")}
            <AdressInput
              classesFromOrder={classes}
              changeCity={this.changeCity}
              changeDepartament={this.changeDepartament}
              errors={this.state.errors}
            />
            <div
              className={classes.addComment}
              onClick={this.handleCommentStatus}
            >
              + Добавтиь комментарий
            </div>
            {this.state.commentStatus && (
              <TextareaAutosize
                placeholder="Комментарий к заказу"
                className={classes.commentTextarea}
                rows={5}
                rowsMax={7}
                value={this.state.comment}
                onChange={this.handleChange("comment")}
                margin="normal"
              />
            )}
            <Button
              variant="contained"
              className={classes.button}
              onClick={this.sendOrder}
              color="primary"
            >
              Отправить заказ
            </Button>
          </form>

          <div className={classes.cartMicro}>
            <CartMicro />
          </div>
          <DialogSwitcher
            dialogs={[{ title: "Ваш заказ принят", type: "successOrder" }]}
          />
          <CartWithDialog orderForm />
        </div>
      </div>
    );
  }
}

OrderForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(OrderForm));
