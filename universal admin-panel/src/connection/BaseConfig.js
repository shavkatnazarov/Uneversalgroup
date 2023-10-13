import {BaseUrl} from "./BaseUrl.js";
import axios from "axios";

export const BaseConfig={
    doGet:(url)=>axios.get(
        `${BaseUrl}${url}`
    ),
    doPost:(url,data)=>axios.post(
        `${BaseUrl}${url}`,data
    ),
    doPut:(url,id,data)=>axios.put(
        `${BaseUrl}${url}/${id}`,data
    ),
    doDelete:(url,id)=>axios.delete(
        `${BaseUrl}${url}/${id}`
    ),doGetOne:(url,id)=>axios.get(
        `${BaseUrl}${url}/${id}`
    )
}