import {useEffect, useState} from "react";
import {Button, Card, CardBody, CardHeader, Offcanvas} from "react-bootstrap";
import {BASE_CONFIG} from "../connection/BaseConfig.js";
import {APP_API} from "../connection/AppApi.js";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {GetGroup, SaveGroup} from "../connection/service/AppService.js";

export const Group = () => {
    const [loading, setLoading] = useState(false)
    const navigate=useNavigate();
    const [group, setGroup] = useState([])
    const [dayType, setDayType] = useState('')
    const [teacher, setTeacher] = useState([])
    const [course, setCourse] = useState([])
    const [courseId, setCourseId] = useState('')
    const [teacherId, setTeacherId] = useState('')
    const [name, setName] = useState('')
    const [start_date, setStartDate] = useState('')
    const [end_date, setEndData] = useState('')
    const [active, setActive] = useState()
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getAll = async () => {
        try {
            const res = await GetGroup()
            const resCourse = await BASE_CONFIG.doGet(APP_API.course)
            const resTeacher = await BASE_CONFIG.doGet(APP_API.teacher)
            setCourse(resCourse.data)
            setTeacher(resTeacher.data)
            setGroup(res)
        } catch (err) {
            console.log(err)
        }
    }
    const saveGroup=async ()=>{
        const data={
            courseId,teacherId,name,dayType,start_date,end_date
        }
        console.log(data)
        await SaveGroup(data,setCourseId,setTeacherId,setName,setStartDate,setEndData,getAll)
    }
    // const saveGroup = async () => {
    //     const data = {
    //         courseId, teacherId, name, dayType, start_date, end_date
    //
    //     }
    //     await SaveGroup(data, setCourseId, setTeacherId, setName, setStartDate, setEndData, getAll)
    // }
    const changeActives=async (id)=>{
       try {
           const arxiv=confirm("Arxivlaysizmi?")
           if (arxiv){
               await changeActive(id,false)
               toast.success("arxivlandi")
               window.location.reload()
           }
       }catch (err){
           console.log(err)
       }
    }

    useEffect(() => {
        getAll()
    }, []);
    return (
        <div>
            <div className={'d-flex justify-content-between align-items-center text-center mt-5'}>
                <h1 className={"text-primary"}>Gruppa bo'limi</h1>
                <Button variant="primary" onClick={handleShow} className="me-2">
                    Gruppa qushish+
                </Button>
            </div>
            <Card className={"mt-5"}>
                <CardHeader>
                    {group.length!==0?(<h2 className={"text-primary text-center"}>Siz yaratgan kurslar</h2>):(<h2 className={"text-center text-danger"}>Hozirda kurslar mavjud emas</h2>)}
                </CardHeader>
                <CardBody>
                    <GetGroups group={group} changeActives={changeActives} navigate={navigate}/>
                </CardBody>
            </Card>
            <Offcanvas show={show} placement={"end"} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className={"w-100 row d-flex align-items-center justify-content-between"}>
                        <form>
                            <label htmlFor="name" className={"fw-bold  m-2"}>Cursni tanlang</label>
                            <select name="courseId" id="courseId" onChange={e => setCourseId(e.target.value)}
                                    value={courseId} className={"form-control"}>
                                <option value="0" selected={true}>Tanlang</option>
                                {course.map(item => (<option value={item.id}>{item.name}</option>))}
                            </select>
                            <label htmlFor="name" className={"fw-bold  m-2"}>O'qitvchini tanlang </label>
                            <select name="teacherId" id="teacherId" onChange={e => setTeacherId(e.target.value)}
                                    value={teacherId} className={"form-control"}>
                                <option value="0" selected={true}>Tanlang</option>
                                {teacher.map(item => (
                                    <option value={item.id}>{item.firstName} {item.lastName}</option>))}
                            </select>
                            <label htmlFor="name" className={"fw-bold  m-2"}>Gruppa nomi</label>
                            <input type="text" placeholder={"coure nomini kiritng"} className={"form-control"}
                                   onChange={(e) => setName(e.target.value)} value={name} id={"name"} name={"name"}/>
                            <label htmlFor="start_date" className={"fw-bold  m-2"}>Gruppa boshlanishi</label>
                            <input type="number" placeholder={"Gruppa boshlanish vaqti"} className={"form-control"}
                                   onChange={(e) => setStartDate(e.target.value)} value={start_date} id={"start_date"}
                                   name={"start_date"}/>
                            <label htmlFor="end_date" className={"fw-bold  m-2"}>Gruppa tugashi</label>
                            <input type="number" placeholder={"Guruppa tugash vaqti"} className={"form-control"}
                                   onChange={(e) => setEndData(e.target.value)} value={end_date} id={"end_date"}
                                   name={"end_date"}/>
                            <label className={"fw-bold  m-2"} htmlFor="daytype">Kunni tanlang</label>
                            <select className={"form-control"} name="dayType"
                                    onChange={event => setDayType(event.target.value)} id="daytype">
                                <option value="" selected={false}>Tanlang</option>
                                <option value="TOQ">Toq</option>
                                <option value="JUFT">Juft</option>
                                <option value="BOOTCAMP">Bootcamp</option>
                            </select>
                        </form>
                    </div>
                    <div style={{marginTop: '60%'}}>

                        <button className={"btn btn-primary w-100 mt-3"} onClick={() => saveGroup()}>Saqlash
                        </button>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}

const GetGroups = ({group,changeActives,navigate}) => {
    const oneGroup=(id)=>{
        navigate("/auth/dashboard/group/"+ id)
    }
    return (
        <table className={"table"}>
            <thead>
            <tr>
                <th>T/r</th>
                <th>Gruppa nomi</th>
                <th>Boshlanish vaqti</th>
                <th>Tugash vaqti</th>
                <th>Arxiv</th>
                <th>O'quvchi </th>
                <th>O'chirish</th>
            </tr>
            </thead>
            <tbody>
            {group.map((item,i)=>(
                item.active?(
                    <tr>
                        <td>{i + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.start_date}</td>
                        <td>{item.end_date}</td>
                        <td><button className={"btn btn-primary"} onClick={()=>changeActives(item.id)}><i className="bi bi-archive"></i></button></td>
                        <td><button className={"btn btn-success"} onClick={()=>oneGroup(item.id)}><i className="bi bi-person-fill-add"></i></button></td>
                        <td><button className={"btn btn-danger"} onClick={()=>oneGroup(item.id)}><i className="bi bi-trash"></i></button></td>
                    </tr>
                ):(
                   <></>
                )
            ))}
            </tbody>
        </table>
    )
}