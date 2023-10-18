import {useEffect, useState} from "react";
import {DeleteCourse, EditeCourse, GetCourse, PhotoUpload, SaveCourse} from "../../connection/service/AppService.js";
import {Button, Card, CardBody, CardHeader, Offcanvas} from "react-bootstrap";
import {
    DropdownMenu,
    DropdownToggle,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader, UncontrolledDropdown
} from "reactstrap";
import {Loading} from "../../pages/Loading.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {APP_API} from "../../connection/AppApi.js";

export const Course = () => {
    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const [currentCourse, setCurrentCourse] = useState('');
    const [course, setCourse] = useState([])
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [expireDate, setExpireDate] = useState(0)
    const [description, setDescription] = useState('')
    const [photoId, setPhotoId] = useState('')
    const [photo, setPhoto] = useState()
    const [modal, setModal] = useState(false);
    const [id,setId]=useState('')
    console.log(photoId)
    const handleClose = () => setShow(false);
    const handleShow = (currentProduct,id,name) =>{
        setCurrentCourse(currentProduct)
        setShow(true);
        setId(id)
        if (id){
            setName(name)
        }else {
            setName('')
        }
    }

    const toggle = () => setModal(!modal);
    const getAll = async () => {
        try {
            const res = await GetCourse()
            setCourse(res)
            setLoading(true)
        } catch (err) {
            console.log(err.message)
        }
    }
    const saveCourse = async () => {
        const data = {
            name, price, expireDate, description,photoId
        }
        try {
            if (id===''){
                await SaveCourse(data, setName, setPrice, setExpireDate, setDescription, getAll)
            }else {
                await EditeCourse(id, data, getAll, setName, setPrice, setExpireDate, setDescription)
                toast.success("course taxrirlandi")
            }
            await getAll()
        } catch (err) {
            console.log(err.message)
        }
    }
    const photoUpload = async () => {
        const formData = new FormData
        formData.append("photo", photo)
        const res = await PhotoUpload(formData, setModal)
        setPhotoId(res)
        if (res){
            handleShow('add','','')
            setModal(false)
        }
    }

    const deleteCourse = async (id) => {
       try {
           const delet=window.confirm("o'chirasanmi")
           if (delet){
               await DeleteCourse(id,getAll)
           }
       }catch (err){
           console.log(err.message)
       }
    }

    useEffect(() => {
        getAll()
    }, []);
    return (
        <div>
            <div className={"d-flex align-items-center justify-content-between mt-5"}>
                <h2 className={"text-primary"}>Kurs Bulimi </h2>
                <Button color="danger" onClick={toggle}>
                   Kurs Qushish +
                </Button>
            </div>

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                <ModalBody>
                    <Label for="photo" className={"text-primary"}>
                        rasm
                    </Label>
                    <Input
                        onChange={e => setPhoto(e.target.files[0])}
                        id="photo"
                        name="photo"
                        placeholder="Iltimmos yil kriting Namuna 2000-yil"
                        type="file"
                    />
                </ModalBody>
                <ModalFooter>
                    <Button variant="danger" onClick={() =>handleClose() }>Bekor qilsh
                    </Button>
                      <Button variant="primary" onClick={()=>photoUpload()} className="me-2">
                        Davom etish
                    </Button>
                </ModalFooter>
            </Modal>
            <div className={'mt-5'}>
                <Card>
                    <CardHeader>
                        {course.length !== 0 ? (
                            <h2 className={"text-primary text-center"}>Siz yaratgan kurslar</h2>) : (
                            <h2 style={{color: 'red'}} className={"text-center"}>Xozirda kurslar mavjud emas</h2>)}
                    </CardHeader>
                    <CardBody>
                        {loading ? (
                            course.length === 0 ? (
                                <></>
                            ) : (
                                <GetCourses course={course} deleteCourse={deleteCourse} handleShow={handleShow} navigate={navigate}/>
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
                            <label htmlFor="name" className={"fw-bold  m-2"}>Course nomi</label>
                            <input type="text" placeholder={"coure nomini kiritng"} className={"form-control"}
                                   onChange={(e) => setName(e.target.value)} value={name} id={"name"} name={"name"}/>
                            <label htmlFor="price" className={"fw-bold  m-2"}>Course narxi</label>
                            <input type={"number"} placeholder={"course narxini kiritng"} className={"form-control"}
                                   onChange={(e) => setPrice(e.target.value)} value={price} id={"price"}
                                   name={"price"}/>
                            <label htmlFor="expireDate" className={"fw-bold  m-2"}>Course davomiligi</label>
                            <input type="number" placeholder={"course davomiligini kiritng"}
                                   className={"form-control"}
                                   onChange={(e) => setExpireDate(e.target.value)} value={expireDate} id={"expireDate"}
                                   name={"expireDate"}/>
                            <label htmlFor="description" className={"fw-bold  m-2"}>Course xaqida ma'lumot</label>
                            <textarea placeholder={"course xaqida qisqa ma'lumot"} className={"form-control"}
                                      onChange={(e) => setDescription(e.target.value)} value={description}
                                      id={"description"}
                                      name={"description"}/>
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
const GetCourses = ({course, deleteCourse,handleShow,navigate}) => {
    const [a,setA]=useState({})
    console.log(a)
const oneCourse=(id)=>{
navigate("/auth/dashboard/course/"+id)
}
    return (
        <>
        <table className={'table'}>
            <thead>
            <tr>
                <th>T/r</th>
                <th>Kurs Nomi</th>
                <th>Kurs narxi</th>
                <th>Kurs muddati</th>

                <th>Rasm uchun</th>
                <th>Malumot</th>
                <th>Xaqida</th>
                <th>Sozlamalar</th>
            </tr>
            </thead>
            <tbody>
            {course.map((item, i) => (
                <tr>
                    <td>{i + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.expireDate}</td>
                    <td>
                        <button type="button" className="btn btn-danger" onClick={event => setA({img:item.photoId})} data-bs-toggle="modal"
                                data-bs-target="#exampleModals">
                            Rasm
                        </button>
                    </td>
                    <td>
                        <button className={"btn btn-success"} onClick={()=>oneCourse(item.id)}>Bosing</button>
                    </td>
                    <td>
                        <button type="button" className="btn btn-warning" onClick={event => setA({desc:item.description})} data-bs-toggle="modal"
                                data-bs-target="#exampleModals1">
                            Xaqida
                        </button>
                    </td>
                    <td>
                        <div className="dropdown">
                            <button style={{color: "black", width: "-10px"}} className="btn btn-light" type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                <i className="bi  bi-gear"/>
                            </button>
                            <ul className="dropdown-menu">
                                <div className={"text-center"}>
                                    <Button variant="warning" onClick={()=>handleShow('edit',item.id,item.name)} className=" w-75">Taxrirlash</Button>
                                    <button className={"btn btn-danger w-75 mt-2"} onClick={()=>deleteCourse(item.id)}> O'chirish</button>
                                </div>
                            </ul>
                        </div>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    <div className="modal fade" id="exampleModals" tabIndex="-1" aria-labelledby="exampleModalLabel"
         aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Kurs rasmi</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <img style={{width:'465px',height:'300px'}} src={APP_API.downloadPhoto +a.img} alt={"rasm yuq"}/>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn btn-danger"
                            data-bs-dismiss="modal">Bekor qilish
                          </button>

                </div>
            </div>
        </div>
    </div>

            <div className="modal fade" id="exampleModals1" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Kurs  Xaqida malumot</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h5 style={{marginLeft:'20px'}}>{a.desc}</h5>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger"
                                    data-bs-dismiss="modal">Bekor qilish
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
