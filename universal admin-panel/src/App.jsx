import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Menyu} from "./pages/Menyu.jsx";

function App() {
    return (
        <BrowserRouter>
        <Routes>

                <Route path={"/"} element={<Menyu/>}/>

        </Routes>
        </BrowserRouter>
    )
}