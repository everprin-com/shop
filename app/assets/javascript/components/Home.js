import React from 'react'
import ProductList from './ProductList'
import SideBar from './SideBar'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    root: {
      display: 'flex',
      marginTop: '60px',
    },
  });

class Home extends React.PureComponent {

    render() {
        const { classes } = this.props
        return (
        <div className={classes.root}>
            <SideBar isMainSideBar />
            <ProductList />
        </div>
        )
    }
  }
 
  export default withStyles(styles)(Home);