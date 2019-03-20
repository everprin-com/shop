import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return {
      text: state.text,
      initialData: state.initialData
    }
}

class TestComponent extends React.PureComponent{
    constructor(props){
      super(props)
      this.state={
        data: null
      }
      this.sendFetch = this.sendFetch.bind(this)
    }

    componentDidMount(){
      this.sendFetch()
    }

    sendFetch(){
      fetch("https://randomuser.me/api/")
      .then(res => res.json())
      .then(data => this.setState({data}))
    }

    render(){
      const { data } = this.state 
      return <h1 className="text" onClick={this.sendFetch}>
      {data ? data.results[0].email : "LOADING..."}
      </h1> 
    }
  } 

  export default connect(mapStateToProps)(TestComponent)