import {BrowserRouter, Route, Routes} from "react-router-dom";

import "../assets/css/styles.css";
import "../assets/css/styles.min.css";
import "../assets/css/icons/tabler-icons/tabler-icons.css";
import {DashboardLayout} from "../templates/DashboardLayout.jsx";
import {Menu} from "../templates/Menu.jsx";
import {Course} from "../admin/course/Course.jsx";
import {CourseItem} from "../admin/course/CourseItem.jsx";
import {Login} from "../templates/auth/Login.jsx";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<DashboardLayout/>}>
                    <Route index element={<Menu/>}/>
                    <Route path={"/auth/dashboard/course"} element={<Course/>}/>
                    <Route path={"/auth/dashboard/course/:id"} element={<CourseItem/>}/>
                    <Route path={"/auth/login"} element={<Login/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
