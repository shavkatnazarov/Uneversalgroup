//start course
import {BASE_CONFIG as BaseConfig, BASE_CONFIG} from "../BaseConfig.js";
import {APP_API} from "../AppApi.js";
import {IS_STATUS} from "../../utils/IsStatus.js";
import {toast} from "react-toastify";

export const GetCourse = async () => {
    try {
        const res = await BASE_CONFIG.doGet(APP_API.course)
        return res.data
    } catch (err) {
        console.log(err.message)
    }
}
export const SaveCourse = async (data, setName, setPrice, setExpireDate, setDescription,setPhotoId) => {
    const check = {
        name: data.name.trim().length === 0,
        price: data.price <= 0,
        expireDate: data.expireDate <= 0,
        description: data.description.trim().length === 0,
    }
    if (check.name || check.price || check.expireDate || check.description)
        return toast.warning("malumotlar bush bulmasin")
    try {
        const res = await BASE_CONFIG.doPost(APP_API.course, data)
        if (IS_STATUS(res.status)) {
            toast.success(res.data.message)
            setName('')
            setPrice('')
            setExpireDate('')
            setDescription('')
        }
    } catch (err) {
        console.log(err.message)
    }
}
export const PhotoUpload = async (formData, setModal) => {
    try {
        const res = await BASE_CONFIG.doPost(APP_API.uploadPhoto, formData)
        if (IS_STATUS(res.status)) {
            setModal(false)
            return res.data
        }

    } catch (err) {
        console.log(err)
    }
}
export const DeleteCourse = async (id, getAll) => {
    try {
       const res = await  BASE_CONFIG.doDelete(APP_API.course,id)
        if (IS_STATUS(res.status)){
            getAll()
            toast.success("O'chirib tashlandi")
        }
    }catch (err){
        console.log(err.message)
    }
}

export const EditeCourse = async (id, data, getAll, setName, setPrice, setExpireDate, setDescription) => {
    const check = {
        name: data.name.trim().length === 0,
        price: data.price <= 0,
        expireDate: data.expireDate <= 0,
        description: data.description.trim().length === 0
    }
    if (check.name || check.price || check.expireDate || check.description) {
        return toast.warning("malumotlar bush bulmasin")
    }
    try {
        const res = await BASE_CONFIG.doPut(APP_API.course, id, data)
        if (IS_STATUS(res.status)) {
            getAll()
            setName("")
            setPrice("")
            setExpireDate("")
            setDescription("")
        }
    } catch (err) {
        console.log(err)
    }
}

export const GetOneCourse = async (id) => {
    try {
        const res = await BASE_CONFIG.doGetOne(APP_API.course, id)
        return res.data
    } catch (err) {
        console.log(err.message)
    }
}
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
        const res = await BaseConfig.doPost(APP_API.login, data)
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
