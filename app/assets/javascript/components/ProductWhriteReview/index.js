import React from "react";
import Stars from "../Stars";
import TextField from "@material-ui/core/TextField";
import fetchPost from "../api/fetchPost";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import { validateData } from "../Utils";
import FormHelperText from "@material-ui/core/FormHelperText";

const ProductWhriteReview = ({ slugId, category }) => {
  const [description, setDescription] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [clientInfo, setClientInfo] = React.useState("");
  const [rate, setRate] = React.useState(5);
  const [errors, setErrors] = React.useState({});
  const [formWasSended, changeFormWasSended] = React.useState(false);

  const handleChange = (event, callback) => {
    let { name, value } = event.target;
    if (formWasSended) validateData({ [name]: value }, setErrors, errors);
    callback(value);
  };

  let now = new Date();

  const date = `${now.getDate()}.${now.getMonth() + 1}.${now.getFullYear()}`;

  const handleClick = () => {
    changeFormWasSended(true);
    if (validateData({ author, clientInfo, description }, setErrors)) {
     let data = {
        text: description,
        author,
        date,
        rate,
        client_info: clientInfo,
        slug_id: slugId,
        category
      }
      fetchPost("/product_comments", {...data}, { type:"FETCH_COMMENT", data })
    }
  };

  const errorHelper = field => {
    if (!errors[field]) return null;
    return <FormHelperText className="error">{errors[field]}</FormHelperText>;
  };
  return (
    <div className="product-whrite-review">
      <Stars setRate={setRate} />
      <TextField
        label="Имя"
        value={author}
        onChange={e => handleChange(e, setAuthor)}
        name="author"
        type="text"
        margin="normal"
        fullWidth
        error={errors.author}
      />
      {errorHelper("author")}
      <TextField
        label="Телефон или email"
        value={clientInfo}
        onChange={e => handleChange(e, setClientInfo)}
        name="clientInfo"
        type="text"
        margin="normal"
        fullWidth
        error={errors.clientInfo}
      />
      {errorHelper("clientInfo")}
      <TextareaAutosize
        value={description}
        aria-label="minimum height"
        name="description"
        placeholder="Ваши отзыв"
        onChange={e => handleChange(e, setDescription)}
        className="textarea"
        error={errors.description}
      />
      {errorHelper("description")}
      <Button
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Оставить отзыв
      </Button>
    </div>
  );
};

export default ProductWhriteReview;
