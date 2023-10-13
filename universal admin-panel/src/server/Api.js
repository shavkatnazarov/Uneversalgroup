import {BaseUrl} from "./BaseUrl";
export const Api = {
    register: "/auth/register",
    findUser: "/auth/findUser",
    login: '/auth/login',
    category: '/category',
    statistics: '/statistics',
    uploadPhoto: '/attachment/upload',
    downloadPhoto: BaseUrl + '/attachment/download?id='
}