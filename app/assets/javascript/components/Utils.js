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
  const oldPrice = Math.round(price + (price * sale) / 100);
  const saleShow = 100 - Math.round((price * 100) / oldPrice);
  return { price, oldPrice, saleShow };
};

const getPageWidth = () => {
  return (
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth
  );
};

const setPageWidth = store => store.dispatch({type: "SET_PAGE_WIDTH", pageWidth: getPageWidth() })

const textWithDots = (str, litCount = 60) => {
  if (str.length < litCount) return str;
  return str.slice(0, litCount) + "...";
};

export { getSizes, isEqualArr, convertPrice, textWithDots, setPageWidth };
