import {Button, Card, CardBody, CardHeader, Offcanvas} from "react-bootstrap";
import {Loading} from "../Loading.jsx";
import {useState} from "react";
import {EditeCourse, SaveCourse} from "../../connection/service/AppService.js";
import {toast} from "react-toastify";

export const Teacher=()=>{
    const [teacher,setTeacher] = useState([])
    const [loading,setLoading] = useState(false)
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [phoneNumber,setPhoneNumber] = useState('')
    const [password,setPassword] = useState('')
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const addTeacher=async()=>{
        const data = {

        }
        try {
            await SaveCourse(data, setName, setPrice, setExpireDate, setDescription, getAll)
            toast.success("Teacher qo'shildi")
            await getAll()
        } catch (err) {
            console.log(err.message)
        }
    }

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
                            <h2 className={"text-primary text-center"}>Siz yaratgan kurslar</h2>) : (
                            <h2 style={{color: 'red'}} className={"text-center"}>Xozirda kurslar mavjud emas</h2>)}
                    </CardHeader>
                    <CardBody>
                        {loading ? (
                            teacher.length === 0 ? (
                                <></>
                            ) : (
                                <GetTeacher teacher={teacher} handleShow={handleShow} navigate={navigate}/>
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
                          <input type="number" placeholder={"Teacher passwordini kiritng"}
                                 className={"form-control"}
                                 onChange={(e) => setPassword(e.target.value)} value={password} id={"password"}
                                 name={"password"}/>

                      </form>
                  </div>
                </Offcanvas.Body>
                <div style={{marginTop: '60%'}}>
                    <button className={"btn btn-primary w-100 mt-2"} onClick={() => saveCourse()}>Saqlash
                    </button>
                </div>
            </Offcanvas>

        </div>
    )
}
const GetTeacher=({teacher,handleShow,navigate})=>{
    return(
        <div>salom</div>
    )
}

