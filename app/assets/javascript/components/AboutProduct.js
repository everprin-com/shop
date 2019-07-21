import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    borderColor: 'transparent',
    boxShadow: 'none',
    display: 'none',
  },
  cell:{
    fontSize: 14,
    padding: '0 auto',
    border:'none',
  },
  table: {
    overflow: "hidden",
    [theme.breakpoints.down('sm')]: {
      minWidth: 300,
    },
    [theme.breakpoints.up('sm')]: {
      minWidth: 375,
    },
    [theme.breakpoints.up('md')]: {
      minWidth: 600,
    },
    [theme.breakpoints.up('lg')]: {
      minWidth: 700,
    },
  },
  title: {
    fontWeight: "bold",
  },
  row: {
    border: '1px solid transparent',
    outlineColor: "transparent",
    height: 35,
  },
  aboutProduct: {
    fontSize: 20,
    fontWeight: "bold",
  },
  forMobile:{
    [theme.breakpoints.down('xs')]: {
      display: 'block'
    },
  },
  forDesktop:{
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    },
  }, 
});

function AboutProduct(props) {
  const { classes, productData, forMobile } = props;
  let mapKeys ={
    category: "Категория",
    name: "Наименование",
    price: "Цена",
    brand: "Бренд",
    sex: "Принадлежность",
    season: "Сезонность",
    composition: "Состав",
    brandCountry: "Страна бренда",
    color: "Цвет",
    weight: "Вес",
    description: "Описание",
  }
  var formatedProductData = {}
  Object.keys(productData).forEach(key => {
    if (!mapKeys[key] || !productData[key]) return
    if (key == "price") {
      formatedProductData[key] = { title: mapKeys[key], value: Math.round(productData[key]) }
      return null
    }
     formatedProductData[key] = { title: mapKeys[key], value: productData[key] }
    })
  return (
    <Paper className={forMobile ? `${classes.root} ${classes.forMobile}` : `${classes.root} ${classes.forDesktop}` }>
      <Table className={classes.table}>
        <TableBody>
        <div className={classes.aboutProduct}>
          О товаре
        </div>
          {Object.keys(formatedProductData).map((key, i) => (
            <TableRow key={i} className={classes.row}>
              <TableCell component="th" className={`${classes.title} ${classes.cell}`} scope="row">
                {formatedProductData[key]["title"]}
              </TableCell>
              <TableCell align="left" className={classes.cell}>
                 {
                   key =="price" ? `${formatedProductData[key]["value"]} грн`
                  : formatedProductData[key]["value"]
                 }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

AboutProduct.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AboutProduct);