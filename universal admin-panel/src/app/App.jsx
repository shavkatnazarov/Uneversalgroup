import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AdminLayout} from "../layout/AdminLayout.jsx";
import "../assets/css/styles.css";
import "../assets/css/styles.min.css";
import "../assets/css/icons/tabler-icons/tabler-icons.css";
import {Login} from "../pages/auth/Login.jsx";
import {SSSS} from "../pages/auth/SSSS.jsx";
import {Menyu} from "../pages/Menyu.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<AdminLayout/>}>
                    <Route index element={<Menyu/>}/>
                    <>

                    </>
                    <Route path={"auth/admin"} element={<SSSS/>}/>
                    <Route path={"/auth/dashboard/course"} element={<SSSS/>}/>
                </Route>
                <Route path={"/auth/login"} element={<Login/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
