import React from 'react'
import Grid from '@material-ui/core/Grid'
import Input from './Input'
import Menu from './Menu'
import { ShoppingCart } from '@material-ui/icons'

export default class extends React.PureComponent{
    constructor(props){
      super(props)
    }
    render(){
      return (
        <header className="header">
          <div className="header-content">
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <Menu />
                <ShoppingCart />
                <Input />
              </Grid>
            </Grid>
          </div>
        </header>
      )
    }
  }