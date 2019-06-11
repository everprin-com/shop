import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import purple from '@material-ui/core/colors/purple';
import fetchGetWithParams from "./api/fetchGetWithParams"
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { Link } from "react-router-dom";

const mapDispatchToProps = dispatch => {
  return {
    resetAndAddProducts: products => dispatch({ type: 'RESET_AND_ADD_PRODUCTS', products }),
  }
}

const styles = theme => ({
  root: {
    display: 'inline-block',
    [theme.breakpoints.up('sm')]: {
      width: '190px',
    },
    [theme.breakpoints.up('md')]: {
      width: '350px',
    },
    [theme.breakpoints.up('lg')]: {
      width: '450px',
    },
  },
  cssFocused: {},
  cssUnderline: {
    '&:after': {
      borderBottomColor: purple[500],
    },
  },
  cssOutlinedInput: {
    width: "100%",
    '&$cssFocused $notchedOutline': {
      borderColor: purple[500],
    },
  },
  notchedOutline: {},

  bootstrapInput: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 26,
    width: 350,
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
  bootstrapFormLabel: {
    fontSize: 18,
  },
  img: {
    width: 50,
    height: 'avto'
  },
  item: {
    display: 'flex',
    alignItems: "center",
    margin: "3px 5px",
    cursor: "pointer",
  },
  inputWrap: {
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    },
  },
  dropDown: {
    position: 'absolute',
    width: 450,
    maxHeight: 500,
    overflowY: 'auto',
  },
  textContent: {
    marginLeft: 15,
  },
  linkItem: {
    tesxtDecoration: 'none'
  },
  category: {
    fontSize: '15px'
  }
});

class DropDown extends React.PureComponent {
  constructor(props) {
    super(props)
    this.dropDownRef = React.createRef()
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, false);
  }
  
  componentWillMount() {
    document.addEventListener('click', this.handleClickOutside, false);
  }
  
  handleClickOutside = event => {
    const domNode = this.dropDownRef.current
    
    if ((!domNode || !domNode.contains(event.target))) {
        this.props.closeDropDown()
    }
  }

  render(){
    const { classes, data } = this.props
    return (
      <div className={classes.dropDown} ref={this.dropDownRef} >
        <Paper>
              {data.map((product, id )=> <Link to={`/productcart/${product.id}`} className={classes.linkItem} key={id}>
                <div className={classes.item}>
                  <div className={classes.imgWrap}>
                    <img className={classes.img} src={product.picture}/>
                  </div>
                  <div className={classes.textContent}>
                    <div className={classes.title}>
                      {product.name}
                    </div>
                    <div className={classes.category}>
                      {product.category}
                    </div>
                  </div>
                </div>
              </Link>)}
        </Paper>
      </div>
    )
  }
}

class CustomizedInputs extends React.PureComponent{
  state = { isOpenDropDown:false, data: []}

  onChange = e => {
    fetchGetWithParams("/items/", {search_name: e.target.value, per_page: 30}, true)
      .then(data => this.setState({isOpenDropDown: true, data: data.items}))
  }

  closeDropDown = () => this.setState({isOpenDropDown: false})

  render(){
    const { classes } = this.props;
    return(
      <div className={classes.inputWrap}>

      <TextField
        InputLabelProps={{
          classes: {
            root: classes.cssLabel,
            focused: classes.cssFocused,
          },
        }}
        InputProps={{
          classes: {
            root: classes.cssOutlinedInput,
            focused: classes.cssFocused,
            notchedOutline: classes.notchedOutline,
          },
        }}
        label="Поиск товара"
        variant="outlined"
        id="custom-css-outlined-input"
        className ={classes.root}
        onChange={this.onChange}
      />
      {this.state.isOpenDropDown && <DropDown classes = {classes} data = {this.state.data} closeDropDown={this.closeDropDown} />}
    </div>
    )
  }
}

CustomizedInputs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(CustomizedInputs))
