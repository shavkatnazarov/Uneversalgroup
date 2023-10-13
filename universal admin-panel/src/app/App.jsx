import {BrowserRouter, Route, Routes} from "react-router-dom";
import {DashboardLayout} from "../templates/DashboardLayout.jsx";
import "../assets/css/styles.css";
import "../assets/css/styles.min.css";
import "../assets/css/icons/tabler-icons/tabler-icons.css";
import {Course} from "../Course.jsx";
import {Menu} from "../templates/Menu.jsx";
import {Payment} from "../pages/payment/Payment.jsx";
import {PaymentGetOne} from "../pages/payment/PaymentGetOne.jsx";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<DashboardLayout/>}>
                    <Route index element={<Menu/>}/>
                    <Route path={"/auth/dashboard/course"} element={<Course/>}/>
                    <Route path={"/auth/dashboard/payment"} element={<Payment/>}/>
                    <Route path={"/auth/dashboard/payment/:id"} element={<PaymentGetOne/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
