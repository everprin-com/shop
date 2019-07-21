import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import purple from "@material-ui/core/colors/purple";
import fetchGetWithParams from "./api/fetchGetWithParams";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import FormHelperText from "@material-ui/core/FormHelperText";

const mapDispatchToProps = dispatch => {
  return {
    resetAndAddProducts: products =>
      dispatch({ type: "RESET_AND_ADD_PRODUCTS", products })
  };
};

const styles = theme => ({
  root: {
    width: "100%",
    display: "inline-block",
    [theme.breakpoints.up("sm")]: {
      width: "190px"
    },
    [theme.breakpoints.up("md")]: {
      width: "350px"
    },
    [theme.breakpoints.up("lg")]: {
      width: "450px"
    }
  },
  item: {
    display: "flex",
    alignItems: "center",
    margin: "3px 5px",
    margin: "2px 0",
    cursor: "pointer",
    padding: "2px 10px",
    "&:hover": {
      background: "#ccf"
    }
  },
  inputWrap: {
    position: "relative"
  },
  mainWrap: {
    display: "flex"
  },
  dropDown: {
    position: "absolute",
    width: 400,
    maxHeight: 500,
    overflowY: "auto",
    fontSize: "15px",
    zIndex: 1,
    boxShadow: "4px 4px 10px #ccc"
  },
  textContent: {
    marginLeft: 15
  },
  linkItem: {
    tesxtDecoration: "none"
  },
  category: {
    fontSize: "15px"
  },
  inputBase: {
    width: `400px !important`
  }
});

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
    const {
      classes,
      data,
      changeCity,
      departments,
      changeDepartment,
      closeDropDown
    } = this.props;
    if (!data) return null;
    if (departments) {
      return (
        <div className={classes.dropDown} ref={this.dropDownRef}>
          <Paper>
            {data.map((dep, id) => (
              <div
                className={classes.item}
                key={id}
                onClick={() => changeDepartment(dep, "withClose")}
              >
                {dep}
              </div>
            ))}
          </Paper>
        </div>
      );
    }
    return (
      <div className={classes.dropDown} ref={this.dropDownRef}>
        <Paper>
          {data.map((address, id) => (
            <div
              className={classes.item}
              key={id}
              onClick={() => {
                closeDropDown();
                changeCity(address.MainDescription);
              }}
            >
              {address.Present}
            </div>
          ))}
        </Paper>
      </div>
    );
  }
}

class CustomizedInputs extends React.PureComponent {
  constructor(props) {
    super(props);
    this.cityRef = React.createRef();
    this.departmentRef = React.createRef();
  }

  state = { isOpenDropDown: false, data: [] };

  onChange = (e, dep) => {
    const val = e.target.value;
    this.setState({ searchCity: val });
    this.props.changeCity(val);
    if (val.length < 2) return;
    this.sendNP(val, dep).then(res =>
      this.setState({
        searchCity: val,
        isOpenDropDown: true,
        data: res.data[0].Addresses
      })
    );
  };

  changeCity = city => {
    this.setState({ city, searchCity: city }, () =>
      this.sendNP(city, true).then(res => {
        this.props.changeCity(city);
        const departments = res.data.map(d => d.Description);
        this.setState({
          departments,
          filteredDepartments: departments
        });
      })
    );
  };

  changeDepartment = (e, shoudClose) => {
    const val = e.target ? e.target.value : e;
    // if not from keyboard
    if (!e.target) {
      this.departmentRef.current.focus();
      this.setState({ filteredDepartments: null });
    } else {
      this.setState({
        filteredDepartments: this.state.departments.filter(dep =>
          dep.includes(val)
        )
      });
    }
    this.setState({
      serchDepartment: val
    });
    this.props.changeDepartament(val);
  };

  sendNP = (city, dep) => {
    let calledMethod = dep ? "getWarehouses" : "searchSettlements";
    return fetch("https://api.novaposhta.ua/v2.0/json/", {
      crossDomain: true,
      method: "POST",
      headers: { "content-type": "application/json" },
      processData: false,
      body: JSON.stringify({
        apiKey: "a558d1d4ddf8205b9bee6fc1b597327a",
        modelName: "Address",
        calledMethod,
        methodProperties: {
          CityName: city,
          Language: "ru"
        }
      })
    }).then(res => res.json());
  };

  closeDropDown = () => this.setState({ isOpenDropDown: false });

  errorHelper = field => {
    if (!this.props.errors[field]) return null;
    return (
      <FormHelperText className={this.props.classesFromOrder.error}>
        {this.props.errors[field]}
      </FormHelperText>
    );
  };

  render() {
    const { classes, classesFromOrder, errorHelper } = this.props;
    return (
      <div>
        <div className={classes.inputWrap}>
          <TextField
            label="Город/Населенный пункт"
            className={`${classesFromOrder.textField} ${classes.root}`}
            onChange={this.onChange}
            value={this.state.searchCity}
            type="text"
            margin="normal"
            fullWidth
            error={this.props.errors.city}
            // inputRef={this.cityRef}
          />
          {this.errorHelper("city")}
          {this.state.isOpenDropDown && (
            <DropDown
              changeCity={this.changeCity}
              classes={classes}
              data={this.state.data}
              closeDropDown={this.closeDropDown}
            />
          )}
        </div>

        <div className={classes.inputWrap}>
          <TextField
            fullWidth
            label="Отделение Новой Почты"
            className={`${classes.root}`}
            value={this.state.serchDepartment}
            onChange={this.changeDepartment}
            type="text"
            margin="normal"
            className={classesFromOrder.textField}
            inputRef={this.departmentRef}
            error={this.props.errors.departament}
          />
          {this.errorHelper("departament")}
          {this.state.filteredDepartments && (
            <DropDown
              classes={classes}
              changeDepartment={this.changeDepartment}
              departments
              data={this.state.filteredDepartments}
              closeDropDown={this.closeDropDown}
            />
          )}
        </div>
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
