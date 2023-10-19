import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {GetOnePupil} from "../../connection/service/AppService.js";
import {Card} from "react-bootstrap";
import {Loading} from "../../pages/Loading.jsx";

export const PupilItem = ()=>{
    const [loading, setLoading] = useState(false)
    const [pupil,setPupil]=useState([])
    const id=useParams().id

    const getOnePupil = async() => {
        try {
            const res = await GetOnePupil(id)
            setPupil(res.data)
            console.log(res.data)
            setLoading(true)

        } catch (err) {
            console.log(err.message)
        }
    }
    useEffect(() => {
        getOnePupil()
    }, []);
    return(
        <div>
            <div className={"m-5"}>
                {loading ? (
                    <div className={"d-flex align-items-center justify-content-between"}>
                        <Card style={{ width: '18rem' }}>

                            <Card.Body>
                                <Card.Title>O'quvchi: {pupil.firstName} </Card.Title>
                                <Card.Text>
                                    <h6>Telefon raqami:</h6>
                                    <h6>Paroli:  <i className="bi bi-key"></i>jkds</h6>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                ) : (
                    <Loading/>
                )}
            </div>
        </div>
    )
}