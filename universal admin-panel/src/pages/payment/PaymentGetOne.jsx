import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {GetOnePayment} from "../../connection/service/AppService.js";
import {useParams} from "react-router-dom";
import {Card} from "react-bootstrap";

export const PaymentGetOne = () => {
    const id = useParams().id
    const [payment,setPayment] = useState([])
    const [loading, setLoading] = useState(false)



    const getOnePayment =async()=>{
  try {
  const res =await GetOnePayment(id)
   }catch (err){
     return toast.error("Xatolik!")
}
    }
    useEffect(() => {
        getOnePayment()
    }, []);
    return (

        <div>
            {loading?(
                <>
                    <Card className="my-2">

                    </Card>
                </>
            ):(
                <>Loading...</>
            )}
        </div>
    )
}