import {useState} from "react";
import img from '../../assets/photo_2023-10-14_15-42-52.jpg'
import {useNavigate} from 'react-router-dom'
import {LoginHandler} from "../../connection/service/AuthService.js";
import {isAuthenticated} from "../../utils/IsStatus.js";

export const Login = () => {
    const navigate = useNavigate()
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')

    const loginHandler = async () => {
        const data = {phoneNumber, password}
        await LoginHandler(data,navigate)
    }
    return (
        <div className={"container d-flex align-items-center justify-content-center"} style={{height: '100vh'}}>
            <form className={"w-50 p-5 shadow"}>
                <div className={"d-flex align-items-center justify-content-between"}>
                <h1 className={"text-center text-primary mb-3"} style={{marginLeft:'30px'}}>Kirish</h1>
                <img src={img} alt="" style={{width:'150px'}}/>
                </div>
                <div className="form-outline mb-4">
                    <input type="phoneNumber" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}
                           id="form2Example1" className="form-control"/>
                    <label className="form-label" htmlFor="form2Example1">Telefon raqam</label>
                </div>

                <div className="form-outline mb-4">
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                           id="form2Example2" className="form-control"/>
                    <label className="form-label" htmlFor="form2Example2">Parol</label>
                </div>

                <button type="button" onClick={() => loginHandler()} className="btn btn-primary btn-block mb-4">Kirish
                </button>
            </form>
        </div>
    )
}