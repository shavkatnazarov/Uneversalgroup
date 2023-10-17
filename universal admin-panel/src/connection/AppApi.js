import {BASE_URL} from "./BaseUrl.js";

export const APP_API={
    course:'/course',
    uploadPhoto:'/attachment/upload',
    login: '/auth/login',
    downloadPhoto:BASE_URL+"/attachment/download?id=",
    payment:'/payment',
    teacher:'/teacher'
}