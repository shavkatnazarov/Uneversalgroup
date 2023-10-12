import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Menyu} from "./pages/Menyu.jsx";
import "../src/assets/css/styles.css";
import "../src/assets/css/styles.min.css";
import "../src/assets/css/icons/tabler-icons/tabler-icons.css";

function App() {
    return (
        <BrowserRouter>
        <Routes>
                <Route path={"/"} element={<Menyu/>}/>
        </Routes>
        </BrowserRouter>
    )
}

export default App