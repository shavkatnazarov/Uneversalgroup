import {Link} from "react-router-dom";
import {SIDE_ARR} from "../utils/SideArr.js";

export const SideBar = () => {
    return (
        <aside className="left-sidebar shadow">
            <div>
                <div className="brand-logo  justify-content-between">
                    <a href="./index.html" className="text-nowrap logo-img">
                        <img src="../assets/images/logos/dark-logo.svg" width="180" alt="" />
                    </a>
                    <div className="close-btn d-xl-none d-block sidebartoggler cursor-pointer" id="sidebarCollapse">
                        <i className="ti ti-x fs-8"></i>
                    </div>
                </div>
                <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
                    {SIDE_ARR.map((item)=>(
                        <ul id="sidebarnav">
                            <li className="nav-small-cap">
                                <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                            </li>
                            <li className="sidebar-item">
                                <Link className="sidebar-link" to={item.link} aria-expanded="false">
                <span>
                  <i className={item.icon+"ti ti-layout-dashboard"}></i>
                </span>
                                    <span className="hide-menu">{item.name}</span>
                                </Link>
                            </li>
                        </ul>
                    ))}

                </nav>
            </div>
        </aside>

    )
}