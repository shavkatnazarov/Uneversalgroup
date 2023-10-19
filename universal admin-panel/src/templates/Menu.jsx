import {useState} from "react";
import {Card, CardBody, CardHeader} from "react-bootstrap";

export const Menu = () => {
    const [stat, setStat] = useState({})
    return (
        <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6"
             data-sidebartype="full"
             data-sidebar-position="fixed" data-header-position="fixed">
            <div>
                <h1 className={"text-center text-primary"}>Statistika</h1>
                <hr/>
            </div>
            <div className={" d-flex align-items-center justify-content-between"}>
                <Card className={""}>
                    <CardHeader>
                        Gruplar soni
                    </CardHeader>
                    <CardBody>
                    </CardBody>
                </Card>
                <Card>
                <CardHeader>
                    Gruplar soni
                </CardHeader>
                <CardBody>
                </CardBody>
            </Card> <Card>
                <CardHeader>
                    Gruplar soni
                </CardHeader>
                <CardBody>
                </CardBody>
            </Card> <Card>
                <CardHeader>
                    Gruplar soni
                </CardHeader>
                <CardBody>
                </CardBody>
            </Card>
            </div>
        </div>
    )
}