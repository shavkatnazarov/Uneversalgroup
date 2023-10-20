import {BASE_CONFIG as BaseConfig, BASE_CONFIG} from "../BaseConfig.js";
import {APP_API} from "../AppApi.js";
import {toast} from "react-toastify";
import {IS_STATUS} from "../../utils/IsStatus.js";
import axios from "axios";
import {BASE_URL} from "../BaseUrl.js";

export const GetOnePayment = async (id) => {
    try {
        const res = await BASE_CONFIG.doGetOne(APP_API.payment, id)
        return res.data
    } catch (err) {
        console.log(err.message)
    }
}

export const GetCourse = async () => {
    try {
        const res = await BASE_CONFIG.doGet(APP_API.course)
        return res.data
    } catch (err) {
        console.log(err.message)
    }
}
export const SaveCourse = async (data, setName, setPrice, setExpireDate, setDescription, setPhotoId) => {
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
        const res = await BASE_CONFIG.doDelete(APP_API.course, id)
        if (IS_STATUS(res.status)) {
            getAll()
            toast.success("O'chirib tashlandi")
        }
    } catch (err) {
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
//start teacher
export const AddTeacher = async (data, setFirstName, setLastName, setPhoneNumber, setPassword) => {
    try {
        const check = {
            ism: data.firstName.trim().length === 0,
            familya: data.lastName.trim().length === 0,
            tel: data.phoneNumber.trim().length !== 9,
            pas: data.password.length <= 6,
        }
        if (check.ism || check.familya) {
            return toast.warning("Malumot bosh bolmasin")
        }
        if (check.tel) {
            return toast.warning("Telefon raqamda xatolik")
        }
        if (check.pas) {
            return toast.warning("parol 6ta belgidan kop bolsin")
        }
        const res = await BASE_CONFIG.doPost(APP_API.teacher + "/" + localStorage.getItem("id"), data)
        if (IS_STATUS(res.status)) {
            toast.success("Teacher qo'shildi")
            localStorage.setItem("role", res.data.user.roles[0].roleName)
            localStorage.setItem("token", res.data.resToken.body)
            setFirstName('')
            setLastName('')
            setPhoneNumber('')
            setPassword('')
        }
    } catch (err) {
        console.log(err)
    }
}
export const GetTeacher = async () => {
    try {
        const res = await BASE_CONFIG.doGet(APP_API.teacher)
        return res.data
    } catch (err) {
        console.log(err)
    }
}
export const GetOneTeacher = async (id) => {
    try {
        const res = await BASE_CONFIG.doGetOne(APP_API.teacher, id)
        console.log(res)
        return res.data
    } catch (err) {
        console.log(err.message)
    }
}
//end teacher

//start group
export const GetGroup = async () => {
    try {
        const res = await BASE_CONFIG.doGet(APP_API.group)
        return res.data
    } catch (err) {
        console.log(err)
    }
}
export const SaveGroup=async (data,setCourseId,setTeacherId,setName,setStartData,setEndData,getAll)=>{
    const check={
        courseId: data.courseId==="0",
        teacherId: data.teacherId==="0",
        name:data.name.trim().length===0,
        start_date: data.start_date.length<0,
        end_date: data.end_date.length<0
    }
    if (check.courseId||check.teacherId||check.name||check.start_date||check.end_date){
        return toast.warning("yuqal")
    }
    try {
       const res = await BASE_CONFIG.doPost("/group/add",data)
        if (IS_STATUS(res.status)){
            getAll()
            setTeacherId('')
            setCourseId('')
            setName('')
            setStartData('')
            setEndData('')
            return toast.success("saqalndi")
        }
    }catch (err){
        console.log(err)
    }
}
export const DeleteGroup=async (id,getAll)=>{
    try {
        const res = await BASE_CONFIG.doDelete(APP_API.group,id)
        if (IS_STATUS(res.status)){
            getAll()
            return toast.success("Ochirib tashlandi")
        }
    }catch (err){
        console.log(err)
    }
}
export const changeActive = async (id, active) => {
    try {
        await axios.put(BASE_URL + APP_API.group + '/active/' + id + '?active=' + active)
    } catch (err) {
        console.log(err)
    }

}
export const GetOneGroup = async (id) => {
    try {
        const res = await BASE_CONFIG.doGetOne(APP_API.group, id)
        return res.data
    } catch (err) {
        console.log(err.message)
    }
}
//end group


//start pupil
export const AddPupil = async (data, setFirstName, setLastName, setPhoneNumber, setPassword) => {
    try {
        const check = {
            ism: data.firstName.trim().length === 0,
            familya: data.lastName.trim().length === 0,
            tel: data.phoneNumber.trim().length !== 9,
            pas: data.password.length === 0,
        }
        if (check.ism || check.familya) {
            return toast.warning(" ism yoki familya  bo'sh bolmasin")
        }
        if (check.tel) {
            return toast.warning("Telefon raqamda xatolik")
        }
        if (check.pas) {
            return toast.warning("parol    bolsin")
        }
        const res = await BASE_CONFIG.doPost(APP_API.puple + "/" + localStorage.getItem("id"), data)
        if (IS_STATUS(res.status)) {
            localStorage.setItem("role", res.data.user.roles[0].roleName)
            localStorage.setItem("token1", res.data.resToken.body)
            toast.success("Teacher qo'shildi")
            setFirstName('')
            setLastName('')
            setPhoneNumber('')
            setPassword('')
        }
    } catch (err) {
        console.log(err)
    }
}
//end group
//pupil
export const GetOnePupil = async (id) => {
    try {
        const res = await BASE_CONFIG.doGetOne(APP_API.puple1, id)
        console.log(res)
        return res.data
    } catch (err) {
        console.log(err.message)
    }
}
export const AddPupil1 = async (data, setFirstName, setLastName, setPhoneNumber, setPassword) => {

        const check ={
            ism1: data.firstName.trim().length === 0,
            familya1: data.lastName.trim().length === 0,
            tel1: data.phoneNumber.trim().length !== 9,
            pas1: data.password.length === 0,
        }
        if (check.ism1 || check.familya1) {
            return toast.warning(" ism yoki familya  bo'sh bolmasin")
        }
        if (check.tel1) {
            return toast.warning("Telefon raqamda xatolik")
        }
        if (check.pas1) {
            return toast.warning("parol    bolsin")
        }
    try {
        const res = await BASE_CONFIG.doPost(APP_API.puple + "/" + localStorage.getItem("id"), data)
        if (IS_STATUS(res.status)) {
            localStorage.setItem("role", res.data.user.roles[0].roleName)
            localStorage.setItem("token1", res.data.resToken.body)
            toast.success("uquvchi qo'shildi")
            setFirstName('')
            setLastName('')
            setPhoneNumber('')
            setPassword('')
        }
    } catch (err) {
        console.log(err)
    }
}



export const GetPupil = async () => {
    try {
        const res = await BASE_CONFIG.doGet(APP_API.puple)
        console.log(res.data)
        return res.data
    } catch (err) {
        console.log(err)
    }
}
export const DeletePupil = async (id) => {
    try {
        await BaseConfig.doDelete(APP_API.puple, id)
        toast.success("uquvchi o'chirildi")
    } catch (err) {
        toast.error("xatolik")
    }
}


