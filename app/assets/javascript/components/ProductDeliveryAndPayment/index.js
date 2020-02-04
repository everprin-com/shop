import React from "react";
import "./style"

const ProductDeliveryAndPayment = () => {
  return (
    <div className="delivery-and-payment-block">
      <div className="delivery-block">
        <div className="title">Доставка</div>
        <p>
          {" "}
          С помощью доставки «Нова Пошта», Вы можете получить товар даже в самых
          отдаленных уголках Украины.
        </p>
        <p>
          {" "}
          После оформления заказа на нашем сайте наш менеджер свяжется с Вами
          для обсуждения деталей. Затем делаем отправку транспортной компанией
          Новая Почта.
        </p>
        <p>
          При заказе и предварительной оплате заказа от 1000 грн. доставка
          бесплатная при условии полной предоплаты. В среднем, доставка занимает
          1-3 дня.
        </p>
        <p>
          В случае оплаты заказа при получении, клиент оплачивает комиссию за
          «Наложенный платеж» (Новая Почта взымает 20 грн. +2% от суммы
          перевода). О прибытии заказа в отделение вы будете уведомлены
          SMS-сообщением «Новая Почта» с указанием номера накладной.
        </p>
        <p>
          {" "}
          В индивидуальном порядке крупные оптовые заказы отправляем в другие
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
      <div className="payment-block">
        <div className="title">Оплата</div>
        <p>
          Вы можете оплатить покупки наличными при получении, либо оплатить
          банковским переводом воспользовавишсь следующими реквизитами: 5375
          4141 0571 5386.
        </p>
        <p>
          Перед оплатой уточните, пожалуйста, наличие товара у менеджера
          магазина.
        </p>
      </div>
    </div>
  );
};

export default ProductDeliveryAndPayment;
