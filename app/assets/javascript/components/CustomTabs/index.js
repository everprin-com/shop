import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ProductСharacteristic from "../ProductСharacteristic";
import ProductReviews from "../ProductReviews";

const CustomTabs = ({
  characteristicPorps,
  reviewsPorps,
  slugId,
  category
}) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab label="Характеристика" />
        <Tab label="Отзывы" />
      </Tabs>
      {value == 0 && (
        <ProductСharacteristic characteristicPorps={characteristicPorps} />
      )}
      {value == 1 && (
        <ProductReviews
          reviewsPorps={reviewsPorps}
          slugId={slugId}
          category={category}
        />
      )}
    </div>
  );
};

export default CustomTabs;
