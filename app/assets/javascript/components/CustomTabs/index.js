import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ProductСharacteristic from "../ProductСharacteristic";
import ProductReviews from "../ProductReviews";
import ProductDeliveryAndPayment from "../ProductDeliveryAndPayment";

const CustomTabs = ({
  characteristicPorps,
  reviewsPorps,
  slugId,
  category,
  activeTab,
  handleTabChange,
  commentsArr = [],
  amount
}) => {

  const formatNumberTo = (val, number) => (!!val ? val : number);
  const commonAmount = commentsArr.length + formatNumberTo(amount, 0);

  return (
    <div className="custom-tabs">
      <Tabs
        value={activeTab}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleTabChange}
        aria-label="disabled tabs example"
      >
        <Tab label="Характеристика" className="custom-tab" />
        <Tab label={`Отзывы (${commonAmount})`} className="custom-tab" />
        <Tab label="Доставка и Оплата" className="custom-tab" />
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
      {activeTab == 2 && <ProductDeliveryAndPayment />}
    </div>
  );
};

export default CustomTabs;
