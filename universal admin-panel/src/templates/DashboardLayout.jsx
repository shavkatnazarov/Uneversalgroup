import {Header} from "./Header.jsx";
import {SideBar} from "./SideBar.jsx";
import {Outlet} from "react-router-dom";
import {NotFount} from "../pages/NotFount.jsx";

export const DashboardLayout = () => {
    const token = localStorage.getItem("token")

    return (
        <div>
            {token ?(
            <div>
                <div>
                    <Header/>
                </div>
                <div style={{width: "20%",height: "100%",overflow: "auto"}} >
                    <SideBar/>
                </div>
                <div  style={{width:"80%",marginLeft:"19%"}}>
                    <Outlet/>
                </div>
            </div>
            ):(
                <NotFount/>
            )}
        </div>
    )
}