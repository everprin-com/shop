import fetchGetWithParams from "../api/fetchGetWithParams";
import fetchGet from "../api/fetchGet";

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

const checkString = name => {
  return typeof name === "string" && name.length > 1 ? true : false;
};

const checkStringWithoutNull = name => {
  if (!name) return true;
  return typeof name === "string" && name.length > 1 ? true : false;
};

const transformMap = {
  price: transformPrice,
  sex: checkSex,
  size: checkSize,
  picture: checkPicture,
  name: checkString,
  composition: checkStringWithoutNull,
  brand: checkStringWithoutNull
};

const regTest = {
  // brand: /^[а-яёa-z0-9',& -]*$/i,
  category: /^[а-яё ,-]*$/i,
  id: /^[0-9]*$/,
  price: /^[0-9]*$/,
  season: /^[а-яё ,/-]*$/i,
  color: /^[а-яёa-z ,)/(.-]*$/i,
  sex: /man|wooman/,
  size: /^[a-z0-9./]*$/i
  // composition: /^[а-яёa-z0-9 %,;/)(.:-]*$/i
};

function Test() {
  console.clear();
  console.log("*******************TEST*************************")

  const checkAmountItemsInCategory = sex => {
    let errs = [];
    window.store.getState().metaData.headers &&
      window.store.getState().metaData.headers[sex].forEach(item => {
        if (item.count_items < 30) {
          errs = errs.length > 0 ? [...errs, item.catalogue] : [item.catalogue];
        }
      });
    if (errs.length > 0) {
      console.log(`%cin ${sex} such catalogue have < 30 items`, "color: red;");
      console.group(errs);
      console.groupEnd();
    }
  }

  const checkMetaDataGroup = sex => {
    let errs = [];
    window.store.getState().metaData.headers &&
      window.store.getState().metaData.headers[sex].forEach(item => {
        if (!item.group) {
          errs = errs.length > 0 ? [...errs, item.catalogue] : [item.catalogue];
        }
      });
    if (errs.length > 0) {
      console.log(`%cin ${sex} such catalogue have not group`, "color: red;");
      console.group(errs);
      console.groupEnd();
    } else {
      console.log(`in ${sex} every catalogue have group!`);
    }
  };

  checkMetaDataGroup("female");
  checkMetaDataGroup("male");
  checkAmountItemsInCategory("female")
  checkAmountItemsInCategory("male")

    fetchGet("/meta_datas").then(meta_data => {
      meta_data.drop_ship_names.forEach(drop_ship => {
        fetchGetWithParams(
          "items/",
          { shuffled_products: true, per_page: 1000, drop_ship },
          true
        ).then(products => {
          const errors = {};
          products.items.forEach(product => {
            const putToError = () => {
              errors[key] = errors[key]
                ? [
                    ...errors[key],
                    {
                      id: product.id,
                      value: product[key],
                      drop_ship: product.drop_ship
                    }
                  ]
                : {
                    id: product.id,
                    value: product[key],
                    drop_ship: product.drop_ship
                  };
            };
  
            for (var key in product) {
              if (key in transformMap && !transformMap[key](product[key])) {
                putToError();
                continue;
              }
  
              if (
                regTest[key] &&
                product[key] &&
                !regTest[key].test(product[key])
              ) {
                if (key in transformMap) continue;
                putToError();
              }
            }
          });
          if (Object.keys(errors).length > 0) {
            console.log(`%cERRORS ${drop_ship}:`, "color: red;");
            console.group(errors);
            console.groupEnd();
          } else {
            console.log(`%cGOOD JOB ${drop_ship}!`, "color: green;");
          }
        });
      });
    });
  
  return null;
}

export default Test;
