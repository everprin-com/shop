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
  }
});

let id = 0;
function createData(title, data) {
  id += 1;
  return { id, title, data }
}

const rows = [
  createData('Цена', 159),
  createData('Бренд', "Springfield"),
  createData('Артикул товара:', "119580167"),
  createData('Принадлежность', "Мужчинам"),
  createData('Сезонность', "Демисезон"),
  createData('Состав', "100% хлопок"),
  createData('Цвет', "Бледно-красный"),
  createData('Страна бренда', "Испания"),
  createData('Страна производства', "Бангладеш"),
  createData('Вес', "300 грамм"),
  createData('Описание', "рубашка с длинным рукавом, застегивается на пуговицы. На размер L длина изделия 72 см, длина рукава 67 см"),
];

function AboutProduct(props) {
  const { classes, productData } = props;
  let mapKeys ={
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
  Object.keys(productData).map(key => formatedProductData[key] = { title: mapKeys[key], value: productData[key] })
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableBody>
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