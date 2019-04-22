import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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
    }
  });

class ProductItemSizes extends React.Component {
    constructor(){
        super()
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.title}>Размеры</div>
                <div className={classes.content}>
                    <Button variant="outlined" className={classes.sizeItem}>
                        32
                    </Button>
                    <Button variant="outlined" className={classes.sizeItem}>
                        33
                    </Button>
                    <Button variant="outlined" className={classes.sizeItem}>
                        35
                    </Button>
                    <Button variant="outlined" className={classes.sizeItem}>
                        37
                    </Button>
                    <Button variant="outlined" className={classes.sizeItem}>
                        39
                    </Button>
                </div>
            </div>
        )
    }
  }
 
  export default withStyles(styles)(ProductItemSizes);