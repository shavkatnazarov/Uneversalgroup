import {useState} from "react";

export const Menu = () => {
    const [stat, setStat] = useState({})
    return (
        <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6"
             data-sidebartype="full"
             data-sidebar-position="fixed" data-header-position="fixed">
            <div className="body-wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-8 d-flex align-items-strech">

                        </div>
                    </div>
                    <div className="row">

                        <div className="col-lg-8 d-flex align-items-stretch">
                            <div className="card w-100">
                                <div className="card-body p-4">
                                    <h5 className="card-title fw-semibold mb-4 text-center text-primary">Statistika</h5>
                                    <div className="table-responsive">
                                        <table className="table text-nowrap mb-0 align-middle">
                                            <thead className="text-dark fs-4">
                                            <tr>
                                                <th className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-0"></h6>
                                                </th>
                                                <th className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-0">teacher</h6>
                                                </th>
                                                <th className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-0">pupil</h6>
                                                </th>
                                                <th className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-0">cours</h6>
                                                </th>
                                                <th className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-0">group</h6>
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td className="border-bottom-0"><h6 className="fw-semibold mb-0"></h6>
                                                </td>
                                                <td className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-1">--</h6>

                                                </td>
                                                <td className="border-bottom-0">--</td>
                                                <td className="border-bottom-0">
                                                    <div className="d-flex align-items-center gap-2">
                                                        <td className="border-bottom-0">--</td>
                                                        {/*<span*/}
                                                        {/*    className="badge bg-primary rounded-3 fw-semibold">--</span>*/}
                                                    </div>
                                                </td>
                                                <td className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-0 fs-4">--</h6>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}