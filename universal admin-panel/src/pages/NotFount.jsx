import {Link} from "react-router-dom";

export const NotFount=()=>{
    return(
        <div className={" align-items-center justify-content-center "}>
            <h1 className={"text-danger text-center"}>404</h1>
            <h1 className={"text-danger text-center"}>Not Found Page</h1>
            <Link to={"/"} className={"btn btn-danger "} style={{marginLeft:'720px'}}>Orqaga <i className="bi bi-arrow-return-left"></i></Link>
        </div>
    )
}