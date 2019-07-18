import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import Header from './Header'
// import { hot } from 'react-hot-loader/root'
import Home from './Home'
import Dialog from './Dialog'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles';
import ChooseSize from './ChooseSize'
import Footer from './Footer'

const mapStateToProps = state => {
  return {
    orderform: state.orderform,
    scrolling: state.general.scrolling
  }
}

const styles = theme => ({
  root: {
    [theme.breakpoints.up('xs')]: {
      width: '320px',
    },
    [theme.breakpoints.up('sm')]: {
      width: '600px',
    },
    [theme.breakpoints.up('md')]: {
      width: '1000px',
    },
    [theme.breakpoints.up('lg')]: {
      width: '1240px',
    },
    // [theme.breakpoints.between('lg')]: {
    //   width: '1240px',
    // },
    // width: '1240px',
    margin: '0 auto',
    positon: 'relative',
  },
  appInner: {
    padding: '0 12px 12px 12px !important',
  }
});

class App extends React.PureComponent{

componentDidUpdate(){
  this.props.orderform && this.redirectToOrderForm()
  this.props.scrolling && this.scrolling()
}

redirectToOrderForm = () => this.props.history.push('/orderform')

render(){
  const { classes } = this.props
  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
          <Grid className={classes.appInner} item xs={12}>
            <Header withSmallMenu />
            <Home />
            <Footer />
          </Grid>
      </Grid>
      <Dialog title="Выберите размер" Component={ChooseSize} type="size" />
    </div>
  )
}
}

export default connect(mapStateToProps)(withStyles(styles)(App))

// const mapStateToProps = state => {
//     return {
//       text: state.text,
//       initialData: state.initialData
//     }
// }

// class TestComponent extends React.PureComponent{
//     constructor(props){
//       super(props)
//       this.state={
//         data: null
//       }
//       this.sendFetch = this.sendFetch.bind(this)
//     }

//     componentDidMount(){
//       this.sendFetch()
//     }

//     sendFetch(){
//       fetch("https://randomuser.me/api/")
//       .then(res => res.json())
//       .then(data => this.setState({data}))
//     }

//     render(){
//       const { data } = this.state 
//       return <h1 className="text" onClick={this.sendFetch}>
//       {data ? data.results[0].email : "LOADING..."}
//       </h1> 
//     }
//   } 

//   export default connect(mapStateToProps)(TestComponent)