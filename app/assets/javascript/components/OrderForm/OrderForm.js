import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CartMicro from "../CartMicro/CartMicro";
import { connect } from "react-redux";
import Dialog from "../Dialog/Dialog";
import CartWithDialog from "../Cart/CartWithDialog";
import SuccessOrder from "../SuccessOrder/SuccessOrder";
import AdressInput from "../AdressInput/AdressInput";
import FormHelperText from "@material-ui/core/FormHelperText";
import { Link } from "react-router-dom";
import styles from "./styles";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

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

const ERRORS = {
  text: {
    name:
      "Введите пожалуйста буквы без спец. символов и цифр в количестве от 6 до 24.\n Например: Иван Иванов",
    phone:
      "Введите пожалуйста цифры без спец. символов в количестве от 7 до 16.\n Например: 0952599558",
    city: "Введите пожалуйста буквы в количестве от 3 до 24.\n Например: Киев",
    departament:
      "Введите пожалуйста буквы/цифры в количестве от 6 до 120.\n Например: Отделение №10: ул. Василия Жуковского, 22А"
  },
  regExp: {
    name: /^[а-яєії" -]{6,24}$/i,
    phone: /^[0-9 +-]{7,16}$/i,
    city: /^[а-яєії" .(),]{3,24}$/i,
    departament: /^[а-яєії"0-9 a-z.()№,:-]{6,120}$/i
  }
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
    document.title = "KILO магазин одежды и обуви. Широкий ассортимен! Доступные цены!"
    this.props.closeOrderForm();
    this.props.closeCart();
  }

  changeCity = city => this.setState({ city });

  changeDepartament = departament => this.setState({ departament });

  validateData = () => {
    const { name, phone, city, departament } = this.state;
    let withoutErrors = true;

    const isValid = {
      name: ERRORS.regExp.name.test(name),
      phone: ERRORS.regExp.phone.test(phone),
      city: ERRORS.regExp.city.test(city),
      departament: ERRORS.regExp.departament.test(departament)
    };

    if (Object.values(isValid).some(validItem => !validItem)) {
      withoutErrors = false;
      let currentErrors = {};
      for (var key in isValid) {
        if (!isValid[key]) {
          currentErrors[key] = ERRORS.text[key];
        }
      }

      this.setState({ errors: currentErrors });
    } else {
      this.setState({ errors: {} });
    }
    return withoutErrors;
  };

  sendOrder = () => {
    gtag("event", "Попытка отправить заказ", {'event_category': 'События кнопок', 'event_action': "Попытка отправить заказ"})
    this.setState({ wasTrySend: true });
    if (this.validateData()) {
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
    gtag("event", "Отправить заказ", {'event_category': 'События кнопок', 'event_action': "Отправить заказ"})
    this.props.history.push("/");
  };

  handleCommentStatus = () =>
    this.setState(prevState => ({ commentStatus: !prevState.commentStatus }));

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
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
            {/* <TextField
              label="Адрес"
              value={this.state.address}
              onChange={this.handleChange('address')}
              className={classes.textField}
              type="text"
              margin="normal"
              fullWidth
            /> */}
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
          <Dialog
            title="Ваш заказ принят"
            Component={SuccessOrder}
            type="successOrder"
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
