import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => {
    return {
      setActiveSize: (id, size) => dispatch({ type: 'SET_ACTIVE_SIZE', id, size}),
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
    contentForBig: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
    },
    title: {
        marginBottom: '10px',
    },
    sizeItem: {
        display: 'inline-block',
        verticalAlign: 'top',
        minWidth: 'auto',
        width: 'auto',
        margin: '0 2px 2px 0',
        borderRadius: 8,
        backgroundRolor: '#ffffff',
        cursor: 'pointer',
        boxShadow: '0 1px 2px 0 rgba(0,0,0,0.11)',
        '&:hover': {
            background: '#2C9925',
            color: '#fff',
        }
    },
    chipBig: {
        borderRadius: 4,
        minWidth: 50,
        width: 'auto',
        fontSize: 16,
        padding: '0 8px',
        borderWidth: 0,
        lineHeight: '40px',
        boxShadow: '0 1px 3px 0 rgba(0,0,0,0.24), 0 1px 1px 0 rgba(0,0,0,0.08)',
        margin: 1,
        '&:hover': {
            backgroundColor: "#2C9925 !important",
            color: "eee",
          },
      },
    active: {
        background: '#2C9925',
        color: '#fff',
    }
  });

class ProductItemSizes extends React.PureComponent {

    render() {
        const { classes, sizes, setActiveSize, activeSize, id, format } = this.props;
        if (sizes.length < 1 || !sizes || !sizes.length) return null
        return (
            <div className={classes.root}>
                <div className={classes.title}>Размеры:</div>
                <div className={format ? classes.contentForBig : classes.content}>
                {sizes.map(sizeItem => { return (
                    <Button
                        size={format ? "large" : "small"}
                        variant="outlined"
                        className={`${classes.sizeItem} ${activeSize===sizeItem ? classes.active : ""}`}
                        onClick={()=>setActiveSize(id, sizeItem)}
                        key={sizeItem}
                    >
                        {sizeItem}
                    </Button>
                )})}
                </div>
            </div>
        )
    }
  }

  export default connect(null, mapDispatchToProps)(withStyles(styles)(ProductItemSizes));
