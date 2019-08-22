import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

function Delivery({ classes }) {
  return (
    <div className={classes.conditionsContent}>
      {/* <div className={classes.conditionsTitle}>Условия доставки:</div> */}
      <div className={classes.conditionsText}>
        <p>
          С помощью доставки «Нова Пошта», Вы можете получить товар даже в самых
          отдаленных уголках Украины. После оформления заказа на нашем сайте
          наши менеджеры связываются с Вами для обсуждения деталей. Затем делаем
          отправку транспортной компанией Новая Почта.{" "}
        </p>
        <p>
          При заказе и предварительной оплате заказа от 1000 грн. доставка
          бесплатная при условии полной предоплаты. В среднем, доставка занимает
          1-3 дня. В случае оплаты заказа при получении клиент оплачивает
          комиссию за «Наложенный платеж» (Новая Почта взымает 20 грн. +2% от
          суммы перевода). О прибытии заказа в отделение вы будете уведомлены
          SMS-сообщением «Новая Почта» с указанием номера накладной.В
          индивидуальном порядке крупные оптовые заказы отправляем в другие
          логистические компании по желанию клиента. Самовывоз товаров
          отсутствует.
        </p>
        <p>
          В случае, если клиент не забрал посылку в течение
          безоплатного/гарантированного срока хранения на "Новой Почте" все
          последующие заказы отправляются только в случае частичной либо полной
          предоплаты.
        </p>
      </div>
    </div>
  );
}

export default withStyles(styles)(Delivery)
