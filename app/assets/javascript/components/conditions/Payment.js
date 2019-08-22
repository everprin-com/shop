import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

function Payment({ classes }) {
  return (
    <div className={classes.conditionsContent}>
      {/* <div className={classes.conditionsTitle}>Условия доставки:</div> */}
      <div className={classes.conditionsText}>
        <p>
          Вы можете оплатить покупки наличными при получении, либо оплатить
          банковским переводом воспользовавишсь следующими реквизитами:
        </p>
        <p>5375 4141 0571 5386</p>
        <p>
          Перед оплатой уточните, пожалуйста, наличие товара у менеджера
          магазина.
        </p>
      </div>
    </div>
  );
}

export default withStyles(styles)(Payment);
