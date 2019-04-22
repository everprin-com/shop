import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import Header from './Header'
// import { hot } from 'react-hot-loader/root'
import Home from './Home'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles';

const mapStateToProps = state => {
  return {
    orderform: state.orderform
  }
}

const styles = theme => ({
  root: {
    width: '1240px',
    margin: '0 auto',
    positon: 'relative',
  },
});

class App extends React.PureComponent{

componentDidUpdate(prevProps){
  this.props.orderform && this.redirectToOrderForm()
}

redirectToOrderForm = () => this.props.history.push('/orderform')

render(){
  const { classes } = this.props
  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
          <Grid item xs={12}>
            <Header />
            <Home />
          </Grid>
      </Grid>
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