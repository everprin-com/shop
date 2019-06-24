import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import categories from './constants/categories'
import fetchGet from "./api/fetchGet"
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import imgCategoryMap from './constants/imgCategoryMap'

const mapDispatchToProps = dispatch => {
  return {
    requestAndAddProducts: params => dispatch({ type: 'REQUEST_AND_ADD_PRODUCTS', params, afterReset: true}),
    addMetaDatas: meta_datas => dispatch({ type: 'ADD_META_DATAS', meta_datas }),
    // startScroll: () =>{  window.scroll({ top: 0, behavior: 'smooth' }) }
  }
}

const mapStateToProps = state => {
  return {
    headers: state.metaData.headers,
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
    [theme.breakpoints.down('sm')]: {
      margin: '0px',
      fontSize: '12px',
    },
  },
  categoryList: {
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 20,
    },
  },
  categoryBlock: {
    display: 'flex',
  },
  cardImg: {
    maxHeight: 200,
    width: 'auto',
  },
  img: {
    maxHeight: 200,
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

  componentDidMount() {
     this.getMetaDatas()
  }

  getMetaDatas = () => {
    fetchGet("/meta_datas")
    .then(data => {
      this.setState(
        {data},
        () => {
          this.props.addMetaDatas(data)
        }
      )
    })
  }

  onChangeCategory = category => {
    const {requestAndAddProducts, redirectToRoot, startScroll, resetDropDown} = this.props
    requestAndAddProducts({search_category: category})
    resetDropDown()
    redirectToRoot && redirectToRoot()
    // startScroll()
  }

  ulWithSpecialCountLi = (arrLi, countLi) => {
    const { classes } = this.props;
    let ulAmount = Math.ceil((arrLi.length+1) / countLi)

    let arrForUl = []
    for(var i=1, s=0; i < ulAmount; ++i, s=s+countLi){
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

  clothesList = () => {
    const { classes, headers } = this.props;
    header = headers.filter(header => header.group == "clothes")
    console.log(header)
    console.log("header")
    return (
    <div  className={classes.categoryBlock}>
      {this.ulWithSpecialCountLi(categories, 5)}
    </div>)
  }

  render() {
    const { classes, headers } = this.props;
    const { imgCategory } = this.state;
    console.log("addMetaDatas")
    console.log(this.props)
    return (
        <div className={classes.categoryBlock}>
          {this.ulWithSpecialCountLi(categories, 5)}
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DropDownMenu))
