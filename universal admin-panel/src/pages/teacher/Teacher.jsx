import {Button, Card, CardBody, CardHeader, Offcanvas} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {AddTeacher, GetTeacher,} from "../../connection/service/AppService.js";
import {toast} from "react-toastify";
import {Loading} from "../Loading.jsx";
import {useNavigate} from "react-router-dom";

export const Teacher=()=>{
    const navigate = useNavigate()
    const [teacher,setTeacher] = useState([])
    const [loading,setLoading] = useState(false)
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [phoneNumber,setPhoneNumber] = useState('')
    const [password,setPassword] = useState('')
    const [show, setShow] = useState(false);
    const [group,setGroup]=useState([])
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getAll = async () => {
        try {
            const res = await GetTeacher()
            setTeacher(res)
            setGroup(res)
            setLoading(true)
        } catch (err) {
            console.log(err.message)
        }
    }
    const addTeacher=async()=>{
        const data = {
            firstName,lastName,phoneNumber,password
        }
        try {
            await AddTeacher(data, setFirstName,setLastName,setPhoneNumber,setPassword, getAll)
            await getAll()
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        getAll()
    }, []);

    return(
        <div>
            <div className={"d-flex align-items-center justify-content-between mt-5"}>
                <h2 className={"text-primary"}>O'qituvchi bo'limi </h2>
                <Button variant="primary"  onClick={handleShow} className="me-2">
                    O'qituvchi qo'shish+
                </Button>
            </div>
            <div className={'mt-5'}>
                <Card>
                    <CardHeader>
                        {teacher.length !== 0 ? (
                            <h2 className={"text-primary text-center"}>Siz yaratgan o'qituvchilar</h2>) : (
                            <h2 style={{color: 'red'}} className={"text-center"}>Xozirda o'qituvchilar mavjud emas</h2>)
                        }
                    </CardHeader>
                    <CardBody>
                        {loading ? (
                            teacher.length === 0 ? (
                                <></>
                            ) : (
                                <GetTeachers teacher={teacher} navigate={navigate}/>
                            )
                        ) : (
                            <Loading/>
                        )}
                    </CardBody>
                </Card>

            </div>
            <Offcanvas show={show} onHide={handleClose} placement={"end"} >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>O'qituvchi qo'shish</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <div>
                      <form>
                          <label htmlFor="firstName" className={"fw-bold  m-2"}>O'qituvchi ismini kiriting</label>
                          <input type="text" placeholder={"O'qituvchi ismini kiriting"} className={"form-control"}
                                 onChange={(e) => setFirstName(e.target.value)} value={firstName} id={"firstName"} name={"firstName"}/>
                          <label htmlFor="lastName" className={"fw-bold  m-2"}>O'qituvchi familyasini kiriting</label>
                          <input type={"text"} placeholder={"O'qituvchi familyasini kiriting"} className={"form-control"}
                                 onChange={(e) => setLastName(e.target.value)} value={lastName} id={"lastName"}
                                 name={"lastName"}/>
                          <label htmlFor="phoneNumber" className={"fw-bold  m-2"}>O'qituvchi telefoni</label>
                          <input type="number" placeholder={"O'qituvchi telefon raqamini kiritng"}
                                 className={"form-control"}
                                 onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} id={"phoneNumber"}
                                 name={"phoneNumber"}/>
                          <label htmlFor="password" className={"fw-bold  m-2"}>O'qituvchi paroli</label>
                          <input type="password" placeholder={"O'qituvchi paroli  kiritng"}
                                 className={"form-control"}
                                 onChange={(e) => setPassword(e.target.value)} value={password} id={"password"}
                                 name={"password"}/>

                      </form>
                  </div>
                </Offcanvas.Body>
                <div style={{marginTop: '60%'}}>
                    <button className={"btn btn-primary w-100 mt-2"} onClick={() => addTeacher()}>Saqlash
                    </button>
                </div>
            </Offcanvas>

        </div>
    )
}
const GetTeachers=({teacher,navigate})=>{
    const oneTeacher=(id)=>{
        navigate("/auth/dashboard/teacher/"+id)

    }
    return(
        <div>
            <table className={"table"}>
                <thead>
                <tr>
                    <th>T/r</th>
                    <th>Ismi</th>
                    <th>Familya</th>
                    <th>Telefon raqami</th>
                    <th>paroli</th>
                    <th>Ma'lumot</th>
                </tr>
                </thead>
                <tbody>
                {teacher.map((item,i)=>(
                    <tr>
                        <td>{i+1}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>+998-{item.phoneNumber}</td>
                        <td>{item.password}</td>
                        <td>
                            <button className={"btn btn-success"} onClick={()=>oneTeacher(item.id)}>Bosing</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

