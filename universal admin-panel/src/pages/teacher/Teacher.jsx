import {Button, Card, CardBody, CardHeader, Offcanvas} from "react-bootstrap";
import {Loading} from "../Loading.jsx";
import {useState} from "react";
import {APP_API} from "../../connection/AppApi.js";

export const Teacher=()=>{
    const [teacher,setTeacher] = useState([])
    const [currentCourse, setCurrentCourse] = useState('');
    const [modal, setModal] = useState(false);
    const [show, setShow] = useState(false);
    const [loading,setLoading] = useState(false)
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [phoneNumber,setPhoneNumber] = useState('')
    const [password,setPassword] = useState('')
    const [id,setId]=useState('')

    const handleClose = () => setShow(false);
    const handleShow = (currentProduct,id,name) =>{
        setCurrentCourse(currentProduct)
        setShow(true);
        setId(id)
        if (id){
            setFirstName(firstName)
        }else {
            setFirstName('')
        }
    }

    const toggle = () => setModal(!modal);
    return(
        <div>
            <div className={"d-flex align-items-center justify-content-between mt-5"}>
                <h2 className={"text-primary"}>Teacher section</h2>
                <Button color="danger" onClick={toggle}>
                   + Add teacher
                </Button>
            </div>
            <div className={'mt-5'}>
                <Card>
                    <CardHeader>
                        {teacher.length !== 0 ? (
                            <h2 className={"text-primary text-center"}>Siz qo'shgan teacherlar</h2>) : (
                            <h2 style={{color: 'red'}} className={"text-center"}>Xozirda teacherlar mavjud emas</h2>)}
                    </CardHeader>
                    <CardBody>
                        {loading ? (
                            teacher.length === 0 ? (
                                <></>
                            ) : (
                                <GetTeacher teacher={teacher}/>
                            )
                        ) : (
                            <Loading/>
                        )}
                    </CardBody>
                </Card>
            </div>

            <Offcanvas show={show} placement={"end"} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{currentCourse==='add'?"Add":'edit'}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className={"w-100 row d-flex align-items-center justify-content-between"}>
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
                    <div style={{marginTop: '80%'}}>
                        <button className={"btn btn-primary w-100 mt-2"} onClick={() => saveCourse()}>Saqlash
                        </button>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )

}
const GetTeacher = ({teacher}) => {

    return (
        <>
            <table className={'table'}>
                <thead>
                <tr>
                    <th>T/r</th>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Phone number</th>
                    <th>Password</th>
                </tr>
                </thead>
                <tbody>
                {teacher.map((item, i) => (
                    <tr>
                        <td>{i + 1}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.phoneNumber}</td>
                        <td>{item.password}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    )
}


