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
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';
import MenuGenderPanel from './MenuGenderPanel'
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
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  tab: {
    fontSize: '16px',
  },
  tab_content: {
    fontSize: '15px',
  },
});

class ScrollableTabsButtonForce extends React.Component {
  state = {
    value: 0,
  };
//MuiTab-root-145
  handleChange = (event, value) => {
    console.log("ev: "+ event)
    console.log("value: "+ value)
    this.setState({ value });
  };

  hoverOn( value){
  this.handleChange("", value)
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <MenuGenderPanel />
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab className={classes.tab} label="Item One" icon={<PhoneIcon />} onMouseEnter={this.hoverOn.bind(this, 0)} />
            <Tab className={classes.tab} label="Item Two" icon={<FavoriteIcon />} onMouseEnter={this.hoverOn.bind(this, 1)} />
            <Tab className={classes.tab} label="Item Three" icon={<PersonPinIcon />} onMouseEnter={this.hoverOn.bind(this, 2)} />
            <Tab className={classes.tab} label="Item Four" icon={<HelpIcon />} onMouseEnter={this.hoverOn.bind(this, 3)} />
            <Tab className={classes.tab} label="Item Five" icon={<ShoppingBasket />} onMouseEnter={this.hoverOn.bind(this, 4)} />
            <Tab className={classes.tab} label="Item Six" icon={<ThumbDown />} onMouseEnter={this.hoverOn.bind(this, 5)} />
            <Tab className={classes.tab} label="Item Seven" icon={<ThumbUp />} onMouseEnter={this.hoverOn.bind(this, 6)} />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer className={classes.tab_content}>Itefdsf 123asdOne</TabContainer>}
        {value === 1 && <TabContainer className={classes.tab_content}>Itemger Two</TabContainer>}
        {value === 2 && <TabContainer className={classes.tab_content}>Item Three</TabContainer>}
        {value === 3 && <TabContainer className={classes.tab_content}>Item Four</TabContainer>}
        {value === 4 && <TabContainer className={classes.tab_content}>Item Five</TabContainer>}
        {value === 5 && <TabContainer className={classes.tab_content}>Item Six</TabContainer>}
        {value === 6 && <TabContainer className={classes.tab_content}>Item Seven</TabContainer>}
      </div>
    );
  }
}

ScrollableTabsButtonForce.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScrollableTabsButtonForce);