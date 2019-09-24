import fetchGetWithParams from "../api/fetchGetWithParams";

const transformPrice = priceString => {
  const isValid = price => regTest.price.test(price);
  if (typeof priceString != "string") {
    return isValid(priceString);
  }
  if (
    priceString[priceString.length - 1] == "0" &&
    priceString[priceString.length - 2] == "."
  ) {
    return isValid(priceString.slice(0, priceString.length - 2));
  }
  return isValid(priceString);
};

const checkSex = sexArr => {
  if (!Array.isArray(sexArr)) {
    return false;
  }
  const isValid = sex => regTest.sex.test(sex);
  return sexArr.every(sex => isValid(sex));
};

const checkSize = sizeArr => {
  if (!Array.isArray(sizeArr)) {
    return false;
  }
  const isValid = size => regTest.size.test(size);
  return sizeArr.every(size => isValid(size));
};

const checkPicture = pictureArr => {
  if (!Array.isArray(pictureArr)) {
    return false;
  }
  return (
    // pictureArr.length === [...new Set(pictureArr)].length &&
    pictureArr.every(picture => picture.length > 10 && picture.includes("http"))
  );
};

const transformMap = {
  price: transformPrice,
  sex: checkSex,
  size: checkSize,
  picture: checkPicture
};

const regTest = {
  name: /^[а-яёa-z -]*$/i,
  brand: /^[а-яёa-z0-9',& -]*$/i,
  category: /^[а-яё ,-]*$/i,
  id: /^[0-9]*$/,
  price: /^[0-9]*$/,
  season: /^[а-яё -]*$/i,
  color: /^[а-яёa-z ,)/(.-]*$/i,
  sex: /man|wooman/,
  size: /^[a-z0-9]*$/i,
  composition: /^[а-яё0-9 %,;/)(.:-]*$/i
};

function Test() {
  fetchGetWithParams(
    "items/",
    { shuffled_products: true, per_page: 5000 },
    true
  ).then(products => {
    const errors = {};
    products.items.forEach(product => {
      const putToError = () => {
        errors[key] = errors[key] ? [...errors[key], product.id] : [product.id];
      };

      for (var key in product) {
        if (key in transformMap && !transformMap[key](product[key])) {
          putToError();
          continue;
        }

        if (regTest[key] && product[key] && !regTest[key].test(product[key])) {
          if (key in transformMap) continue;
          putToError();
        }
      }
    });
    if (Object.keys(errors).length > 0) {
      throw errors;
    }
  });

  return null;
}

export default Test;
