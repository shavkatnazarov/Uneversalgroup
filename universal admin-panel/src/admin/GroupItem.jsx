import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Card, CardBody, CardHeader} from "react-bootstrap";
import {Loading} from "../pages/Loading.jsx";
import {GetOneGroup} from "../connection/service/AppService.js";

export const GroupItem=()=>{
    const [group,setGroup]=useState({})
    const [loading,setLoading]=useState(false)
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
        <div className={"container"}>
            {loading?(
                <Card className={"mt-5 w-40"}>
                    <CardHeader className={"d-flex justify-content-between align-items-center"}>
                        <h6 className={"text-primary"}>Gruppa nomi</h6>{group.name}
                    </CardHeader>
                    <CardBody>
                        <button className={"btn btn-success"}>O'quvchi qushish</button>
                    </CardBody>
                </Card>
            ):(
                <Loading/>
            )}
        </div>
    )
}