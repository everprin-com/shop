import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/icons/Menu';
import green from '@material-ui/core/colors/green';
import SideBar from './SideBar';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  icon: {
    fontSize: 35,
  },
  smallMenu: {
    position: 'absolute',
    bottom: '-56px',
    left: 0,
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block'
    },
  },
  button: {
    minWidth: 50,
    background: '#eee',
  },
  sideBarWrap: {
    width: 300
  },
});

function SwipeableTemporaryDrawer({classes}) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (side, open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  return (
    <div className={classes.smallMenu}>
      <Button className={classes.button} onClick={toggleDrawer('left', true)}>
        <Menu className={classes.icon} />
      </Button>
      <SwipeableDrawer
        open={state.left}
        onClose={toggleDrawer('left', false)}
        onOpen={toggleDrawer('left', true)}
        className={classes.sideBarWrap}
        classes={{
          paper: classes.sideBarWrap,
        }}
      >
        <SideBar />
      </SwipeableDrawer>
    </div>
  );
}

export default withStyles(styles)(SwipeableTemporaryDrawer)
