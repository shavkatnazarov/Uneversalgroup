import  {useEffect, useState} from "react";
import {Card, CardBody, CardHeader} from "react-bootstrap";
import {APP_API} from "../connection/AppApi.js";
import {BASE_CONFIG as BaseConfig} from "../connection/BaseConfig.js";
import {Course} from "../admin/course/Course.jsx";
import {Link} from "react-router-dom";

export const Menu = () => {
    const [loading, setLoading] = useState(false)
    const [stat, setStat] = useState({})

    const getStatisti = async () => {
        try {
            const res = await BaseConfig.doGet(APP_API.statistics)
            setStat(res.data)
            setLoading(true)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getStatisti()
    }, [])

    const statArr = [
        {name: "O'qituvchi", statistika: stat.pupilSize, icon: 'fas fa-users', about: "O'qituvchilar soni",link:'/auth/dashboard/teacher'},
        {name: "O'quvchilar", statistika: stat.teacherSize, icon: 'fas fa-users', about: 'O\'quvchilarsoni  soni',link:'/auth/dashboard/pupil'},
        {name: "Kursalar", statistika: stat.courseSize, icon: 'fas fa-chart-pie', about: 'Kurslar soni',link:'/auth/dashboard/course'},
        {name: "Guruhlar", statistika: stat.groupSize, icon: 'fas fa-percent', about: 'Guruhlar soni',link:'/auth/dashboard/group'}
    ]
    return (

        <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6"
             data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
            <div>
                <Card className={"mt-5"}>
                    <h1 className={"text-center text-primary"}>Statistika</h1>
                </Card>
                <hr/>
            </div>
            <div className={"d-flex align-items-center justify-content-between"}>
            {statArr.map(item => (
                <Card style={{width:"300px"}}>
                    <CardHeader className={"d-flex align-items-center justify-content-between"} >
                    <i className={item.icon}/>
                        <h5 className="card-title  text-uppercase text-muted mb-0">{item.name}</h5>
                    </CardHeader>
                    <CardBody>
                       <div>
                       </div>
                        <div> <span className="text-nowrap "  style={{fontSize:'25px'}}>{item.about}: <span
                            className=" font-weight-bold mb-0">{item.statistika}
                        </span></span> <br/>
                        <Link to={item.link} className={"btn btn-success"}>Ko'rish</Link>
                        </div>
                    </CardBody>
                </Card>
            ))}
            </div>
        </div>
    )
}