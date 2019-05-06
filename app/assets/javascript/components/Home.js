import React from 'react'
import { imgs } from './mockData'
import ProductList from './ProductList'
import SideBar from './SideBar'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    root: {
      display: 'flex',
      marginTop: '60px',
    },
  });

class Home extends React.Component {
    constructor(){
        super()
    }

    render() {
        const { classes } = this.props
        return (
        <div className={classes.root}>
            <SideBar />
            <ProductList />
        </div>
        )
    }
  }
 
  export default withStyles(styles)(Home);