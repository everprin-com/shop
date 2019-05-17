import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import Typography from '@material-ui/core/Typography';
import MenuGenderPanel from './MenuGenderPanel'
import categories from './constants/categories'
import Panel from './Panel'
import fetchGetWithParams from "./api/fetchGetWithParams"
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => {
  return {
    resetAndAddProducts: products => dispatch({ type: 'RESET_AND_ADD_PRODUCTS', products }),
  }
}

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    marginTop: '10px',
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    zIndex: 2,
    width: 1240,
  },
  tab: {
    fontSize: '16px',
  },
  tab_content: {
    fontSize: '15px',
  },
  dropdownMenu: {
    position: 'absolute',
    zIndex: 9999,
    background: '#fff',
    boxShadow: '2px 2px 5px #ccc',
    borderRadius: '4px',
    width: '100%',
  },
  chooseCategoryMenu: {
    position: 'relative',
  },
  categoryItem: {
    fontSize: '16px',
    margin: '15px',
    cursor: 'pointer',
  },
  categoryBlock: {
    display: 'flex',
  }
});

class TopMenu extends React.Component {
  state = {
    value: 100,
  };

  handleChange = (event, value) => this.setState({ value });

  hoverOn = value => this.handleChange("", value)

  onChangeCategory = category => {
    fetchGetWithParams("items/", {search_category: category}, true)
    .then(products=> {
      this.props.resetAndAddProducts(products);
    })
  }

  ulWithSpecialCountLi = (arrLi, countLi) => {
    const { classes } = this.props;
    let ulAmount = Math.ceil((arrLi.length+1) / countLi)

    let arrForUl = []
    for(var i=1, s=0; i < ulAmount; ++i, s=s+countLi){
      arrForUl.push(arrLi.slice(s, countLi*i))
    }
    return arrForUl.map(arrLi => {
      return (
        <ul>
          {arrLi.map((liTitle, i) => {
            return (
              <li
                className={classes.categoryItem}
                onClick={()=>this.onChangeCategory(liTitle)}
                key={i}
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
    const { classes } = this.props;
    return (
    <div  className={classes.categoryBlock}>
      {this.ulWithSpecialCountLi(categories, 5)}
    </div>)
  }

  resetDropDown = () => this.setState({ value: 100});

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <MenuGenderPanel />
        
        <AppBar position="static" color="default" className={classes.chooseCategoryMenu}>
          <Tabs
            value={value}
            onChange={this.handleChange}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab className={classes.tab} label="Одежда" icon={<PhoneIcon />} onMouseEnter={this.hoverOn.bind(this, 0)} />
            <Tab className={classes.tab} label="Обувь" icon={<FavoriteIcon />} onMouseEnter={this.hoverOn.bind(this, 1)} />
            <Tab className={classes.tab} label="Аксессуары" icon={<PersonPinIcon />} onMouseEnter={this.hoverOn.bind(this, 2)} />
            <Panel />
          </Tabs>
        </AppBar>

        {this.state.value !==100 && <div className={classes.dropdownMenu} onMouseLeave={this.resetDropDown}>
          {value === 0 && <TabContainer className={classes.tab_content}>
            {this.clothesList()}
          </TabContainer>}
          {value === 1 && <TabContainer className={classes.tab_content}>
            {this.clothesList()}  
          </TabContainer>}
          {value === 2 && <TabContainer className={classes.tab_content}>
            {this.clothesList()}  
          </TabContainer>}
        </div>}
      </div>
    );
  }
}

TopMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(TopMenu))