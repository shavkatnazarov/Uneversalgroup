import {APP_API} from "../AppApi.js";
import {IS_STATUS} from "../../utils/IsStatus.js";
import {toast} from "react-toastify";
import {BASE_CONFIG} from "../BaseConfig.js";

export const LoginHandler = async (data, navigate) => {
    const check = {
        tel: data.phoneNumber.length !== 9,
        parol: data.password.length === 0
    }
    if (check.tel) {
        return toast.error("telefon raqam xato")
    }
    if (check.parol) {
        return toast.error("parolni kiriting")
    }
    try {
        const res = await BASE_CONFIG.doPost(APP_API.login, data)
        if (IS_STATUS(res.status)) {
            localStorage.setItem("id", res.data.user.id)
            localStorage.setItem("firstName", res.data.user.name)
            localStorage.setItem("lastName", res.data.user.surname)
            localStorage.setItem("role", res.data.user.roles[0].roleName)
            localStorage.setItem("token", res.data.resToken.body)
            toast.success("Hush kelibsiz " + res.data.user.roles[0].roleName + " oka")
            if (res.data.user.roles[0].roleName === "ADMIN"){
                navigate("/auth/dashboard")
            }else if (res.data.user.roles[0].roleName==="TEACHER"){
                navigate("/teacher/cabinet")
                window.location.reload()
            }
        }
    } catch (err) {
        toast.error(err)
    }
}
/////end login
