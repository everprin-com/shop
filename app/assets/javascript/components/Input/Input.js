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

const mapStateToProps = state => {
  return {
    sex: state.filterData.filter.sex
  };
};

class DropDown extends React.PureComponent {
  constructor(props) {
    super(props);
    this.dropDownRef = React.createRef();
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside, false);
    this.dropDownRef.current.removeEventListener(
      "click",
      this.handleScrollDropDown,
      false
    );
  }

  componentWillMount() {
    document.addEventListener("click", this.handleClickOutside, false);
  }

  componentDidMount() {
    this.dropDownRef.current.addEventListener(
      "scroll",
      this.handleScrollDropDown,
      false
    );
  }

  handleScrollDropDown = () => {
    if (
      this.dropDownRef.current.scrollHeight -
        this.dropDownRef.current.scrollTop -
        this.dropDownRef.current.clientHeight <
      250
    ) {
      this.props.pagination.incrementPage();
    }
    // console.log(this.dropDownRef.current.offsetY)
    // console.log(this.dropDownRef.current.offsetTop)
  };

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
            <Paper className={classes.paperItem} key={id}>
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
  state = {
    inputText: "",
    isOpenDropDown: false,
    data: [],
    page: 1,
    totalPages: 99
  };

  updateDropdown = (addProducts = false) => {
    const { inputText, page, data, totalPages } = this.state;
    if (page > totalPages) {return null}
    fetchGetWithParams(
      "/items/",
      {
        search_name: inputText,
        per_page: 20,
        sex: this.props.sex,
        page
      },
      true
    ).then(resData => {
      const dataItems = addProducts ? [...data, ...resData.items] : resData.items;
      this.setState({ isOpenDropDown: true, data: dataItems, totalPages: resData.total_pages });
    });
  };

  onChange = e => {
    this.setState({ inputText: e.target.value, page: 1 }, this.updateDropdown);
  };

  incrementPage = () =>
    this.setState({ page: this.state.page + 1 }, () =>
      this.updateDropdown("addProducts")
    );

  closeDropDown = () => this.setState({ isOpenDropDown: false });

  render() {
    const { classes } = this.props;
    const pagination = {
      updateDropdown: this.updateDropdown,
      page: this.state.page,
      incrementPage: this.incrementPage
    };
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
            pagination={pagination}
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
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CustomizedInputs));
