//start course
import {APP_API} from "../AppApi.js";
import {IS_STATUS} from "../../utils/IsStatus.js";
import {toast} from "react-toastify";
import {BASE_CONFIG} from "../BaseConfig.js";


//end course

//start login
export const LoginHandler = async (data) => {
    if (data.phoneNumber.trim().length === 0) {
        return toast.error("tel raqam kiritish shart")
    }
    if (data.password.trim().length === 0) {
        return toast.error("parolda xatolik")
    }
    try {
        const res = await BASE_CONFIG.doPost(APP_API.login, data)
        if (IS_STATUS(res.status)) {
            localStorage.setItem("id", res.data.user.id)
            localStorage.setItem("firstName", res.data.user.firstName)
            localStorage.setItem("lastName", res.data.user.lastName)
            localStorage.setItem("phoneNumber", res.data.user.phoneNumber)
            localStorage.setItem("role", res.data.user.roles[0].roleName)
            localStorage.setItem("token", res.data.resToken.body)
            localStorage.setItem("tokenType", res.data.resToken.tokenType)
            toast.success("kuting...")
            setTimeout(() => {
                window.location.reload()
            }, 2000)
        }
    } catch (err) {
        console.log(err)
        toast.error("xatolik")
    }
}
/////end login
