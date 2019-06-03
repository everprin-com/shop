import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import FilterPanel from './filter/FilterPanel';
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
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class SideBar extends React.PureComponent {
  state = {
    open: true,
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { classes } = this.props;

    return (
      <List
        component="nav"
        subheader={<ListSubheader component="div">Nested List Items</ListSubheader>}
        className={classes.root}
      >
        <ListItem button>
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText inset primary="Фильтр по размеру" />
        </ListItem>

        <ListItem button>
            <FilterPanel title="Фильтр по полу" Filter={SomeFilter} />
        </ListItem>

        <ListItem button>
            <FilterPanel title="Фильтр по сезону" Filter={FilterSeason} />
        </ListItem>

        <ListItem button>
            <FilterPanel title="Фильтр по цене" Filter={FilterPrice} />
        </ListItem>

        <ListItem button>
            <FilterPanel title="Фильтр по цвету" Filter={FilterColor} />
        </ListItem>

        <ListItem button>
            <FilterPanel title="Фильтр по категории" Filter={FilterCategory} />
        </ListItem>

        <ListItem button onClick={this.handleClick}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText inset primary="Inbox" />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText inset primary="Starred" />
            </ListItem>
          </List>
        </Collapse>
      </List>
    );
  }
}

SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SideBar);