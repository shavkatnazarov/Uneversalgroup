import {Button, Offcanvas} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {createHashRouter, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {AddPupil, AddPupil1, DeletePupil, GetPupil} from "../../connection/service/AppService.js";

export const Pupil = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [pupil, setPupil] = useState([])
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const getAll = async () => {
        try {
            const res = await GetPupil()
            setPupil(res)
            setLoading(true)
        } catch (err) {
            console.log(err.message)
        }
    }
    useEffect(() => {
        getAll()
    }, []);
    const addPupils = async () => {
        const data = {
            firstName, lastName, phoneNumber, password
        }
        try {
            await AddPupil(data, setFirstName, setLastName, setPhoneNumber, setPassword, getAll)
            await getAll()
        } catch (err) {
            console.log(err.message)
        }
    }
    const deletePupils = async (id) => {
        try {
            await DeletePupil(id)
        } catch (err) {
            toast("xatolik", err)
            console.log(err)
        }

    }

    return (
        <div className={"container"}>
            <h1 className={"text-info text-center align-items-center justify-content-center"}>O'quvchi qushish</h1>
            <Button variant="primary" onClick={handleShow} className="me-2">
                +
            </Button>
            <GetPupils pupil={pupil} deletePupils={deletePupils} navigate={navigate}/>
            <Offcanvas show={show} onHide={handleClose} placement={"end"}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Add pupil</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div>
                        <form>
                            <label htmlFor="firstName" className={"fw-bold  m-2"}>uquvchini ismini kiriting</label>
                            <input type="text" placeholder={"uquvchini ismini kiriting"} className={"form-control"}
                                   onChange={(e) => setFirstName(e.target.value)} value={firstName} id={"firstName"}
                                   name={"firstName"}/>
                            <label htmlFor="lastName" className={"fw-bold  m-2"}>uquvchini familyasini kiriting</label>
                            <input type={"text"} placeholder={"uquvchini familyasini kiriting"}
                                   className={"form-control"}
                                   onChange={(e) => setLastName(e.target.value)} value={lastName} id={"lastName"}
                                   name={"lastName"}/>
                            <label htmlFor="phoneNumber" className={"fw-bold  m-2"}>uquvchini phoneNumber</label>
                            <input type="number" placeholder={"uquvchini phoneNumberini kiritng"}
                                   className={"form-control"}
                                   onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber}
                                   id={"phoneNumber"}
                                   name={"phoneNumber"}/>
                            <label htmlFor="password" className={"fw-bold  m-2"}>uquvchini password</label>
                            <input type="password" placeholder={"uquvchini passwordini kiritng"}
                                   className={"form-control"}
                                   onChange={(e) => setPassword(e.target.value)} value={password} id={"password"}
                                   name={"password"}/>
                            <div>
                                <button type={"button"} className={"btn btn-success w-100 mt-2"}
                                        onClick={() => addPupils()}>Saqlash
                                </button>
                            </div>
                        </form>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>

        </div>
    )
}

const GetPupils = ({pupil,deletePupils,navigate}) => {
    const [modal, setModal] = useState(false);
    const [id,setId]=useState('')

    const toggle = (id) =>{
        setModal(!modal);
        setId(id)
    }
    const onePupil=(id)=>{
        navigate("/auth/dashboard/pupil/"+id)

    }
    return (
        <div>

            <Modal isOpen={modal} toggle={()=>toggle("")}>
                <ModalHeader toggle={()=>toggle('')}>Modal title</ModalHeader>
                <ModalBody>
                    <h1 className={"text-danger"}>
                        O'chirmoqchimisiz
                    </h1>
                </ModalBody>
                <ModalFooter>
                    <Button className={"brn btn-success"} onClick={() => deletePupils(id)}>
                        ha
                    </Button>{' '}
                    <Button className={"btn btn-secondary"} onClick={()=>toggle("")}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
            <table className={"table"}>
                <thead>
                <tr>
                    <th>T/r</th>
                    <th>Ismi</th>
                    <th>Familya</th>
                    <th>Phone number</th>
                    <th>password</th>
                    <th colSpan={3} >action</th>
                </tr>
                </thead>
                <tbody>
                {pupil.map((item, i) => (
                    <tr>
                        <td>{i + 1}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>+(998)-{item.phoneNumber}</td>
                        <td>{item.password}</td>
                        <td ><Button className={"btn btn-danger"} onClick={()=>toggle(item.id)}>
                            delete
                        </Button></td>
                            <Button className={"btn btn-info"} onClick={()=>onePupil(item.id)}>kurish</Button>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}