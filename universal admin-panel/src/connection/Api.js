import {BaseUrl} from "./BaseUrl.js";

export const Api={
    login: '/auth/login',
    uploadPhoto: '/attachment/upload',
    downloadPhoto: BaseUrl + '/attachment/download?id='
}