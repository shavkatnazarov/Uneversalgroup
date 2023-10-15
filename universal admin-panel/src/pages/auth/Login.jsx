import '/src/assets/css/css.css'
import photo from '/src/assets/photo_2023-10-14_15-42-52.jpg'
import {LoginHandler} from "../../connection/service/AuthService.js";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
export const Login= ()=>{
    const navigate = useNavigate()
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const login = async()=>{
        const data = {phoneNumber, password}
        await LoginHandler(data,navigate)
    }
    return (
        <div>
            <section className="vh-100">
                <div className="container py-5 h-100">
                    <div className="row d-flex align-items-center justify-content-center h-100">
                        <div className="col-md-8 col-lg-7 col-xl-6">
                            <img style={{marginTop:'-50px'}} src={photo}
                                 className="img-fluid" alt="Phone image"/> <br/>
                            <h1 style={{marginTop:'-50px',fontSize:'60px'}} className={"text-center text-primary"}>Universal <span className={"text-danger"} style={{fontSize:'60px'}}>Academy</span></h1>
                        </div>
                        <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                                    <h1 className={"text-center text-danger"} style={{fontSize:'50px'}}>Login</h1> <br/> <br/>
                            <form>
                                <div className="form-outline mb-4">
                                    <input type="number" id="form1Example13" className="form-control form-control-lg" value={phoneNumber} onChange={e=>setPhoneNumber(e.target.value)} />
                                    <label className="form-label" form="form1Example13">Phone Number</label>
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="password" id="form1Example23" className="form-control form-control-lg" value={password} onChange={e=>setPassword(e.target.value)} />
                                    <label className="form-label" form="form1Example23">Password</label>
                                </div>
                                <button type="button" className="btn btn-primary btn-lg btn-block" onClick={()=>login()}>Login</button>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}