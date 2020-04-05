const createOptionsGet = () => ({
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

const createOptionsPost = data => {
  let formData = new FormData();

  const buildFormData = (formData, data, parentKey) => {
    if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
      Object.keys(data).forEach(key => {
        buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
      });
    } else {
      const value = data == null ? '' : data;
  
      formData.append(parentKey, value);
    }
  }
  buildFormData(formData ,data)

  return {
    method: "POST",
    body: formData,
    headers: {
      Accept:
        "text/html,application/xhtml+xml,application/xml;" +
        "q=0.9,image/webp,image/apng,*/*"
    }
  };
};

const getUrlWithParams = (route, params, withoutEncode) => {
  const query = Object.keys(params)
    .map(k => {
      if (Array.isArray(params[k])) {
        return params[k]
          .map(val => {
            // return `${k}[]=${JSON.stringify(val)}`
            return `${encodeURIComponent(k)}[]=${encodeURIComponent(val)}`;
          })
          .join("&");
      }
      // return `${k}=${JSON.stringify(params[k])}`
      return `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`;
    })
    .join("&");

  return (route += `?${query}`);
};

export { createOptionsGet, createOptionsPost, getUrlWithParams };
