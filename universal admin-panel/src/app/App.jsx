import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Menyu} from "../pages/Menyu.jsx";
import "../assets/css/styles.css";
import "../assets/css/styles.min.css";
import "../assets/css/icons/tabler-icons/tabler-icons.css";
import {Login} from "../pages/auth/Login.jsx";
import {AdminLayout} from "../layout/AdminLayout.jsx";

function App() {
    return (
        <BrowserRouter>
        <Routes>
                <Route path={"/"} element={<AdminLayout/>}/>

            <Route path={"/auth/login"} element={<Login/>}/>
        </Routes>
        </BrowserRouter>
    )
}

export default App