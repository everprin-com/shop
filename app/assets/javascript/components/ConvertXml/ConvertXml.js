import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CartMicro from "../CartMicro/CartMicro";
import { connect } from "react-redux";
import styles from "./styles";

class ConvertXml extends React.Component {
  state = {
    file: null,
    dropShip: "",
  };

  onChange = e => {
    let file = e.target.files[0];
    this.setState({ file });
  };

  onChangeDrop = e => {
    const val = e.target.value;
    this.setState({ dropShip: val });
  };

  sendFetch = () => {
    const formData = new FormData();
    formData.append("items_import[file]", this.state.file);
    formData.append("drop_ship_name", this.state.dropShip);
    var myInit = {
      method: "POST",
      body: formData,
      headers: {
        Accept:
          "text/html,application/xhtml+xml,application/xml;" +
          "q=0.9,image/webp,image/apng,*/*"
      }
    };
    fetch("/items_imports", myInit)
      .then(res => res.json())
      .then(data => this.setState({ data }));
  };

  sendOrder = () => {
    fetch("/users", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: {
          email: this.state.email,
          password: this.state.password,
          password_confirmation: this.state.password_confirmation
        }
      })
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <form noValidate autoComplete="off">
          <div className={classes.title}>ковертировать ексель</div>
          <input type="file" name="file" onChange={this.onChange} />
          <select value={this.state.dropShip} onChange={this.onChangeDrop} >
            <option value="">select drop ship</option>
            <option value="issaplus">issaPLus</option>
            <option value="tos">timeOfStyle</option>
            <option value="ager">ager</option>
            <option value="garne">garne</option>
         </select>
          <Button
            variant="contained"
            className={classes.button}
            onClick={this.sendFetch}
            color="primary"
          >
            Конвертировать
          </Button>
        </form>
      </div>
    );
  }
}

ConvertXml.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ConvertXml);
