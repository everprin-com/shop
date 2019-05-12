import { createOptionsPost } from "./Utils"

const fetchPost = (route, formData) => fetch(route, createOptionsPost(formData))
    .then(res => res.json())

export default fetchPost