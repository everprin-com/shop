import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import styles from "./styles";

const mapDispatchToProps = dispatch => {
  return {
    requestAndAddProducts: params =>
      dispatch({ type: "REQUEST_AND_ADD_PRODUCTS", params, afterReset: true }),
    addFilter: filter => dispatch({ type: "ADD_FILTER", filter }),
    resetProducts: params => dispatch({ type: "RESET_PRODUCTS" })
  };
};

const mapStateToProps = state => {
  return {
    pageWidth: state.general.pageWidth
  };
};

class DropDownMenu extends React.PureComponent {
  state = {
    value: 100
  };

  handleChange = (event, value) => this.setState({ value });

  onChangeCategory = category => {
    const { resetDropDown, redirectToCategory, resetProducts } = this.props;
    resetProducts();
    redirectToCategory(category);
    resetDropDown();
  };

  renderUlList = (arrForUl, arrLi, classes) => {
    return arrForUl.map((arrLi, i) => {
      return (
        <ul className={classes.categoryList} key={i}>
          {arrLi.map((liTitle, i) => {
            return (
              <li
                className={classes.categoryItem}
                onClick={() => this.onChangeCategory(liTitle)}
                key={i}
              >
                {liTitle.toUpperCase()}
              </li>
            );
          })}
        </ul>
      );
    });
  };

  ulWithSpecialCountLi = ({ arrLi, countLi, countUl }) => {
    const { classes } = this.props;
    if (!arrLi) return;
    if (countUl) {
      const countLiInEveryUl = Math.ceil(arrLi.length / countUl);
      let arrForUl = [];
      for (var i = 1, s = 0; i <= countUl; ++i, s = s + countLiInEveryUl) {
        arrForUl.push(arrLi.slice(s, countLiInEveryUl * i));
      }

      return this.renderUlList(arrForUl, arrLi, classes);
    }

    if (countLi) {
      let ulAmount = Math.ceil(arrLi.length / countLi);
      let arrForUl = [];
      for (var i = 1, s = 0; i <= ulAmount; ++i, s = s + countLi) {
        arrForUl.push(arrLi.slice(s, countLi * i));
      }

      return this.renderUlList(arrForUl, arrLi, classes);
    }
  };

  productTypeList = () => {
    const { classes, productTypeList, pageWidth } = this.props;
    return (
      <div className={classes.categoryTypeList}>
        {this.ulWithSpecialCountLi({
          arrLi: productTypeList && productTypeList.sort(),
          ...(pageWidth < 600 ? { countUl: 2 } : { countLi: 5 })
        })}
      </div>
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.categoryBlock}>
        <div className={classes.whiteLayout}></div>
        {this.productTypeList()}
      </div>
    );
  }
}

DropDownMenu.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(DropDownMenu));
