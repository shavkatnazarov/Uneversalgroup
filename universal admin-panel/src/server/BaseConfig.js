import axios from "axios";
import {BaseUrl} from "./BaseUrl";

export const BaseConfig = {
    doPost: (url, data) => axios.post(
        BaseUrl + url, data
    ),
    doGet: (url) => axios.get(
        BaseUrl + url
    ),
    doPut: (url, id, data) => axios.put(
        `${BaseUrl}${url}/${id}`, data
    ),
    doDelete: (url, id) => axios.delete(
        `${BaseUrl}${url}/${id}`
    ),
    doGetByCategoryId: (id) => axios.get(
        BaseUrl + "/product/category/" + id
    )
}