import React from 'react'
import Menu from './Menu'
import Panel from './Panel'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    position: 'fixed',
    zIndex: 3,
  }
});

class Header extends React.PureComponent{
    constructor(props){
      super(props)
    }
    render(){
      const { classes } = this.props
      return (
        <header className={classes.root}>
          <div className="header-content">
            <Menu />
          </div>
        </header>
      )
    }
  }

  export default withStyles(styles)(Header)