import { createOptionsGet } from "./Utils"

const fetchGet = route => fetch(route, createOptionsGet())
    .then(res => res.json())

export default fetchGet