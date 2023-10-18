import {BASE_CONFIG} from "../BaseConfig.js";
import {APP_API} from "../AppApi.js";
import {toast} from "react-toastify";
import {IS_STATUS} from "../../utils/IsStatus.js";

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
//start teacher
export const AddTeacher =async(data,setFirstName,setLastName,setPhoneNumber,setPassword)=>{
  try {
      const check={
          ism:data.firstName.trim().length===0,
          familya:data.lastName.trim().length===0,
          tel:data.phoneNumber.trim().length!==9,
          pas:data.password.length<=6,
      }
      if (check.ism||check.familya){
          return toast.warning("Malumot bosh bolmasin")
      }
      if (check.tel){
          return toast.warning("Telefon raqamda xatolik")
      }
      if (check.pas){
          return toast.warning("parol 6ta belgidan kop bolsin")
      }
      const res = await BASE_CONFIG.doPost(APP_API.teacher+"/"+localStorage.getItem("id"), data)
      if (IS_STATUS(res.status)) {
          toast.success("Teacher qo'shildi")
          localStorage.setItem("role", res.data.user.roles[0].roleName)
          localStorage.setItem("token", res.data.resToken.body)
          setFirstName('')
          setLastName('')
          setPhoneNumber('')
          setPassword('')
      }
  }catch (err){
      console.log(err)
  }
}
export const GetTeacher = async () => {
    try {
        const res = await BASE_CONFIG.doGet(APP_API.teacher)
        return res.data
        console.log(res.data)
    } catch (err) {
        console.log(err)
    }
}
//start group
export const GetGroup = async () => {
    try {
        const res = await BASE_CONFIG.doGet(APP_API.group)
        return res.data
    } catch (err) {
        console.log(err)
    }
}
//end group