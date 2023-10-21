import  {useEffect, useState} from "react";
import {Card, CardBody, CardHeader} from "react-bootstrap";
import {APP_API} from "../connection/AppApi.js";
import {BASE_CONFIG as BaseConfig} from "../connection/BaseConfig.js";

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
        {name: "uqituvchi", statistika: stat.pupilSize, icon: 'fa-light fa-chalkboard-user', about: "uqituvchilar soni"},
        {name: "uquvchilar", statistika: stat.teacherSize, icon: 'fas fa-users', about: 'uquvchilarsoni  soni'},
        {name: "courslar", statistika: stat.courseSize, icon: 'fas fa-chart-pie', about: 'kurslar soni'},
        {name: "guruhlar", statistika: stat.groupSize, icon: 'fas fa-percent', about: 'guruhlar soni'}
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
                    <CardHeader className={"d-flex align-items-center justify-content-between"}>
                    <i className={item.icon}/>
                        <h5 className="card-title  text-uppercase text-muted mb-0">{item.name}</h5>
                    </CardHeader>
                    <CardBody>
                       <div> <span
                           className="h2 font-weight-bold mb-0">{item.statistika}
                        </span>
                       </div>
                        <div> <span className="text-nowrap">{item.about}</span></div>
                    </CardBody>
                </Card>
            ))}
            </div>
        </div>
    )
}