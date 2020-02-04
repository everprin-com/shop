import { createOptionsPost } from "./Utils"

const fetchPost = (route, formData, action) => {
    if (action) window.store.dispatch(action)
    return fetch(route, createOptionsPost(formData)).then(res => res.json())
}
    

export default fetchPost