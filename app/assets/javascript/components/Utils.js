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

export { getSizes, isEqualArr };
