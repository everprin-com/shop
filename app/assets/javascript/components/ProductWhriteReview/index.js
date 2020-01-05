import React from "react";
import Stars from "../Stars";
import TextField from "@material-ui/core/TextField";
import fetchPost from "../api/fetchPost";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import { validateData } from "../Utils";
import FormHelperText from "@material-ui/core/FormHelperText";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

class ProductWhriteReview extends React.PureComponent {
  state = {
    description: "",
    author: "",
    clientInfo: "",
    rate: 5,
    errors: {},
    formWasSended: false,
    formWasSendedSuccessfully: false
  };

  setter = (key, val) => this.setState({ [key]: val });

  handleChange = event => {
    let { name, value } = event.target;
    if (this.state.formWasSended)
      validateData(
        { [name]: value },
        this.setter.bind(null, "errors"),
        this.state.errors
      );
    this.setter(name, value);
  };

  date = () => {
    let now = new Date();
    let formatedDate = val => (val < 10 ? `0${val}` : val);
    return `${formatedDate(now.getDate())}.${formatedDate(
      now.getMonth() + 1
    )}.${now.getFullYear()}`;
  };

  handleClick = () => {
    this.setter("formWasSended", true);
    const { slugId, category } = this.props;
    const { description, author, clientInfo, rate } = this.state;

    if (
      validateData(
        { author, clientInfo, description },
        this.setter.bind(null, "errors")
      )
    ) {
      let data = {
        text: description,
        author,
        date: this.date(),
        rate,
        client_info: clientInfo,
        slug_id: slugId,
        category
      };
      fetchPost(
        "/product_comments",
        { ...data },
        { type: "FETCH_COMMENT", data: { ...data, voted: { mark: rate } } }
      );
      this.setter("formWasSendedSuccessfully", true);
    }
  };

  errorHelper = field => {
    const { errors } = this.state;
    if (!errors[field]) return null;
    return <FormHelperText className="error">{errors[field]}</FormHelperText>;
  };

  successData = () => {
    return (
      <div className="check-circle">
        <CheckCircleIcon className="check-circle__icon" />
        <div className="check-circle__text">
          Отзыв успешно отпарвлен. Спасибо)
        </div>
      </div>
    );
  };

  render() {
    const {
      description,
      author,
      clientInfo,
      rate,
      errors,
      formWasSendedSuccessfully
    } = this.state;

    return (
      <div className="product-whrite-review">
        {formWasSendedSuccessfully ? (
          this.successData()
        ) : (
          <div>
            <span className="evaluate-porduct">Оценка товару</span>{" "}
            <Stars setRate={this.setter.bind(null, "rate")} rate={rate} />
            <TextField
              label="Имя"
              value={author}
              onChange={this.handleChange}
              name="author"
              type="text"
              margin="normal"
              fullWidth
              error={!!errors.author}
            />
            {this.errorHelper("author")}
            <TextField
              label="Телефон или email"
              value={clientInfo}
              onChange={this.handleChange}
              name="clientInfo"
              type="text"
              margin="normal"
              fullWidth
              error={!!errors.clientInfo}
            />
            {this.errorHelper("clientInfo")}
            <TextareaAutosize
              value={description}
              aria-label="minimum height"
              name="description"
              placeholder="Ваши отзыв"
              onChange={this.handleChange}
              className="textarea"
              error={!!errors.description}
            />
            {this.errorHelper("description")}
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleClick}
            >
              Оставить отзыв
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default ProductWhriteReview;
