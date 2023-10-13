import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AdminLayout} from "../layout/AdminLayout.jsx";
import {Menyu} from "../pages/Menyu.jsx";
import "../assets/css/styles.css";
import "../assets/css/styles.min.css";
import "../assets/css/icons/tabler-icons/tabler-icons.css";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path={"/"} element={<AdminLayout/>}>
                  <Route index element={<Menyu/>}/>
              </Route>
          </Routes>
      </BrowserRouter>
  )
}

export default App
