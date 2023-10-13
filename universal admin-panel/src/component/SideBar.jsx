import {Link, useNavigate, useLocation} from 'react-router-dom'
import png from "../assets/photo_2023-10-12_18-25-27 (1).png";

export const SideBar = () => {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.clear()
        navigate("/")
    }
    const location = useLocation().pathname

    const sideArr = [
        {name: 'asosi', link: '/auth/admin'},

    ]
    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-light"
             style={{width: "20%", height: '100vh', color: 'rgba(199, 132, 33, 0.911)'}}>
            <aside className="left-sidebar">

                <div>
                    <div className="brand-logo d-flex align-items-center justify-content-between">

                        <div className="close-btn d-xl-none d-block sidebartoggler cursor-pointer"
                             id="sidebarCollapse">
                            <i className="ti ti-x fs-8"></i>
                        </div>
                        <img style={{width: "70px"}} src={png} alt=""/>
                        <h4 style={{
                            fontFamily: "table-icons",
                            fontStyle: "normal", marginLeft: "10px"
                        }}>Universal academy</h4>
                    </div>

                    <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
                        <ul id="sidebarnav">
                            <li className="sidebar-item">
                                <a className="sidebar-link" href="#" aria-expanded="false">
                <span>
                  <i className="ti ti-alert-circle"></i>
                </span>
                                    {/*<span className="hide-menu">Alerts</span><br/>*/}
                                    {sideArr.map(item => (
                                        <li className="nav-item">
                                            <Link to={item.link}
                                                  className={location === item.link ? "nav-link active" : "nav-link"}
                                                  aria-current="page">
                                                <svg className="bi me-2" width="16" height="16">
                                                    <use xlinkHref="#home"/>
                                                </svg>
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </a>
                            </li>

                            <li className="nav-small-cap">
                                <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                                <span className="hide-menu">AUTH</span>
                            </li>
                            <li className="sidebar-item">
                                <a className="sidebar-link" href="#" aria-expanded="false">
                <span>
                  <i className="ti ti-login"></i>
                </span>
                                    <span className="hide-menu">Login</span>
                                </a>
                            </li>
                            <li className="sidebar-item">
                                <a className="sidebar-link" href="#" aria-expanded="false">
                <span>
                  <i className="ti ti-user-plus"></i>
                </span>
                                    <span className="hide-menu">Register</span>
                                </a>
                            </li>
                        </ul>

                    </nav>
                </div>
            </aside>
        </div>
    )
}