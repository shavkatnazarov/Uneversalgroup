import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Button, Card, CardBody, CardHeader} from "react-bootstrap";
import {Loading} from "../pages/Loading.jsx";
import {AddPupilInGroup, ChangePay, GetOneGroup, GetOnePupil, GetPupil} from "../connection/service/AppService.js";
import {Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import {MultiSelect} from "react-multi-select-component";
import {toast} from "react-toastify";

export const GroupItem = () => {
    const [selected, setSelected] = useState([])
    const [pupil, setPupil] = useState([])
    const [pupilId, setPupilId] = useState('')
    const [group, setGroup] = useState({})
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false);
    const date = new Date();

    const toggle = () => setModal(!modal);
    const id = useParams().id

    const getAll = async () => {
        try {
            const res = await GetPupil()
            const arr = []
            res.map(item => {
                const obj = {label: item.firstName, value: item.id}
                arr.push(obj)
            })
            setPupil(arr)
        } catch (err) {
            console.log(err)
        }
    }
    const getOneGroup = async () => {
        try {
            const res = await GetOneGroup(id)
            setGroup(res)
            setLoading(true)
        } catch (err) {
            console.log(err)
        }
    }
    const savaPupil = async () => {
        const arr = []
        selected.map(item => (arr.push(item.value)))
        setPupilId(arr)
        await AddPupilInGroup(id, selected, setModal)
    }

    const changePay = async (id) => {
        try {
            const paymen = confirm("o'zgartirildi")
            if (paymen) {
                await ChangePay(id, true)
                toast.success("tulov utdi")
                console.log(id)
            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getAll()
        getOneGroup()
    }, []);

    return (
        <div>
            <>
                <Card className={"form-control mt-3"}>
                    <h2 className={"text-center text-primary"}>O'quvchi qushish</h2>
                </Card>
            </>
            {loading ? (
                <Card className={"mt-5 w-40"}>
                    <CardHeader className={"d-flex justify-content-between align-items-center"}>
                        <h6 className={"text-primary"}>Gruppa nomi</h6>{group.name}
                    </CardHeader>
                    <CardBody>
                        <Button color="danger" onClick={toggle} className={"form-control"}>
                            saqlash
                        </Button>
                    </CardBody>
                </Card>


            ) : (
                <Loading/>
            )}
            <>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>O'quvchi qushish</ModalHeader>
                    <ModalBody>
                        <MultiSelect options={pupil} value={selected} labelledBy={"select"} onChange={setSelected}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="danger" onClick={toggle}>
                            Bekor qilish
                        </Button>
                        <Button color="primary" onClick={() => savaPupil()}>
                            Qushish
                        </Button>{' '}
                    </ModalFooter>
                </Modal>
            </>
            <div>
                <Card>
                    <CardHeader>
                        <h2 className={"text-center text-primary"}>O'quvchilar ruyxati</h2>
                    </CardHeader>
                    <CardBody>
                        <Table>
                            <thead>
                            <tr>
                                <th>T/r</th>
                                <th>Ism</th>
                                <th>Familya</th>
                                <th>Tel raqam</th>
                                <th>Sozlamalar</th>
                            </tr>
                            </thead>
                            <tbody>
                            {loading ? (
                                group.pupil.map((item, i) => (
                                    <tr>
                                        <td>{i + 1}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.phoneNumber}</td>
                                        <td><Button
                                            className={!!item.pupilAttendanceMonths.filter(items => items.nowMonth === (date.getMonth() + 1))[0].pay ? "btn btn-primary" : "btn btn-danger"}
                                            onClick={() => changePay(item.id)}>Mol</Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <h1>Loading...</h1>)}
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}
const GetPupils = ({pupil}) => {

}