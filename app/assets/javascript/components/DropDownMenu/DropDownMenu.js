import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import categories from "../constants/categories";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import imgCategoryMap from "../constants/imgCategoryMap";
import styles from "./styles";

const mapDispatchToProps = dispatch => {
  return {
    requestAndAddProducts: params =>
      dispatch({ type: "REQUEST_AND_ADD_PRODUCTS", params, afterReset: true }),
    addFilter: filter => dispatch({ type: "ADD_FILTER", filter })
  };
};

const mapStateToProps = state => {
  return {
    pageWidth: state.general.pageWidth
  };
};

class DropDownMenu extends React.PureComponent {
  state = {
    value: 100,
    imgCategory: null
  };

  handleChange = (event, value) => this.setState({ value });

  // hoverOn = value =>
  //   imgCategoryMap[value] &&
  //   this.setState({ imgCategory: imgCategoryMap[value] });

  onChangeCategory = category => {
    const { resetDropDown, redirectToCategory } = this.props;
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
                // onMouseEnter={this.hoverOn.bind(this, liTitle)}
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
    const { classes, headers } = this.props;
    const { imgCategory } = this.state;
    return (
      <div className={classes.categoryBlock}>
        {this.productTypeList()}
        {/* <Paper className={classes.cardImg}>
          <img className={classes.img} src={imgCategory} />
        </Paper> */}
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
