import {BASE_URL} from "./BaseUrl.js";
import axios from "axios";

export const BASE_CONFIG={
    doGet:(url)=>axios.get(
        `${BASE_URL}${url}`
    ),
    doPost:(url,data)=>axios.post(
        `${BASE_URL}${url}`,data
    ),
    doPut:(url,id,data)=>axios.put(
        `${BASE_URL}${url}/${id}`,data
    ),
    doDelete:(url,id)=>axios.delete(
        `${BASE_URL}${url}/${id}`
    ),doGetOne:(url,id)=>axios.get(
        `${BASE_URL}${url}/${id}`
    )
}