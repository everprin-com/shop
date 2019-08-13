import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import styles from "./styles";

function Item({ title, link, classes }) {
  return (
    <li className={classes.item}>
      <Link to={link} className={classes.link}>
        {title}
      </Link>
    </li>
  );
}

function Footer(props) {
  const { classes } = props;

  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <ul className={classes.list}>
          <Item title="Доставка и оплата" classes={classes} />
          <Item title="Вопросы и ответы" classes={classes} />
          <Item title="Контакты" classes={classes} />
          <Item title="Возврат товара" classes={classes} />
        </ul>
        <div className={classes.contacts}>
          Киев, №1. Ул Чешская 9, 201/203, БЦ modnaVilla, 1 этаж +380 (044)
          249-55-55 kilo@gmail.com
        </div>
        <ul className={classes.list}>
          <Item title="О нас" classes={classes} />
          <Item title="Условия использования сайта" classes={classes} />
          <Item title="Вакансии" classes={classes} />
          <Item title="Контакты" classes={classes} />
        </ul>
      </Paper>
    </div>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Footer);
