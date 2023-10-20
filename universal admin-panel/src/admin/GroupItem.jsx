import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Button, Card, CardBody, CardHeader} from "react-bootstrap";
import {Loading} from "../pages/Loading.jsx";
import {GetOneGroup} from "../connection/service/AppService.js";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

export const GroupItem=()=>{
    const [group,setGroup]=useState({})
    const [loading,setLoading]=useState(false)
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    const id=useParams().id
    const getOneGroup=async ()=>{
        try {
          const res = await GetOneGroup(id)
            setGroup(res)
            setLoading(true)
        }catch (err){
            console.log(err)
        }
    }
    useEffect(() => {
        getOneGroup()
    }, []);
    return(
        <div >
            <>
                <Card className={"form-control mt-3"}>
                    <h2 className={"text-center text-primary"}>O'quvchi qushish</h2>
                </Card>
            </>
            {loading?(
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


            ):(
                <Loading/>
            )}
            <>
                <Modal isOpen={modal} toggle={toggle} >
                    <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                    <ModalBody>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={toggle}>
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