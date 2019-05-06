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
  },
  cell:{
    fontSize: 14,
    padding: '0 auto',
    border:'none',
  },
  table: {
    minWidth: 700,
  },
  title: {
    fontWeight: "bold",
  },
  row: {
    border: '1px solid transparent',
    outlineColor: "transparent"
  },
  aboutProduct: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

function AboutProduct(props) {
  const { classes, productData } = props;
  let mapKeys ={
    category: "Категория",
    title: "Наименование",
    price: "Цена",
    brand: "Бренд",
    sex: "Принадлежность",
    season: "Сезонность",
    composition: "Состав",
    color: "Цвет",
    brandCountry: "Страна бренда",
    color: "Цвет",
    weight: "Вес",
    description: "Описание",
  }
  var formatedProductData = {}
  Object.keys(productData).forEach(key => {
    if (!mapKeys[key] || !productData[key]) return
     formatedProductData[key] = { title: mapKeys[key], value: productData[key] }
    })
  return (
    <Paper className={classes.root}>
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
                {formatedProductData[key]["value"]}
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