import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { getSizes } from './Utils'; 

const mapDispatchToProps = dispatch => {
    return {
      setActiveSize: (id, size) => dispatch({ type: 'SET_ACTIVE_SIZE', id, size}),
      closeDialog: () => dispatch({ type: 'CLOSE_SET_SIZE_WINDOW'}),
      putToCart: product => dispatch({ type: 'PUT_TO_CART', product }),
    }
  }

  const mapStateToProps = state => {
    return {
      products: state.product,
      dialog: state.dialog,
    }
  }

const styles = theme => ({
    root: {
        width: '100%',
    },
    content: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
    },
    title: {
        textAlign: 'center',
        marginBottom: '5px',
    },
    sizeItem: {
        display: 'inline-block',
        verticalAlign: 'top',
        lineHeight: '18px',
        minWidth: 'auto',
        width: 'auto',
        padding: '0 6px',
        margin: '0 8px 8px 0',
        borderRadius: 3,
        backgroundRolor: '#ffffff',
        cursor: 'pointer',
        boxShadow: '0 1px 2px 0 rgba(0,0,0,0.11)',
        '&:hover': {
            background: '#2C9925',
            color: '#fff',
        }
    },
    active: {
        background: '#2C9925',
        color: '#fff',
    }
  });

class ChooseSize extends React.PureComponent {
    render() {
      const { dialog, products, setActiveSize, classes, closeDialog, putToCart } = this.props
      const product = products.find(product => product.id == dialog.size.id) || {}
      const { size, activeSize, id } =  product
      return (
          <div className={classes.root}>
              <div className={classes.title}>Размеры:</div>
              <div className={classes.content}>
              {size && size.map(sizeItem => { return (
                  <Button
                      variant="outlined"
                      className={`${classes.sizeItem} ${activeSize===sizeItem ? classes.active : ""}`}
                      onClick={()=>{setActiveSize(id, sizeItem); putToCart(product); closeDialog()}}
                  >
                      {sizeItem}
                  </Button>
              )})}
              </div>
          </div>
        )
    }
  }
 
  export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ChooseSize));