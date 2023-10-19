import {BrowserRouter, Route, Routes} from "react-router-dom";
import {DashboardLayout} from "../templates/DashboardLayout.jsx";
import "../assets/css/styles.css";
import "../assets/css/styles.min.css";
import "../assets/css/icons/tabler-icons/tabler-icons.css";
import {Course} from "../admin/course/Course.jsx";
import {Menu} from "../templates/Menu.jsx";
import {CourseItem} from "../admin/course/CourseItem.jsx";
import {Login} from "../templates/auth/Login.jsx";
import {Group} from "../admin/Group.jsx";
import {Teacher} from "../pages/teacher/Teacher.jsx";
import {Pupil} from "../pages/pupil/Pupil.jsx";
import {TeacherItem} from "../pages/teacher/TeacherItem.jsx";
import {GroupItem} from "../admin/GroupItem.jsx";



function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Login/>}/>
                <Route path={"/auth/dashboard"} element={<DashboardLayout/>}>
                    <Route index element={<Menu/>}/>
                    <Route path={"/auth/dashboard/course"} element={<Course/>}/>
                    <Route path={"/auth/dashboard/course/:id"} element={<CourseItem/>}/>
                    <Route path={"/auth/dashboard/group"} element={<Group/>}/>
                    <Route path={"/auth/dashboard/group/:id"} element={<GroupItem/>}/>
                    <Route path={"/auth/dashboard/teacher"} element={<Teacher/>}/>
                    <Route path={"/auth/dashboard/teacher/:id"} element={<TeacherItem/>}/>
                    <Route path={"/auth/dashboard/pupil"} element={<Pupil/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
