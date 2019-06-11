import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import FilterPanel from './filter/FilterPanel';
import FilterPanelNew from './filter/FilterPanelNew';
import SomeFilter from './filter/SomeFilter';
import FilterPrice from './filter/FilterPrice';
import FilterSeason from './filter/FilterSeason';
import FilterColor from './filter/FilterColor';
import FilterCategory from './filter/FilterCategory';

const styles = theme => ({
  root: {
    position: 'fixed',
    marginTop: 75,
    width: '100%',
    maxWidth: 260,
    backgroundColor: theme.palette.background.paper,
    display: 'inline-block',
    zIndex: 2,
  },
  mainSideBar: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  smallSideBar: {
    width: 300
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  item: {
    padding: 0,
  }
});

class SideBar extends React.PureComponent {
  state = {
    open: true,
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { classes, isMainSideBar } = this.props;

    return (
      <List
        component="nav"
        className={isMainSideBar ? `${classes.root} ${classes.mainSideBar}` : `${classes.root} ${classes.smallSideBar}` }
      >

        <ListItem className={classes.item}> 
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText inset primary="Фильтр по размеру" />
        </ListItem>

        <ListItem className={classes.item}>
            <SomeFilter />
        </ListItem>

        <ListItem className={classes.item}>
          <FilterSeason />
        </ListItem>

        <ListItem className={classes.item}>
          <FilterPrice />
        </ListItem>

        <ListItem className={classes.item}>
          <FilterColor />
        </ListItem>

        <ListItem className={classes.item}>
            <FilterPanel title="Фильтр по категории" Filter={FilterCategory} />
        </ListItem>

        <ListItem onClick={this.handleClick} className={classes.item}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText inset primary="Inbox" />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        
        {/* <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem className={classes.nested} className={classes.item}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText inset primary="Starred" />
            </ListItem>
          </List>
        </Collapse> */}
      </List>
    );
  }
}

SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SideBar);