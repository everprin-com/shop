const createOptionsGet = () => ({
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

const createOptionsPost = formData => ({
  method: "POST",
  body: JSON.stringify(formData),
  headers: {
    Accept:
      "text/html,application/xhtml+xml,application/xml;" +
      "q=0.9,image/webp,image/apng,*/*"
  }
});

const getUrlWithParams = (route, params, withoutEncode) => {
  const query = Object.keys(params)
    .map(k => {
      if (Array.isArray(params[k])) {
        return params[k]
          .map(val => {
            return `${k}[]=${JSON.stringify(val)}`
            // return `${encodeURIComponent(k)}[]=${encodeURIComponent(val)}`;
          })
          .join("&");
      }
      return `${k}=${JSON.stringify(params[k])}`
      // return `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`;
    })
    .join("&");

  return (route += `?${query}`);
};

export { createOptionsGet, createOptionsPost, getUrlWithParams };
