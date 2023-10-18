import {Card, CardBody, CardHeader} from "react-bootstrap";
import {CardText, ListGroup, ListGroupItem} from "reactstrap";
import {Loading} from "../Loading.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {GetOneTeacher} from "../../connection/service/AppService.js";

export const TeacherItem=()=>{
    const navigate= useNavigate()
    const [loading, setLoading] = useState(false)
    const [teacher,setTeacher]=useState([])
    const id=useParams().id
    const getOneTeacher = async() => {
        try {
            const res = await GetOneTeacher(id)
            setTeacher(res)
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
                    <>
                        <CardHeader style={{marginTop: "20px"}}>
                            <h6 style={{fontSize: '12px'}}>Nomi</h6>
                            <h3>{teacher.firstName}</h3>
                        </CardHeader>
                    </>
                ) : (
                    <Loading/>
                )}
            </div>

        </div>
    )
}