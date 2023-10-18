import {useState} from "react";
import {Button, Offcanvas} from "react-bootstrap";

export const Group = () => {
    const [loading, setLoading] = useState(false)
    const [group, setGroup] = useState([])
    const [teacher, setTeacher] = useState([])
    const [course, setCourse] = useState([])
    const [courseId,setCourseId]=useState('')
    const [teacherId, setTeacherId] = useState('')
    const [name, setName] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndData] = useState('')
    const [active, setActive] = useState(true)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getAll =async ()=>{
        try {
            await GetGroup()
        }catch (err){
            console.log(err)
        }
    }
    return (
        <div>
            <div className={'d-flex justify-content-between align-items-center text-center mt-5'}>
                <h1 className={"text-primary"}>Gruppa bo'limi</h1>
                <Button variant="primary" onClick={handleShow} className="me-2">
                    Gruppa qushish+
                </Button>
            </div>
            <Offcanvas show={show} placement={"end"} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className={"w-100 row d-flex align-items-center justify-content-between"}>
                        <form>
                            <label htmlFor="courseId">Bo'lim tanlang</label>
                            <select name="courseId" id="courseId" onChange={e => setCourseId(e.target.value)}
                                    value={courseId} className={"form-control"}>
                                <option value="0" selected={true}>Tanlang</option>
                                {course.map(item => (<option value={item.id}>{item.name}</option>))}
                            </select>
                            <label htmlFor="name" className={"fw-bold  m-2"}>Gruppa nomi</label>
                            <input type="text" placeholder={"coure nomini kiritng"} className={"form-control"}
                                   onChange={(e) => setName(e.target.value)} value={name} id={"name"} name={"name"}/>
                        </form>
                    </div>
                    <div style={{marginTop: '80%'}}>
                        <button className={"btn btn-primary w-100 mt-2"}>Saqlash
                        </button>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}