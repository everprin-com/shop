import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ProductСharacteristic from "../ProductСharacteristic";
import ProductReviews from "../ProductReviews";

const CustomTabs = ({
  characteristicPorps,
  reviewsPorps,
  slugId,
  category,
  activeTab,
  handleTabChange
}) => {

  return (
    <div>
      <Tabs
        value={activeTab}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleTabChange}
        aria-label="disabled tabs example"
      >
        <Tab label="Характеристика" />
        <Tab label="Отзывы" />
        <Tab label="Доставка" />
      </Tabs>
      {activeTab == 0 && (
        <ProductСharacteristic characteristicPorps={characteristicPorps} />
      )}
      {activeTab == 1 && (
        <ProductReviews
          reviewsPorps={reviewsPorps}
          slugId={slugId}
          category={category}
        />
      )}
      {activeTab == 2 && (
        <div>
          С помощью доставки «Нова Пошта», Вы можете получить товар даже в самых отдаленных уголках Украины. После оформления заказа на нашем сайте наши менеджеры связываются с Вами для обсуждения деталей. Затем делаем отправку транспортной компанией Новая Почта.

При заказе и предварительной оплате заказа от 1000 грн. доставка бесплатная при условии полной предоплаты. В среднем, доставка занимает 1-3 дня. В случае оплаты заказа при получении клиент оплачивает комиссию за «Наложенный платеж» (Новая Почта взымает 20 грн. +2% от суммы перевода). О прибытии заказа в отделение вы будете уведомлены SMS-сообщением «Новая Почта» с указанием номера накладной.В индивидуальном порядке крупные оптовые заказы отправляем в другие логистические компании по желанию клиента. Самовывоз товаров отсутствует.

В случае, если клиент не забрал посылку в течение безоплатного/гарантированного срока хранения на "Новой Почте" все последующие заказы отправляются только в случае частичной либо полной предоплаты.
        </div>
      )}
    </div>
  );
};

export default CustomTabs;
