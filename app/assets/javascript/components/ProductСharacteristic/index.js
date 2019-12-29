import React from "react";
import Button from "@material-ui/core/Button";
import ProductItemSizes from "../ProductItemSizes/ProductItemSizes";
import AboutProduct from "../AboutProduct/AboutProduct";

const ProductСharacteristic = ({ characteristicPorps }) => {
  const {
    productData,
    classes,
    id,
    price,
    size,
    activeSize,
    data = {},
    openTableSize,
    putToCart
  } = characteristicPorps;

  return (
    <div>
      <p className={classes.price}>{`${Math.round(price)} грн`}</p>
      <div>
        <ProductItemSizes
          sizes={size}
          id={id}
          activeSize={activeSize}
          format="big"
        />
      </div>
      <div>
        {data.group != "accessories" && (
          <span className={classes.tableSize} onClick={openTableSize}>
            Таблица размеров
          </span>
        )}
      </div>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        // onClick={isInCart ? openCart : this.putToCart}
        onClick={putToCart}
      >
        Купить
        {/* {isInCart ? "Товар уже в корзине" : "Добавить в корзину"} */}
      </Button>
      <AboutProduct productData={productData} />
    </div>
  );
};

export default ProductСharacteristic;
