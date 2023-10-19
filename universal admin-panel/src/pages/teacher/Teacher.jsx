import {Button, Card, CardBody, CardHeader, Offcanvas} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {AddTeacher, GetTeacher,} from "../../connection/service/AppService.js";
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
          const res=  await AddTeacher(data, setFirstName,setLastName,setPhoneNumber,setPassword, getAll)
            await getAll()
            console.log(res)
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
                <h2 className={"text-primary"}>Teacher section </h2>
                <Button variant="primary"  onClick={handleShow} className="me-2">
                    add teacher
                </Button>
            </div>
            <div className={'mt-5'}>
                <Card>
                    <CardHeader>
                        {teacher.length !== 0 ? (
                            <h2 className={"text-primary text-center"}>Siz yaratgan teacherlar</h2>) : (
                            <h2 style={{color: 'red'}} className={"text-center"}>Xozirda teacherlar mavjud emas</h2>)
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
                    <Offcanvas.Title>Add</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <div>
                      <form>
                          <label htmlFor="firstName" className={"fw-bold  m-2"}>Teacher ismini kiriting</label>
                          <input type="text" placeholder={"Teacher ismini kiriting"} className={"form-control"}
                                 onChange={(e) => setFirstName(e.target.value)} value={firstName} id={"firstName"} name={"firstName"}/>
                          <label htmlFor="lastName" className={"fw-bold  m-2"}>Teacher familyasini kiriting</label>
                          <input type={"text"} placeholder={"Teacher familyasini kiriting"} className={"form-control"}
                                 onChange={(e) => setLastName(e.target.value)} value={lastName} id={"lastName"}
                                 name={"lastName"}/>
                          <label htmlFor="phoneNumber" className={"fw-bold  m-2"}>Teacher phoneNumber</label>
                          <input type="number" placeholder={"Teacher phoneNumberini kiritng"}
                                 className={"form-control"}
                                 onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} id={"phoneNumber"}
                                 name={"phoneNumber"}/>
                          <label htmlFor="password" className={"fw-bold  m-2"}>Teacher password</label>
                          <input type="password" placeholder={"Teacher passwordini kiritng"}
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
    console.log(teacher)

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
                    <th>Phone number</th>
                    <th>password</th>
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

                                <button className={"btn btn-success "} onClick={()=>oneTeacher(item.id)}>Bosing</button>

                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

