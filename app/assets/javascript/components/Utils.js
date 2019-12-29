const getSizes = size => {
  // if (!size) return []
  // var MaxMinArray = size.split("-")
  // var sizesArray = []
  // var delta = MaxMinArray[1] - MaxMinArray[0]
  // for (var i=0; i<delta+1 ;++i){
  //     sizesArray.push(+MaxMinArray[0] + i)
  // }
  if (!size || !size.replace) return [];
  return size
    .replace(/[\[\] ]*/g, "")
    .split(",")
    .map(v => +v);
};

const isEqualArr = (oneArr, otherArr) => {
  if (
    !Array.isArray(oneArr) ||
    !Array.isArray(otherArr) ||
    oneArr.length != otherArr.length
  )
    return false;
  return oneArr.every(item => otherArr.includes(item));
};

const convertPrice = price => {
  price = Math.round(+price);
  const sales = [30, 40, 50, 25, 55, 60, 45, 35, 65, 40];
  const sale = sales[("" + price).split("")[("" + price).split("").length - 1]];
  const oldPrice = Math.round((price * 100) / (100 - sale));
  return { price, oldPrice, saleShow: sale };
};

const getPageWidth = () => {
  return (
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth
  );
};

const setPageWidth = store =>
  store.dispatch({ type: "SET_PAGE_WIDTH", pageWidth: getPageWidth() });

const textWithDots = (str, litCount = 60) => {
  if (str && str.length < litCount) return str;
  return str && str.slice(0, litCount) + "...";
};

const validationConfig = {
  text: {
    name:
      "Введите пожалуйста буквы без спец. символов и цифр в количестве от 6 до 24.\n Например: Иван Иванов",
    phone:
      "Введите пожалуйста цифры без спец. символов в количестве от 7 до 16.\n Например: 0952599558",
    city: "Введите пожалуйста буквы в количестве от 3 до 24.\n Например: Киев",
    departament:
      "Введите пожалуйста буквы/цифры в количестве от 6 до 120.\n Например: Отделение №10: ул. Василия Жуковского, 22А",
    author: "Введите пожалуйста буквы/цифры в количестве от 3 до 50",
    clientInfo: "Введите пожалуйста буквы/цифры в количестве от 7 до 50",
    description: "Введите пожалуйста буквы/цифры в количестве от 5"
  },
  regExp: {
    name: /^[а-яєії"a-z -]{6,24}$/i,
    phone: /^[0-9 +-]{7,16}$/i,
    city: /^[а-яєії" .(),]{3,24}$/i,
    departament: /^[а-яєії"0-9 a-z.()№,:;'/-]{2,120}$/i,
    author: /^.{3,50}$/i,
    clientInfo: /^.{7,50}$/i,
    description: /^.{5,}$/i
  }
};

const validateData = (data, setErrors, errors = {}) => {
  let withoutErrors = true;
  let isValid = Object.fromEntries(Object.keys(errors).map(k => [k, false]));

  Object.entries(data).forEach(
    ([key, val]) => (isValid[key] = validationConfig.regExp.name.test(val))
  );
  if (Object.values(isValid).some(validItem => !validItem)) {
    withoutErrors = false;
    let currentErrors = {};
    for (var key in isValid) {
      if (!isValid[key]) {
        currentErrors[key] = validationConfig.text[key];
      }
    }
    setErrors({ ...errors, ...currentErrors });
  } else {
    setErrors({});
  }
  return withoutErrors;
};

export {
  getSizes,
  isEqualArr,
  convertPrice,
  textWithDots,
  setPageWidth,
  validationConfig,
  validateData
};
