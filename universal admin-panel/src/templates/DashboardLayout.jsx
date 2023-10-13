import {Header} from "./Header.jsx";
import {SideBar} from "./SideBar.jsx";
import {Outlet} from "react-router-dom";

export const DashboardLayout = () => {
    return (
        <div>
            <div style={{width: "80%",marginLeft:'20%' }}>
                <Header/>
            </div>
            <div style={{width: "20%",height: "100%",overflow: "auto"}} >
                <SideBar/>

            </div>
            <div  style={{width:"80%",marginLeft:"18%"}}>
                <Outlet/>
            </div>
        </div>
    )
}