import React from "react";
import fetchGetWithParams from "../api/fetchGetWithParams"

const regTest = {
    name: /^[а-я -]*$/i,
}

function Test() {
      fetchGetWithParams("items/", {search_category:  "Юбки", per_page: 100}, true)
      .then(products=> {
          const errors = {}
        products.items.forEach(product => {
            for (var key in product){
                if (regTest[key] && !regTest[key].test(product[key])) {
                    errors[key] =  errors[key] ? [...errors[key], product.id] : [product.id]
                }
            }
        });  
        if (Object.keys(errors).length > 0) {
            throw errors
        }
      })

  return null
}

export default Test
