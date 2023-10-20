import {Card,} from "react-bootstrap";
import {Loading} from "../Loading.jsx";
import { useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {GetOneTeacher} from "../../connection/service/AppService.js";

export const TeacherItem=()=>{
    const [loading, setLoading] = useState(false)
    const [teacher,setTeacher]=useState([])
    const [group,setGroup]=useState([])
    const id=useParams().id
    const getOneTeacher = async() => {
        try {
            const res = await GetOneTeacher(id)
            if (res.length!==0){
                setTeacher(res[0].teacher)
            }
            setGroup(res)
            console.log(res)
            setLoading(true)
        } catch (err) {
            console.log(err.message)
        }
    }
    useEffect(() => {
        getOneTeacher()
    }, []);

    return(
        <div>
            <div className={"m-5"}>
                {loading ? (
                    <div className={"d-flex align-items-center justify-content-between"}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/3508795/mentor-sticker-design-version-c-clipart-sm.png" />
                            <Card.Body>
                                <Card.Title>O'qtuvchi: {teacher.firstName} {teacher.lastName}</Card.Title>
                                <Card.Text>
                                    <h6>Telefon raqami: (+998) {teacher.phoneNumber}</h6>
                                    <h6>Paroli:  <i className="bi bi-key"></i>{teacher.password}</h6>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <div className={"w-75 "} style={{marginTop:'-340px',marginLeft:'30px'}}>
                    <GroupByTeacher  group={group}/>
                 </div>
                    </div>
                ) : (
                    <Loading/>
                )}
            </div>

        </div>
    )

}
const GroupByTeacher=({group})=>{
    return(
        <div className={"table border"} w>
            <thead>
            <tr>
                <th>T/r</th>
                <th>Gruppa nomi</th>
            </tr>
            </thead>
            <tbody>
            {group.length===0?(
                <h6>Hozircha group yuq</h6>
            ):
                group.map((item,i)=>(
                        <tr>
                            <td>{i+1}</td>
                            <td>{item.name}</td>
                        </tr>
                    ))

            }
            </tbody>
        </div>
    )
}