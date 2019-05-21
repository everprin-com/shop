import { createOptionsPost } from "./Utils"

const fetchPost = (route, formData) => fetch(route, createOptionsPost(formData))
    .then(res =>{
        window.res=res
        return res.json()})

export default fetchPost