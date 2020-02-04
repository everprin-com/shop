import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import styles from "./styles";

function AboutProduct(props) {
  const { classes, productData, forMobile } = props;
  let mapKeys = {
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
    country: "Страна производства"
  };
  var formatedProductData = {};
  Object.keys(productData)
    .sort(v => {
      return v == "description" ? 1 : -1;
    })
    .forEach(key => {
      if (!mapKeys[key] || !productData[key]) return;
      if (key == "price") {
        formatedProductData[key] = {
          title: mapKeys[key],
          value: Math.round(productData[key])
        };
        return null;
      }
      if (key == "season") {
        if (Array.isArray(productData[key]) && !productData[key].length) return;
        if (Array.isArray(productData[key])) {
          formatedProductData[key] = {
            title: mapKeys[key],
            value: productData[key].join(", ")
          };
        } else {
          formatedProductData[key] = {
            title: mapKeys[key],
            value: productData[key]
          };
        }
        return null;
      }
      if (key == "sex") {
        formatedProductData[key] = {
          title: mapKeys[key],
          value: productData[key].join(",")
            ? productData[key]
                .join(",")
                .replace("wooman", "Женское")
                .replace("man", "Мужское")
            : productData[key].join(",")
        };
        return null;
      }
      formatedProductData[key] = {
        title: mapKeys[key],
        value: productData[key]
      };
    });
  return (
    <Paper
      className={
        forMobile
          ? `${classes.root} ${classes.forMobile}`
          : `${classes.root} ${classes.forDesktop}`
      }
    >
      <Table className={classes.table}>
        <TableBody>
          <TableRow>
            <TableCell className={classes.aboutProduct}>О товаре</TableCell>
          </TableRow>
          {Object.keys(formatedProductData).map((key, i) => (
            <TableRow key={i} className={classes.row}>
              <TableCell
                component="th"
                className={`${classes.title} ${classes.cell}`}
                scope="row"
              >
                {formatedProductData[key]["title"]}
              </TableCell>
              <TableCell align="left" className={classes.cell}>
                {key == "price"
                  ? `${formatedProductData[key]["value"]} грн`
                  : formatedProductData[key]["value"]}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

AboutProduct.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AboutProduct);
