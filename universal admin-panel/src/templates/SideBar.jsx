import {Link} from "react-router-dom";
import {SIDE_ARR} from "../utils/SideArr.js";
import {useNavigate} from 'react-router-dom'
import rasm from '../assets/photo_2023-10-14_15-42-52.jpg'

export const SideBar = () => {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.clear()
        navigate("/")
    }
    return (
        <aside className="left-sidebar ">
            <div>
                <div className="brand-logo  justify-content-between">
                    <a href="#" className="text-nowrap logo-img" style={{textDecoration:'none'}}>
                        <img src={rasm} width="100" style={{marginLeft:'50px',marginTop:'20px'}} alt="" />
                        <h3 style={{marginLeft:'-10px'}}>Universal   <span className={"text-danger"} >Academy</span></h3>
                    </a>
                    <div className="close-btn d-xl-none d-block sidebartoggler cursor-pointer" id="sidebarCollapse">
                        <i className="ti ti-x fs-8"/>
                    </div>
                </div>
                <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
                    {SIDE_ARR.map((item)=>(
                        <ul id="sidebarnav">
                            <li className="nav-small-cap">
                                <i className="ti ti-dots nav-small-cap-icon fs-4"/>
                            </li>
                            <li className="sidebar-item">
                                <Link className="sidebar-link" to={item.link} aria-expanded="false">
                <span>
                  <i className={item.icon + "ti ti-layout-dashboard"}/>
                </span>
                                    <span className="hide-menu">{item.name}</span>
                                </Link>

                            </li>
                        </ul>
                    ))}
                    <button style={{marginLeft:"30px",marginTop:'100px'}} className={"btn btn-danger "} onClick={() => logout()}>logout</button>
                </nav>
            </div>
        </aside>

    )
}