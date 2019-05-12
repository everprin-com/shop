import { createOptionsGet, getUrlWithParams } from "./Utils"

const fetchGetWithParams = (route, params, withoutEncode) => fetch(getUrlWithParams(route, params, withoutEncode), createOptionsGet())
    .then(res => res.json())

export default fetchGetWithParams