import {toast} from "react-toastify";
import {BASE_CONFIG} from "../BaseConfig.js";
import {APP_API} from "../AppApi.js";
import {IS_STATUS} from "/src/utils/IsStatus.js";


export const GetOneUser = async (id) => {
    try {
        const res = await BASE_CONFIG.doGetOne(APP_API.getOneUser, id)
        return res.data
    } catch (err) {
        console.log(err.message)
    }
}
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
            localStorage.setItem("__id__", res.data.user.id)
            localStorage.setItem("__name__", res.data.user.firstName)
            localStorage.setItem("__surname__", res.data.user.lastName)
            localStorage.setItem("__role__", res.data.user.roles[0].roleName)
            localStorage.setItem("__token__", res.data.resToken.body)
            console.log(res.data.user)
            toast.success("Hush kelibsiz " + res.data.user.roles[0].roleName + " oka")
            if (res.data.user.roles[0].roleName === "ADMIN"){
                navigate("/")
            }else (
                navigate("/auth/login")
            )
        }
    } catch (err) {
        console.log(err)
        toast.error("xatolik")
    }
}
export const RegisterHandler = async (data, navigate) => {
    const check = {
        tel: data.phoneNumber.length !== 9,
        parol: data.password.length === 0,
        preParol: data.prePassword !== data.password
    }
    if (check.tel) {
        return toast.error("telefon raqam xato")
    }
    if (check.parol) {
        return toast.error("parolni kiriting")
    }
    if (check.preParol) {
        return toast.error("Parol va tasdiqlash paroli bir xil bo'lishi shart")
    }

    try {
        const res = await BASE_CONFIG.doPost(APP_API.register, data)
        if (IS_STATUS(res.status)) {
            localStorage.setItem("__id__", res.data.user.id)
            localStorage.setItem("__name__", res.data.user.name)
            localStorage.setItem("__surname__", res.data.user.surname)
            localStorage.setItem("__role__", res.data.user.roles[0].roleName)
            localStorage.setItem("__token__", res.data.resToken.body)
            localStorage.setItem("__lan__", "uzb")
            toast.success("Hush kelibsiz " + res.data.user.roles[0].roleName + " oka")
            navigate("/cabinet")
        }
    } catch (err) {
        toast.error("xatolik")
    }
}
//start course



//end course