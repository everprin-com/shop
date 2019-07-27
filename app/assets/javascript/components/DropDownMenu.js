import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import categories from './constants/categories'
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import imgCategoryMap from './constants/imgCategoryMap'

const mapDispatchToProps = dispatch => {
  return {
    requestAndAddProducts: params => dispatch({ type: 'REQUEST_AND_ADD_PRODUCTS', params, afterReset: true}),
    // startScroll: () =>{  window.scroll({ top: 0, behavior: 'smooth' }) }
  }
}

const styles = theme => ({
  root: {
    marginTop: '10px',
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    zIndex: 2,
    width: 1240,
  },
  categoryItem: {
    fontSize: '16px',
    margin: '15px',
    cursor: 'pointer',
    textTransform: "lowercase",
    [theme.breakpoints.down('sm')]: {
      margin: '0px',
      fontSize: '12px',
    },
    [theme.breakpoints.down('xs')]: {
      margin: '0px',
      fontSize: '10px',
    },
    "&:hover": {
      color: "#3f51b5"
    }
  },
  categoryList: {
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 15,
    },
  },
  categoryBlock: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      padding: '0 10px',
    },
  },
  cardImg: {
    maxHeight: 185,
    width: 'auto',
    marginTop: 20,
    marginLeft: 50,
    boxShadow: "5px 5px 10px #ccc, -5px -5px 10px #ccc",
  },
  img: {
    maxHeight: 185,
    width: 'auto',
  }
});

class DropDownMenu extends React.PureComponent {
  state = {
    value: 100,
    imgCategory: null,
  };

  handleChange = (event, value) => this.setState({ value });

  hoverOn = value => imgCategoryMap[value] && this.setState({imgCategory: imgCategoryMap[value]})

  onChangeCategory = category => {
    const {requestAndAddProducts, redirectToRoot, startScroll, resetDropDown} = this.props
    requestAndAddProducts({search_category: category})
    resetDropDown()
    redirectToRoot && redirectToRoot()
    // startScroll()
  }

  ulWithSpecialCountLi = (arrLi, countLi) => {
    const { classes } = this.props;
    if (!arrLi) return
    let ulAmount = Math.ceil((arrLi.length+1) / countLi)

    let arrForUl = []
    for(var i=1, s=0; i <= ulAmount; ++i, s=s+countLi){
      arrForUl.push(arrLi.slice(s, countLi*i))
    }
    return arrForUl.map((arrLi, i)=> {
      return (
        <ul className={classes.categoryList} key={i}>
          {arrLi.map((liTitle, i) => {
            return (
              <li
                className={classes.categoryItem}
                onClick={()=>this.onChangeCategory(liTitle)}
                key={i}
                onMouseEnter={this.hoverOn.bind(this, liTitle)}
              >
                {liTitle.toUpperCase()}
              </li>
            )})
          }
        </ul>
      )
    })
  }

  productTypeList = () => {
    const { classes, productTypeList} = this.props;
    return (
    <div  className={classes.categoryBlock}>
      {this.ulWithSpecialCountLi(productTypeList, 5)}
    </div>)
  }

  render() {
    const { classes, headers } = this.props;
    const { imgCategory } = this.state;
    return (
        <div className={classes.categoryBlock}>
          {this.productTypeList()}
          <Paper className={classes.cardImg}>
            <img
              className={classes.img}
              src={imgCategory}
            />
          </Paper>
        </div>)
  }
}



DropDownMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(DropDownMenu))
