import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Button, Card, CardBody, CardHeader} from "react-bootstrap";
import {Loading} from "../pages/Loading.jsx";
import {AddPupilInGroup, GetOneGroup, GetOnePupil, GetPupil} from "../connection/service/AppService.js";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {BASE_CONFIG} from "../connection/BaseConfig.js";
import {APP_API} from "../connection/AppApi.js";
import {MultiSelect} from "react-multi-select-component";

export const GroupItem = () => {
    const [selected, setSelected] = useState([])
    const [pupil, setPupil] = useState([])
    const [pupilId, setPupilId] = useState('')
    const [group, setGroup] = useState({})
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false);
    console.log(selected)

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
        await AddPupilInGroup(selected, id)
    }


    useEffect(() => {
        getOneGroup()
    }, []);
    useEffect(() => {
        getAll()
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
                        <Button color="danger" onClick={toggle}>
                            Click Me
                        </Button>
                    </CardBody>
                </Card>


            ) : (
                <Loading/>
            )}
            <>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                    <ModalBody>
                        <MultiSelect options={pupil} value={selected} labelledBy={"select"} onChange={setSelected}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => savaPupil()}>
                            Do Something
                        </Button>{' '}
                        <Button color="secondary" onClick={toggle}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </>
        </div>
    )
}