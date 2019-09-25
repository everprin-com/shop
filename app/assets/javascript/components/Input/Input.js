import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import fetchGetWithParams from "../api/fetchGetWithParams";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import styles from "./styles";

const mapDispatchToProps = dispatch => {
  return {
    resetAndAddProducts: products =>
      dispatch({ type: "RESET_AND_ADD_PRODUCTS", products })
  };
};

class DropDown extends React.PureComponent {
  constructor(props) {
    super(props);
    this.dropDownRef = React.createRef();
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside, false);
  }

  componentWillMount() {
    document.addEventListener("click", this.handleClickOutside, false);
  }

  handleClickOutside = event => {
    const domNode = this.dropDownRef.current;

    if (!domNode || !domNode.contains(event.target)) {
      this.props.closeDropDown();
    }
  };

  render() {
    const { classes, data } = this.props;
    return (
      <div className={classes.dropDown} ref={this.dropDownRef}>
        <Paper>
          {data.map((product, id) => (
            <Paper className={classes.paperItem}>
              <Link
                to={`/productcart/${product.id}`}
                className={classes.linkItem}
                key={id}
              >
                <div className={classes.item}>
                  <div className={classes.imgWrap}>
                    <img
                      className={classes.img}
                      src={
                        Array.isArray(product.picture)
                          ? product.picture[0]
                          : product.picture
                      }
                    />
                  </div>
                  <div className={classes.textContent}>
                    <div className={classes.title}>{product.name}</div>
                    <div className={classes.category}>{product.category}</div>
                  </div>
                </div>
              </Link>
            </Paper>
          ))}
        </Paper>
      </div>
    );
  }
}

class CustomizedInputs extends React.PureComponent {
  state = { isOpenDropDown: false, data: [] };

  onChange = e => {
    fetchGetWithParams(
      "/items/",
      { search_name: e.target.value, per_page: 30 },
      true
    ).then(data => this.setState({ isOpenDropDown: true, data: data.items }));
  };

  closeDropDown = () => this.setState({ isOpenDropDown: false });

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.inputWrap}>
        <TextField
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused
            }
          }}
          InputProps={{
            classes: {
              root: classes.cssOutlinedInput,
              focused: classes.cssFocused,
              notchedOutline: classes.notchedOutline
            }
          }}
          label="Поиск товара"
          variant="outlined"
          id="custom-css-outlined-input"
          className={classes.root}
          onChange={this.onChange}
        />
        {this.state.isOpenDropDown && (
          <DropDown
            classes={classes}
            data={this.state.data}
            closeDropDown={this.closeDropDown}
          />
        )}
      </div>
    );
  }
}

CustomizedInputs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(CustomizedInputs));
