import {SideBar} from "../component/SideBar.jsx";
import {Outlet} from "react-router-dom";

export const AdminLayout = () => {
    const token = localStorage.getItem("token")
    return (
        <div className={"w-100 d-flex"}>
            {/*{token ? (*/}
                <div className={"w-100 d-flex"}>
                    <SideBar/>
                    <div className={'d-flex '}
                         style={{ width: '80%'}}>
                        <Outlet/>
                    </div>
                </div>
             {/*) : (*/}
             {/*    <NotFound/>*/}
             {/*)}*/}
        </div>
    )
}