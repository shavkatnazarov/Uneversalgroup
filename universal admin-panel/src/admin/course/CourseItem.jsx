import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Loading} from "../../pages/Loading.jsx";
import {Card, CardBody, CardHeader} from "react-bootstrap";
import {APP_API} from "../../connection/AppApi.js";
import {CardText, ListGroup, ListGroupItem} from "reactstrap";
import {GetOneCourse} from "../../connection/service/AppService.js";

export const CourseItem=()=>{
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [course,setCourse]=useState({})
    const [group,setGroup]=useState([])
    const id=useParams().id
    const getOneCourse = async () => {
        try {
            const res = await GetOneCourse(id)
            setCourse(res)
            setLoading(true)
        } catch (err) {
            console.log(err.message)
        }
    }
    useEffect(() => {
        getOneCourse()
    }, []);
    return(
        <div className={"m-5"}>
            {loading ? (
                <>
                    <CardHeader style={{marginTop: "20px"}}>
                        <h6 style={{fontSize: '12px'}}>Nomi</h6>
                        <h3>{course.name}</h3>
                    </CardHeader>

                    <Card style={{width: "450px", marginTop: "20px"}}>
                        <Card>
                                <img src={APP_API.downloadPhoto+course.photoId} alt=""/>
                        </Card>
                        <CardBody>
                            <CardText style={{color: 'black'}}>
                                <h6 style={{fontSize: '12px'}}>Dars davomiligi</h6>
                                {course.expireDate} daqiqa
                            </CardText>
                        </CardBody>
                        <ListGroup flush>
                            <ListGroupItem style={{color: 'black'}}>
                                <h6 style={{fontSize: '12px'}}>Narxi</h6>
                                {course.price} UZS
                            </ListGroupItem>
                            <ListGroupItem style={{color: 'black'}}>
                                <h6 style={{fontSize: '12px'}}>Tavzif</h6>
                                {course.description}
                            </ListGroupItem>
                        </ListGroup>
                    </Card>



                </>
            ) : (
                <Loading/>
            )}
        </div>
    )
}