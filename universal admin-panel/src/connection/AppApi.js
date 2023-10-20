import {BASE_URL} from "./BaseUrl.js";

export const APP_API={
    course:'/course',
    group:'/group',
    uploadPhoto:'/attachment/upload',
    statistics: '/statistics',
    login: '/auth/login',
    downloadPhoto:BASE_URL+"/attachment/download?id=",
    payment:'/payment',
    teacher:'/auth/teacher',
    puple1 :'/auth/users',
    puple:'/auth/puple'
}